import { stateStore } from '../store/state.js';
import { showToast } from '../utils/toast.js';
import confetti from 'canvas-confetti';

export function renderRazorpayModal(courseId) {
  const course = stateStore.getCourseById(courseId);
  if (!course) return '';

  const student = stateStore.getCurrentStudent();

  return `
    <div class="razorpay-modal-overlay" id="razorpay-checkout-overlay">
      <div class="razorpay-frame">
        <!-- Razorpay Header -->
        <div class="razorpay-header">
          <div class="razorpay-brand">
            <i data-lucide="shield-check" style="color: #38BDF8;"></i>
            <span>ApexLearn Checkout</span>
          </div>
          <button id="btn-close-razorpay" style="color: #FFFFFF; font-size: 1.25rem; background: none; border: none; cursor: pointer;">
            ✕
          </button>
        </div>

        <!-- Amount & Course Bar -->
        <div class="razorpay-amount-bar">
          <div>
            <span>Order For: <strong>${course.title}</strong></span>
            <div style="font-size: 0.75rem; color: #93C5FD;">Order Ref: ord_${Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
          <strong>₹${course.price.toLocaleString('en-IN')}</strong>
        </div>

        <!-- Body / Payment Steps -->
        <div class="razorpay-body" id="razorpay-modal-step-body">
          <div style="font-size: 0.825rem; font-weight: 700; color: var(--color-text-secondary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
            Select Payment Method
          </div>

          <div class="payment-method-selector">
            <!-- Method 1: UPI -->
            <label class="payment-option selected" data-method="UPI">
              <input type="radio" name="payment_method" value="UPI" checked style="accent-color: var(--color-secondary);" />
              <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text);">UPI / QR Code</div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Google Pay, PhonePe, Paytm, BHIM</div>
              </div>
              <span style="font-size: 0.75rem; color: var(--color-accent); font-weight: 700;">INSTANT</span>
            </label>

            <!-- Method 2: Cards -->
            <label class="payment-option" data-method="Card">
              <input type="radio" name="payment_method" value="Card" style="accent-color: var(--color-secondary);" />
              <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text);">Credit / Debit Card</div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Visa, Mastercard, RuPay, Maestro</div>
              </div>
            </label>

            <!-- Method 3: Net Banking -->
            <label class="payment-option" data-method="NetBanking">
              <input type="radio" name="payment_method" value="NetBanking" style="accent-color: var(--color-secondary);" />
              <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text);">Net Banking</div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">HDFC, ICICI, SBI, Axis & 40+ Banks</div>
              </div>
            </label>
          </div>

          <!-- Student Contact Info -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 4px;">Student Name</label>
            <input type="text" id="razorpay-input-name" class="form-input" value="${student ? student.name : 'Rahul Sharma'}" />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 4px;">Email (For Instant Receipt & Access)</label>
            <input type="email" id="razorpay-input-email" class="form-input" value="${student ? student.email : 'rahul.sharma@example.com'}" />
          </div>

          <button id="btn-submit-razorpay-payment" class="btn btn-secondary btn-lg" style="width: 100%; border-radius: var(--radius-sm);" data-course-id="${course.id}" data-amount="${course.price}">
            <i data-lucide="lock" style="width: 16px; height: 16px;"></i>
            <span>Pay ₹${course.price.toLocaleString('en-IN')} via Razorpay</span>
          </button>
        </div>

        <!-- Razorpay Security Footer -->
        <div class="razorpay-footer">
          <i data-lucide="shield-check" style="width: 16px; height: 16px; color: #16A34A;"></i>
          <span>Secured by Razorpay • 256-Bit SSL Encryption • PCI-DSS Certified</span>
        </div>
      </div>
    </div>
  `;
}

export function handleRazorpayProcessing(courseId, amount, name, email, method = 'UPI') {
  const stepBody = document.getElementById('razorpay-modal-step-body');
  if (!stepBody) return;

  // Step 1: Processing
  stepBody.innerHTML = `
    <div style="text-align: center; padding: 40px 10px;">
      <div style="display: inline-block; width: 44px; height: 44px; border: 4px solid #E2E8F0; border-top-color: var(--color-secondary); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px;"></div>
      <h3 style="font-size: 1.15rem; color: var(--color-text); margin-bottom: 6px;">Contacting Payment Gateway...</h3>
      <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Creating secure cryptographic payment handshake...</p>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  `;

  // Step 2: Server Signature Verification after 1s
  setTimeout(() => {
    stepBody.innerHTML = `
      <div style="text-align: center; padding: 40px 10px;">
        <div style="display: inline-block; width: 44px; height: 44px; border: 4px solid #CCFBF1; border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px;"></div>
        <h3 style="font-size: 1.15rem; color: var(--color-text); margin-bottom: 6px;">Verifying Server-Side Signature...</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Validating HMAC SHA256 checksum & updating student ledger...</p>
      </div>
    `;

    // Step 3: Success after another 1.2s
    setTimeout(() => {
      const tx = stateStore.processSuccessfulPayment({
        courseId,
        studentName: name,
        studentEmail: email,
        amount,
        method
      });

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      showToast(`Payment of ₹${amount.toLocaleString('en-IN')} confirmed! Enrolled in course.`, 'success');

      stepBody.innerHTML = `
        <div style="text-align: center; padding: 24px 10px;">
          <div style="width: 56px; height: 56px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 1.75rem;">
            ✓
          </div>
          <h3 style="font-size: 1.25rem; color: var(--color-text); margin-bottom: 6px;">Payment Successful!</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 18px;">
            Your course access has been activated. An official receipt has been dispatched to <strong>${email}</strong>.
          </p>

          <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 14px; text-align: left; font-size: 0.8rem; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: var(--color-text-secondary);">Payment ID:</span>
              <strong style="font-family: monospace;">${tx.paymentId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: var(--color-text-secondary);">Order ID:</span>
              <strong style="font-family: monospace;">${tx.orderId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-text-secondary);">Amount Paid:</span>
              <strong style="color: var(--color-primary);">₹${amount.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <button id="btn-goto-student-portal" class="btn btn-primary btn-lg" style="width: 100%;">
            <span>Go to Student Learning Portal</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      `;
    }, 1200);
  }, 1000);
}
