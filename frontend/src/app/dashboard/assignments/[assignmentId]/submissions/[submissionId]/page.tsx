"use client";

import {
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  submissionService,
} from "@/services/submission.service";

import {
  toast,
} from "react-toastify";

export default function GradeSubmissionPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const submissionId =
    params.submissionId as string;

  const [marks,
    setMarks] =
    useState("");

  const [feedback,
    setFeedback] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        await submissionService.gradeSubmission(
          submissionId,
          {
            marks:
              Number(
                marks
              ),
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
        onSubmit={
          handleSubmit
        }
        className="glass-card p-6 space-y-4"
      >

        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) =>
            setMarks(
              e.target.value
            )
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
        />

        <textarea
          rows={5}
          placeholder="Feedback"
          value={feedback}
          onChange={(e) =>
            setFeedback(
              e.target.value
            )
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
        />

        <button
          className="btn-accent px-6 py-3"
        >
          Submit Grade
        </button>

      </form>

    </div>
  );
}