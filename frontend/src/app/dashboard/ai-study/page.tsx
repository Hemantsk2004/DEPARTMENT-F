"use client";

import { useState } from "react";
import { aiService } from "@/services/ai.service";

export default function AIStudyPage() {
  const [notes, setNotes] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [revisionNotes, setRevisionNotes] =
    useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (notes.trim()) {
        formData.append("text", notes);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      const response =
        await aiService.summarize(formData);

      const aiText = response.data;

      const summaryMatch = aiText.match(
        /SUMMARY:(.*?)KEY POINTS:/s
      );

      const keyPointsMatch = aiText.match(
        /KEY POINTS:(.*?)REVISION NOTES:/s
      );

      const revisionMatch = aiText.match(
        /REVISION NOTES:(.*)/s
      );

      setSummary(
        summaryMatch?.[1]?.trim() || ""
      );

      setKeyPoints(
        keyPointsMatch?.[1]?.trim() || ""
      );

      setRevisionNotes(
        revisionMatch?.[1]?.trim() || ""
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate AI summary"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNotes("");
    setPdf(null);

    setSummary("");
    setKeyPoints("");
    setRevisionNotes("");
  };

  const handleCopy = async () => {
    const content = `
SUMMARY:
${summary}

KEY POINTS:
${keyPoints}

REVISION NOTES:
${revisionNotes}
`;

    await navigator.clipboard.writeText(
      content
    );

    alert("Copied to clipboard");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-5xl font-bold text-white">
          AI Study Assistant
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Upload PDFs or paste notes and
          generate summaries instantly.
        </p>
      </div>

      {/* Input Section */}

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Study Material
        </h2>

        <div className="mb-6">
          <label className="block text-white mb-3">
            Upload PDF Notes
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPdf(
                e.target.files?.[0] || null
              )
            }
            className="text-white"
          />
        </div>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows={12}
          placeholder="Paste notes here..."
          className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-5 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-medium disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Summary"}
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3 border border-slate-700 hover:border-slate-500 transition rounded-xl text-white"
          >
            Clear
          </button>

        </div>
      </div>

      {/* Output */}

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-semibold text-white">
            AI Output
          </h2>

          {(summary ||
            keyPoints ||
            revisionNotes) && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-white"
            >
              Copy
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">

            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

            <p className="text-slate-400 mt-4">
              AI is analyzing your notes...
            </p>

          </div>
        ) : (
          <div className="grid gap-6">

            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Summary
              </h3>

              <p className="text-slate-300 whitespace-pre-wrap">
                {summary ||
                  "Summary will appear here"}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Key Points
              </h3>

              <pre className="whitespace-pre-wrap text-slate-300 font-sans">
                {keyPoints ||
                  "Key points will appear here"}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Revision Notes
              </h3>

              <pre className="whitespace-pre-wrap text-slate-300 font-sans">
                {revisionNotes ||
                  "Revision notes will appear here"}
              </pre>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}