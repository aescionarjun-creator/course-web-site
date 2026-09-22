import { stateStore } from '../store/state.js';
import { showToast } from '../utils/toast.js';

export function renderAuthModal() {
  return `
    <div class="modal-overlay" id="auth-modal-overlay">
      <div class="modal-dialog" style="max-width: 440px;" role="dialog" aria-label="Account Login">
        <button class="modal-close-btn" id="btn-close-auth-modal" aria-label="Close modal">
          <i data-lucide="x"></i>
        </button>

        <div style="padding: 32px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div class="brand-icon" style="margin: 0 auto 12px auto; width: 44px; height: 44px;">
              <i data-lucide="graduation-cap"></i>
            </div>
            <h3 style="font-size: 1.4rem; color: var(--color-primary);">ApexLearn Portal</h3>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Log into your student or admin workspace</p>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" id="auth-quick-student" style="flex: 1;">
              <i data-lucide="user"></i>
              <span>Rahul (Student)</span>
            </button>
            <button class="btn btn-primary btn-sm" id="auth-quick-admin" style="flex: 1;">
              <i data-lucide="shield-check"></i>
              <span>Director (Admin)</span>
            </button>
          </div>

          <form id="auth-form" onsubmit="event.preventDefault();">
            <div style="margin-bottom: 14px;">
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 4px;">Email Address</label>
              <input type="email" id="auth-input-email" class="form-input" value="rahul.sharma@example.com" placeholder="name@domain.com" required />
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 4px;">Password</label>
              <input type="password" id="auth-input-password" class="form-input" value="••••••••••••" placeholder="Password" required />
            </div>

            <button type="submit" id="btn-submit-auth-login" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 12px;">
              Sign In to Account
            </button>

            <div style="text-align: center; font-size: 0.8rem; color: var(--color-text-secondary);">
              Need an account? <a href="#courses" id="link-switch-signup" style="color: var(--color-secondary); font-weight: 600;">Enroll in a course to auto-register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}
