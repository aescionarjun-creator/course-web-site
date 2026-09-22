export function renderCategorySection() {
  const categories = [
    {
      id: 'cat-python',
      name: 'Python',
      icon: 'terminal',
      count: '3 Master Courses',
      desc: 'Foundational syntax, OOP, data structures, & automation scripts.',
      tag: 'Python'
    },
    {
      id: 'cat-ai',
      name: 'Artificial Intelligence',
      icon: 'sparkles',
      count: '4 LLM & GenAI Tracks',
      desc: 'Prompt engineering, RAG pipelines, & Transformer architectures.',
      tag: 'Artificial Intelligence'
    },
    {
      id: 'cat-ml',
      name: 'Machine Learning',
      icon: 'cpu',
      count: '5 Applied Courses',
      desc: 'Supervised algorithms, PyTorch neural nets, & MLOps deployment.',
      tag: 'Machine Learning'
    },
    {
      id: 'cat-ds',
      name: 'Data Science',
      icon: 'bar-chart-2',
      count: '4 In-Depth Courses',
      desc: 'Pandas, NumPy, EDA, statistics, & executive dashboards.',
      tag: 'Data Science'
    },
    {
      id: 'cat-web',
      name: 'Web Development',
      icon: 'globe',
      count: '3 Full-Stack Courses',
      desc: 'Modern frontend frameworks, REST APIs, & database backends.',
      tag: 'Web Development'
    },
    {
      id: 'cat-cloud',
      name: 'Cloud & DevOps',
      icon: 'cloud-lightning',
      count: '2 Infrastructure Tracks',
      desc: 'Docker containers, Kubernetes, CI/CD, & AWS cloud hosting.',
      tag: 'Cloud & DevOps'
    },
    {
      id: 'cat-auto',
      name: 'Automation',
      icon: 'bot',
      count: '2 Workflow Tracks',
      desc: 'Web scraping, bot development, and automated testing suites.',
      tag: 'Automation'
    },
    {
      id: 'cat-trading',
      name: 'Quant Trading',
      icon: 'trending-up',
      count: '2 Quant Tracks',
      desc: 'Algorithmic strategy backtesting, NumPy, and market data APIs.',
      tag: 'Trading'
    }
  ];

  return `
    <section class="section" id="categories">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i data-lucide="layout-grid" style="width: 14px; height: 14px;"></i>
            <span>CURATED DOMAINS</span>
          </div>
          <h2 class="section-title">
            EXPLORE <span class="highlight-blue">TECHNOLOGIES</span>
          </h2>
          <p class="section-subtitle">
            Choose a targeted specialization engineered to take you from foundational syntax to enterprise production architectures.
          </p>
        </div>

        <div class="category-grid">
          ${categories
            .map(
              (cat) => `
            <div class="category-card" data-category="${cat.tag}">
              <div class="category-card-top">
                <div class="category-icon-box">
                  <i data-lucide="${cat.icon}"></i>
                </div>
                <span class="category-count">${cat.count}</span>
              </div>
              <h3 class="category-name">${cat.name}</h3>
              <p class="category-desc">${cat.desc}</p>
              <div class="category-card-action">
                <span>Explore Path</span>
                <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
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
