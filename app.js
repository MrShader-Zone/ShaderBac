
document.addEventListener('DOMContentLoaded', function () {
  const buttons = Array.from(document.querySelectorAll('.accordion-btn'));
  const audio = document.getElementById('bgMusic');

  function setPanel(button, open) {
    const panel = button.nextElementSibling;
    if (!panel || !panel.classList.contains('accordion-panel')) return;
    button.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      setPanel(button, !button.classList.contains('is-open'));
      startMusic();
    });
  });

  function startMusic() {
    if (!audio) return;
    audio.volume = 0.35;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {});
    }
  }

  document.addEventListener('click', startMusic, { once: true });
  document.addEventListener('touchstart', startMusic, { once: true, passive: true });



  function updateBacCountdown() {
    const countdown = document.getElementById('bacCountdown');
    if (!countdown) return;

    // Proba scrisă la Limba și literatura română, sesiunea a II-a iulie-august 2026.
    // Ora 09:00, fusul României (UTC+03 în august).
    const target = new Date('2026-08-10T09:00:00+03:00').getTime();
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      countdown.textContent = 'Bacul din sesiunea a II-a a început';
      return;
    }

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    const days = Math.floor(diff / day);
    diff %= day;
    const hours = Math.floor(diff / hour);
    diff %= hour;
    const minutes = Math.floor(diff / minute);
    diff %= minute;
    const seconds = Math.floor(diff / second);

    countdown.textContent = `${days} zile • ${hours} ore • ${minutes} min • ${seconds} sec`;
  }

  updateBacCountdown();
  setInterval(updateBacCountdown, 1000);

  // Încercare de autoplay pentru laptop; pe telefon pornește la prima atingere.
  setTimeout(startMusic, 300);
});
