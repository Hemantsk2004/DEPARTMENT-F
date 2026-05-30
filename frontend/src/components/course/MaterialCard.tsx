interface Props {
  title: string;
  fileUrl: string;
}

export default function MaterialCard({
  title,
  fileUrl,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h3 className="font-semibold text-white">
        📄 {title}
      </h3>

      <a
        href={fileUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white"
      >
        Open Material
      </a>
    </div>
  );
}