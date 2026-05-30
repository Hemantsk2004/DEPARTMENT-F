"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOpportunity } from "@/services/opportunity.service";
import { toast } from "react-toastify";

export default function CreateOpportunityPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      type: "internship",
      description: "",
      link: "",
      deadline: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createOpportunity(
        formData
      );

      toast.success(
        "Opportunity created successfully"
      );

      router.push(
        "/dashboard/opportunities"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create opportunity"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create Opportunity
        </h1>

        <p className="text-slate-400 mb-8">
          Publish internships,
          placements or hackathons
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Opportunity Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-dark"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="input-dark"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-dark"
          >
            <option value="internship">
              Internship
            </option>

            <option value="hackathon">
              Hackathon
            </option>

            <option value="placement">
              Placement
            </option>
          </select>

          <textarea
            name="description"
            rows={5}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-dark"
          />

          <input
            type="url"
            name="link"
            placeholder="Application Link"
            value={formData.link}
            onChange={handleChange}
            required
            className="input-dark"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="input-dark"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium"
          >
            {loading
              ? "Publishing..."
              : "Publish Opportunity"}
          </button>
        </form>
      </div>
    </div>
  );
}                   