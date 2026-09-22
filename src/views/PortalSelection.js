export function renderPortalSelection() {
  return `
    <div class="portal-selection-wrapper">
      <!-- Background Ambient Elements -->
      <div class="portal-bg-gradient-top"></div>
      <div class="portal-bg-gradient-bottom"></div>

      <div class="portal-selection-container">
        <!-- Top Brand Header -->
        <header class="portal-brand-header">
          <a href="#/" class="portal-brand-logo">
            <div class="portal-logo-icon">
              <i data-lucide="graduation-cap"></i>
            </div>
            <div class="portal-logo-text">
              <span class="brand-title">ApexLearn</span>
              <span class="brand-subtitle">INSTITUTE OF TECH & AI</span>
            </div>
          </a>
        </header>

        <!-- Main Heading Area -->
        <div class="portal-hero-text">
          <span class="portal-badge">PORTAL SELECTION</span>
          <h1 class="portal-main-heading">WELCOME TO APEXLEARN</h1>
          <p class="portal-subheading">Choose your portal to continue</p>
        </div>

        <!-- 3 Portal Cards Grid -->
        <div class="portal-cards-grid">
          
          <!-- Card 1: PUBLIC WEBSITE -->
          <div class="portal-card portal-card-public">
            <div class="portal-card-header">
              <div class="portal-icon-wrapper public-icon">
                <i data-lucide="globe"></i>
              </div>
              <span class="portal-card-tag">Open Access</span>
            </div>

            <div class="portal-card-body">
              <h2 class="portal-card-title">PUBLIC WEBSITE</h2>
              <p class="portal-card-desc">
                Explore ApexLearn courses, projects, live sessions, certificates and other public information.
              </p>
            </div>

            <div class="portal-card-footer">
              <a href="#/" class="portal-card-btn btn-public">
                <span>CONTINUE TO PUBLIC WEBSITE</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Card 2: ADMIN PORTAL -->
          <div class="portal-card portal-card-admin">
            <div class="portal-card-header">
              <div class="portal-icon-wrapper admin-icon">
                <i data-lucide="shield-check"></i>
              </div>
              <span class="portal-card-tag admin-tag">Restricted Access</span>
            </div>

            <div class="portal-card-body">
              <h2 class="portal-card-title">ADMIN PORTAL</h2>
              <p class="portal-card-desc">
                Manage courses, students, projects, live sessions, certificates and platform settings.
              </p>
            </div>

            <div class="portal-card-footer">
              <a href="#/admin/login" class="portal-card-btn btn-admin">
                <span>CONTINUE TO ADMIN LOGIN</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Card 3: STUDENT PORTAL -->
          <div class="portal-card portal-card-student">
            <div class="portal-card-header">
              <div class="portal-icon-wrapper student-icon">
                <i data-lucide="graduation-cap"></i>
              </div>
              <span class="portal-card-tag student-tag">Student Access</span>
            </div>

            <div class="portal-card-body">
              <h2 class="portal-card-title">STUDENT PORTAL</h2>
              <p class="portal-card-desc">
                Access courses, learning progress, projects, live sessions and certificates.
              </p>
            </div>

            <div class="portal-card-footer">
              <a href="#/student/login" class="portal-card-btn btn-student">
                <span>CONTINUE TO STUDENT LOGIN</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

        </div>

        <!-- Footer Notice -->
        <footer class="portal-selection-footer">
          <p>© 2026 ApexLearn Institute of Tech & AI. All rights reserved.</p>
          <div class="portal-footer-links">
            <a href="#/privacy">Privacy Policy</a>
            <span class="dot-sep">•</span>
            <a href="#/terms">Terms of Service</a>
            <span class="dot-sep">•</span>
            <a href="#/contact">Help & Support</a>
          </div>
        </footer>
      </div>
    </div>
  `;
}
