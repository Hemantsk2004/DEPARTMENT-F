"use client";

import { useState } from "react";

import { summarizeNotes } from "@/services/ai.service";

export default function AIAssistantPage() {
  const [text, setText] = useState("");

  const [pdf, setPdf] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (text) {
        formData.append("text", text);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      const response =
        await summarizeNotes(formData);

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Study Assistant
        </h1>

        <p className="text-gray-400 mt-2">
          Upload notes or PDFs and generate
          intelligent summaries.
        </p>
      </div>

        <div>
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

      <div className="grid lg:grid-cols-2 gap-8">

        {/* INPUT */}

        <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl text-white font-semibold mb-4">
            Notes Input
          </h2>

          <textarea
            rows={12}
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Paste notes here..."
            className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none"
          />

          <div className="mt-5">

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

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl text-white"
          >
            {loading
              ? "Generating..."
              : "Generate Summary"}
          </button>
        </div>

        {/* OUTPUT */}

        <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl text-white font-semibold mb-4">
            AI Output
          </h2>

          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {result ||
              "Summary, key points and revision notes will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
}