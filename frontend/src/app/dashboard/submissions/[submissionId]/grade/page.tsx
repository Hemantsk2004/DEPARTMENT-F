"use client";

import { useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import { toast } from "react-toastify";

import { submissionService } from "@/services/submission.service";

export default function GradeSubmissionPage() {
  const params = useParams();

  const router = useRouter();

  const submissionId =
    params?.submissionId?.toString() || "";

  const [marks, setMarks] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await submissionService.gradeSubmission(
        submissionId,
        {
          marks: Number(marks),
          feedback,
        }
      );

      toast.success(
        "Submission graded"
      );

      router.back();

    } catch {
      toast.error(
        "Failed to grade submission"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">
        Grade Submission
      </h1>

      <form
        onSubmit={handleSubmit}
        className="glass-card p-6 space-y-4"
      >
        <input
          type="number"
          value={marks}
          onChange={(e) =>
            setMarks(
              e.target.value
            )
          }
          placeholder="Marks"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
        />

        <textarea
          rows={5}
          value={feedback}
          onChange={(e) =>
            setFeedback(
              e.target.value
            )
          }
          placeholder="Feedback"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
        />

        <button
          type="submit"
          className="btn-accent px-5 py-3"
        >
          Submit Grade
        </button>
      </form>
    </div>
  );
}