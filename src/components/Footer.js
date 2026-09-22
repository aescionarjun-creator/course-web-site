export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Bio -->
          <div class="footer-brand">
            <a href="#/" class="brand-logo footer-logo">
              <div class="brand-icon">
                <i data-lucide="graduation-cap"></i>
              </div>
              <div>
                ApexLearn
                <span class="brand-name-sub">INSTITUTE OF TECH & AI</span>
              </div>
            </a>
            <p class="footer-desc">
              A premier technical education platform empowering aspiring data scientists, AI engineers, and software developers through hands-on domain projects, live weekend cohorts, and verified certifications.
            </p>
            <div class="footer-cert-badge">
              <i data-lucide="shield-check" style="width: 16px; height: 16px; color: var(--color-success);"></i>
              <span>ISO 9001:2015 Certified Educational Provider</span>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/courses" class="footer-link">Courses Catalog</a></li>
              <li><a href="#/projects" class="footer-link">Domain Projects</a></li>
              <li><a href="#/live-sessions" class="footer-link">Live Weekend Cohorts</a></li>
              <li><a href="#/about" class="footer-link">About ApexLearn</a></li>
              <li><a href="#/certificates" class="footer-link">Certificates & Verification</a></li>
            </ul>
          </div>

          <!-- Col 3: Learning Paths -->
          <div>
            <h4 class="footer-heading">Technology Paths</h4>
            <ul class="footer-links">
              <li><a href="#/courses" class="footer-link">Python for Data Science</a></li>
              <li><a href="#/courses" class="footer-link">Artificial Intelligence & LLMs</a></li>
              <li><a href="#/courses" class="footer-link">Applied Machine Learning</a></li>
              <li><a href="#/courses" class="footer-link">Web & Full-Stack Development</a></li>
              <li><a href="#/courses" class="footer-link">Cloud & MLOps Infrastructure</a></li>
              <li><a href="#/courses" class="footer-link">Algorithmic Quant Trading</a></li>
            </ul>
          </div>

          <!-- Col 4: Support & Security -->
          <div>
            <h4 class="footer-heading">Support & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/contact" class="footer-link" id="footer-contact-link">Help Center & Mentorship</a></li>
              <li><a href="#/student/login" class="footer-link">Student Portal Access</a></li>
              <li><a href="#/admin/login" class="footer-link">Platform Administration</a></li>
              <li><a href="#/privacy" class="footer-link" id="footer-privacy-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link" id="footer-terms-link">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="footer-bottom">
          <div class="footer-copyright">
            © 2026 ApexLearn Technologies Pvt. Ltd. All Rights Reserved. Engineered for Technical Excellence.
          </div>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-icon-btn" aria-label="GitHub">
              <i data-lucide="github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" class="social-icon-btn" aria-label="LinkedIn">
              <i data-lucide="linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon-btn" aria-label="Twitter">
              <i data-lucide="twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-icon-btn" aria-label="YouTube">
              <i data-lucide="youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
