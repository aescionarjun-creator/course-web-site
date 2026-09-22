import { stateStore } from '../store/state.js';

export function renderLiveWeekendSessions() {
  const sessions = stateStore.getLiveSessions();

  return `
    <section class="section section-alt" id="live">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="video" style="width: 14px; height: 14px;"></i>
            <span>WEEKEND COHORTS</span>
          </div>
          <h2 class="section-title">
            LEARN LIVE. <span class="highlight-blue">BUILD TOGETHER.</span>
          </h2>
          <p class="section-subtitle">
            Interactive live mentoring sessions every Saturday & Sunday. Connect directly with senior industry practitioners, debug complex code in real time, and collaborate with peers.
          </p>
        </div>

        <div class="live-sessions-timeline">
          ${sessions
            .map(
              (session) => `
            <div class="live-card">
              <div class="live-card-top">
                <span class="live-day-badge">${session.day}</span>
                ${
                  session.isLiveNow
                    ? `<span class="badge badge-live">● LIVE NOW</span>`
                    : `<span class="live-badge-upcoming"><i data-lucide="calendar" style="width: 12px; height: 12px;"></i> Upcoming Cohort</span>`
                }
              </div>

              <div class="live-time-row">
                <i data-lucide="clock" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <strong>${session.date} • ${session.time}</strong>
              </div>

              <h3 class="live-card-title">${session.title}</h3>
              <p class="live-card-desc">${session.description}</p>

              <div class="live-course-ref">
                <i data-lucide="book-marked" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                <span>Course: ${session.courseName}</span>
              </div>

              <div class="live-instructor-row">
                <div class="instructor-info">
                  <img src="${session.instructorAvatar}" alt="${session.instructor}" class="instructor-avatar" />
                  <div>
                    <div class="instructor-name">${session.instructor}</div>
                    <div class="instructor-role">${session.instructorRole}</div>
                  </div>
                </div>

                <button class="btn ${session.isLiveNow ? 'btn-teal' : 'btn-primary'} btn-sm btn-join-live-session" data-session-id="${session.id}" data-meet-url="${session.meetUrl}">
                  <i data-lucide="video" style="width: 16px; height: 16px;"></i>
                  <span>${session.isLiveNow ? 'Join Class Now' : 'Register Session'}</span>
                </button>
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
