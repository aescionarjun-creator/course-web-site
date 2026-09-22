import { stateStore } from '../store/state.js';

export function renderAdminDashboard(activeTab = 'overview') {
  const courses = stateStore.getCourses();
  const students = stateStore.students;
  const transactions = stateStore.transactions;
  const projects = stateStore.getProjects();
  const liveSessions = stateStore.getLiveSessions();
  const certificates = stateStore.certificates;

  // Calculate metrics
  const totalRevenue = transactions.reduce((acc, curr) => acc + (curr.status === 'Successful' ? curr.amount : 0), 0);
  const totalEnrollments = students.reduce((acc, curr) => acc + curr.enrolledCourses.length, 0);

  return `
    <div class="dashboard-layout">
      <!-- Admin Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-brand">
          <a href="#/admin/dashboard" class="brand-logo" style="font-size: 1.15rem;">
            <div class="brand-icon" style="background: linear-gradient(135deg, #DC2626 0%, #173B7A 100%); width: 32px; height: 32px;">
              <i data-lucide="shield-check"></i>
            </div>
            <span>ApexAdmin</span>
          </a>
        </div>

        <div class="sidebar-user-card" style="border-left: 3px solid #DC2626;">
          <div class="stat-icon-wrap" style="width: 38px; height: 38px; background: #FEE2E2; color: #DC2626;">
            <i data-lucide="shield"></i>
          </div>
          <div style="overflow: hidden;">
            <div class="sidebar-user-name">Dr. Vikram Sen</div>
            <div class="sidebar-user-role">Platform Director & Admin</div>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="#/admin/dashboard" class="sidebar-item-btn ${activeTab === 'dashboard' || activeTab === 'overview' ? 'active' : ''}">
              <i data-lucide="layout-dashboard"></i>
              <span>Analytics Overview</span>
            </a>
          </li>
          <li>
            <a href="#/admin/pricing" class="sidebar-item-btn ${activeTab === 'pricing' ? 'active' : ''}">
              <i data-lucide="indian-rupee"></i>
              <span>Price Manager</span>
            </a>
          </li>
          <li>
            <a href="#/admin/courses" class="sidebar-item-btn ${activeTab === 'courses' ? 'active' : ''}">
              <i data-lucide="book-open"></i>
              <span>Course Catalog (${courses.length})</span>
            </a>
          </li>
          <li>
            <a href="#/admin/students" class="sidebar-item-btn ${activeTab === 'students' ? 'active' : ''}">
              <i data-lucide="users"></i>
              <span>Students Roster (${students.length})</span>
            </a>
          </li>
          <li>
            <a href="#/admin/payments" class="sidebar-item-btn ${activeTab === 'payments' ? 'active' : ''}">
              <i data-lucide="credit-card"></i>
              <span>Payment Ledger (${transactions.length})</span>
            </a>
          </li>
          <li>
            <a href="#/admin/projects" class="sidebar-item-btn ${activeTab === 'projects' ? 'active' : ''}">
              <i data-lucide="folder-git-2"></i>
              <span>Domain Projects (${projects.length})</span>
            </a>
          </li>
          <li>
            <a href="#/admin/live-sessions" class="sidebar-item-btn ${activeTab === 'live-sessions' || activeTab === 'live' ? 'active' : ''}">
              <i data-lucide="video"></i>
              <span>Live Sat/Sun Cohorts</span>
            </a>
          </li>
          <li>
            <a href="#/admin/certificates" class="sidebar-item-btn ${activeTab === 'certificates' ? 'active' : ''}">
              <i data-lucide="award"></i>
              <span>Certificate Registry</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <button id="btn-admin-logout" class="btn btn-outline btn-sm" style="width: 100%; color: var(--color-error); border-color: rgba(220,38,38,0.2);">
            <i data-lucide="log-out"></i>
            <span>Log Out of Admin</span>
          </button>
        </div>
      </aside>

      <!-- Main Canvas -->
      <main class="dashboard-main">
        <header class="dashboard-topbar">
          <div class="topbar-title">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2>Executive Administration Portal</h2>
              <span class="admin-badge">ROOT ACCESS</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Enterprise monitoring, catalog orchestration & financial controls.</p>
          </div>

          <div class="topbar-actions">
            <button class="btn btn-outline btn-sm" id="btn-reset-demo-data" title="Reset to fresh demo dataset">
              <i data-lucide="rotate-ccw"></i>
              <span>Reset State</span>
            </button>
            <a href="#/" class="btn btn-primary btn-sm">
              <i data-lucide="external-link"></i>
              <span>View Public Site</span>
            </a>
          </div>
        </header>

        <div class="dashboard-content">
          ${renderAdminTab(activeTab, { courses, students, transactions, projects, liveSessions, certificates, totalRevenue, totalEnrollments })}
        </div>
      </main>
    </div>
  `;
}

