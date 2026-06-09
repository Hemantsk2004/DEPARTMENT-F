
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { courseService } from "@/services/course.service";
import { materialService } from "@/services/material.service";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { formatDate } from "../../../../../utils/formatDate";
import { toast } from "react-toastify";
import { CourseWithDetails } from "@/types/course";
import { Material } from "@/types/material";
import { User } from "@/types/user";
import { announcementService } from "@/services/announcement.service";
import { lectureService } from "@/services/lecture.service";
import { Assignment } from "@/types/assignment";
import { assignmentService } from "@/services/assignment.service";
interface Params {
  id: string;
}

export default function CourseDetailsPage() {
  const { id } = useParams() as unknown as Params;
  const { user } = useAuth();

  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [lectures, setLectures] = useState<any[]>([]);

  // FIX 1: `announcements` state was used throughout but never declared.
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const [
          courseRes,
          materialsRes,
          studentsRes,
          announcementsRes,
          lecturesRes,
          assignmentsRes,
        ] = await Promise.all([
          courseService.getCourseById(id),
          materialService.getMaterialsByCourse(id),
          courseService.getStudentsByCourse(id),
          announcementService.getAnnouncements(id),
          lectureService.getLectures(id),
          assignmentService.getAssignmentsByCourse(id),
        ]);

        setCourse(courseRes.data);
        setMaterials(materialsRes.data);
        setStudents(studentsRes.data);
        setAnnouncements(announcementsRes.data || []);
        setLectures(lecturesRes.data || []);
        setAssignments(assignmentsRes.data);

        if (
          user &&
          studentsRes.data.some((student: any) => student._id === user._id)
        ) {
          setIsEnrolled(true);
        }
      } catch {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, user]);

  const handleEnrollment = async () => {
    if (!course) return;

    try {
      if (!isEnrolled) {
        await courseService.enrollStudent(course._id);
        setIsEnrolled(true);
        setStudents((prev) => [...prev, user as User]);
        toast.success("Successfully enrolled");
      } else {
        await courseService.disenrollStudent(course._id);
        setIsEnrolled(false);
        setStudents((prev) =>
          prev.filter((student) => student._id !== user?._id)
        );
        toast.success("Successfully left course");
      }
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await materialService.deleteMaterial(materialId);
      setMaterials((prev) => prev.filter((m) => m._id !== materialId));
      toast.success("Material deleted");
    } catch {
      toast.error("Failed to delete material");
    }
  };

  // FIX 2: Added null guard for `course` before accessing `course._id`.
  const handleCreateAnnouncement = async () => {
    if (!course) return;
    try {
      const res = await announcementService.createAnnouncement({
        title: announcementTitle,
        content: announcementContent,
        courseId: course._id,
      });

      setAnnouncements((prev) => [res.data, ...prev]);
      setShowAnnouncementModal(false);
      setAnnouncementTitle("");
      setAnnouncementContent("");
      toast.success("Announcement created");
    } catch {
      toast.error("Failed to create announcement");
    }
  };

  // FIX 2 (same): Added null guard for `course` before accessing `course._id`.
  const handleCreateLecture = async () => {
    if (!course) return;
    try {
      const res = await lectureService.createLecture({
        title: lectureTitle,
        description: lectureDescription,
        url: lectureUrl,
        courseId: course._id,
      });

      setLectures((prev) => [res.data, ...prev]);
      setShowLectureModal(false);
      setLectureTitle("");
      setLectureDescription("");
      setLectureUrl("");
      toast.success("Lecture added");
    } catch {
      toast.error("Failed to create lecture");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="shimmer h-40 rounded-2xl" />
        <div className="shimmer h-80 rounded-2xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="glass-card p-10 text-center">
        <h2 className="text-xl text-white mb-3">Course not found</h2>
        <Link href="/dashboard/courses" className="btn-accent px-4 py-2">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="glass-card p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-3xl font-bold text-white"
              >
                {course.title}
              </h1>
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                {course.courseCode}
              </span>
            </div>

            <p className="text-slate-400 mt-4 max-w-3xl">{course.description}</p>

            <div className="flex gap-6 mt-6 flex-wrap">
              <div>
                <p className="text-slate-500 text-xs">Students</p>
                <p className="text-white font-semibold">{students.length}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Materials</p>
                <p className="text-white font-semibold">{materials.length}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Lecturer</p>
                <p className="text-white font-semibold">
                  {course.lecturer?.name || "Assigned Lecturer"}
                </p>
              </div>
            </div>
          </div>

          {/* FIX 3: Removed duplicated Edit/Upload buttons that appeared unconditionally
              outside the lecturer role block. Also removed misplaced announcements/lectures
              tab content that was incorrectly nested inside this hero buttons <div>. */}
          <div className="flex gap-3 items-start flex-wrap">
            {user?.role === "student" && (
              <button
                onClick={handleEnrollment}
                className={`px-5 py-3 rounded-xl text-white font-medium ${
                  isEnrolled
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isEnrolled ? "Leave Course" : "Enroll Now"}
              </button>
            )}

            {user?.role === "lecturer" && (
              <>
                <button
                  onClick={() => setShowAnnouncementModal(true)}
                  className="btn-ghost px-4 py-3"
                >
                  + Announcement
                </button>
                <button
                  onClick={() => setShowLectureModal(true)}
                  className="btn-ghost px-4 py-3"
                >
                  + Lecture
                </button>
                <Link
                  href={`/dashboard/courses/${course._id}/edit`}
                  className="btn-ghost px-4 py-3"
                >
                  Edit Course
                </Link>
                <Link
                  href={`/dashboard/courses/${course._id}/materials/upload`}
                  className="btn-accent px-4 py-3"
                >
                  Upload Material
                </Link>
              </>
            )}
          </div>

        </div>
      </div>

      {/* TABS */}
      <div className="glass-card">
        <div className="flex border-b border-white/10 overflow-x-auto">
          {[  "overview","materials","assignments","announcements","lectures","students"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-slate-400"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="p-6">

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="glass-card p-5">
                <h3 className="text-white font-semibold mb-3">
                  Course Description
                </h3>
                <p className="text-slate-400">{course.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card p-5">
                  <p className="text-slate-500 text-sm">Students</p>
                  <p className="text-2xl font-bold text-white">
                    {students.length}
                  </p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-slate-500 text-sm">Materials</p>
                  <p className="text-2xl font-bold text-white">
                    {materials.length}
                  </p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-slate-500 text-sm">Course Code</p>
                  <p className="text-2xl font-bold text-white">
                    {course.courseCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-4">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="glass-card p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-white font-medium">{material.title}</h3>
                    <p className="text-slate-500 text-sm">
                      {material.updatedAt && formatDate(material.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={material.fileUrl}
                      download
                      className="btn-ghost px-4 py-2"
                    >
                      Download
                    </a>
                    {user?.role === "lecturer" && (
                      <button
                        onClick={() => handleDeleteMaterial(material._id)}
                        className="text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FIX 4: Moved announcements tab content from inside the hero <div>
              to its correct location inside the tab panel. */}
          {activeTab === "announcements" && (
            <div className="space-y-4">
              {announcements.map((announcement: any) => (
                <div key={announcement._id} className="glass-card p-5">
                  <h3 className="text-white font-semibold">
                    {announcement.title}
                  </h3>
                  <p className="text-slate-400 mt-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* FIX 4 (same): Moved lectures tab content from inside the hero <div>
              to its correct location inside the tab panel. */}
          {activeTab === "lectures" && (
            <div className="space-y-4">
              {lectures.map((lecture: any) => (
                <div key={lecture._id} className="glass-card p-5">
                  <h3 className="text-white font-semibold">{lecture.title}</h3>
                  <p className="text-slate-400 mt-2">{lecture.description}</p>
                  <a
                    href={lecture.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 mt-3 inline-block"
                  >
                    Join Lecture →
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "students" && (
            <div className="grid md:grid-cols-2 gap-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {student.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{student.name}</h3>
                    <p className="text-slate-500 text-sm">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

                {activeTab === "assignments" && (
  <div className="space-y-4">

    {user?.role === "lecturer" && (
      <div className="flex justify-end">
        <Link
          href={`/dashboard/courses/${course?._id}/assignments/create`}
          className="btn-accent px-4 py-2"
        >
          + Create Assignment
        </Link>
      </div>
    )}

    {assignments.length === 0 ? (
      <div className="glass-card p-6 text-center">
        <p className="text-slate-400">
          No assignments available
        </p>
      </div>
    ) : (
      assignments.map((assignment) => (
        <div
          key={assignment._id}
          className="glass-card p-5"
        >
          <div className="flex justify-between items-start gap-4">

            <div>
              <h3 className="text-white font-semibold text-lg">
                {assignment.title}
              </h3>

              <p className="text-slate-400 mt-2">
                {assignment.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">

            <span className="text-amber-400 text-sm">
              Due:{" "}
              {new Date(
                assignment.dueDate
              ).toLocaleDateString()}
            </span>

            {user?.role === "student" && (
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/assignments/${assignment._id}/submit`}
                  className="btn-accent px-3 py-2"
                >
                  Submit Assignment
                </Link>

                <Link
                  href={`/dashboard/assignments/${assignment._id}/result`}
                  className="btn-ghost px-3 py-2"
                >
                  View Result
                </Link>
              </div>
            )}

            {user?.role === "lecturer" && (
              <Link
                href={`/dashboard/assignments/${assignment._id}/submissions`}
                className="btn-ghost px-3 py-2"
              >
                View Submissions
              </Link>
            )}

          </div>


          </div>
        </div>
      ))
    )}

  </div>
)}

        </div>
      </div>

      {/* ANNOUNCEMENT MODAL */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md">
            <h2 className="text-white text-xl mb-4">New Announcement</h2>
            <input
              className="input-dark mb-3"
              placeholder="Title"
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
            />
            <textarea
              className="input-dark"
              placeholder="Content"
              value={announcementContent}
              onChange={(e) => setAnnouncementContent(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleCreateAnnouncement} className="btn-accent">
                Create
              </button>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LECTURE MODAL */}
      {showLectureModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md">
            <h2 className="text-white text-xl mb-4">New Lecture</h2>
            <input
              className="input-dark mb-3"
              placeholder="Title"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
            <textarea
              className="input-dark mb-3"
              placeholder="Description"
              value={lectureDescription}
              onChange={(e) => setLectureDescription(e.target.value)}
            />
            <input
              className="input-dark"
              placeholder="Meeting URL"
              value={lectureUrl}
              onChange={(e) => setLectureUrl(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleCreateLecture} className="btn-accent">
                Create
              </button>
              <button
                onClick={() => setShowLectureModal(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
