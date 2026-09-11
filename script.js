const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
let n = 0,
  ct = document.querySelector('.loader-count');
if (reduced) document.body.classList.remove('lock');
else {
  let t = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 10));
    ct.textContent = String(n).padStart(2, '0');
    if (n === 100) {
      clearInterval(t);
      setTimeout(() => {
        document.querySelector('.loader').classList.add('out');
        document.body.classList.remove('lock');
      }, 250);
    }
  }, 60);
}
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
    }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
addEventListener(
  'scroll',
  () => {
    let m = document.documentElement.scrollHeight - innerHeight;
    document.querySelector('.progress').style.transform = `scaleX(${m ? scrollY / m : 0})`;
  },
  { passive: true }
);
const theme = document.querySelector('.theme');
theme.onclick = () => {
  let h = document.documentElement;
  h.dataset.theme = h.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', h.dataset.theme);
};
let saved = localStorage.getItem('theme');
if (saved) document.documentElement.dataset.theme = saved;
const palette = document.querySelector('.palette'),
  togglePalette = () => {
    let open = palette.classList.toggle('open');
    palette.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('lock', open);
    if (open) setTimeout(() => palette.querySelector('input').focus(), 100);
  };
document.querySelector('.cmd').onclick = togglePalette;
palette.onclick = (e) => {
  if (e.target === palette) togglePalette();
};
palette.querySelectorAll('a').forEach((a) => (a.onclick = togglePalette));
addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    togglePalette();
  }
  if (e.key === 'Escape') {
    if (palette.classList.contains('open')) togglePalette();
    closeModal();
  }
});
const terminal = document.querySelector('.terminal input'),
  help = document.querySelector('.prompt-help');
terminal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let q = terminal.value.trim().toLowerCase();
    let map = {
      help: 'Commands: work, stack, contact, clear',
      work: 'Opening selected work…',
      stack: 'React · Node.js · Python · Java · MongoDB · AI',
      contact: 'prajwalm5656@gmail.com',
      clear: '',
    };
    help.textContent = map[q] ?? 'Command not found. Try “help”.';
    if (q === 'work') setTimeout(() => (location.hash = 'work'), 500);
    terminal.value = '';
  }
});
const projectData = {
  loom: [
    'Indian Loom',
    'A full-stack e-commerce platform built end to end with responsive discovery, cart, checkout, authentication, payments and backend order management.',
    'assets/indian-loom.jpg',
    ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
  ],
  disease: [
    'Early Insight',
    'A symptom-driven machine-learning application with structured forms, Flask routing, SQLite persistence and immediate predictions.',
    'assets/ai-lab.jpg',
    ['Python', 'Flask', 'SQLite', 'JavaScript'],
  ],
  emotion: [
    'Emotion Detection',
    'A real-time computer-vision pipeline that detects faces and classifies human emotion from camera input.',
    'assets/night-studio.jpg',
    ['TensorFlow', 'OpenCV', 'Python'],
  ],
};
const modal = document.querySelector('.modal');
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
}
document.querySelectorAll('.project').forEach(
  (p) =>
    (p.onclick = () => {
      let d = projectData[p.dataset.project];
      modal.querySelector('h2').textContent = d[0];
      modal.querySelector('p').textContent = d[1];
      modal.querySelector('img').src = d[2];
      modal.querySelector('.tags').innerHTML = d[3].map((x) => `<span>${x}</span>`).join('');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lock');
    })
);
document.querySelector('.modal-close').onclick = closeModal;
modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};
const cur = document.querySelector('.cursor');
if (!reduced && matchMedia('(pointer:fine)').matches) {
  addEventListener('pointermove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('.project,.btn,.portrait-card').forEach((x) => {
    x.onpointerenter = () => cur.classList.add('on');
    x.onpointerleave = () => cur.classList.remove('on');
  });
}
document.querySelectorAll('.side-nav button').forEach(
  (b) =>
    (b.onclick = () => {
      document.querySelectorAll('.side-nav button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      document.querySelector('.panel-head .micro').textContent =
        b.dataset.view === 'overview'
          ? 'Product dashboard'
          : b.dataset.view.replace(/^./, (c) => c.toUpperCase()) + ' workspace';
    })
);
