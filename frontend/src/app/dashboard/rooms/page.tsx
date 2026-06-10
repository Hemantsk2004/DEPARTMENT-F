"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { courseService } from "@/services/course.service";
import { useAuth } from "@/context/AuthContext";

export default function RoomsPage() {
  const [courses, setCourses] =
    useState<any[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses =
      async () => {
        try {
          let res;

          if (
            user?.role ===
            "student"
          ) {
            res =
              await courseService.getEnrolledCourses();
          } else {
            res =
              await courseService.getAllCourses();
          }

          setCourses(
            res.data || []
          );
        } catch (error) {
          console.error(error);
        }
      };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1
          style={{
            fontFamily:
              "'Syne', sans-serif",
            color: "#f1f5f9",
          }}
          className="text-2xl font-bold mb-1"
        >
          Study Rooms
        </h1>

        <p
          style={{
            color: "#475569",
          }}
          className="text-sm"
        >
          Join course-specific
          discussion rooms.
        </p>
      </div>

      {courses.length === 0 ? (
        <div
          style={{
            background:
              "#0f172a",
            border:
              "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
          }}
          className="p-10 text-center"
        >
          <p className="text-slate-400">
            No study rooms available
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {courses.map(
            (course) => (
              <Link
                key={course._id}
                href={`/dashboard/rooms/${course._id}`}
                style={{
                  background:
                    "#0f172a",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                }}
                className="p-5 hover:border-blue-500 transition-all"
              >
                <h2 className="text-white font-semibold">
                  {course.title}
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  Enter Study Room
                </p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}