function renderAdminTab(tab, ctx) {
  const { courses, students, transactions, projects, liveSessions, certificates, totalRevenue, totalEnrollments } = ctx;

  switch (tab) {
    case 'overview':
    default:
      return `
        <!-- Metrics Row -->
        <div class="stat-cards-grid">
          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-blue">
              <i data-lucide="users"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Registered Students</span>
              <span class="stat-value">${students.length.toLocaleString()}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-teal">
              <i data-lucide="indian-rupee"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Verified Revenue</span>
              <span class="stat-value">₹${totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-yellow">
              <i data-lucide="book-open"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Active Master Programs</span>
              <span class="stat-value">${courses.length}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap stat-icon-purple">
              <i data-lucide="award"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Issued Certificates</span>
              <span class="stat-value">${certificates.length}</span>
            </div>
          </div>
        </div>

        <!-- Dynamic Visual Revenue & Enrollment SVG Chart -->
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Monthly Enrollment & Revenue Momentum (2026)</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Direct reconciliation from Razorpay payment webhooks.</p>
            </div>
            <div style="display: flex; gap: 14px; font-size: 0.8rem; font-weight: 600;">
              <span style="color: var(--color-secondary); display: flex; align-items: center; gap: 6px;">
                <span style="width: 10px; height: 10px; background: var(--color-secondary); border-radius: 2px;"></span>
                Revenue Growth
              </span>
              <span style="color: var(--color-accent); display: flex; align-items: center; gap: 6px;">
                <span style="width: 10px; height: 10px; background: var(--color-accent); border-radius: 2px;"></span>
                Active Enrollments
              </span>
            </div>
          </div>

          <div style="width: 100%; height: 200px; padding: 10px 0;">
            <svg viewBox="0 0 800 180" style="width: 100%; height: 100%; overflow: visible;">
              <defs>
                <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#2563EB" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <!-- Grid Lines -->
              <line x1="40" y1="30" x2="780" y2="30" stroke="#E2E8F0" stroke-dasharray="4"/>
              <line x1="40" y1="80" x2="780" y2="80" stroke="#E2E8F0" stroke-dasharray="4"/>
              <line x1="40" y1="130" x2="780" y2="130" stroke="#E2E8F0" stroke-dasharray="4"/>
              
              <!-- Area fill -->
              <polygon points="60,140 180,120 300,95 420,70 540,45 660,35 760,20 760,150 60,150" fill="url(#gradBlue)"/>

              <!-- Line Chart -->
              <polyline points="60,140 180,120 300,95 420,70 540,45 660,35 760,20" fill="none" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
              <polyline points="60,145 180,135 300,110 420,90 540,75 660,60 760,45" fill="none" stroke="#0EA5A4" stroke-width="2.5" stroke-dasharray="5"/>

              <!-- Data Points -->
              <circle cx="60" cy="140" r="4" fill="#2563EB"/>
              <circle cx="180" cy="120" r="4" fill="#2563EB"/>
              <circle cx="300" cy="95" r="4" fill="#2563EB"/>
              <circle cx="420" cy="70" r="4" fill="#2563EB"/>
              <circle cx="540" cy="45" r="4" fill="#2563EB"/>
              <circle cx="660" cy="35" r="4" fill="#2563EB"/>
              <circle cx="760" cy="20" r="5" fill="#173B7A" stroke="#FFFFFF" stroke-width="2"/>

              <!-- Labels -->
              <text x="50" y="170" fill="#94A3B8" font-size="12">Oct</text>
              <text x="170" y="170" fill="#94A3B8" font-size="12">Nov</text>
              <text x="290" y="170" fill="#94A3B8" font-size="12">Dec</text>
              <text x="410" y="170" fill="#94A3B8" font-size="12">Jan '26</text>
              <text x="530" y="170" fill="#94A3B8" font-size="12">Feb</text>
              <text x="650" y="170" fill="#94A3B8" font-size="12">Mar</text>
              <text x="740" y="170" fill="#173B7A" font-size="12" font-weight="bold">Current</text>
            </svg>
          </div>
        </div>

        <!-- Recent Transactions Preview -->
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>Recent Razorpay Payments</h3>
            <button class="btn btn-outline btn-sm" data-admin-tab="payments">View All Records</button>
          </div>
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Payment ID</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                ${transactions
                  .slice(0, 4)
                  .map(
                    (tx) => `
                  <tr>
                    <td><strong>${tx.studentName}</strong></td>
                    <td>${tx.courseTitle}</td>
                    <td style="color: var(--color-primary); font-weight: 700;">₹${tx.amount.toLocaleString('en-IN')}</td>
                    <td style="font-family: monospace; font-size: 0.75rem;">${tx.paymentId}</td>
                    <td><span class="table-status-pill status-success">✓ ${tx.status}</span></td>
                    <td>${tx.date}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'pricing':
      return `
        <div class="price-editor-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Real-Time Course Price Management</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">
                Changes saved here reflect <strong>instantly</strong> across the public catalog and backend Razorpay payment amounts.
              </p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${courses
              .map((c) => {
                return `
                <div class="form-group-row" data-course-id="${c.id}">
                  <div>
                    <strong style="color: var(--color-text); font-size: 0.95rem;">${c.title}</strong>
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${c.category} • Current: ₹${c.price.toLocaleString('en-IN')} (Orig: ₹${c.originalPrice.toLocaleString('en-IN')})</div>
                  </div>

                  <div>
                    <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary);">Selling Price (₹)</label>
                    <input type="number" class="form-input input-price" value="${c.price}" min="499" max="50000" step="100" />
                  </div>

                  <div>
                    <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary);">Original Price (₹)</label>
                    <input type="number" class="form-input input-original-price" value="${c.originalPrice}" min="999" max="99999" step="100" />
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-sm btn-save-price" data-course-id="${c.id}">
                      <i data-lucide="check"></i>
                      <span>Update Price</span>
                    </button>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      `;

    case 'courses':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Manage Course Catalog</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Create, update syllabus modules, edit thumbnails, and publish courses.</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-admin-add-course">
              <i data-lucide="plus"></i>
              <span>Create New Program</span>
            </button>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th>Enrolled</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${courses
                  .map(
                    (c) => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${c.thumbnail}" style="width: 44px; height: 32px; object-fit: cover; border-radius: 4px;" />
                        <strong>${c.title}</strong>
                      </div>
                    </td>
                    <td>${c.category}</td>
                    <td style="font-weight: 700; color: var(--color-primary);">₹${c.price.toLocaleString('en-IN')}</td>
                    <td>${c.lessonsCount}</td>
                    <td>${c.studentsEnrolled.toLocaleString()}</td>
                    <td>★ ${c.rating}</td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-outline btn-sm btn-edit-course" data-course-id="${c.id}">Edit</button>
                        <button class="btn-ghost btn-sm btn-delete-course" data-course-id="${c.id}" style="color: var(--color-error);">Delete</button>
                      </div>
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

    case 'students':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Student Roster & Progression</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Registered learners, enrollment status, and completion records.</p>
            </div>
            <input type="text" placeholder="Search by name or email..." class="form-input" style="max-width: 260px;" />
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Active Enrollments</th>
                  <th>Joined Date</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${students
                  .map(
                    (s) => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${s.avatar}" style="width: 32px; height: 32px; border-radius: 50%;" />
                        <strong>${s.name}</strong>
                      </div>
                    </td>
                    <td>${s.email}</td>
                    <td>${s.enrolledCourses.length} Program(s)</td>
                    <td>${s.joinDate}</td>
                    <td><span class="table-status-pill status-success">● Active</span></td>
                    <td>
                      <button class="btn btn-outline btn-sm">Inspect</button>
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

    case 'payments':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Razorpay Transactions Ledger</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Verified gateway orders, signatures, and customer records.</p>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Razorpay Payment ID</th>
                  <th>Student Name & Email</th>
                  <th>Course Title</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                ${transactions
                  .map(
                    (tx) => `
                  <tr>
                    <td style="font-family: monospace; font-size: 0.8rem;">${tx.orderId}</td>
                    <td style="font-family: monospace; font-size: 0.8rem; color: var(--color-secondary);">${tx.paymentId}</td>
                    <td>
                      <div><strong>${tx.studentName}</strong></div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${tx.studentEmail}</div>
                    </td>
                    <td>${tx.courseTitle}</td>
                    <td style="font-weight: 700; color: var(--color-primary);">₹${tx.amount.toLocaleString('en-IN')}</td>
                    <td>${tx.method}</td>
                    <td><span class="table-status-pill status-success">✓ ${tx.status}</span></td>
                    <td>${tx.date}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'projects':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Domain-Based Projects Manager</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Create, assign, and update the 10+ industry portfolio projects.</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-admin-add-project">
              <i data-lucide="plus"></i>
              <span>Add Domain Project</span>
            </button>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Domain</th>
                  <th>Difficulty</th>
                  <th>Tech Stack</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${projects
                  .map(
                    (p) => `
                  <tr>
                    <td><strong>${p.title}</strong></td>
                    <td><span style="color: var(--color-secondary); font-weight: 600;">${p.domain}</span></td>
                    <td><span class="project-difficulty difficulty-intermediate">${p.difficulty}</span></td>
                    <td>${p.technology.join(', ')}</td>
                    <td>
                      <button class="btn btn-outline btn-sm btn-view-project" data-project-id="${p.id}">View Specs</button>
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

    case 'live':
      return `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <div>
              <h3>Saturday & Sunday Live Cohort Scheduler</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Manage weekend live schedule, video meeting links, and instructors.</p>
            </div>
            <button class="btn btn-teal btn-sm" id="btn-schedule-new-live">
              <i data-lucide="plus"></i>
              <span>Schedule Weekend Session</span>
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            ${liveSessions
              .map(
                (s) => `
              <div class="live-card" style="box-shadow: none;">
                <div class="live-card-top">
                  <span class="live-day-badge">${s.day}</span>
                  ${s.isLiveNow ? '<span class="badge badge-live">● ACTIVE LIVE</span>' : '<span class="live-badge-teal">Scheduled</span>'}
                </div>
                <h4 style="font-size: 1.15rem; margin-bottom: 6px;">${s.title}</h4>
                <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 12px;">Timing: ${s.date} • ${s.time}</p>
                <div style="font-size: 0.8rem; background: var(--color-bg-alt); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 16px;">
                  Meeting Link: <a href="${s.meetUrl}" target="_blank" style="color: var(--color-secondary);">${s.meetUrl}</a>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.85rem; font-weight: 600;">Instructor: ${s.instructor}</span>
                  <button class="btn btn-outline btn-sm">Edit Schedule</button>
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
              <h3>Verified Certificate Registry</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Official issuance records with cryptographic verification hashes.</p>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Credential ID</th>
                  <th>Recipient Student</th>
                  <th>Course Title</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${certificates
                  .map(
                    (c) => `
                  <tr>
                    <td style="font-family: monospace; font-weight: 700; color: var(--color-primary);">${c.id}</td>
                    <td><strong>${c.studentName}</strong></td>
                    <td>${c.courseTitle}</td>
                    <td>${c.issueDate}</td>
                    <td><span class="table-status-pill status-success">✓ Verified Valid</span></td>
                    <td>
                      <button class="btn btn-outline btn-sm btn-view-cert-modal" data-cert-id="${c.id}">Preview</button>
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
  }
}
