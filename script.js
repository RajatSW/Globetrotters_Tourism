// Helper: Smooth scroll to anchors
function scrollToSection(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({behavior:'smooth', block:'start'});
}

// Navbar hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if(hamburger && navLinks){
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
  });
  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Service cards scroll behavior
document.querySelectorAll('.service-card').forEach(card => {
  const target = card.getAttribute('data-scrollto');
  card.addEventListener('click', () => target && scrollToSection(target));
  card.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') target && scrollToSection(target);
  });
});

// Booking form -> show modal
const form = document.getElementById('booking-form');
const modal = document.getElementById('booking-modal');
const modalSummary = document.getElementById('modal-summary-text');
const closeModal = document.getElementById('close-modal');

if(form && modal){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const place = document.getElementById('search-destination').value.trim();
    const date = document.getElementById('travel-date').value;
    if(!place || !date){ return; }
    const pretty = new Date(date).toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'});
    modalSummary.textContent = `${place} on ${pretty}`;

    // Use <dialog> API
    if(typeof modal.showModal === 'function'){
      modal.showModal();
    } else {
      modal.setAttribute('open', true);
    }
  });
}

if(closeModal && modal){
  closeModal.addEventListener('click', () => {
    if(typeof modal.close === 'function'){
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  });
}

// Live filter for grid (banner input + dedicated input)
const grid = document.getElementById('destination-grid');
const bannerInput = document.getElementById('search-destination');
const gridInput = document.getElementById('grid-filter');
const clearFilterBtn = document.getElementById('clear-filter');

function applyFilter(value){
  if(!grid) return;
  const q = (value || '').toLowerCase().trim();
  grid.querySelectorAll('.destination-card').forEach(card => {
    const name = card.getAttribute('data-name') || '';
    const hit = name.toLowerCase().includes(q);
    card.style.display = hit ? '' : 'none';
  });
}

[bannerInput, gridInput].forEach(inp => {
  if(!inp) return;
  ['input','keyup','change'].forEach(evt => {
    inp.addEventListener(evt, () => applyFilter(inp.value));
  });
});

if(clearFilterBtn){
  clearFilterBtn.addEventListener('click', () => {
    if(gridInput){ gridInput.value = ''; }
    if(bannerInput){ bannerInput.value = ''; }
    applyFilter('');
    bannerInput?.focus();
  });
}

// Footer year
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = String(new Date().getFullYear()); }