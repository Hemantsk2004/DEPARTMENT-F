"use client";

import { useEffect, useState } from "react";

import {
  getAllOpportunities,
  saveOpportunity,
} from "@/services/opportunity.service";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Opportunity {
  _id: string;
  title: string;
  company: string;
  type: string;
  description: string;
  link: string;
  deadline: string;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const data = await getAllOpportunities();
      setOpportunities(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string) => {
    try {
      await saveOpportunity(id);
      alert("Opportunity saved!");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOpportunities = opportunities.filter(
    (opportunity) => {
      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        opportunity.company
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        opportunity.type === activeFilter;

      return matchesSearch && matchesFilter;
    }
  );

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading opportunities...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
<div className="flex justify-between items-center flex-wrap gap-4">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Opportunities
        </h1>

        <p className="text-gray-400 mt-2">
          Explore internships, hackathons and placements
        </p>
      </div>

      {(user?.role === "admin" ||
        user?.role === "lecturer") && (
        <Link
          href="/dashboard/opportunities/new"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white transition"
        >
          + Add Opportunity
        </Link>
      )}
    </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0F172A] border border-white/10 rounded-2xl px-4 py-3 text-white w-full lg:w-96 outline-none focus:border-blue-500"
          />

          <div className="flex flex-wrap gap-3">
            {[
              "all",
              "internship",
              "hackathon",
              "placement",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl transition capitalize ${
                  activeFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-[#0F172A] border border-white/10 text-gray-300 hover:border-blue-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.length === 0 ? (
          <div className="col-span-full bg-[#0F172A] border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No opportunities found
            </h2>

            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity._id}
              className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 shadow-lg hover:border-blue-500/40 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 capitalize">
                  {opportunity.type}
                </span>

                <span className="text-sm text-gray-400">
                  Deadline:{" "}
                  {new Date(
                    opportunity.deadline
                  ).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white">
                {opportunity.title}
              </h2>

              <p className="text-blue-400 mt-1">
                {opportunity.company}
              </p>

              <p className="text-gray-400 mt-4 line-clamp-3">
                {opportunity.description}
              </p>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href={opportunity.link}
                  target="_blank"
                  className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-xl text-white"
                >
                  Apply
                </a>

                <button
                  onClick={() =>
                    handleSave(opportunity._id)
                  }
                  className="border border-white/10 hover:border-blue-500 transition px-4 py-2 rounded-xl text-white"
                >
                  Save
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}