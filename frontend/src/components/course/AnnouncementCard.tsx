interface Props {
  title: string;
  message: string;
  createdAt?: string;
}

export default function AnnouncementCard({
  title,
  message,
  createdAt,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-white">
          📢 {title}
        </h3>

        {createdAt && (
          <span className="text-xs text-slate-400">
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </span>
        )}
      </div>

      <p className="text-slate-300 mt-3">
        {message}
      </p>
    </div>
  );
}