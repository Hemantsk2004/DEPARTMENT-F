"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { assignmentService } from "@/services/assignment.service";
import { toast } from "react-toastify";

export default function CreateAssignmentPage() {
  const router = useRouter();

  const params = useParams();

  const courseId = params.id as string;

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      dueDate: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await assignmentService.createAssignment({
        ...formData,
        courseId,
      });

      toast.success(
        "Assignment created successfully"
      );

      router.push(
        `/dashboard/courses/${courseId}`
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create assignment"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Create Assignment
        </h1>

        <p className="text-slate-400 mt-2">
          Create a new assignment for students.
        </p>

      </div>

      <div className="glass-card p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block text-white mb-2">
              Assignment Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter assignment title"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

          </div>

          <div>

            <label className="block text-white mb-2">
              Description
            </label>

            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Assignment description"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

          </div>

          <div>

            <label className="block text-white mb-2">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              required
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-accent px-6 py-3"
          >
            {loading
              ? "Creating..."
              : "Create Assignment"}
          </button>

        </form>

      </div>

    </div>
  );
}