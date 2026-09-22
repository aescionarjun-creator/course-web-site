import { createIcons, icons } from 'lucide';
import { stateStore } from './store/state.js';
import { showToast } from './utils/toast.js';
import './config/firebase.js';

// Public Components
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderTrustSection } from './components/TrustSection.js';
import { renderCategorySection } from './components/CategorySection.js';
import { renderCourseCatalog } from './components/CourseCatalog.js';
import { renderCourseModal } from './components/CourseModal.js';
import { renderWhyLearnSection } from './components/WhyLearnSection.js';
import { renderDomainProjects } from './components/DomainProjects.js';
import { renderHandsOnWorkflow } from './components/HandsOnWorkflow.js';
import { renderLiveWeekendSessions } from './components/LiveWeekendSessions.js';
import { renderVideoPreviewSection } from './components/VideoPreviewSection.js';
import { renderHowItWorks } from './components/HowItWorks.js';
import { renderTestimonials } from './components/Testimonials.js';
import { renderCertificateShowcase } from './components/CertificateShowcase.js';
import { renderAICommandCenter } from './components/AICommandCenter.js';
import { renderFooter } from './components/Footer.js';

// Modals
import { renderVideoModal } from './components/VideoModal.js';
import { renderProjectModal } from './components/ProjectModal.js';
import { renderCertVerifyModal } from './components/CertVerifyModal.js';
import { renderRazorpayModal, handleRazorpayProcessing } from './components/RazorpayModal.js';

// Dedicated Auth Views
import { renderPortalSelection } from './views/PortalSelection.js';
import { renderStudentAuth } from './views/StudentAuth.js';
import { renderAdminAuth } from './views/AdminAuth.js';

// Dedicated Protected Views
import { renderStudentDashboard } from './views/StudentDashboard.js';
import { renderLearningPlayer } from './views/LearningPlayer.js';
import { renderAdminDashboard } from './views/AdminDashboard.js';

class App {
  constructor() {
    this.appEl = document.getElementById('app');
    this.modalEl = document.getElementById('modal-container');
    this.videoModalEl = document.getElementById('video-modal-container');
    this.razorpayModalEl = document.getElementById('razorpay-modal-container');

    this.init();
  }

  init() {
    // Route change listener
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('popstate', () => this.handleRouting());

    // State change listener
    stateStore.subscribe((event, payload) => {
      this.handleStateChange(event, payload);
    });

    // Sticky scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('site-header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Global event delegation
    this.bindGlobalEvents();

    // Initial route handling
    this.handleRouting();
  }

  parseCurrentPath() {
    let raw = window.location.hash || window.location.pathname || '/';
    if (raw.startsWith('#')) {
      raw = raw.substring(1);
    }
    if (!raw.startsWith('/')) {
      raw = '/' + raw;
    }
    const [cleanPath, queryString] = raw.split('?');
    const params = new URLSearchParams(queryString || '');
    return { path: cleanPath, params };
  }

  handleStateChange(event, payload) {
    if (event === 'STUDENT_LOGGED_IN' || event === 'STUDENT_SIGNED_UP') {
      showToast(`Signed in as ${payload.user.name}`, 'success');
      window.location.hash = '#/student/dashboard';
    } else if (event === 'STUDENT_LOGGED_OUT') {
      showToast('Logged out of student portal.', 'info');
      window.location.hash = '#/login';
    } else if (event === 'ADMIN_LOGGED_IN') {
      showToast('Authenticated as Platform Director', 'success');
      window.location.hash = '#/admin/dashboard';
    } else if (event === 'ADMIN_LOGGED_OUT') {
      showToast('Administrative session terminated.', 'info');
      window.location.hash = '#/login';
    } else if (event === 'COURSE_PRICE_UPDATED') {
      showToast(`Updated course price to ₹${payload.price.toLocaleString('en-IN')}`, 'success');
      this.handleRouting();
    } else if (event === 'LESSON_PROGRESS_UPDATED') {
      showToast(`Progress updated: ${payload.percent}% complete`, 'info');
      this.handleRouting();
    } else if (event === 'CERTIFICATE_ISSUED') {
      showToast(`🎉 Verified Certificate Issued (${payload.certificate.id})!`, 'success', 5000);
      this.handleRouting();
    }
  }

