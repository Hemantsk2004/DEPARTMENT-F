"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { submissionService } from "@/services/submission.service";

export default function SubmitAssignmentPage() {
  const params = useParams();

  const assignmentId =
    params?.assignmentId?.toString() || "";

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!file) {
      toast.error(
        "Please select a file"
      );
      return;
    }

    try {
      setLoading(true);

      await submissionService.submitAssignment(
        assignmentId,
        file
      );

      toast.success(
        "Assignment submitted successfully"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit assignment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">
        Submit Assignment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="glass-card p-6 space-y-4"
      >
        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          className="btn-accent px-5 py-3"
        >
          {loading
            ? "Submitting..."
            : "Submit Assignment"}
        </button>
      </form>
    </div>
  );
}