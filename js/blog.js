// ---------- Footer year (runs on every page) ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Blog index: search + category filter ----------
const postIndex = document.getElementById('postIndex');

if (postIndex) {
  const searchInput = document.getElementById('searchInput');
  const filterBar = document.getElementById('filterBar');
  const emptyState = document.getElementById('emptyState');
  const rows = Array.from(postIndex.querySelectorAll('.post-row'));

  let activeFilter = 'all';
  let activeQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    rows.forEach(row => {
      const matchesCategory =
        activeFilter === 'all' || row.dataset.category === activeFilter;

      const matchesQuery =
        activeQuery === '' ||
        row.dataset.title.includes(activeQuery) ||
        row.textContent.toLowerCase().includes(activeQuery);

      const visible = matchesCategory && matchesQuery;
      row.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });

    emptyState.classList.toggle('show', visibleCount === 0);
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      activeQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  if (filterBar) {
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  }
}

// ---------- Single post: reading progress bar ----------
const progressBar = document.getElementById('progressBar');
const postBody = document.querySelector('.post-body');

if (progressBar && postBody) {
  const updateProgress = () => {
    const bodyTop = postBody.offsetTop;
    const bodyHeight = postBody.offsetHeight;
    const scrolled = window.scrollY - bodyTop + window.innerHeight / 2;
    const pct = Math.min(100, Math.max(0, (scrolled / bodyHeight) * 100));
    progressBar.style.width = pct + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}