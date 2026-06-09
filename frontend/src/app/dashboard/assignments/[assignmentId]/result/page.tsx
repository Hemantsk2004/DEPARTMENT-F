"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  submissionService,
} from "@/services/submission.service";

export default function ResultPage() {
  const params =
    useParams();

  const assignmentId =
    params.assignmentId as string;

  const [submission,
    setSubmission] =
    useState<any>(null);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const res =
            await submissionService.getStudentSubmission(
              assignmentId
            );

          setSubmission(
            res.data
          );
        } catch {
          console.log(
            "No submission yet"
          );
        }
      };

    fetchData();
  }, [assignmentId]);

  if (!submission) {
    return (
      <div className="text-white">
        No submission found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-white mb-6">
        Assignment Result
      </h1>

      <div className="glass-card p-6">

        <div className="mb-4">

          <h3 className="text-slate-400">
            Marks
          </h3>

          <p className="text-4xl text-green-400 font-bold">
            {submission.marks ??
              "Pending"}
          </p>

        </div>

        <div>

          <h3 className="text-slate-400 mb-2">
            Feedback
          </h3>

          <p className="text-white">
            {submission.feedback ||
              "Awaiting evaluation"}
          </p>

        </div>

      </div>

    </div>
  );
}