export function renderAdminAuth() {
  return `
    <div class="admin-auth-container">
      <div class="admin-login-box">
        <!-- Back Link -->
        <div style="margin-bottom: 20px;">
          <a href="#/login" class="auth-back-link" style="color: #94A3B8; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 500; transition: color 0.2s;" onmouseover="this.style.color='#FFFFFF'" onmouseout="this.style.color='#94A3B8'">
            <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
            <span>Back to Portal Selection</span>
          </a>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <div class="admin-security-tag">
            <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i>
            <span>RESTRICTED ACCESS • ADMIN TERMINAL</span>
          </div>

          <div class="auth-portal-header" style="margin-top: 12px; margin-bottom: 16px;">
            <div style="font-family: var(--font-family-heading); font-weight: 800; font-size: 1.1rem; color: #38BDF8; letter-spacing: 0.05em; text-transform: uppercase;">
              APEXLEARN
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: #FFFFFF; margin-top: 4px; margin-bottom: 4px;">
              ADMIN PORTAL
            </h2>
            <p style="font-size: 0.875rem; color: #94A3B8;">
              Manage courses, students, projects, live sessions, certificates and platform settings.
            </p>
          </div>
        </div>

        <!-- Quick Demo Director Sign-In -->
        <div style="background: rgba(220, 38, 38, 0.1); border: 1px dashed rgba(220, 38, 38, 0.4); border-radius: var(--radius-md); padding: 14px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <strong style="color: #F87171; font-size: 0.85rem;">Evaluation Bypass</strong>
            <div style="font-size: 0.75rem; color: #94A3B8;">Sign in as Platform Director (Dr. Vikram Sen)</div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-demo-admin-login" style="background: #DC2626; border-color: #DC2626;">
            <span>Authorize Director</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>

        <form id="admin-auth-form" onsubmit="event.preventDefault();">
          <div class="form-field-group">
            <label class="form-label" style="color: #E2E8F0;">Admin Email / Username</label>
            <input type="email" id="admin-input-email" class="form-input admin-input" value="director@apexlearn.edu" placeholder="director@apexlearn.edu" required />
          </div>

          <div class="form-field-group">
            <div class="form-label-row">
              <label class="form-label" style="color: #E2E8F0;">Password</label>
              <a href="#/admin/login" onclick="alert('Admin password reset instructions have been sent to director email.'); return false;" style="font-size: 0.8rem; color: #38BDF8; font-weight: 600; text-decoration: none;">Forgot Password?</a>
            </div>
            <input type="password" id="admin-input-password" class="form-input admin-input" value="adminSecret2026" placeholder="••••••••••••" required />
          </div>

          <button type="submit" class="btn btn-primary btn-lg" id="btn-submit-admin-auth" style="width: 100%; margin-top: 14px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); border: none; font-weight: 700; letter-spacing: 0.03em;">
            <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
            <span>LOGIN AS ADMIN</span>
          </button>
        </form>

        <div style="margin-top: 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; display: flex; justify-content: space-between; font-size: 0.8rem; color: #94A3B8;">
          <a href="#/login" style="color: #94A3B8; display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
            <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i>
            <span>Back to Portal Selection</span>
          </a>
          <a href="#/" style="color: #94A3B8; text-decoration: none;">Public Website</a>
        </div>
      </div>
    </div>
  `;
}
