"use client";

import { useEffect, useState } from "react";

import {
  getMyPortfolio,
  updatePortfolio,
} from "@/services/portfolio.service";

interface Project {
  title: string;
  description: string;
  link: string;
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");

const [formData, setFormData] = useState({
  bio: "",
  skills: "",
  github: "",
  linkedin: "",
  resume: "",
  avatar: null as File | null,
});

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const data = await getMyPortfolio();

      const user = data.data;

      setUserId(user._id);

    setFormData({
      bio: user.bio || "",
      skills: user.skills?.join(", ") || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      resume: user.resume || "",
      avatar: null,
    });

      setProjects(user.projects || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectChange = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = [...projects];

    updatedProjects[index][field] = value;

    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        link: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projects];

    updatedProjects.splice(index, 1);

    setProjects(updatedProjects);
  };

const handleSubmit = async () => {
  try {
    const payload = new FormData();

    payload.append("bio", formData.bio);

    payload.append(
      "skills",
      JSON.stringify(
        formData.skills
          .split(",")
          .map((skill) => skill.trim())
      )
    );

    payload.append("github", formData.github);

    payload.append("linkedin", formData.linkedin);

    payload.append("resume", formData.resume);

    payload.append(
      "projects",
      JSON.stringify(projects)
    );

    if (formData.avatar) {
      payload.append(
        "avatar",
        formData.avatar
      );
    }

    await updatePortfolio(payload);

    alert("Portfolio updated successfully!");

    await fetchPortfolio();
  } catch (error) {
    console.error(error);
  }
};

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Portfolio Profile
        </h1>

        <p className="text-gray-400 mt-2">
          Build your professional student identity
        </p>
      </div>

      <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-8 space-y-8">

        {/* BIO */}
        <div>
          <label className="block text-white mb-3">
            Bio
          </label>

          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell people about yourself..."
            className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* PROFILE PHOTO */}

        <div>
          <label className="block text-white mb-3">
            Profile Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                avatar: e.target.files?.[0] || null,
              })
            }
            className="block w-full text-sm text-gray-300
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-xl
              file:border-0
              file:bg-blue-500
              file:text-white
              hover:file:bg-blue-600"
            />
        </div>

        {/* SKILLS */}
        <div>
          <label className="block text-white mb-3">
            Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* LINKS */}
        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            placeholder="Resume URL"
            className="bg-[#020817] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* PROJECTS */}
        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-semibold text-white">
              Projects
            </h2>

            <button
              onClick={addProject}
              className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl text-white"
            >
              Add Project
            </button>
          </div>

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#020817] border border-white/10 rounded-2xl p-6 space-y-4"
            >

              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />

              <textarea
                rows={4}
                maxLength={220}
                placeholder="Project Description (max 220 chars)"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Project Link"
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "link",
                    e.target.value
                  )
                }
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />

              <button
                onClick={() =>
                  removeProject(index)
                }
                className="text-red-400 hover:text-red-300"
              >
                Remove Project
              </button>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-4">

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-2xl text-white font-medium"
          >
            Save Portfolio
          </button>

          <a
            href={`/portfolio/${userId}`}
            target="_blank"
            className="border border-white/10 hover:border-blue-500 transition px-6 py-3 rounded-2xl text-white font-medium"
          >
            View Public Profile
          </a>
        </div>
      </div>
    </div>
  );
}