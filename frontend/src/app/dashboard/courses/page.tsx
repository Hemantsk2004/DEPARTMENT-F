"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { courseService } from "@/services/course.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function CoursesPage() {
  const { user } = useAuth();

  const [browseCourses, setBrowseCourses] =
    useState<any[]>([]);

  const [myCourses, setMyCourses] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("browse");

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      // STUDENT
      if (user?.role === "student") {
        const [allCourses, enrolledCourses] =
          await Promise.all([
            courseService.getAllCourses(),
            courseService.getEnrolledCourses(),
          ]);

        setBrowseCourses(
          allCourses.data || []
        );

        setMyCourses(
          enrolledCourses.data || []
        );
      }

      // LECTURER
      else if (
        user?.role === "lecturer"
      ) {
        const response =
          await courseService.getLecturerCourses(
            user._id
          );

        setMyCourses(
          response.data || []
        );
      }

      // ADMIN
      else {
        const response =
          await courseService.getAllCourses();

        setMyCourses(
          response.data || []
        );
      }
    } catch {
      toast.error(
        "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderCourseCard = (
    course: any
  ) => (
    <Link
      key={course._id}
      href={`/dashboard/courses/${course._id}`}
      className="glass-card p-5 hover:border-blue-500 transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-white font-semibold text-lg">
            {course.title}
          </h2>

          <p className="text-blue-400 text-sm mt-1">
            {course.courseCode}
          </p>
        </div>

        <span className="text-2xl">
          📚
        </span>
      </div>

      <p className="text-slate-400 mt-4 line-clamp-3">
        {course.description}
      </p>

      <div className="flex justify-between mt-6 text-sm">
        <span className="text-slate-500">
          👥{" "}
          {course.students?.length ||
            0}
        </span>

        <span className="text-blue-400">
          Open →
        </span>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">

            {user?.role === "student"
              ? "Courses"
              : "Course Management"}

          </h1>

          <p className="text-slate-400 mt-1">

            {user?.role === "student"
              ? "Browse and manage your enrolled courses"
              : "Manage all your courses"}

          </p>
        </div>

        {(user?.role === "lecturer" ||
          user?.role === "admin") && (
          <Link
            href="/dashboard/courses/new"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Create Course
          </Link>
        )}
      </div>

      {/* STUDENT TABS */}

      {user?.role === "student" && (
        <div className="flex gap-3">

          <button
            onClick={() =>
              setActiveTab(
                "browse"
              )
            }
            className={`px-5 py-3 rounded-xl ${
              activeTab === "browse"
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-400"
            }`}
          >
            Browse Courses
          </button>

          <button
            onClick={() =>
              setActiveTab("my")
            }
            className={`px-5 py-3 rounded-xl ${
              activeTab === "my"
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-400"
            }`}
          >
            My Courses
          </button>

        </div>
      )}

      {/* STUDENT BROWSE */}

      {user?.role === "student" &&
        activeTab === "browse" && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {browseCourses.map(
              renderCourseCard
            )}

          </div>
        )}

      {/* STUDENT MY COURSES */}

      {user?.role === "student" &&
        activeTab === "my" && (
          <div>

            {myCourses.length ===
            0 ? (
              <div className="glass-card p-10 text-center">

                <h3 className="text-xl text-white mb-2">
                  No Enrolled Courses
                </h3>

                <p className="text-slate-400">
                  Browse courses and
                  enroll to see them
                  here.
                </p>

              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {myCourses.map(
                  renderCourseCard
                )}

              </div>
            )}
          </div>
        )}

      {/* LECTURER / ADMIN */}

      {user?.role !== "student" && (
        <div>

          {myCourses.length ===
          0 ? (
            <div className="glass-card p-10 text-center">

              <h3 className="text-xl text-white mb-2">
                No Courses Yet
              </h3>

              <p className="text-slate-400">
                Create your first
                course.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              {myCourses.map(
                renderCourseCard
              )}

            </div>
          )}
        </div>
      )}

    </div>
  );
}