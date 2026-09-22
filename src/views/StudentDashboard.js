import { stateStore } from '../store/state.js';

export function renderStudentDashboard(subPath = 'dashboard') {
  const student = stateStore.getCurrentStudent();
  const allCourses = stateStore.getCourses();
  const enrolledCourses = allCourses.filter((c) => student.enrolledCourses.includes(c.id));
  const projects = stateStore.getProjects();
  const liveSessions = stateStore.getLiveSessions();
  const userCerts = stateStore.certificates.filter((c) => c.studentId === student.id);
  const userTransactions = stateStore.transactions.filter(
    (t) => t.studentEmail === student.email || t.studentName === student.name
  );

  // Compute stats
  let totalLessonsCompleted = 0;
  let completedCoursesCount = 0;
  enrolledCourses.forEach((c) => {
    const prog = student.progress[c.id];
    if (prog) {
      totalLessonsCompleted += (prog.completedLessonIds || []).length;
      if (prog.percent === 100) completedCoursesCount++;
    }
  });

  return `
    <div class="dashboard-layout">
      <!-- Student Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-brand">
          <a href="#/" class="brand-logo" style="font-size: 1.15rem;">
            <div class="brand-icon" style="width: 32px; height: 32px;">
              <i data-lucide="graduation-cap"></i>
            </div>
            <span>ApexLearn</span>
          </a>
        </div>

        <div class="sidebar-user-card">
          <img src="${student.avatar}" alt="${student.name}" class="sidebar-user-avatar" />
          <div style="overflow: hidden;">
            <div class="sidebar-user-name">${student.name}</div>
            <div class="sidebar-user-role">Student Scholar</div>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="#/student/dashboard" class="sidebar-item-btn ${subPath === 'dashboard' ? 'active' : ''}">
              <i data-lucide="layout-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#/student/courses" class="sidebar-item-btn ${subPath === 'courses' ? 'active' : ''}">
              <i data-lucide="book-open"></i>
              <span>My Courses (${enrolledCourses.length})</span>
            </a>
          </li>
          <li>
            <a href="#/student/projects" class="sidebar-item-btn ${subPath === 'projects' ? 'active' : ''}">
              <i data-lucide="folder-git-2"></i>
              <span>Assigned Projects</span>
            </a>
          </li>
          <li>
            <a href="#/student/live-sessions" class="sidebar-item-btn ${subPath === 'live-sessions' ? 'active' : ''}">
              <i data-lucide="video"></i>
              <span>Live Weekend Sessions</span>
            </a>
          </li>
          <li>
            <a href="#/student/certificates" class="sidebar-item-btn ${subPath === 'certificates' ? 'active' : ''}">
              <i data-lucide="award"></i>
              <span>My Certificates (${userCerts.length})</span>
            </a>
          </li>
          <li>
            <a href="#/student/payments" class="sidebar-item-btn ${subPath === 'payments' ? 'active' : ''}">
              <i data-lucide="receipt"></i>
              <span>Payment History</span>
            </a>
          </li>
          <li>
            <a href="#/student/profile" class="sidebar-item-btn ${subPath === 'profile' ? 'active' : ''}">
              <i data-lucide="user-check"></i>
              <span>Student Profile</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <button id="btn-student-logout" class="btn btn-outline btn-sm" style="width: 100%; color: var(--color-error); border-color: rgba(220,38,38,0.2);">
            <i data-lucide="log-out"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <!-- Main Dashboard Canvas -->
      <main class="dashboard-main">
        <!-- Topbar -->
        <header class="dashboard-topbar">
          <div class="topbar-title">
            <h2>Welcome Back, ${student.name.split(' ')[0]}! 👋</h2>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Here is your active learning trajectory and upcoming weekend cohorts.</p>
          </div>

          <div class="topbar-actions">
            <a href="#/courses" class="btn btn-outline btn-sm">
              <i data-lucide="search"></i>
              <span>Explore More Courses</span>
            </a>
          </div>
        </header>

        <!-- Dashboard Content Body -->
        <div class="dashboard-content">
          ${renderTabContent(subPath, { student, enrolledCourses, allCourses, projects, liveSessions, userCerts, userTransactions, totalLessonsCompleted, completedCoursesCount })}
        </div>
      </main>
    </div>
  `;
}

