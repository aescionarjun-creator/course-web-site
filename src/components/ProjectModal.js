import { stateStore } from '../store/state.js';

export function renderProjectModal(projectId) {
  const projects = stateStore.getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return '';

  return `
    <div class="modal-overlay" id="project-modal-overlay">
      <div class="modal-dialog" style="max-width: 720px;" role="dialog" aria-label="Project Details">
        <button class="modal-close-btn" id="btn-close-project-modal" aria-label="Close modal">
          <i data-lucide="x"></i>
        </button>

        <div style="padding: 32px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span class="project-domain-tag" style="background: var(--color-secondary-light); padding: 4px 10px; border-radius: var(--radius-sm);">
              ${project.domain}
            </span>
            <span class="project-difficulty difficulty-intermediate">${project.difficulty} Level</span>
          </div>

          <h2 style="font-size: 1.6rem; color: var(--color-primary); margin-bottom: 12px;">${project.title}</h2>
          <p style="color: var(--color-text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            ${project.fullDesc}
          </p>

          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px;">Project Objectives & Deliverables</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${project.objectives
                .map(
                  (obj) => `
                <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.875rem;">
                  <i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--color-accent); flex-shrink: 0; margin-top: 2px;"></i>
                  <span>${obj}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px;">Technologies & Libraries</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${project.technology.map((tech) => `<span class="tech-tag" style="padding: 6px 12px; font-size: 0.8rem;">${tech}</span>`).join('')}
            </div>
          </div>

          <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-weight: 700; font-size: 0.9rem;">Dataset & Starter Jupyter Notebook</div>
              <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Includes pre-cleaned CSV data & initial pipeline scaffolding</div>
            </div>
            <button class="btn btn-primary btn-sm btn-download-project-starter">
              <i data-lucide="download" style="width: 14px; height: 14px;"></i>
              <span>Download Starter Pack (.ZIP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
