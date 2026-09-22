export function renderHowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Course',
      desc: 'Select from Python, Data Science, Machine Learning, AI, or Quantitative Trading tracks.'
    },
    {
      num: '02',
      title: 'Enroll & Start Learning',
      desc: 'Instant access to structured video lessons, downloadable notebooks, and weekend cohorts.'
    },
    {
      num: '03',
      title: 'Build Practical Projects',
      desc: 'Complete 10+ domain-specific portfolio projects with code review and live debugging.'
    },
    {
      num: '04',
      title: 'Earn Your Certificate',
      desc: 'Graduate with an industry-recognized, tamper-proof credential verified on-chain.'
    }
  ];

  return `
    <section class="section section-alt" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">ROADMAP</div>
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">
            A clear four-step pathway designed to take you from initial enrollment to verified graduation.
          </p>
        </div>

        <div class="how-it-works-grid">
          ${steps
            .map(
              (step) => `
            <div class="step-card">
              <div class="step-num-circle">${step.num}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-desc">${step.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
