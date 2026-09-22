import { stateStore } from '../store/state.js';
import { showToast } from '../utils/toast.js';

export function renderLearningPlayer(courseId, activeLessonId) {
  const course = stateStore.getCourseById(courseId) || stateStore.getCourses()[0];
  const student = stateStore.getCurrentStudent();

  // Find all lessons flattened
  const allLessons = [];
  course.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push({ ...les, moduleTitle: mod.title });
    });
  });

  // Current lesson
  const currentLessonIndex = activeLessonId
    ? allLessons.findIndex((l) => l.id === activeLessonId)
    : 0;
  const currentLesson = allLessons[currentLessonIndex >= 0 ? currentLessonIndex : 0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCompleted = stateStore.isLessonCompleted(course.id, currentLesson.id);
  const studentProg = (student.progress && student.progress[course.id]) || { completedLessonIds: [], percent: 0 };
  const savedNote = stateStore.getNote(currentLesson.id);

  return `
    <div class="learning-player-layout">
      <!-- Left Curriculum Sidebar -->
      <aside class="player-sidebar">
        <div class="player-sidebar-header">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <a href="#/student/dashboard" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94A3B8;">
              <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i>
              <span>Back to Dashboard</span>
            </a>
            <span style="font-size: 0.75rem; color: var(--color-accent); font-weight: 700;">${studentProg.percent}% COMPLETE</span>
          </div>

          <h3>${course.title}</h3>
          <div class="progress-track" style="margin-top: 6px; background: rgba(255,255,255,0.1);">
            <div class="progress-fill" style="width: ${studentProg.percent}%;"></div>
          </div>
        </div>

        <div class="player-curriculum-list">
          ${course.modules
            .map((mod) => {
              return `
              <div class="player-module-title">${mod.title}</div>
              ${mod.lessons
                .map((les) => {
                  const completed = stateStore.isLessonCompleted(course.id, les.id);
                  const isActive = les.id === currentLesson.id;
                  return `
                  <div class="player-lesson-item ${isActive ? 'active' : ''} ${completed ? 'completed' : ''}" data-lesson-id="${les.id}" data-course-id="${course.id}">
                    <div class="lesson-check-icon">
                      ${completed ? '✓' : ''}
                    </div>
                    <div style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${les.title}
                    </div>
                    <span style="font-size: 0.7rem; color: #94A3B8; flex-shrink: 0;">${les.duration}</span>
                  </div>
                `;
                })
                .join('')}
            `;
            })
            .join('')}
        </div>
      </aside>

      <!-- Center & Main Player Area -->
      <main class="player-main">
        <!-- Video Canvas -->
        <div class="player-video-canvas">
          <video
            id="course-video-player"
            controls
            autoplay
            poster="${course.thumbnail}"
            src="${currentLesson.videoUrl}"
          >
            Your browser does not support HTML5 video.
          </video>
        </div>

        <!-- Player Controls & Navigation Bar -->
        <div class="player-controls-bar">
          <div class="player-lesson-info">
            <h2>${currentLesson.title}</h2>
            <p>${currentLesson.moduleTitle} • Duration: ${currentLesson.duration}</p>
          </div>

          <div class="player-nav-buttons">
            <button class="btn btn-outline btn-sm ${!prevLesson ? 'disabled' : ''}" id="btn-player-prev-lesson" data-course-id="${course.id}" data-lesson-id="${prevLesson ? prevLesson.id : ''}" ${!prevLesson ? 'disabled' : ''} style="color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
              <i data-lucide="chevron-left"></i>
              <span>Previous</span>
            </button>

            <button class="btn ${isCompleted ? 'btn-teal' : 'btn-primary'} btn-sm" id="btn-toggle-complete-lesson" data-course-id="${course.id}" data-lesson-id="${currentLesson.id}">
              <i data-lucide="${isCompleted ? 'check-circle' : 'circle'}"></i>
              <span>${isCompleted ? 'Marked Complete' : 'Mark as Complete'}</span>
            </button>

            <button class="btn btn-outline btn-sm ${!nextLesson ? 'disabled' : ''}" id="btn-player-next-lesson" data-course-id="${course.id}" data-lesson-id="${nextLesson ? nextLesson.id : ''}" ${!nextLesson ? 'disabled' : ''} style="color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
              <span>Next</span>
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Content Tabs (Overview, Resources & Jupyter, Notes, Discussion) -->
        <div class="player-tabs-bar">
          <button class="player-tab-btn active" data-player-tab="overview">Lesson Overview</button>
          <button class="player-tab-btn" data-player-tab="resources">Downloadable Resources & Notebooks</button>
          <button class="player-tab-btn" data-player-tab="notes">My Saved Notes</button>
          <button class="player-tab-btn" data-player-tab="qa">Mentor Q&A Discussion</button>
        </div>

        <div class="player-tab-content-wrap" style="padding: 24px;">
          <!-- Tab 1: Overview -->
          <div class="player-tab-pane active" id="player-pane-overview">
            <h3 style="color: #FFFFFF; margin-bottom: 12px; font-size: 1.15rem;">About This Lecture</h3>
            <p style="color: #CBD5E1; line-height: 1.6; margin-bottom: 16px;">
              In this session, we dissect production implementations, examine time complexity tradeoffs, and write clean, vectorized code. Follow along using the starter notebook provided in the Resources tab.
            </p>

            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); padding: 18px; margin-top: 18px;">
              <h4 style="color: #38BDF8; font-size: 0.95rem; margin-bottom: 8px;">Key Takeaways:</h4>
              <ul style="padding-left: 20px; color: #94A3B8; font-size: 0.85rem; display: flex; flex-direction: column; gap: 6px;">
                <li>Vectorized memory layouts minimize CPU cache misses in numerical loops</li>
                <li>Pandas method chaining pattern for auditable data transformations</li>
                <li>Edge-case validation for high-cardinality missing attributes</li>
              </ul>
            </div>
          </div>

          <!-- Tab 2: Resources & Downloadable Notebooks -->
          <div class="player-tab-pane" id="player-pane-resources">
            <h3 style="color: #FFFFFF; margin-bottom: 12px; font-size: 1.15rem;">Downloadable Lecture Files</h3>
            <p style="color: #94A3B8; font-size: 0.85rem;">All files are tested against Python 3.11+ and Jupyter Lab 4.0.</p>

            <div class="resource-download-list">
              <div class="resource-item">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <i data-lucide="file-code" style="color: #F59E0B;"></i>
                  <div>
                    <strong style="color: #FFFFFF; font-size: 0.9rem;">03_pandas_data_wrangling_walkthrough.ipynb</strong>
                    <div style="font-size: 0.75rem; color: #94A3B8;">Jupyter Notebook • 2.4 MB • Includes solutions</div>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm btn-download-mock" data-file="03_pandas_data_wrangling_walkthrough.ipynb" style="color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
                  <i data-lucide="download"></i>
                  <span>Download .ipynb</span>
                </button>
              </div>

              <div class="resource-item">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <i data-lucide="database" style="color: #10B981;"></i>
                  <div>
                    <strong style="color: #FFFFFF; font-size: 0.9rem;">ecommerce_raw_transactions_2026.csv</strong>
                    <div style="font-size: 0.75rem; color: #94A3B8;">Dataset File • 14.8 MB • 150,000 records</div>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm btn-download-mock" data-file="ecommerce_raw_transactions_2026.csv" style="color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
                  <i data-lucide="download"></i>
                  <span>Download .CSV</span>
                </button>
              </div>

              <div class="resource-item">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <i data-lucide="file-text" style="color: #38BDF8;"></i>
                  <div>
                    <strong style="color: #FFFFFF; font-size: 0.9rem;">python_data_science_cheatsheet.pdf</strong>
                    <div style="font-size: 0.75rem; color: #94A3B8;">PDF Cheat Sheet • 1.1 MB • Quick syntax reference</div>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm btn-download-mock" data-file="python_data_science_cheatsheet.pdf" style="color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
                  <i data-lucide="download"></i>
                  <span>Download .PDF</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Tab 3: Personal Notes -->
          <div class="player-tab-pane" id="player-pane-notes">
            <h3 style="color: #FFFFFF; margin-bottom: 8px; font-size: 1.15rem;">My Private Lesson Notes</h3>
            <p style="color: #94A3B8; font-size: 0.85rem; margin-bottom: 14px;">Notes are automatically saved locally as you type.</p>

            <textarea id="player-student-note-input" style="width: 100%; min-height: 160px; background: #1E293B; border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-md); padding: 14px; color: #FFFFFF; font-family: inherit; font-size: 0.9rem; line-height: 1.5; resize: vertical;" placeholder="Type your personal insights, code reminders, and questions here...">${savedNote}</textarea>

            <div style="margin-top: 12px; display: flex; align-items: center; justify-content: space-between;">
              <span id="notes-save-status" style="font-size: 0.8rem; color: #10B981;">✓ All edits synced</span>
              <button class="btn btn-primary btn-sm" id="btn-manual-save-note" data-lesson-id="${currentLesson.id}">
                Save Notes
              </button>
            </div>
          </div>

          <!-- Tab 4: Q&A Discussion -->
          <div class="player-tab-pane" id="player-pane-qa">
            <h3 style="color: #FFFFFF; margin-bottom: 8px; font-size: 1.15rem;">Community & Mentor Q&A</h3>
            <p style="color: #94A3B8; font-size: 0.85rem; margin-bottom: 16px;">Ask questions regarding this specific lesson lecture.</p>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
              <input type="text" id="qa-question-input" placeholder="Have a doubt on this lesson? Ask Dr. Vikram and mentors..." style="flex: 1; background: #1E293B; border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-sm); padding: 10px 14px; color: #FFFFFF; outline: none;" />
              <button class="btn btn-primary btn-sm" id="btn-post-qa">Post Question</button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px;" id="qa-thread-list">
              <div style="background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94A3B8; margin-bottom: 4px;">
                  <strong style="color: #FFFFFF;">Ananya Deshmukh (Lead Mentor)</strong>
                  <span>Yesterday</span>
                </div>
                <p style="color: #E2E8F0; font-size: 0.85rem;">Remember to avoid in-place operations when piping chained DataFrame steps, as it hinders reproducible caching.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}
