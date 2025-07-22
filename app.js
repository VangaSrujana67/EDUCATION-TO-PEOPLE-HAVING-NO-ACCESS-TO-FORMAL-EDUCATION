/* ---------- CATEGORY‑BASED LESSONS ---------- */
const catParam  = new URLSearchParams(location.search).get('category') || 'digital';
const pageTitle = document.getElementById('pageTitle');
pageTitle.textContent = catParam.charAt(0).toUpperCase() + catParam.slice(1) + ' Lessons';

/* ===== LESSONS BY CATEGORY (tested July 2025) ===== */
const lessonsByCategory = {
  /* 1. DIGITAL LITERACY */
  digital: [
    { title: 'What is the Internet?',        id: 'Dxcc6ycZ73M', desc: 'Internet basics' },
    { title: 'Using a Mouse & Keyboard',     id: 'ZGrtGOHBKdU', desc: 'Desktop controls' },
    { title: 'Opening a Web Browser',        id: 'FxirRVJWUTs', desc: 'Launch Chrome/Edge' },
    { title: 'Searching on Google',          id: 'Z9n3VPTQYqo', desc: 'Smart searching' },
    { title: 'Creating Strong Passwords',    id: '0RLH4SNAfjA', desc: 'Stay safe online' }
  ],

  /* 2. EDUCATION TOOLS */
  education: [
    { title: 'Create a Gmail Account',       id: 'OWfvIFd3tts', desc: 'Email signup' },
    { title: 'Google Meet Basics',           id: '7KVZvUxQXMA', desc: 'Join virtual class' },
    { title: 'Use Google Classroom',         id: 'rCNImsWUxZA', desc: 'Manage coursework' },
    { title: 'YouTube for Learning',         id: 'MXCHKNNm688', desc: 'Find quality videos' }
  ],

  /* 3. BANKING & PAYMENTS */
  banking: [
    { title: 'Online Banking Basics',        id: 'fzHhy2vvI7Y', desc: 'Net banking' },
    { title: 'UPI Payments',                 id: 'iI2NaN_QVTI', desc: 'Pay with UPI' },
    { title: 'Avoid Online Scams',           id: 'yiKeLOKc1tw', desc: 'Stay secure' },
    { title: 'Check Balance Online',         id: 'fnxYSOsk5EA', desc: 'Phone banking apps' }
  ],

  /* 4. ONLINE SHOPPING */
  shopping: [
    { title: 'Shopping on Amazon',           id: 'iSvRIeYYNl4', desc: 'Search & buy' },
    { title: 'Apply Coupons & Offers',       id: 'SeNcs1ijzwM', desc: 'Save money' },
    { title: 'Track Your Orders',            id: 'QYnmJOxm0PI', desc: 'Delivery updates' }
  ],

  /* 5. GOVERNMENT & UTILITIES */
  government: [
    { title: 'Pay Electricity Bills',        id: 'vGm0fVb1cmc', desc: 'UPI / state portals' },
    { title: 'Book Train Tickets (IRCTC)',   id: 'l9-5R3buJBo', desc: 'Travel booking' },
    { title: 'Use DigiLocker',               id: 'PYYSdB0mQ7A', desc: 'E‑documents' }
  ],

  /* 6. CAREER & JOBS */
  career: [
    { title: 'Create a Resume (Canva)',      id: 'eaiw_lUMiQg', desc: 'Design CV' },
    { title: 'Apply Jobs on Naukri',         id: 'LDld38ROG9U', desc: 'Job portals' },
    { title: 'Linkdin Basics',               id: 'zwsOzdqmvqo', desc: 'Professional profile' }
  ],

  /* 7. SENIOR CITIZEN ESSENTIALS */
  senior: [
    { title: 'Doctor Appointment Online',    id: '58DlMCyXkBs', desc: 'eSanjeevani' },
    { title: 'WhatsApp Video Call',          id: 'H3XQDfBMIS8', desc: 'Call family' },
    { title: 'Identify Scam Messages',       id: 'hi8Ek2oO0tU', desc: 'Stay alert' }
  ]
};

/* ---------- Helpers ---------- */
// Replace helpers
const lessons   = lessonsByCategory[catParam] || lessonsByCategory.digital;
const ytThumb   = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytEmbed   = id => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

/* ---------- DOM Refs ---------- */
const grid       = document.getElementById('lessonGrid');
const progressEl = document.getElementById('progressBar');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeVid   = document.getElementById('closeVideo');

/* ---------- Progress State ---------- */
const key        = `done_${catParam}`;
let completed    = JSON.parse(localStorage.getItem(key) || '[]');

/* ---------- Render Lessons ---------- */
grid.innerHTML = '';
lessons.forEach((l, idx) => {
  const done = completed.includes(idx);
  const card = document.createElement('div');
  card.className = 'card fade-in';
  card.innerHTML = `
    <img src="${ytThumb(l.id)}" class="w-full rounded mb-3" alt="${l.title} thumbnail">
    <h3 class="font-semibold text-lg mb-1">${l.title}</h3>
    <p  class="text-sm text-gray-600 mb-3">${l.desc}</p>
    <button class="btn-primary w-full">${done ? 'Watch Again' : 'Watch Video'}</button>
  `;
  card.querySelector('button').onclick = () => {
    videoFrame.src = ytEmbed(l.id);
    videoModal.classList.remove('hidden');
    markDone(idx, card);
  };
  grid.appendChild(card);
});

/* ---------- Functions ---------- */
function markDone(i, card) {
  if (!completed.includes(i)) {
    completed.push(i);
    localStorage.setItem(key, JSON.stringify(completed));
    card.querySelector('button').textContent = 'Watch Again';
    updateProgress();
  }
}
function updateProgress() {
  progressEl.style.width = (completed.length / lessons.length) * 100 + '%';
}
updateProgress();

/* Close video modal */
closeVid.onclick = () => {
  videoModal.classList.add('hidden');
  videoFrame.src = '';
};
videoModal.onclick = e => { if (e.target === videoModal) closeVid.onclick(); };

/* ---------- AI Tutor ---------- */
document.getElementById('askBot').onclick = () => document.getElementById('botModal').classList.remove('hidden');
window.closeModal = () => document.getElementById('botModal').classList.add('hidden');
document.getElementById('sendBtn').onclick = async () => {
  const prompt = document.getElementById('userPrompt').value.trim();
  if (!prompt) return;
  const out = document.getElementById('botReply');
  out.textContent = 'Thinking…';
  try {
    const r = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    out.textContent = (await r.json()).reply || 'No answer.';
  } catch {
    out.textContent = 'Server error.';
  }
};
