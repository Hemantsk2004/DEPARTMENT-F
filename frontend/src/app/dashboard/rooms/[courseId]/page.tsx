"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { socket } from "@/lib/socket";
import { studyRoomService } from "@/services/studyRoom.service";
import { useAuth } from "@/context/AuthContext";

export default function StudyRoomPage() {
  const params = useParams();

  const courseId = params.courseId as string;

  const { user } = useAuth();

  const [messages, setMessages] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const bottomRef =
    useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.emit(
      "join-room",
      courseId
    );

    const fetchMessages =
      async () => {
        try {
          const res =
            await studyRoomService.getMessages(
              courseId
            );

          setMessages(
            res.data || []
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchMessages();

    socket.on(
      "receive-message",
      (newMessage) => {
        setMessages(
          (prev) => [
            ...prev,
            newMessage,
          ]
        );
      }
    );

    return () => {
      socket.off(
        "receive-message"
      );
    };
  }, [courseId]);

  const sendMessage = () => {
    if (!message.trim())
      return;

    socket.emit(
      "send-message",
      {
        courseId,

        senderId:
          user?._id,

        senderName:
          user?.name,

        message,
      }
    );

    setMessage("");
  };

  return (
    <div className="h-[80vh] flex flex-col">
      {/* Header */}
        <div className=" rounded-3xl border border-white/10 p-6 flex justify-between items-center mb-4"
    style={{
        background:
        "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(15,23,42,0.95))",
    }}
    >
    <div>
        <h1 className="text-3xl font-bold text-white">
        Study Room
        </h1>

        <p className="text-slate-400 mt-1">
        Real-time course discussion
        </p>
    </div>

    <span
        className=" px-3 py-1 rounded-full text-sm bg-emerald-500/10 text-emerald-400 font-medium">
        LIVE
    </span>
    </div>

      {/* Messages */}
      <div
        className=" flex-1 overflow-y-auto rounded-3xl p-6 space-y-4 border border-white/10"
        style={{
            background:"#0f172a",
            border:"1px solid rgba(255,255,255,0.06)",
            boxShadow:"0 0 30px rgba(59,130,246,0.08)",
        }}
      >
        {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">

            <div className="text-6xl mb-4">
                💬
            </div>

            <h3 className="text-white text-xl font-semibold">
                No Messages Yet
            </h3>

            <p className="text-slate-500 mt-2">
                Start the discussion with your classmates.
            </p>

            </div>
        </div>

        ) : (
          messages.map(
            (
              msg,
              index
            ) => {
              const isMine =
                msg.senderId ===
                user?._id;

              return (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                    <div
                    className={`
                        max-w-[70%]
                        px-4
                        py-3
                        rounded-2xl
                        shadow-lg
                        transition-all
                        ${
                        isMine
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-white"
                        }
                    `}
                    >
                    <p
                    className={`
                        text-xs
                        mb-1
                        ${
                        isMine
                            ? "text-blue-100"
                            : "text-slate-300"
                        }
                    `}
                    >
                      {
                        msg.senderName
                      }
                    </p>

                    <p className="text-white break-words">
                      {
                        msg.message
                      }
                    </p>

                    <p className="text-[10px] text-slate-300 mt-1">
                      {msg.createdAt
                        ? new Date(
                            msg.createdAt
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit",
                            }
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3 mt-4">
        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              sendMessage();
            }
          }}
          placeholder="Type message..."
            className=" flex-1 bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"/>

        <button
          onClick={
            sendMessage
          }
          disabled={
            !message.trim()
          }
            className={`px-8 rounded-2xl font-medium transition-all duration-300 ${
            !message.trim()
              ? "opacity-50 cursor-not-allowed bg-slate-700 text-slate-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}