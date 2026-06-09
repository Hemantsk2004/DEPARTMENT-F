"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { submissionService } from "@/services/submission.service";

export default function SubmissionsPage() {
  const params = useParams();

  const assignmentId =
    params?.assignmentId?.toString() || "";

  const [submissions, setSubmissions] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await submissionService.getSubmissions(
            assignmentId
          );

        setSubmissions(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (assignmentId) {
      fetchData();
    }
  }, [assignmentId]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">
        Assignment Submissions
      </h1>

      {submissions.map(
        (submission) => (
          <div
            key={submission._id}
            className="glass-card p-5 flex justify-between"
          >
            <div>
              <h3 className="text-white">
                {
                  submission.studentId
                    ?.name
                }
              </h3>

              <p className="text-slate-400">
                {
                  submission.studentId
                    ?.email
                }
              </p>
            </div>

            <Link
              href={`/dashboard/submissions/${submission._id}/grade`}
              className="btn-accent px-3 py-2"
            >
              Grade
            </Link>
          </div>
        )
      )}
    </div>
  );
}