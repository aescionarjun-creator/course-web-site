export function renderHandsOnWorkflow() {
  const steps = [
    {
      num: '01',
      title: 'LEARN',
      icon: 'book-open',
      desc: 'Master industry-relevant technologies through structured courses.',
      highlight: 'Structured Video Modules & Architecture Blueprints'
    },
    {
      num: '02',
      title: 'BUILD',
      icon: 'code-2',
      desc: 'Apply your knowledge through practical real-world projects.',
      highlight: '10+ Production Repos & Real Datasets'
    },
    {
      num: '03',
      title: 'MASTER',
      icon: 'award',
      desc: 'Strengthen your skills through live sessions, practice and certification.',
      highlight: 'Weekend Cohorts & Blockchain Verifiable Credentials'
    }
  ];

  return `
    <section class="section section-alt" id="learning-journey">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="compass" style="width: 14px; height: 14px;"></i>
            <span>THE APEXLEARN METHODOLOGY</span>
          </div>
          <h2 class="section-title">
            LEARN <span class="accent-arrow">→</span> BUILD <span class="accent-arrow">→</span> <span class="highlight-blue">MASTER</span>
          </h2>
          <p class="section-subtitle">
            A battle-tested 3-stage engineering roadmap designed to bridge the gap between theoretical syntax and high-performance software execution.
          </p>
        </div>

        <div class="journey-grid">
          ${steps
            .map(
              (step) => `
            <div class="journey-card">
              <div class="journey-card-header">
                <span class="journey-step-num">${step.num}</span>
                <div class="journey-icon-box">
                  <i data-lucide="${step.icon}"></i>
                </div>
              </div>
              <h3 class="journey-title">${step.title}</h3>
              <p class="journey-desc">${step.desc}</p>
              <div class="journey-tag">
                <i data-lucide="check" style="width: 14px; height: 14px; color: var(--color-secondary);"></i>
                <span>${step.highlight}</span>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
