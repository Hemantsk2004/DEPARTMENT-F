"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getPublicPortfolio } from "@/services/publicPortfolio.service";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface PortfolioUser {
  name: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  resume?: string;
  projects?: Project[];
}

export default function PublicPortfolioPage() {
  const params = useParams();

  const [user, setUser] =
    useState<PortfolioUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchPortfolio(params.id as string);
    }
  }, [params]);

  const fetchPortfolio = async (id: string) => {
    try {
      const data = await getPublicPortfolio(id);

      setUser(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white">
        Loading Portfolio...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white">
        Portfolio not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HERO */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

            <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-500 shrink-0">

            {user.avatar ? (
                <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold">
                {user.name.charAt(0)}
                </div>
            )}
            </div>

          <div className="flex-1">

            <h1 className="text-5xl font-bold">
              {user.name}
            </h1>

            <p className="text-blue-400 text-xl mt-4">
              Student Developer
            </p>

            <p className="text-gray-400 mt-6 leading-relaxed max-w-3xl">
              {user.bio ||
                "Passionate student developer building modern web applications."}
            </p>

            {/* LINKS */}
            <div className="flex flex-wrap gap-4 mt-8">

              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  className="bg-[#0F172A] border border-white/10 hover:border-blue-500 transition px-5 py-3 rounded-2xl"
                >
                  GitHub
                </a>
              )}

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  className="bg-[#0F172A] border border-white/10 hover:border-blue-500 transition px-5 py-3 rounded-2xl"
                >
                  LinkedIn
                </a>
              )}

              {user.resume && (
                <a
                  href={user.resume}
                  target="_blank"
                  className="bg-blue-500 hover:bg-blue-600 transition px-5 py-3 rounded-2xl"
                >
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4">

            {user.skills?.length ? (
              user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-3 rounded-2xl"
                >
                  {skill}
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No skills added yet
              </p>
            )}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-10">
            Projects
          </h2>

          {user.projects?.length ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {user.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0F172A] border border-white/10 rounded-3xl p-7 hover:border-blue-500/30 transition"
                >
                  <h3 className="text-2xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mt-5 leading-relaxed line-clamp-5">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-block mt-6 text-blue-400 hover:text-blue-300"
                  >
                    Visit Project →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No projects added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}