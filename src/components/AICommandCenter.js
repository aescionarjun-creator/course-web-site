import { stateStore } from '../store/state.js';

export function renderAICommandCenter() {
  const isStudentAuth = stateStore.isStudentAuthenticated();
  const currentStudent = isStudentAuth ? stateStore.getCurrentStudent() : null;

  // Real or preview metrics
  const progressPercent = currentStudent ? (currentStudent.progress || 68) : 75;
  const completedProjects = currentStudent ? (currentStudent.completedProjects || 4) : 8;
  const streakDays = currentStudent ? (currentStudent.streak || 14) : 18;
  const certificateCount = currentStudent ? (currentStudent.certificates || 2) : 3;

  return `
    <section class="section section-ai-command" id="ai-command-center">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge badge-glow">
            <i data-lucide="cpu" style="width: 14px; height: 14px;"></i>
            <span>AI COMMAND CENTER</span>
          </div>
          <h2 class="section-title">
            Your Learning. Your Progress. <span class="highlight-blue">Your Future.</span>
          </h2>
          <p class="section-subtitle">
            Experience an intelligent, data-driven learning ecosystem engineered to track your mastery, suggest optimal project paths, and accelerate your engineering career.
          </p>
        </div>

        <!-- Dashboard Terminal Interface -->
        <div class="command-center-window">
          <!-- Top Window Control Bar -->
          <div class="command-window-bar">
            <div class="window-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="command-window-title">
              <i data-lucide="terminal" style="width: 14px; height: 14px; color: var(--color-secondary);"></i>
              <span>ApexLearn AI Command Engine v3.4 • ${isStudentAuth ? `Active Session: ${currentStudent.name}` : 'Live Platform Preview'}</span>
            </div>
            <div class="command-status-badge">
              <span class="status-pulse"></span>
              <span>SYSTEM ONLINE</span>
            </div>
          </div>

          <!-- Command Center Grid Content -->
          <div class="command-grid-layout">
            <!-- Left Side: Analytics & Progress Cards -->
            <div class="command-main-metrics">
              <div class="command-stat-card">
                <div class="command-stat-header">
                  <div>
                    <span class="stat-label">Active Track Progress</span>
                    <h4 class="stat-value">${progressPercent}%</h4>
                  </div>
                  <div class="stat-icon-circle blue">
                    <i data-lucide="trending-up" style="width: 20px; height: 20px;"></i>
                  </div>
                </div>
                <div class="command-progress-bar">
                  <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <span class="stat-foot">Python & Data Science Engineering</span>
              </div>

              <div class="command-stat-card">
                <div class="command-stat-header">
                  <div>
                    <span class="stat-label">Projects Completed</span>
                    <h4 class="stat-value">${completedProjects} <span class="unit">/ 10</span></h4>
                  </div>
                  <div class="stat-icon-circle green">
                    <i data-lucide="layers" style="width: 20px; height: 20px;"></i>
                  </div>
                </div>
                <div class="stat-badge-row">
                  <span class="mini-badge">FinTech ML</span>
                  <span class="mini-badge">NLP Engine</span>
                  <span class="mini-badge">Quant Trading</span>
                </div>
              </div>

              <div class="command-stat-card">
                <div class="command-stat-header">
                  <div>
                    <span class="stat-label">Learning Streak</span>
                    <h4 class="stat-value">${streakDays} <span class="unit">Days</span></h4>
                  </div>
                  <div class="stat-icon-circle orange">
                    <i data-lucide="flame" style="width: 20px; height: 20px;"></i>
                  </div>
                </div>
                <span class="stat-foot">🔥 Top 5% Consistent Learner</span>
              </div>

              <div class="command-stat-card">
                <div class="command-stat-header">
                  <div>
                    <span class="stat-label">Certificates Issued</span>
                    <h4 class="stat-value">${certificateCount} <span class="unit">Verified</span></h4>
                  </div>
                  <div class="stat-icon-circle purple">
                    <i data-lucide="award" style="width: 20px; height: 20px;"></i>
                  </div>
                </div>
                <span class="stat-foot">ID Verified on Blockchain Ledger</span>
              </div>
            </div>

            <!-- Right Side: AI Recommendations & Live Telemetry -->
            <div class="command-side-panel">
              <div class="panel-box">
                <div class="panel-title">
                  <i data-lucide="sparkles" style="width: 16px; height: 16px; color: var(--color-secondary);"></i>
                  <span>AI Recommended Next Step</span>
                </div>
                <div class="recommendation-card">
                  <div class="rec-header">
                    <span class="rec-tag">PROJECT MATCH • 98%</span>
                    <h5>Build Real-Time Algorithmic Trading Bot</h5>
                  </div>
                  <p class="rec-desc">
                    Based on your completion of Python Data Structures, you are ready to implement WebSocket feeds and pandas backtesting.
                  </p>
                  <a href="${isStudentAuth ? '#/student/dashboard' : '#/courses'}" class="btn btn-primary btn-sm style-full">
                    <span>${isStudentAuth ? 'Resume Project' : 'Explore Course'}</span>
                    <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
                  </a>
                </div>
              </div>

              <div class="panel-box">
                <div class="panel-title">
                  <i data-lucide="video" style="width: 16px; height: 16px; color: #10B981;"></i>
                  <span>Upcoming Live Cohort</span>
                </div>
                <div class="live-cohort-mini">
                  <div class="cohort-time">Sat, 11:00 AM EST</div>
                  <h6>Generative AI & LLM Fine-Tuning Workshop</h6>
                  <span class="cohort-mentor">Mentor: Dr. Alex Rivera (Lead AI Scientist)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
