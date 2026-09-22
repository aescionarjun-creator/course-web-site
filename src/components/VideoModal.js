export function renderVideoModal(videoUrl, title, course) {
  return `
    <div class="modal-overlay" id="video-preview-modal-overlay">
      <div class="modal-dialog" style="max-width: 860px; background: #0F172A; color: #FFFFFF; padding: 0; overflow: hidden;" role="dialog" aria-label="Video Preview">
        <div style="padding: 16px 24px; background: #1E293B; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div>
            <span style="font-size: 0.75rem; color: #38BDF8; font-weight: 700; text-transform: uppercase;">${course || 'Course Preview'}</span>
            <h3 style="color: #FFFFFF; font-size: 1.1rem; margin-top: 2px;">${title}</h3>
          </div>
          <button class="modal-close-btn" id="btn-close-video-modal" style="position: static; background: rgba(255,255,255,0.1); color: #FFFFFF;">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div style="position: relative; background: #000000; width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
          <video id="modal-video-element" controls autoplay style="width: 100%; height: 100%; object-fit: contain;">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div style="padding: 20px 24px; background: #1E293B; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="font-size: 0.85rem; color: #94A3B8;">
            Enjoyed this free preview? Enroll in the full course to unlock all 40+ modules, live weekend cohorts, and downloadable Jupyter notebooks.
          </div>
          <a href="#courses" class="btn btn-secondary btn-sm" id="btn-video-modal-enroll">
            <span>Enroll in Full Course</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}
