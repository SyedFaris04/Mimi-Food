/* ─────────────────────────────────────────────
   MimiFood – script.js
   Screen navigation + micro-interactions
   ───────────────────────────────────────────── */

// ── SCREEN NAVIGATION ──────────────────────
function goTo(screenId) {
  const all = document.querySelectorAll('.screen');
  const target = document.getElementById(screenId);
  if (!target) return;

  all.forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  target.style.display = 'flex';
  // Small RAF so display:flex takes effect before animation
  requestAnimationFrame(() => {
    target.classList.add('active');
    // Scroll to top
    const scroll = target.querySelector('.screen-scroll');
    if (scroll) scroll.scrollTop = 0;
  });
}

// ── CHIP SELECTION ─────────────────────────
function selectChip(el, groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

// ── QTY CONTROL ────────────────────────────
function changeQty(delta) {
  const el = document.getElementById('qty-val');
  if (!el) return;
  let val = parseInt(el.textContent) + delta;
  if (val < 1) val = 1;
  el.textContent = val;
  // Update button label
  const addBtn = document.querySelector('#screen-food-detail .sticky-cart-bar .btn-primary');
  if (addBtn) {
    const basePrice = 6.50;
    addBtn.textContent = `Add to Cart — RM${(basePrice * val).toFixed(2)}`;
  }
}

// ── STAR RATING ────────────────────────────
function rateStar(n) {
  const stars = document.querySelectorAll('#star-row .star');
  stars.forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

// ── PAYMENT OPTION SELECT ──────────────────
function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(o => {
    o.classList.remove('selected');
    // remove tick
    const tick = o.querySelector('.radio-tick');
    if (tick) tick.remove();
  });
  el.classList.add('selected');
  // add tick
  const tick = document.createElement('span');
  tick.className = 'radio-tick';
  tick.textContent = '✔';
  el.appendChild(tick);
}

// ── AUTO-ADVANCE SPLASH ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Show splash first
  goTo('screen-splash');

  // Advance to onboarding after 2.2s
  setTimeout(() => {
    goTo('screen-onboard');
  }, 2200);

  // Touch / click on splash to skip
  const splash = document.getElementById('screen-splash');
  if (splash) {
    splash.addEventListener('click', () => goTo('screen-onboard'));
  }
});
