export function renderWhyLearnSection() {
  const benefits = [
    {
      title: 'Learn from Structured Courses',
      desc: 'Carefully scaffolded curricula from fundamental syntax to high-throughput production ML systems.'
    },
    {
      title: 'Build Practical Projects',
      desc: 'Write real code using actual company datasets rather than toy, clean classroom problems.'
    },
    {
      title: 'Attend Live Sessions',
      desc: 'Interactive weekend workshops every Saturday and Sunday for live code debugging and industry Q&A.'
    },
    {
      title: 'Work on Domain-Based Projects',
      desc: 'Choose from FinTech, Healthcare, Autonomous Vehicles, Quantitative Finance, and NLP domains.'
    },
    {
      title: 'Track Your Progress',
      desc: 'Intuitive student portal with module checklists, personal notes auto-save, and assignment tracking.'
    },
    {
      title: 'Earn Verified Certificates',
      desc: 'Showcase your credentials with tamper-proof certificate IDs verifiable directly on our portal.'
    }
  ];

  return `
    <section class="section" id="why-us">
      <div class="container">
        <div class="why-learn-grid">
          <!-- Left Visual & Metric Block -->
          <div class="why-learn-visual">
            <span class="badge" style="background: rgba(255,255,255,0.2); color: #FFFFFF; margin-bottom: 16px;">
              PROVEN PEDAGOGY
            </span>
            <h3>Engineering-First Technical Education</h3>
            <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.6;">
              Most platforms teach syntax that gets forgotten within weeks. ApexLearn builds engineering muscle through continuous hands-on implementation, weekend live mentorship, and enterprise-grade portfolio projects.
            </p>

            <div class="why-learn-stat-grid">
              <div class="why-stat-box">
                <div class="why-stat-num">94%</div>
                <div class="why-stat-label">Course Completion Rate</div>
              </div>
              <div class="why-stat-box">
                <div class="why-stat-num">10+</div>
                <div class="why-stat-label">Domain Projects</div>
              </div>
              <div class="why-stat-box">
                <div class="why-stat-num">4.9★</div>
                <div class="why-stat-label">Average Student Rating</div>
              </div>
              <div class="why-stat-box">
                <div class="why-stat-num">24/7</div>
                <div class="why-stat-label">Doubt Resolution</div>
              </div>
            </div>
          </div>

          <!-- Right Content & Benefits -->
          <div>
            <div class="section-badge teal">WHY LEARN WITH US</div>
            <h2 style="margin-bottom: 16px;">Learning That Goes Beyond Watching Videos</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 24px; font-size: 1.05rem;">
              We eliminate passive video consumption with an active engineering loop designed to transform knowledge into instinct.
            </p>

            <div class="benefits-list">
              ${benefits
                .map(
                  (b) => `
                <div class="benefit-item">
                  <div class="benefit-icon-check">
                    <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                  </div>
                  <div class="benefit-text">
                    <h4>${b.title}</h4>
                    <p>${b.desc}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <a href="#courses" class="btn btn-primary btn-lg">
              <span>Start Your Learning Journey</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
