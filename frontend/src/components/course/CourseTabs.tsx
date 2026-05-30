interface Props {
  activeTab: string;
  setActiveTab: (
    tab: string
  ) => void;
}

export default function CourseTabs({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = [
    "overview",
    "announcements",
    "materials",
    "lectures",
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() =>
            setActiveTab(tab)
          }
          className={`px-5 py-3 rounded-xl capitalize transition ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-slate-900 text-slate-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}