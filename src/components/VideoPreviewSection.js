import { initialVideoPreviews } from '../data/initialData.js';

export function renderVideoPreviewSection() {
  return `
    <section class="section" id="previews">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="play-circle" style="width: 14px; height: 14px;"></i>
            <span>SAMPLE LECTURES</span>
          </div>
          <h2 class="section-title">
            SEE WHAT <span class="highlight-blue">YOU'LL LEARN</span>
          </h2>
          <p class="section-subtitle">
            Explore sample lesson previews directly from our production curriculum. Free to watch before enrollment.
          </p>
        </div>

        <div class="video-preview-grid">
          ${initialVideoPreviews
            .map(
              (vid) => `
            <div class="video-preview-card btn-trigger-preview-modal" data-video-url="${vid.videoUrl}" data-video-title="${vid.title}" data-video-course="${vid.course}">
              <div class="video-thumb-wrap">
                <img src="${vid.thumb}" alt="${vid.title}" loading="lazy" />
                <div class="video-free-badge">FREE PREVIEW</div>
                <div class="video-play-btn">
                  <i data-lucide="play" style="width: 22px; height: 22px; fill: #FFFFFF;"></i>
                </div>
                <div class="video-duration-badge">
                  <i data-lucide="clock" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i>
                  <span>${vid.duration}</span>
                </div>
              </div>

              <div class="video-preview-info">
                <div class="video-course-tag">${vid.course}</div>
                <h4 class="video-title">${vid.title}</h4>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- High Impact Final CTA Banner -->
        <div class="final-cta-banner" style="margin-top: 80px;">
          <div class="final-cta-glow"></div>
          <div class="final-cta-content text-center">
            <div class="section-badge badge-glow" style="display: inline-flex; margin-bottom: 16px;">
              <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
              <span>START YOUR JOURNEY TODAY</span>
            </div>
            <h2 class="final-cta-title">
              READY TO BUILD YOUR FUTURE?
            </h2>
            <p class="final-cta-desc">
              Learn today's technology. Build real-world skills. Create tomorrow's opportunities.
            </p>
            <div class="final-cta-buttons">
              <a href="#/courses" class="btn btn-primary btn-lg">
                <span>Explore Courses</span>
                <i data-lucide="arrow-right"></i>
              </a>
              <a href="#/courses" class="btn btn-outline-white btn-lg">
                <span>Start Learning</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
