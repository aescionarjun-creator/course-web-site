import { stateStore } from '../store/state.js';

export function renderDomainProjects() {
  const projects = stateStore.getProjects();

  return `
    <section class="section" id="projects">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge">
            <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
            <span>REAL-WORLD PORTFOLIO</span>
          </div>
          <h2 class="section-title">
            BUILD <span class="highlight-blue">REAL PROJECTS</span>
          </h2>
          <p class="section-subtitle">
            Engineer hands-on domain projects designed to solve actual enterprise engineering challenges and build an unshakeable developer portfolio.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="project-filters">
          <button class="filter-btn active" data-filter="all">All Domains (${projects.length}+)</button>
          <button class="filter-btn" data-filter="Data Science">Data Science</button>
          <button class="filter-btn" data-filter="Machine Learning">Machine Learning</button>
          <button class="filter-btn" data-filter="AI">Artificial Intelligence</button>
          <button class="filter-btn" data-filter="Trading">Quantitative Trading</button>
          <button class="filter-btn" data-filter="Python">Python & Scraping</button>
        </div>

        <!-- Projects Grid -->
        <div class="project-grid" id="project-card-container">
          ${projects
            .map((proj) => {
              const diffClass =
                proj.difficulty === 'Beginner'
                  ? 'difficulty-beginner'
                  : proj.difficulty === 'Intermediate'
                  ? 'difficulty-intermediate'
                  : 'difficulty-advanced';

              return `
            <div class="project-card" data-category="${proj.category}" data-project-id="${proj.id}">
              <div class="project-card-header">
                <span class="project-domain-tag">${proj.domain}</span>
                <span class="project-difficulty ${diffClass}">${proj.difficulty}</span>
              </div>

              <div class="project-card-body">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.shortDesc}</p>

                <div class="project-tech-tags">
                  ${proj.technology.map((tech) => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>

                <div class="project-card-footer">
                  <div class="production-badge">
                    <i data-lucide="check-circle-2" style="width: 14px; height: 14px; color: var(--color-secondary);"></i>
                    <span>Production Grade</span>
                  </div>
                  <button class="btn btn-outline-blue btn-sm btn-view-project" data-project-id="${proj.id}">
                    <span>View Project</span>
                    <i data-lucide="arrow-up-right" style="width: 14px; height: 14px;"></i>
                  </button>
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
