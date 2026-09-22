import { initialTestimonials } from '../data/initialData.js';

export function renderTestimonials() {
  return `
    <section class="section section-alt" id="testimonials">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="message-square" style="width: 14px; height: 14px;"></i>
            <span>STUDENT SUCCESS</span>
          </div>
          <h2 class="section-title">
            REAL STORIES FROM <span class="highlight-blue">OUR LEARNERS</span>
          </h2>
          <p class="section-subtitle">
            Hear directly from data scientists, machine learning engineers, and developers who advanced their engineering careers with ApexLearn.
          </p>
        </div>

        <div class="testimonials-grid">
          ${initialTestimonials
            .map(
              (item) => `
            <div class="testimonial-card">
              <div class="testimonial-quote-icon">
                <i data-lucide="quote" style="width: 24px; height: 24px; color: var(--color-secondary-light);"></i>
              </div>
              <div class="testimonial-stars">
                ${'★'.repeat(item.rating)}
              </div>
              <p class="testimonial-text">"${item.text}"</p>
              <div class="testimonial-student">
                <img src="${item.avatar}" alt="${item.name}" class="student-avatar" />
                <div>
                  <div class="student-name">${item.name}</div>
                  <div class="student-meta">${item.role}</div>
                  <div class="student-course-tag">
                    Alumnus: ${item.course}
                  </div>
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
