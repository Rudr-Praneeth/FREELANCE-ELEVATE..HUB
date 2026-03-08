export default function ContactSection() {
  return (
    <section className="bg-[var(--color-bg-contrast)] text-white min-h-screen flex items-center">
      <div className="container-premium grid lg:grid-cols-2 gap-16 items-center">

        <div className="max-w-xl">

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-14 bg-[var(--color-accent)]"></div>
            <span className="uppercase tracking-[0.35em] text-[var(--color-accent)] text-xs">
              Book A Strategy Call
            </span>
          </div>

          <h2 className="text-hero leading-[0.9] mb-6 text-white">
            Ready To Fill
            <br />
            Your Calendar?
          </h2>

          <p className="text-[var(--color-text-muted)] text-[var(--text-body-lg)] leading-relaxed mb-10">
            We review every application personally. If we believe we can move
            the needle for your practice, we'll reach out within 24 hours.
          </p>

          <div className="border border-[var(--color-accent)]/40 px-6 py-5 rounded-[var(--radius-md)] bg-[rgba(135,219,32,0.05)]">
            <span className="uppercase tracking-[0.35em] text-xs text-[var(--color-accent)]">
              ⚡ Limited To 4 New Partnerships Per Month
            </span>
          </div>

        </div>

        <form className="w-full space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] block mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full bg-transparent border border-[var(--color-border-subtle)] px-5 py-4 text-white placeholder:text-[var(--color-text-muted)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] block mb-2">
                Speciality
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full bg-transparent border border-[var(--color-border-subtle)] px-5 py-4 text-white placeholder:text-[var(--color-text-muted)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] block mb-2">
              Work Email
            </label>
            <input
              type="email"
              placeholder=""
              className="w-full bg-transparent border border-[var(--color-border-subtle)] px-5 py-4 text-white placeholder:text-[var(--color-text-muted)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] block mb-2">
              Desired Outcome
            </label>
            <textarea
              rows="5"
              placeholder="What does growth look like for your practice?"
              className="w-full bg-transparent border border-[var(--color-border-subtle)] px-5 py-4 text-white placeholder:text-[var(--color-text-muted)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-heading tracking-[0.2em] uppercase py-5 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-elevated)] transition-all flex items-center justify-center gap-3"
          >
            Claim Your Strategy Call →
          </button>

        </form>

      </div>
    </section>
  )
}