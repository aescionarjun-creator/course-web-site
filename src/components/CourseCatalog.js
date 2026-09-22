import { stateStore } from '../store/state.js';

export function renderCourseCatalog() {
  const courses = stateStore.getCourses();

  return `
    <section class="section section-alt" id="courses">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="book-marked" style="width: 14px; height: 14px;"></i>
            <span>FEATURED CURRICULUM</span>
          </div>
          <h2 class="section-title">
            LEARN <span class="highlight-blue">WHAT MATTERS</span>
          </h2>
          <p class="section-subtitle">
            Explore industry-crafted courses designed to help you build deep conceptual knowledge, complete portfolio projects, and earn verified tech credentials.
          </p>
        </div>

        <div class="course-grid">
          ${courses
            .map((course) => {
              const badgeClass = course.badge === 'BESTSELLER' ? 'badge-bestseller' : 'badge-popular';
              return `
            <div class="course-card" data-course-id="${course.id}">
              <div class="course-card-thumb">
                <img src="${course.thumbnail}" alt="${course.title}" loading="lazy" />
                <div class="course-card-badge">
                  <span class="badge ${badgeClass}">${course.badge}</span>
                </div>
                <div class="course-card-category">${course.category}</div>
              </div>

              <div class="course-card-body">
                <h3 class="course-card-title">${course.title}</h3>
                <p class="course-card-desc">${course.shortDescription}</p>

                <div class="course-rating-row">
                  <span class="star-icon">★</span>
                  <span class="rating-val">${course.rating}</span>
                  <span class="reviews-cnt">(${course.reviewsCount.toLocaleString()} reviews)</span>
                  <span class="students-cnt">${course.studentsEnrolled.toLocaleString()} enrolled</span>
                </div>

                <div class="course-card-meta">
                  <div class="meta-item">
                    <i data-lucide="bar-chart-2"></i>
                    <span>${course.level.split(' ')[0]}</span>
                  </div>
                  <div class="meta-item">
                    <i data-lucide="clock"></i>
                    <span>${course.duration}</span>
                  </div>
                  <div class="meta-item">
                    <i data-lucide="folder-git-2"></i>
                    <span>${course.projectsCount || 2} Projects</span>
                  </div>
                  <div class="meta-item cert-meta">
                    <i data-lucide="award"></i>
                    <span>Certificate</span>
                  </div>
                </div>

                <div class="course-card-footer">
                  <div class="course-price-wrap">
                    <div class="price-row">
                      <span class="course-price">₹${course.price.toLocaleString('en-IN')}</span>
                      <span class="course-original-price">₹${course.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span class="discount-pill">Save ${course.discountPercent}%</span>
                  </div>

                  <div class="card-cta-group">
                    <button class="btn btn-outline-blue btn-sm btn-view-course" data-course-id="${course.id}">
                      Details
                    </button>
                    <button class="btn btn-primary btn-sm btn-enroll-course" data-course-id="${course.id}">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
            })
            .join('')}
        </div>
      </div>
    </section>
  `;
}
