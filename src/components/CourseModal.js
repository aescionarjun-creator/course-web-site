import { stateStore } from '../store/state.js';

export function renderCourseModal(courseId) {
  const course = stateStore.getCourseById(courseId);
  if (!course) return '';

  return `
    <div class="modal-overlay" id="course-modal-overlay">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-course-title">
        <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
          <i data-lucide="x"></i>
        </button>

        <!-- Modal Hero Header -->
        <div class="modal-hero">
          <span class="badge badge-popular" style="margin-bottom: 12px; background: rgba(255,255,255,0.15); color: #FFFFFF; border: none;">
            ${course.category} • ${course.badge}
          </span>
          <h2 id="modal-course-title">${course.title}</h2>
          <p style="color: #E2E8F0; font-size: 1.05rem; margin-bottom: 20px; max-width: 750px;">
            ${course.fullDescription}
          </p>

          <div class="modal-hero-meta">
            <div style="display: flex; align-items: center; gap: 6px; color: #FCD34D; font-weight: 700;">
              <span>★</span>
              <span style="color: #FFFFFF;">${course.rating} (${course.reviewsCount.toLocaleString()} ratings)</span>
            </div>
            <div>•</div>
            <div>${course.studentsEnrolled.toLocaleString()} Students Enrolled</div>
            <div>•</div>
            <div>Level: ${course.level}</div>
            <div>•</div>
            <div>Total Duration: ${course.duration}</div>
          </div>
        </div>

        <!-- Modal Body Grid -->
        <div class="modal-content-grid">
          <!-- Left Main Column -->
          <div>
            <!-- What you will learn -->
            <div class="dashboard-card" style="margin-bottom: 24px;">
              <h3 style="margin-bottom: 16px; font-size: 1.2rem;">What You Will Learn</h3>
              <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                ${course.whatYouWillLearn
                  .map(
                    (item) => `
                  <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem;">
                    <i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--color-success); flex-shrink: 0; margin-top: 2px;"></i>
                    <span>${item}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>

            <!-- Curriculum Accordion -->
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <h3 style="font-size: 1.2rem;">Course Curriculum</h3>
                <span style="font-size: 0.85rem; color: var(--color-text-secondary);">${course.modules.length} Modules • ${course.lessonsCount} Lessons</span>
              </div>

              <div class="curriculum-accordion">
                ${course.modules
                  .map(
                    (module, idx) => `
                  <div class="accordion-item">
                    <button class="accordion-header" data-accordion-index="${idx}">
                      <span>${module.title}</span>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 0.75rem; color: var(--color-text-secondary);">${module.lessons.length} lessons</span>
                        <i data-lucide="chevron-down" class="accordion-icon" style="transition: transform 0.2s;"></i>
                      </div>
                    </button>
                    <div class="accordion-content ${idx === 0 ? 'open' : ''}">
                      ${module.lessons
                        .map(
                          (lesson) => `
                        <div class="lesson-row">
                          <div class="lesson-left">
                            <i data-lucide="${lesson.isPreview ? 'play-circle' : 'lock'}" style="width: 16px; height: 16px; color: ${lesson.isPreview ? 'var(--color-secondary)' : '#94A3B8'};"></i>
                            <span style="font-weight: 500; color: var(--color-text);">${lesson.title}</span>
                          </div>
                          <div style="display: flex; align-items: center; gap: 10px;">
                            ${lesson.isPreview ? `<span class="preview-pill btn-open-preview" data-preview-url="${lesson.videoUrl}" data-preview-title="${lesson.title}">Preview Free</span>` : ''}
                            <span style="font-size: 0.75rem; color: #94A3B8;">${lesson.duration}</span>
                          </div>
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>

            <!-- Course Requirements -->
            <div class="dashboard-card">
              <h4 style="margin-bottom: 12px; font-size: 1.05rem;">Prerequisites & Requirements</h4>
              <ul style="padding-left: 20px; font-size: 0.875rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 6px;">
                ${course.requirements.map((req) => `<li>${req}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Right Sticky Purchase Card -->
          <div>
            <div class="modal-purchase-card">
              <div style="font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: 6px;">Total Investment</div>
              <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px;">
                <span class="purchase-card-price">₹${course.price.toLocaleString('en-IN')}</span>
                <span style="text-decoration: line-through; color: #94A3B8; font-size: 1.1rem;">₹${course.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div style="display: inline-block; font-size: 0.8rem; background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: 700; margin-bottom: 20px;">
                Special ${course.discountPercent}% Discount Applied
              </div>

              <button class="btn btn-primary btn-lg btn-enroll-now-modal" data-course-id="${course.id}" style="width: 100%; margin-bottom: 12px;">
                <i data-lucide="shield-check"></i>
                <span>Enroll in Course</span>
              </button>

              <div style="text-align: center; font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 20px;">
                🔒 256-Bit SSL Encrypted Razorpay Checkout
              </div>

              <div style="border-top: 1px solid var(--color-border); padding-top: 16px;">
                <h5 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 12px;">This Course Includes:</h5>
                <ul class="purchase-features-list">
                  <li class="purchase-feature-item">
                    <i data-lucide="video" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                    <span>${course.duration} on-demand video lessons</span>
                  </li>
                  <li class="purchase-feature-item">
                    <i data-lucide="calendar" style="width: 16px; height: 16px; color: var(--color-accent);"></i>
                    <span>Live Saturday & Sunday mentoring sessions</span>
                  </li>
                  <li class="purchase-feature-item">
                    <i data-lucide="file-code-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                    <span>Downloadable Jupyter notebooks & datasets</span>
                  </li>
                  <li class="purchase-feature-item">
                    <i data-lucide="folder-git-2" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                    <span>Domain-based portfolio projects</span>
                  </li>
                  <li class="purchase-feature-item">
                    <i data-lucide="award" style="width: 16px; height: 16px; color: #D97706;"></i>
                    <span>Official verifiable Certificate of Completion</span>
                  </li>
                  <li class="purchase-feature-item">
                    <i data-lucide="infinity" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                    <span>Lifetime course access & future updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