function renderTabContent(tab, ctx) {
  const { student, enrolledCourses, projects, liveSessions, userCerts, userTransactions, totalLessonsCompleted, completedCoursesCount } = ctx;

  switch (tab) {
    case 'dashboard':
    default:
      return `
        <!-- Metrics Row -->
        <div class="stat-cards-grid">
          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-blue">
              <i data-lucide="book-open"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Courses Enrolled</span>
              <span class="stat-value">${enrolledCourses.length}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-teal">
              <i data-lucide="check-circle-2"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Courses Completed</span>
              <span class="stat-value">${completedCoursesCount}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-yellow">
              <i data-lucide="award"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Certificates Earned</span>
              <span class="stat-value">${userCerts.length}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-purple">
              <i data-lucide="flame"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Completed Lessons</span>
              <span class="stat-value">${totalLessonsCompleted}</span>
            </div>
          </div>
        </div>

        <!-- Enrolled Courses Section -->
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Continue Learning</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Pick up right where you left off in your active programs.</p>
            </div>
            <a href="#/courses" class="btn btn-outline btn-sm">Explore Courses</a>
          </div>

          ${
            enrolledCourses.length === 0
              ? `
            <div style="text-align: center; padding: 40px; color: var(--color-text-secondary);">
              <p style="margin-bottom: 16px;">You haven't enrolled in any courses yet.</p>
              <a href="#/courses" class="btn btn-primary">Browse Available Courses</a>
            </div>
          `
              : `
            <div class="enrolled-courses-grid">
              ${enrolledCourses
                .map((course) => {
                  const prog = student.progress[course.id] || { completedLessonIds: [], percent: 0 };
                  const totalLessons = course.lessonsCount || 40;
                  const completed = prog.completedLessonIds ? prog.completedLessonIds.length : 0;

                  return `
                <div class="enrolled-course-card">
                  <div class="enrolled-header">
                    <span class="badge ${prog.percent === 100 ? 'badge-bestseller' : 'badge-popular'}">
                      ${prog.percent === 100 ? 'Completed 🎉' : 'In Progress'}
                    </span>
                    <span style="font-size: 0.8rem; color: var(--color-text-secondary);">${course.duration}</span>
                  </div>

                  <h4 class="enrolled-title">${course.title}</h4>

                  <div class="enrolled-progress-bar">
                    <div class="enrolled-progress-fill" style="width: ${prog.percent}%;"></div>
                  </div>

                  <div class="enrolled-progress-meta">
                    <strong style="color: var(--color-accent);">${prog.percent}% Complete</strong>
                    <span>${completed} / ${totalLessons} Lessons</span>
                  </div>

                  <div style="margin-top: auto; display: flex; gap: 10px;">
                    <a href="#/student/courses/${course.id}" class="btn btn-primary btn-sm" style="flex: 1;">
                      <i data-lucide="play"></i>
                      <span>${prog.percent === 100 ? 'Review Player' : 'Continue Learning →'}</span>
                    </a>
                  </div>
                </div>
              `;
                })
                .join('')}
            </div>
          `
          }
        </div>

        <!-- Upcoming Weekend Live Sessions Banner -->
        <div class="dashboard-card" style="background: linear-gradient(135deg, #173B7A 0%, #1E40AF 100%); color: #FFFFFF;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="badge badge-live" style="background: rgba(14, 165, 164, 0.25); color: #38BDF8; margin-bottom: 8px;">
                ● LIVE THIS WEEKEND
              </span>
              <h3 style="color: #FFFFFF; font-size: 1.3rem; margin-bottom: 4px;">Live Saturday & Sunday Mentoring Sessions</h3>
              <p style="color: #CBD5E1; font-size: 0.9rem;">
                Saturday 10:00 AM: End-to-End Data Engineering Pipelines | Sunday 11:00 AM: PyTorch Neural Debugging
              </p>
            </div>
            <a href="#/student/live-sessions" class="btn btn-teal btn-sm">
              <i data-lucide="video"></i>
              <span>Join Active Cohort</span>
            </a>
          </div>
        </div>
      `;

    case 'courses':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>My Enrolled Programs</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Direct access to your video curriculum, interactive exercises, and resources.</p>
            </div>
          </div>

          <div class="enrolled-courses-grid">
            ${enrolledCourses
              .map((course) => {
                const prog = student.progress[course.id] || { completedLessonIds: [], percent: 0 };
                const totalLessons = course.lessonsCount || 40;
                const completed = prog.completedLessonIds ? prog.completedLessonIds.length : 0;

                return `
              <div class="enrolled-course-card">
                <div style="height: 140px; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 12px;">
                  <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <h4 class="enrolled-title">${course.title}</h4>
                <div class="enrolled-progress-bar">
                  <div class="enrolled-progress-fill" style="width: ${prog.percent}%;"></div>
                </div>
                <div class="enrolled-progress-meta">
                  <strong style="color: var(--color-accent);">${prog.percent}% Completed</strong>
                  <span>${completed} of ${totalLessons} Lessons Done</span>
                </div>
                <a href="#/student/courses/${course.id}" class="btn btn-primary btn-sm" style="margin-top: 10px;">
                  <span>Open Course LMS Player</span>
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            `;
              })
              .join('')}
          </div>
        </div>
      `;

    case 'projects':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Assigned Domain Projects</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Work on production-scale projects, push code to GitHub, and receive mentor reviews.</p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
            ${projects
              .map((proj) => {
                const statusBadge =
                  proj.status === 'completed'
                    ? '<span class="table-status-pill status-success">✓ Completed & Evaluated</span>'
                    : proj.status === 'in_progress'
                    ? '<span class="table-status-pill status-pending">⚡ In Progress</span>'
                    : '<span class="table-status-pill" style="background: #F1F5F9; color: #64748B;">Not Started</span>';

                return `
              <div style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                <div style="flex: 1; min-width: 280px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-secondary);">${proj.domain}</span>
                    <span class="project-difficulty difficulty-intermediate">${proj.difficulty}</span>
                  </div>
                  <h4 style="font-size: 1.1rem; color: var(--color-text); margin-bottom: 4px;">${proj.title}</h4>
                  <p style="font-size: 0.85rem; color: var(--color-text-secondary);">${proj.shortDesc}</p>
                </div>

                <div style="display: flex; align-items: center; gap: 12px;">
                  ${statusBadge}
                  <button class="btn btn-outline btn-sm btn-view-project" data-project-id="${proj.id}">
                    <span>Project Specs</span>
                  </button>
                  <button class="btn btn-primary btn-sm btn-submit-project-repo" data-project-id="${proj.id}">
                    <i data-lucide="git-branch" style="width: 14px; height: 14px;"></i>
                    <span>Submit Work</span>
                  </button>
                </div>
              </div>
            `;
              })
              .join('')}
          </div>
        </div>
      `;

    case 'live-sessions':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Weekend Live Mentoring Cohorts</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Interactive Saturday & Sunday live coding sessions directly with lead instructors.</p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            ${liveSessions
              .map(
                (s) => `
              <div class="live-card" style="box-shadow: none;">
                <div class="live-card-top">
                  <span class="live-day-badge">${s.day}</span>
                  ${s.isLiveNow ? '<span class="badge badge-live">● LIVE RIGHT NOW</span>' : '<span class="live-badge-teal">Scheduled</span>'}
                </div>
                <div class="live-time-row">
                  <i data-lucide="clock" style="width: 14px; height: 14px; color: var(--color-accent);"></i>
                  <strong>${s.date} • ${s.time}</strong>
                </div>
                <h4 style="font-size: 1.15rem; margin-bottom: 8px;">${s.title}</h4>
                <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 16px;">${s.description}</p>
                <div style="border-top: 1px solid var(--color-border); padding-top: 14px; display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${s.instructorAvatar}" style="width: 36px; height: 36px; border-radius: 50%;" />
                    <div>
                      <div style="font-size: 0.85rem; font-weight: 700;">${s.instructor}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${s.instructorRole}</div>
                    </div>
                  </div>
                  <button class="btn ${s.isLiveNow ? 'btn-teal' : 'btn-primary'} btn-sm btn-join-live-session" data-meet-url="${s.meetUrl}">
                    <i data-lucide="video"></i>
                    <span>${s.isLiveNow ? 'Join Meeting Room' : 'Set Calendar Reminder'}</span>
                  </button>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;

    case 'certificates':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Earned Credentials & Certificates</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Verified certificates issued upon completing 100% of course lessons.</p>
            </div>
          </div>

          ${
            userCerts.length === 0
              ? `
            <div style="text-align: center; padding: 40px; color: var(--color-text-secondary);">
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🎓</div>
              <h4>No Certificates Unlocked Yet</h4>
              <p style="font-size: 0.85rem; margin-top: 4px;">Complete 100% of any course lessons in the Learning Player to automatically generate your verified credential.</p>
            </div>
          `
              : `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              ${userCerts
                .map(
                  (c) => `
                <div style="border: 2px solid var(--color-primary); border-radius: var(--radius-lg); padding: 24px; background: #FFFFFF; position: relative;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div>
                      <span class="badge gold" style="margin-bottom: 6px;">VERIFIED GRADUATE</span>
                      <h4 style="font-size: 1.15rem; color: var(--color-primary);">${c.courseTitle}</h4>
                    </div>
                    <div style="width: 44px; height: 44px; border-radius: 50%; background: #FEF3C7; color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                      ★
                    </div>
                  </div>
                  <div style="font-family: monospace; font-size: 0.8rem; color: var(--color-secondary); margin-bottom: 8px;">
                    Credential ID: <strong>${c.id}</strong>
                  </div>
                  <div style="font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: 18px;">
                    Issued to: <strong>${c.studentName}</strong> • Date: ${c.issueDate}
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-sm btn-view-cert-modal" data-cert-id="${c.id}" style="flex: 1;">
                      <i data-lucide="eye"></i>
                      <span>Inspect Credential</span>
                    </button>
                    <button class="btn btn-primary btn-sm btn-print-cert" data-cert-id="${c.id}" style="flex: 1;">
                      <i data-lucide="download"></i>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          `
          }
        </div>
      `;

    case 'payments':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Payment & Transaction History</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Official Razorpay payment receipts, order references, and tax invoices.</p>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Course Purchased</th>
                  <th>Amount Paid</th>
                  <th>Payment ID</th>
                  <th>Method</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                ${userTransactions
                  .map(
                    (tx) => `
                  <tr>
                    <td><strong>${tx.courseTitle}</strong></td>
                    <td style="color: var(--color-primary); font-weight: 700;">₹${tx.amount.toLocaleString('en-IN')}</td>
                    <td style="font-family: monospace; font-size: 0.8rem;">${tx.paymentId}</td>
                    <td>${tx.method}</td>
                    <td>${tx.date}</td>
                    <td><span class="table-status-pill status-success">✓ ${tx.status}</span></td>
                    <td>
                      <button class="btn-ghost btn-sm btn-download-invoice" data-tx-id="${tx.id}" style="color: var(--color-secondary); font-weight: 600;">
                        <i data-lucide="download" style="width: 14px; height: 14px;"></i>
                        <span>PDF Invoice</span>
                      </button>
                    </td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'profile':
      return `
        <div class="dashboard-card" style="max-width: 640px;">
          <h3 style="margin-bottom: 20px;">Student Profile & Learning Preferences</h3>
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
            <img src="${student.avatar}" style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid var(--color-secondary);" />
            <div>
              <h4 style="font-size: 1.15rem;">${student.name}</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">${student.email}</p>
              <span class="badge badge-popular" style="margin-top: 4px;">Student ID: ${student.id}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Full Legal Name (Appears on Certificates)</label>
              <input type="text" class="form-input" id="profile-name-input" value="${student.name}" />
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Email Address</label>
              <input type="email" class="form-input" value="${student.email}" disabled style="background: #F8FAFC;" />
            </div>
            <button class="btn btn-primary btn-sm" id="btn-save-profile" style="margin-top: 8px; align-self: flex-start;">
              Save Profile Changes
            </button>
          </div>
        </div>
      `;
  }
}
