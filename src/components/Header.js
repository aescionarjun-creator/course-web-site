import { stateStore } from '../store/state.js';

export function renderHeader() {
  const isStudentAuth = stateStore.isStudentAuthenticated();
  const currentStudent = isStudentAuth ? stateStore.getCurrentStudent() : null;

  let rightActionHtml = '';
  if (isStudentAuth && currentStudent) {
    rightActionHtml = `
      <a href="#/student/dashboard" class="btn btn-primary btn-sm">
        <i data-lucide="layout-dashboard"></i>
        <span>My Dashboard</span>
      </a>
      <div style="display: flex; align-items: center; gap: 8px;">
        <a href="#/student/profile" title="${currentStudent.name}">
          <img src="${currentStudent.avatar}" alt="${currentStudent.name}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--color-secondary);" />
        </a>
      </div>
    `;
  } else {
    rightActionHtml = `
      <a href="#/login" class="btn btn-outline-blue btn-sm" id="header-btn-login">Login</a>
      <a href="#/courses" class="btn btn-primary btn-sm" id="header-btn-get-started">Get Started</a>
    `;
  }

  return `
    <header id="site-header" class="site-header">
      <div class="container header-container">
        <!-- Brand Logo -->
        <a href="#/" class="brand-logo" id="header-brand-link">
          <div class="brand-icon">
            <i data-lucide="graduation-cap"></i>
          </div>
          <div>
            ApexLearn
            <span class="brand-name-sub">INSTITUTE OF TECH & AI</span>
          </div>
        </a>

        <!-- Desktop Public Navigation -->
        <nav>
          <ul class="nav-menu">
            <li><a href="#/" class="nav-link active" data-nav="home">Home</a></li>
            <li><a href="#/courses" class="nav-link" data-nav="courses">Courses</a></li>
            <li><a href="#/projects" class="nav-link" data-nav="projects">Projects</a></li>
            <li><a href="#/live-sessions" class="nav-link" data-nav="live">Live Sessions</a></li>
            <li><a href="#/about" class="nav-link" data-nav="about">About</a></li>
            <li><a href="#/certificates" class="nav-link" data-nav="certificates">Certificates</a></li>
            <li><a href="#/contact" class="nav-link" data-nav="contact">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Side Public CTA -->
        <div class="header-actions">
          ${rightActionHtml}
          <button id="mobile-menu-toggle" class="mobile-menu-btn" aria-label="Toggle Navigation">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Overlay -->
      <div id="mobile-drawer-overlay" class="mobile-drawer-overlay"></div>

      <!-- Mobile Slide-out Drawer -->
      <div id="mobile-drawer" class="mobile-drawer">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <div class="brand-logo">
            <div class="brand-icon" style="width: 32px; height: 32px;">
              <i data-lucide="graduation-cap"></i>
            </div>
            <span>ApexLearn</span>
          </div>
          <button id="mobile-drawer-close" class="btn-ghost" style="font-size: 1.25rem;">
            <i data-lucide="x"></i>
          </button>
        </div>

        <ul style="list-style: none; display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px;">
          <li><a href="#/" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Home</a></li>
          <li><a href="#/courses" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Courses</a></li>
          <li><a href="#/projects" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Domain Projects</a></li>
          <li><a href="#/live-sessions" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Live Sessions</a></li>
          <li><a href="#/about" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">About</a></li>
          <li><a href="#/certificates" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Certificates</a></li>
          <li><a href="#/contact" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 600; color: var(--color-text);">Contact</a></li>
          ${
            isStudentAuth
              ? `<li><a href="#/student/dashboard" class="mobile-nav-link" style="font-size: 1.1rem; font-weight: 700; color: var(--color-secondary);">My Student Dashboard</a></li>`
              : ''
          }
        </ul>

        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 12px;">
          <a href="#/courses" class="btn btn-primary" style="width: 100%;">Explore Courses</a>
          ${
            isStudentAuth
              ? `<a href="#/student/dashboard" class="btn btn-outline" style="width: 100%;">Open Dashboard</a>`
              : `<a href="#/login" class="btn btn-outline" style="width: 100%;">Log In</a>`
          }
        </div>
      </div>
    </header>
  `;
}
