import { stateStore } from '../store/state.js';

export function renderStudentAuth(isSignup = false) {
  return `
    <div class="auth-page-container">
      <div class="student-auth-layout">
        <!-- Visual Brand Side (Left) -->
        <div class="auth-visual-side">
          <div>
            <a href="#/login" class="auth-brand-header">
              <div class="brand-icon" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);">
                <i data-lucide="graduation-cap"></i>
              </div>
              <div>
                ApexLearn
                <span class="brand-name-sub" style="color: #38BDF8;">STUDENT PORTAL</span>
              </div>
            </a>
          </div>

          <div class="auth-testimonial-box">
            <div style="display: flex; gap: 4px; color: #FCD34D; font-size: 1.1rem; margin-bottom: 12px;">
              ★★★★★
            </div>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #F8FAFC; margin-bottom: 16px; font-style: italic;">
              "The structured curriculum, live weekend cohorts with Dr. Vikram, and hands-on domain projects gave me the exact confidence I needed to land my role as Machine Learning Engineer."
            </p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid #38BDF8;" alt="Rahul Sharma" />
              <div>
                <strong style="color: #FFFFFF; font-size: 0.95rem;">Rahul Sharma</strong>
                <div style="font-size: 0.8rem; color: #94A3B8;">Student Scholar • Python for Data Science</div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94A3B8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
            <span>© 2026 ApexLearn Institute</span>
            <a href="#/privacy" style="color: #CBD5E1;">Privacy Policy</a>
          </div>
        </div>

        <!-- Form Side (Right) -->
        <div class="auth-form-side">
          <div class="auth-card-inner">
            
            <!-- Back to Portal Selection Link -->
            <div style="margin-bottom: 20px;">
              <a href="#/login" class="auth-back-link" style="color: var(--color-text-secondary); font-size: 0.875rem; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 600; transition: color 0.2s;">
                <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
                <span>Back to Portal Selection</span>
              </a>
            </div>

            <div class="auth-title-group">
              <div style="font-family: var(--font-family-heading); font-weight: 800; font-size: 0.85rem; color: var(--color-secondary); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px;">
                APEXLEARN
              </div>
              <h2 style="font-size: 1.85rem; font-weight: 800; color: var(--color-text); margin-bottom: 6px;">
                STUDENT PORTAL
              </h2>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
                ${
                  isSignup
                    ? 'Create your account to access courses, learning progress, projects, live sessions and certificates.'
                    : 'Access courses, learning progress, projects, live sessions and certificates.'
                }
              </p>
            </div>

            <!-- One-Click Demo Sign-In for Immediate Evaluation -->
            ${
              !isSignup
                ? `
              <div class="auth-quick-demo-banner">
                <div>
                  <div style="font-weight: 700; font-size: 0.85rem; color: var(--color-primary);">Quick Demo Evaluation</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-secondary);">One-click login as enrolled student Rahul Sharma</div>
                </div>
                <button class="btn btn-secondary btn-sm" id="btn-demo-student-login">
                  <span>Sign In as Rahul</span>
                  <i data-lucide="arrow-right"></i>
                </button>
              </div>
            `
                : ''
            }

            <form id="student-auth-form" onsubmit="event.preventDefault();">
              ${
                isSignup
                  ? `
                <div class="form-field-group">
                  <label class="form-label">Full Legal Name</label>
                  <input type="text" id="student-input-name" class="form-input" placeholder="e.g. Rahul Sharma" required />
                </div>
              `
                  : ''
              }

              <div class="form-field-group">
                <label class="form-label">Email / Username</label>
                <input type="email" id="student-input-email" class="form-input" placeholder="student@example.com" value="${!isSignup ? 'rahul.sharma@example.com' : ''}" required />
              </div>

              <div class="form-field-group">
                <div class="form-label-row">
                  <label class="form-label">Password</label>
                  ${!isSignup ? `<a href="#/student/login" onclick="alert('Password reset link sent to your registered email.'); return false;" id="link-forgot-pass" class="form-forgot-link">Forgot Password?</a>` : ''}
                </div>
                <input type="password" id="student-input-password" class="form-input" placeholder="••••••••••••" value="student123" required />
              </div>

              <button type="submit" class="btn btn-primary btn-lg" id="btn-submit-student-auth" style="width: 100%; margin-top: 10px;">
                <i data-lucide="graduation-cap" style="width: 18px; height: 18px;"></i>
                <span>${isSignup ? 'CREATE STUDENT ACCOUNT' : 'LOGIN AS STUDENT'}</span>
              </button>
            </form>

            <div style="margin-top: 24px; text-align: center; font-size: 0.875rem; color: var(--color-text-secondary);">
              ${
                isSignup
                  ? `Already have an account? <a href="#/student/login" style="color: var(--color-secondary); font-weight: 700; text-decoration: none;">LOGIN AS STUDENT</a>`
                  : `Don't have an account? <a href="#/student/signup" style="color: var(--color-secondary); font-weight: 700; text-decoration: none;">CREATE STUDENT ACCOUNT</a>`
              }
            </div>

            <div style="margin-top: 20px; text-align: center; border-top: 1px solid var(--color-border); padding-top: 16px;">
              <a href="#/login" style="font-size: 0.85rem; color: var(--color-text-tertiary); display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 500;">
                <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i>
                <span>Back to Portal Selection</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
