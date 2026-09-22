import { stateStore } from '../store/state.js';

export function renderCertVerifyModal(certId) {
  const cert = stateStore.findCertificate(certId);

  return `
    <div class="modal-overlay" id="cert-verify-modal-overlay">
      <div class="modal-dialog" style="max-width: 600px;" role="dialog" aria-label="Certificate Verification">
        <button class="modal-close-btn" id="btn-close-cert-modal" aria-label="Close modal">
          <i data-lucide="x"></i>
        </button>

        <div style="padding: 32px; text-align: center;">
          ${
            cert
              ? `
            <div style="width: 64px; height: 64px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 2rem;">
              ✓
            </div>
            <h3 style="font-size: 1.4rem; color: var(--color-primary); margin-bottom: 6px;">Verified Authentic Credential</h3>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 24px;">
              This certificate record exists in the immutable ApexLearn verification registry.
            </p>

            <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; text-align: left; font-size: 0.875rem; margin-bottom: 24px;">
              <div style="margin-bottom: 10px;">
                <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Recipient</div>
                <strong style="font-size: 1.1rem; color: var(--color-text);">${cert.studentName}</strong>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">Course Specialization</div>
                <strong style="color: var(--color-secondary);">${cert.courseTitle}</strong>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-top: 1px solid var(--color-border); padding-top: 10px;">
                <div>
                  <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Credential ID</div>
                  <strong style="font-family: monospace;">${cert.id}</strong>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Issued On</div>
                  <strong>${cert.issueDate}</strong>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" id="btn-print-sample-cert" style="width: 100%;">
              <i data-lucide="printer" style="width: 16px; height: 16px;"></i>
              <span>Print / Download Certificate</span>
            </button>
          `
              : `
            <div style="width: 64px; height: 64px; background: #FEE2E2; color: #DC2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 2rem;">
              ✕
            </div>
            <h3 style="font-size: 1.3rem; color: var(--color-error); margin-bottom: 6px;">Credential Not Found</h3>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 20px;">
              No record found matching the ID: <strong>"${certId}"</strong>. Please check the spelling or format.
            </p>
            <p style="font-size: 0.8rem; color: var(--color-text-tertiary); margin-bottom: 24px;">
              Try searching with sample valid ID: <code style="background: #E2E8F0; padding: 2px 6px; border-radius: 4px;">CERT-PYDS-2026-9042</code>
            </p>
            <button class="btn btn-outline" id="btn-close-cert-modal-fallback" style="width: 100%;">Close</button>
          `
          }
        </div>
      </div>
    </div>
  `;
}
