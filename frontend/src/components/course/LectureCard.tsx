interface Props {
  title: string;
  description: string;
  url: string;
}

export default function LectureCard({
  title,
  description,
  url,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h3 className="font-semibold text-lg text-white">
        🎥 {title}
      </h3>

      <p className="text-slate-300 mt-2">
        {description}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
      >
        Join Lecture
      </a>
    </div>
  );
}