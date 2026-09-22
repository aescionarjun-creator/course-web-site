export function renderTrustSection() {
  const stats = [
    {
      value: '10+',
      label: 'Industry-Focused Courses',
      icon: 'book-open',
      tag: 'Curated AI & Tech Curriculum'
    },
    {
      value: '25+',
      label: 'Practical Projects',
      icon: 'folder-git-2',
      tag: 'Real-world Code Repositories'
    },
    {
      value: 'Live',
      label: 'Weekend Sessions',
      icon: 'video',
      tag: 'Mentorship & Debugging'
    },
    {
      value: '100%',
      label: 'Skill-Focused Learning',
      icon: 'shield-check',
      tag: 'Verified Credentials'
    }
  ];

  return `
    <section class="stats-strip-section" id="stats-trust">
      <div class="container">
        <div class="stats-strip-container">
          ${stats
            .map(
              (s) => `
            <div class="stat-strip-item">
              <div class="stat-strip-top">
                <div class="stat-strip-icon">
                  <i data-lucide="${s.icon}"></i>
                </div>
                <div class="stat-strip-number">${s.value}</div>
              </div>
              <h4 class="stat-strip-label">${s.label}</h4>
              <p class="stat-strip-sub">${s.tag}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
