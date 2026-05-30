"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { courseService } from "@/services/course.service";
import { toast } from "react-toastify";

export default function EditCoursePage() {
  const { user } = useAuth();
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    description: "",
    lecturer: user!._id,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseService.getCourseById(id);
        const course = response.data;
        setFormData((prev) => ({
          ...prev,
          title: course.title,
          courseCode: course.courseCode,
          description: course.description,
        }));
      } catch {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await courseService.updateCourse(id, formData);
      toast.success("Course updated successfully!");
      router.push(`/dashboard/courses/${id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <div className="shimmer h-10 rounded-xl w-48" />
        <div className="shimmer h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1
          style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
          className="text-2xl font-bold mb-1"
        >
          Edit Course
        </h1>
        <p style={{ color: "#475569" }} className="text-sm">
          Update the course information
        </p>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}
                className="block mb-1.5"
              >
                Course Title
              </label>
              <input
                name="title"
                type="text"
                required
                className="input-dark"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}
                className="block mb-1.5"
              >
                Course Code
              </label>
              <input
                name="courseCode"
                type="text"
                required
                className="input-dark"
                value={formData.courseCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}
              className="block mb-1.5"
            >
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="input-dark"
              style={{ resize: "vertical" }}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href={`/dashboard/courses/${id}`}
              className="btn-ghost text-sm px-5 py-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-accent text-sm px-5 py-2"
            >
              {saving ? "Saving..." : "Save Changes →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}