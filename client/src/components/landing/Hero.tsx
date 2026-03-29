export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 px-6 text-center">

      {/* Background premium subtle */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      <div className="max-w-4xl mx-auto">

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
          Make smarter decisions.
          <br />
          <span className="text-primary">
            Without scaling your team.
          </span>
        </h1>

        {/* SUBHEADLINE */}
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Sapiente AI helps you automate complex decisions, unlock insights, and move faster with confidence.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <button className="
            px-6 py-3 
            bg-primary text-white 
            rounded-xl 
            shadow-soft 
            hover:shadow-medium 
            hover:-translate-y-[1px]
            transition-all
          ">
            Get started
          </button>

          <button className="
            px-6 py-3 
            border border-gray-300 
            rounded-xl 
            hover:bg-gray-100 
            transition
          ">
            See how it works
          </button>

        </div>

        {/* TRUST LINE */}
        <p className="mt-6 text-sm text-gray-400">
          No complexity. Just smarter systems.
        </p>

      </div>
    </section>
  );
}