  handleRouting() {
    const { path, params } = this.parseCurrentPath();

    // ==========================================
    // 0. MAIN PORTAL SELECTION PAGE
    // ==========================================
    if (path === '/login' || path === '/portal') {
      this.appEl.innerHTML = renderPortalSelection();
      createIcons({ icons });
      window.scrollTo(0, 0);
      return;
    }

    // ==========================================
    // 1. STUDENT PORTAL ROUTES & GUARDS
    // ==========================================
    if (path.startsWith('/student')) {
      // Unauthenticated Student Login / Signup
      if (path === '/student' || path === '/student/login') {
        if (stateStore.isStudentAuthenticated()) {
          window.location.hash = '#/student/dashboard';
          return;
        }
        this.appEl.innerHTML = renderStudentAuth(false);
        createIcons({ icons });
        window.scrollTo(0, 0);
        return;
      }

      if (path === '/student/signup') {
        if (stateStore.isStudentAuthenticated()) {
          window.location.hash = '#/student/dashboard';
          return;
        }
        this.appEl.innerHTML = renderStudentAuth(true);
        createIcons({ icons });
        window.scrollTo(0, 0);
        return;
      }

      // Route Guard for Protected Student Portal
      if (!stateStore.isStudentAuthenticated()) {
        showToast('Please log in to access your student portal.', 'warning');
        window.location.hash = '#/student/login';
        return;
      }

      // Student Course LMS Player (/student/courses/:courseId)
      if (path.startsWith('/student/courses/')) {
        const courseId = path.replace('/student/courses/', '') || 'course-pyds';
        const lessonId = params.get('lessonId') || '';
        this.appEl.innerHTML = renderLearningPlayer(courseId, lessonId);
        createIcons({ icons });
        window.scrollTo(0, 0);
        return;
      }

      // Student Dashboard sub-pages
      const sub = path.replace('/student/', '') || 'dashboard';
      this.appEl.innerHTML = renderStudentDashboard(sub);
      createIcons({ icons });
      window.scrollTo(0, 0);
      return;
    }

    // ==========================================
    // 2. ADMIN PORTAL ROUTES & GUARDS
    // ==========================================
    if (path.startsWith('/admin')) {
      if (path === '/admin' || path === '/admin/login') {
        if (stateStore.isAdminAuthenticated()) {
          window.location.hash = '#/admin/dashboard';
          return;
        }
        this.appEl.innerHTML = renderAdminAuth();
        createIcons({ icons });
        window.scrollTo(0, 0);
        return;
      }

      // Route Guard for Protected Admin Portal
      if (!stateStore.isAdminAuthenticated()) {
        showToast('Restricted terminal: please authenticate as director.', 'error');
        window.location.hash = '#/admin/login';
        return;
      }

      const sub = path.replace('/admin/', '') || 'dashboard';
      this.appEl.innerHTML = renderAdminDashboard(sub);
      createIcons({ icons });
      window.scrollTo(0, 0);
      return;
    }

    // ==========================================
    // 3. PUBLIC WEBSITE EXPERIENCE (Standalone)
    // ==========================================
    this.appEl.innerHTML = `
      ${renderHeader()}
      <main>
        ${renderHero()}
        ${renderTrustSection()}
        ${renderCategorySection()}
        ${renderCourseCatalog()}
        ${renderAICommandCenter()}
        ${renderWhyLearnSection()}
        ${renderDomainProjects()}
        ${renderHandsOnWorkflow()}
        ${renderLiveWeekendSessions()}
        ${renderVideoPreviewSection()}
        ${renderHowItWorks()}
        ${renderTestimonials()}
        ${renderCertificateShowcase()}
      </main>
      ${renderFooter()}
    `;

    createIcons({ icons });

    // Scroll to specific section if public path matches
    const sectionMap = {
      '/courses': '#courses',
      '/projects': '#projects',
      '/live-sessions': '#live',
      '/about': '#why-us',
      '/certificates': '#certificate',
      '/contact': '#site-header'
    };

    if (sectionMap[path]) {
      const target = document.querySelector(sectionMap[path]);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      // Mobile drawer toggle
      if (e.target.closest('#mobile-menu-toggle')) {
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('mobile-drawer-overlay');
        if (drawer && overlay) {
          drawer.classList.add('open');
          overlay.classList.add('open');
        }
        return;
      }

      if (e.target.closest('#mobile-drawer-close') || e.target.closest('#mobile-drawer-overlay') || e.target.closest('.mobile-nav-link')) {
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('mobile-drawer-overlay');
        if (drawer && overlay) {
          drawer.classList.remove('open');
          overlay.classList.remove('open');
        }
      }

      // Quick Demo Student Login (Evaluation Helper)
      if (e.target.closest('#btn-demo-student-login')) {
        stateStore.loginStudent('rahul.sharma@example.com', 'student123');
        return;
      }

      // Submit Student Auth Form
      if (e.target.closest('#btn-submit-student-auth')) {
        const nameInput = document.getElementById('student-input-name');
        const emailInput = document.getElementById('student-input-email');
        const passInput = document.getElementById('student-input-password');

        const email = emailInput ? emailInput.value : 'rahul.sharma@example.com';
        const pass = passInput ? passInput.value : 'student123';

        if (nameInput) {
          stateStore.signupStudent(nameInput.value, email, pass);
        } else {
          stateStore.loginStudent(email, pass);
        }
        return;
      }

      // Student Logout
      if (e.target.closest('#btn-student-logout')) {
        stateStore.logoutStudent();
        return;
      }

      // Quick Demo Admin Login (Evaluation Helper)
      if (e.target.closest('#btn-demo-admin-login')) {
        stateStore.loginAdmin('director@apexlearn.edu', 'adminSecret2026');
        return;
      }

      // Submit Admin Auth Form
      if (e.target.closest('#btn-submit-admin-auth')) {
        const emailInput = document.getElementById('admin-input-email');
        const passInput = document.getElementById('admin-input-password');
        const email = emailInput ? emailInput.value : 'director@apexlearn.edu';
        const pass = passInput ? passInput.value : '';
        stateStore.loginAdmin(email, pass);
        return;
      }

      // Admin Logout
      if (e.target.closest('#btn-admin-logout')) {
        stateStore.logoutAdmin();
        return;
      }

      // Course Details Modal
      const viewCourseBtn = e.target.closest('.btn-view-course');
      if (viewCourseBtn) {
        const courseId = viewCourseBtn.dataset.courseId;
        this.openCourseModal(courseId);
        return;
      }

      if (e.target.closest('#modal-close-btn') || e.target.id === 'course-modal-overlay') {
        this.closeModal();
        return;
      }

      // Accordion in course modal
      const accHeader = e.target.closest('.accordion-header');
      if (accHeader) {
        const content = accHeader.nextElementSibling;
        const icon = accHeader.querySelector('.accordion-icon');
        if (content) {
          content.classList.toggle('open');
          if (icon) {
            icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
        return;
      }

      // Preview Video from Course Modal
      const previewPill = e.target.closest('.btn-open-preview');
      if (previewPill) {
        const url = previewPill.dataset.previewUrl;
        const title = previewPill.dataset.previewTitle;
        this.openVideoModal(url, title, 'Sample Lecture Preview');
        return;
      }

      // Trigger Preview Video from Previews section
      const previewCard = e.target.closest('.btn-trigger-preview-modal');
      if (previewCard) {
        const url = previewCard.dataset.videoUrl;
        const title = previewCard.dataset.videoTitle;
        const course = previewCard.dataset.videoCourse;
        this.openVideoModal(url, title, course);
        return;
      }

      if (e.target.closest('#btn-close-video-modal') || e.target.id === 'video-preview-modal-overlay') {
        this.closeVideoModal();
        return;
      }

      // Open Razorpay Checkout Modal
      const enrollBtn = e.target.closest('.btn-enroll-course') || e.target.closest('.btn-enroll-now-modal') || e.target.closest('#btn-video-modal-enroll');
      if (enrollBtn) {
        this.closeModal();
        this.closeVideoModal();
        const courseId = enrollBtn.dataset.courseId || 'course-pyds';
        this.openRazorpayModal(courseId);
        return;
      }

      if (e.target.closest('#btn-close-razorpay')) {
        this.closeRazorpayModal();
        return;
      }

      // Submit Razorpay Payment
      if (e.target.closest('#btn-submit-razorpay-payment')) {
        const submitBtn = e.target.closest('#btn-submit-razorpay-payment');
        const courseId = submitBtn.dataset.courseId;
        const amount = Number(submitBtn.dataset.amount);
        const nameInput = document.getElementById('razorpay-input-name');
        const emailInput = document.getElementById('razorpay-input-email');
        const selectedMethodEl = document.querySelector('input[name="payment_method"]:checked');

        const name = nameInput ? nameInput.value : 'Rahul Sharma';
        const email = emailInput ? emailInput.value : 'rahul.sharma@example.com';
        const method = selectedMethodEl ? selectedMethodEl.value : 'UPI';

        handleRazorpayProcessing(courseId, amount, name, email, method);
        return;
      }

      // After payment -> Go to student portal
      if (e.target.closest('#btn-goto-student-portal')) {
        this.closeRazorpayModal();
        window.location.hash = '#/student/dashboard';
        return;
      }

      // Project Specs Modal
      const viewProjBtn = e.target.closest('.btn-view-project');
      if (viewProjBtn) {
        const projId = viewProjBtn.dataset.projectId;
        this.openProjectModal(projId);
        return;
      }

      if (e.target.closest('#btn-close-project-modal') || e.target.id === 'project-modal-overlay') {
        this.closeModal();
        return;
      }

      if (e.target.closest('.btn-download-project-starter')) {
        showToast('Initiated download: project_starter_pack.zip', 'success');
        return;
      }

      // Filter Domain Projects
      const filterBtn = e.target.closest('.filter-btn');
      if (filterBtn) {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        filterBtn.classList.add('active');
        const filter = filterBtn.dataset.filter;
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((c) => {
          if (filter === 'all' || c.dataset.category === filter) {
            c.style.display = 'flex';
          } else {
            c.style.display = 'none';
          }
        });
        return;
      }

      // Verify Certificate ID
      if (e.target.closest('#btn-verify-cert-submit')) {
        const input = document.getElementById('cert-search-input');
        const certId = input ? input.value : 'CERT-PYDS-2026-9042';
        this.openCertModal(certId);
        return;
      }

      if (e.target.closest('#btn-close-cert-modal') || e.target.closest('#btn-close-cert-modal-fallback') || e.target.id === 'cert-verify-modal-overlay') {
        this.closeModal();
        return;
      }

      if (e.target.closest('#btn-print-sample-cert') || e.target.closest('.btn-print-cert')) {
        window.print();
        return;
      }

      // Inspect Credential from Student Dashboard
      const inspectCertBtn = e.target.closest('.btn-view-cert-modal');
      if (inspectCertBtn) {
        const certId = inspectCertBtn.dataset.certId;
        this.openCertModal(certId);
        return;
      }

      // Admin Price Update
      const savePriceBtn = e.target.closest('.btn-save-price');
      if (savePriceBtn) {
        const courseId = savePriceBtn.dataset.courseId;
        const row = savePriceBtn.closest('.form-group-row');
        if (row) {
          const priceInput = row.querySelector('.input-price');
          const origPriceInput = row.querySelector('.input-original-price');
          const newPrice = Number(priceInput.value);
          const newOrigPrice = Number(origPriceInput.value);
          stateStore.updateCoursePrice(courseId, newPrice, newOrigPrice);
        }
        return;
      }

      // Admin Reset Demo Data
      if (e.target.closest('#btn-reset-demo-data')) {
        stateStore.resetToDefaults();
        showToast('Reset state to clean initial defaults!', 'success');
        this.handleRouting();
        return;
      }

      // LMS Player: Lesson Selection
      const playerLessonItem = e.target.closest('.player-lesson-item');
      if (playerLessonItem) {
        const courseId = playerLessonItem.dataset.courseId;
        const lessonId = playerLessonItem.dataset.lessonId;
        window.location.hash = `#/student/courses/${courseId}?lessonId=${lessonId}`;
        return;
      }

      // LMS Player: Previous / Next
      const prevBtn = e.target.closest('#btn-player-prev-lesson');
      if (prevBtn && prevBtn.dataset.lessonId) {
        window.location.hash = `#/student/courses/${prevBtn.dataset.courseId}?lessonId=${prevBtn.dataset.lessonId}`;
        return;
      }

      const nextBtn = e.target.closest('#btn-player-next-lesson');
      if (nextBtn && nextBtn.dataset.lessonId) {
        window.location.hash = `#/student/courses/${nextBtn.dataset.courseId}?lessonId=${nextBtn.dataset.lessonId}`;
        return;
      }

      // LMS Player: Toggle Mark Complete
      const completeBtn = e.target.closest('#btn-toggle-complete-lesson');
      if (completeBtn) {
        const courseId = completeBtn.dataset.courseId;
        const lessonId = completeBtn.dataset.lessonId;
        stateStore.toggleLessonCompletion(courseId, lessonId);
        return;
      }

      // LMS Player Tabs
      const playerTabBtn = e.target.closest('.player-tab-btn');
      if (playerTabBtn) {
        document.querySelectorAll('.player-tab-btn').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.player-tab-pane').forEach((p) => p.classList.remove('active'));
        playerTabBtn.classList.add('active');
        const tabId = playerTabBtn.dataset.playerTab;
        const pane = document.getElementById(`player-pane-${tabId}`);
        if (pane) pane.classList.add('active');
        return;
      }

      if (e.target.closest('.btn-download-mock')) {
        const file = e.target.closest('.btn-download-mock').dataset.file;
        showToast(`Downloaded: ${file}`, 'success');
        return;
      }

      if (e.target.closest('#btn-manual-save-note')) {
        const lessonId = e.target.closest('#btn-manual-save-note').dataset.lessonId;
        const noteInput = document.getElementById('player-student-note-input');
        if (noteInput) {
          stateStore.saveNote(lessonId, noteInput.value);
          showToast('Lesson notes saved locally!', 'success');
        }
        return;
      }

      if (e.target.closest('#btn-post-qa')) {
        const input = document.getElementById('qa-question-input');
        if (input && input.value.trim()) {
          const list = document.getElementById('qa-thread-list');
          if (list) {
            const newQ = document.createElement('div');
            newQ.style.cssText = 'background: rgba(255,255,255,0.04); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);';
            newQ.innerHTML = `
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94A3B8; margin-bottom: 4px;">
                <strong style="color: #FFFFFF;">Rahul Sharma (You)</strong>
                <span>Just Now</span>
              </div>
              <p style="color: #E2E8F0; font-size: 0.85rem;">${input.value}</p>
            `;
            list.prepend(newQ);
            input.value = '';
            showToast('Question submitted to mentor queue!', 'info');
          }
        }
        return;
      }

      // Join Weekend Live Session
      if (e.target.closest('.btn-join-live-session')) {
        showToast('Connecting to ApexLearn Weekend Live Cohort...', 'success');
        setTimeout(() => {
          alert('Connecting to ApexLearn Weekend Live Session with instructor!\n\nSimulated Video Room: Active');
        }, 300);
        return;
      }

      // Submit Project Repo
      if (e.target.closest('.btn-submit-project-repo')) {
        const url = prompt('Enter your GitHub repository link or project URL:', 'https://github.com/rahul-sharma/fraud-detection-engine');
        if (url) {
          showToast('Project repository submitted for mentor evaluation!', 'success');
        }
        return;
      }

      // Download Invoice
      if (e.target.closest('.btn-download-invoice')) {
        showToast('Downloaded official GST invoice (PDF)', 'success');
        return;
      }
    });

    // Notes auto-save debounce
    document.addEventListener('input', (e) => {
      if (e.target.id === 'player-student-note-input') {
        const status = document.getElementById('notes-save-status');
        if (status) status.textContent = 'Saving changes...';
        clearTimeout(this._noteTimer);
        this._noteTimer = setTimeout(() => {
          const completeBtn = document.getElementById('btn-toggle-complete-lesson');
          if (completeBtn) {
            const lessonId = completeBtn.dataset.lessonId;
            stateStore.saveNote(lessonId, e.target.value);
            if (status) status.textContent = '✓ All edits synced';
          }
        }, 800);
      }
    });
  }

  openCourseModal(courseId) {
    this.modalEl.innerHTML = renderCourseModal(courseId);
    createIcons({ icons });
  }

  openProjectModal(projectId) {
    this.modalEl.innerHTML = renderProjectModal(projectId);
    createIcons({ icons });
  }

  openCertModal(certId) {
    this.modalEl.innerHTML = renderCertVerifyModal(certId);
    createIcons({ icons });
  }

  openVideoModal(url, title, course) {
    this.videoModalEl.innerHTML = renderVideoModal(url, title, course);
    createIcons({ icons });
  }

  openRazorpayModal(courseId) {
    this.razorpayModalEl.innerHTML = renderRazorpayModal(courseId);
    createIcons({ icons });
  }

  closeModal() {
    this.modalEl.innerHTML = '';
  }

  closeVideoModal() {
    const video = document.getElementById('modal-video-element');
    if (video) video.pause();
    this.videoModalEl.innerHTML = '';
  }

  closeRazorpayModal() {
    this.razorpayModalEl.innerHTML = '';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
