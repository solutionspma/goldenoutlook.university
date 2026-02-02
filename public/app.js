// App state
const appState = {
  currentPage: 'home',
  userProgress: {
    lessons: {},
    quizScores: {},
    points: 0
  }
};

// Navigation
function initNav() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      showPage(page);
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  // Set initial active
  document.querySelector('nav a.active') || navLinks[0].classList.add('active');
}

function showPage(page) {
  appState.currentPage = page;
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => section.classList.remove('active'));
  const targetSection = document.querySelector(`section[data-page="${page}"]`);
  if (targetSection) {
    targetSection.classList.add('active');
    // Reinit quiz if needed
    if (page.includes('quiz')) initQuiz();
  }
}

// Quiz functionality
function initQuiz() {
  const quizForm = document.getElementById('quiz-form');
  if (!quizForm) return;

  const submitBtn = quizForm.querySelector('button[type="submit"]');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    submitQuiz();
  });
}

function submitQuiz() {
  const form = document.getElementById('quiz-form');
  const questions = form.querySelectorAll('.quiz-question');
  let score = 0;
  let total = questions.length;

  questions.forEach((q, idx) => {
    const input = q.querySelector('input:checked');
    const answer = input ? input.value : null;
    const correct = q.dataset.answer;
    if (answer === correct) score++;
  });

  const percentage = Math.round((score / total) * 100);
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.innerHTML = `
    <strong>Quiz Complete!</strong><br>
    You scored ${score} out of ${total} (${percentage}%)<br>
    <span class="points-badge">+${score * 10} points</span>
  `;
  resultDiv.classList.add('show');

  // Award points
  awardPoints(score * 10);
}

function awardPoints(pts) {
  appState.userProgress.points += pts;
  updatePointsDisplay();
  updateLeaderboard();
}

function updatePointsDisplay() {
  const display = document.getElementById('points-display');
  if (display) {
    display.textContent = `${appState.userProgress.points} points`;
  }
}

function updateLeaderboard() {
  const leaderboard = document.getElementById('leaderboard-list');
  if (!leaderboard) return;

  // Mock leaderboard data (in real app, fetch from server)
  const mockUsers = [
    { name: 'You', points: appState.userProgress.points },
    { name: 'Alice', points: 450 },
    { name: 'Bob', points: 380 },
    { name: 'Carol', points: 320 }
  ];

  mockUsers.sort((a, b) => b.points - a.points);

  leaderboard.innerHTML = mockUsers.map((user, idx) => `
    <li>
      <span>#${idx + 1} — ${user.name}</span>
      <span class="points-badge">${user.points} pts</span>
    </li>
  `).join('');
}

// Lesson navigation
function goToLesson(lessonNum) {
  showPage(`lesson-${lessonNum}`);
  window.scrollTo(0, 0);
}

// Facilitator timer for Zoom sessions
function startFacilitatorTimer(minutes) {
  let remaining = minutes * 60;
  const display = document.getElementById('timer-display');
  if (!display) return;

  const interval = setInterval(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    if (remaining <= 0) {
      clearInterval(interval);
      alert('Time is up!');
    }
    remaining--;
  }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  showPage('home');
  updatePointsDisplay();
  updateLeaderboard();
});
