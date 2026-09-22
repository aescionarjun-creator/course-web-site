export function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconMap = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span style="font-size: 1.1rem; flex-shrink: 0;">${iconMap[type] || 'ℹ️'}</span>
    <div style="flex: 1;">
      <div style="font-weight: 600; color: var(--color-text);">${type === 'success' ? 'Success' : type === 'error' ? 'Notice' : 'Update'}</div>
      <div style="font-size: 0.825rem; color: var(--color-text-secondary); margin-top: 2px;">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}
