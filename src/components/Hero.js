export function renderHero() {
  return `
    <section class="hero-section" id="home">
      <!-- Full-bleed right-side hero image (positioned absolutely, extends to browser edge) -->
      <div class="hero-image-bleed" aria-hidden="true">
        <img
          src="/assets/hero_student_cropped.png"
          alt="Student learning Python, Data Science, and Machine Learning at ApexLearn"
          class="hero-bleed-img"
          id="hero-artwork-img"
          loading="eager"
        />
        <div class="hero-image-fade"></div>
      </div>

      <div class="container">
        <div class="hero-grid">
          <!-- Hero Content Left (Preserved Exactly) -->
          <div class="hero-content">
            <div class="hero-badge-pill">
              <i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--color-secondary);"></i>
              <span>LEARN • BUILD • GROW</span>
            </div>

            <h1 class="hero-title">
              BUILD SKILLS.<br />
              BUILD PROJECTS.<br />
              <span class="highlight-blue">BUILD YOUR FUTURE.</span>
            </h1>

            <p class="hero-description">
              Learn industry-relevant technologies through expert-led courses, practical domain-based projects, live weekend learning sessions and verified certifications designed for real-world engineering.
            </p>

            <div class="hero-cta-group">
              <a href="#/courses" class="btn btn-primary btn-lg" id="hero-btn-explore">
                <span>Explore Courses</span>
                <i data-lucide="arrow-right"></i>
              </a>
              <a href="#/courses" class="btn btn-outline-blue btn-lg" id="hero-btn-start">
                <span>Start Learning</span>
              </a>
            </div>

            <div class="hero-perks-row">
              <div class="hero-perk-item">
                <i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <span>Practical Learning</span>
              </div>
              <div class="hero-perk-item">
                <i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <span>Hands-on Projects</span>
              </div>
              <div class="hero-perk-item">
                <i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <span>Live Weekend Sessions</span>
              </div>
              <div class="hero-perk-item">
                <i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <span>Verified Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
