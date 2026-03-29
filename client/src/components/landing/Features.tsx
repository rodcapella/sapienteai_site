const features = [
  {
    title: "Smart Automation",
    desc: "Reduce manual work and let AI handle repetitive decisions."
  },
  {
    title: "Real-Time Insights",
    desc: "Understand your data instantly with intelligent analysis."
  },
  {
    title: "Scalable Intelligence",
    desc: "Grow your operations without growing your team."
  }
];

export default function Features() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl border bg-white shadow-soft">
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}