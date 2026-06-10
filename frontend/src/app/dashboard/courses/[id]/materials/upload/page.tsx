"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { materialService } from "@/services/material.service";
import { toast } from "react-toastify";

export default function UploadMaterialPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (user?.role === "student") {
    router.push("/dashboard");
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    setLoading(true);
    try {
      await materialService.uploadMaterial(id, {
        title,
        courseId: id,
        file,
      });
      toast.success("Material uploaded successfully!");
      router.push(`/dashboard/courses/${id}`);
    } catch {
      toast.error("Failed to upload material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1
          style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
          className="text-2xl font-bold mb-1"
        >
          Upload Material
        </h1>
        <p style={{ color: "#475569" }} className="text-sm">
          Add a new learning resource to this course
        </p>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}
              className="block mb-1.5"
            >
              Material Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Week 1 Lecture Notes"
              className="input-dark"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Drop zone */}
          <div>
            <label
              style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}
              className="block mb-1.5"
            >
              File
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? "#3b82f6" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12,
                background: dragOver ? "rgba(59,130,246,0.05)" : "#0a0f1e",
                padding: "40px 20px",
                textAlign: "center",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              <div className="text-3xl mb-3">📁</div>
              <p style={{ color: "#475569" }} className="text-sm mb-2">
                Drag & drop your file here, or{" "}
                <label
                  htmlFor="file-upload"
                  style={{ color: "#60a5fa", cursor: "pointer" }}
                  className="hover:underline"
                >
                  browse
                </label>
              </p>
              <p style={{ color: "#334155" }} className="text-xs">
                PDF, PPT, DOC, ZIP — up to 10MB
              </p>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              {file && (
                <div
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "8px 16px", display: "inline-block", marginTop: 12 }}
                >
                  <p style={{ color: "#34d399" }} className="text-xs font-medium">
                    ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
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
              disabled={loading}
              className="btn-accent text-sm px-5 py-2"
            >
              {loading ? "Uploading..." : "Upload Material →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}