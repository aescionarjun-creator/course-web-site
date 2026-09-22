export function renderCertificateShowcase() {
  return `
    <section class="section" id="certificate">
      <div class="container">
        <div class="certificate-showcase-grid">
          <!-- Left: Certificate Mockup -->
          <div class="certificate-mockup">
            <div class="certificate-inner-border">
              <div class="cert-logo">ApexLearn Institute</div>
              <div class="cert-header">Certificate of Specialization & Excellence</div>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 8px;">This is to proudly certify that</p>
              
              <div class="cert-name">Rahul Sharma</div>
              
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 4px;">has successfully fulfilled all curriculum requirements for</p>
              <div class="cert-course">Python for Data Science Specialization</div>

              <div class="cert-seal">
                <i data-lucide="award" style="width: 24px; height: 24px; color: var(--color-gold);"></i>
              </div>

              <div class="cert-meta-row">
                <div>
                  <div style="font-weight: 700; color: #0F172A;">Dr. Vikram Sen</div>
                  <div style="font-size: 0.7rem; color: #64748B;">Lead AI Scientist</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-family: monospace; font-weight: 700; color: var(--color-secondary);">ID: CERT-PYDS-2026-9042</div>
                  <div style="font-size: 0.7rem; color: var(--color-success); font-weight: 600;">✓ Digitally Signed & Verified</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 700; color: #0F172A;">March 10, 2026</div>
                  <div style="font-size: 0.7rem; color: #64748B;">Issued Date</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Details & Verification Tool -->
          <div>
            <div class="section-badge">
              <i data-lucide="award" style="width: 14px; height: 14px;"></i>
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <h2 class="section-title" style="margin-bottom: 16px;">
              SHOW WHAT YOU'VE <span class="highlight-blue">ACHIEVED</span>
            </h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 24px; font-size: 1.05rem;">
              Demonstrate your technical competence to tech recruiters and engineering managers with immutable, verifiable digital certificates.
            </p>

            <ul class="cert-features-list">
              <li>
                <i data-lucide="shield-check" class="feat-icon success"></i>
                <div>
                  <strong>Verified Certificate ID</strong>
                  <p>Each issued certificate contains a unique alphanumeric hash recognized globally.</p>
                </div>
              </li>
              <li>
                <i data-lucide="share-2" class="feat-icon primary"></i>
                <div>
                  <strong>LinkedIn & Resume One-Click Share</strong>
                  <p>Add directly to your LinkedIn licenses & certifications profile with one tap.</p>
                </div>
              </li>
              <li>
                <i data-lucide="download" class="feat-icon accent"></i>
                <div>
                  <strong>High-Resolution Vector Export</strong>
                  <p>Download print-ready PDF and high-definition PNG format whenever needed.</p>
                </div>
              </li>
            </ul>

            <!-- Instant ID Verification Box -->
            <div class="cert-verify-box">
              <input type="text" id="cert-search-input" placeholder="Enter Certificate ID (e.g. CERT-PYDS-2026-9042)" value="CERT-PYDS-2026-9042" />
              <button class="btn btn-primary btn-sm" id="btn-verify-cert-submit">
                <i data-lucide="search" style="width: 14px; height: 14px;"></i>
                <span>Verify ID</span>
              </button>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-text-tertiary); margin-top: 8px; display: block;">
              Tip: Click "Verify ID" to test real-time validation of the sample student certificate.
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}
