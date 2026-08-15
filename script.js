document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- live clock ---------- */
function updateClock(){
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if(h === 0) h = 12;
  document.getElementById('clock').textContent = `${h}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000 * 30);

/* ---------- scroll progress bar ---------- */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';

  document.getElementById('toTop').classList.toggle('visible', h.scrollTop > 600);
});

/* ---------- back to top ---------- */
document.getElementById('toTop').addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior:'smooth'});
});
document.getElementById('backBtn').addEventListener('click', ()=>{
  document.getElementById('home').scrollIntoView({behavior:'smooth'});
});

/* ---------- hide/show ID card ---------- */
const idCardWrap = document.getElementById('idCardWrap');
const hideCardBtn = document.getElementById('hideCardBtn');
hideCardBtn.addEventListener('click', ()=>{
  const hidden = idCardWrap.classList.toggle('hidden');
  hideCardBtn.textContent = hidden ? 'SHOW CARD' : 'HIDE CARD';
});

/* ---------- showcase tabs ---------- */
const tabsWrap = document.getElementById('showcaseTabs');
const tabs = [...tabsWrap.querySelectorAll('.tab')];
const tabSlide = tabsWrap.querySelector('.tab-slide');
const panels = [...document.querySelectorAll('.showcase-panel')];

function moveTabSlide(el){
  tabSlide.style.width = el.offsetWidth + 'px';
  tabSlide.style.transform = `translateX(${el.offsetLeft - 6}px)`;
}
window.addEventListener('load', ()=> moveTabSlide(tabsWrap.querySelector('.tab.active')));

tabs.forEach(tab=>{
  tab.addEventListener('click', ()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    moveTabSlide(tab);
    panels.forEach(p=>p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
  });
});

/* ---------- reveal on scroll ---------- */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.about-card').forEach(el=>revealObserver.observe(el));

/* ---------- contact form (mailto) ---------- */
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const msg = document.getElementById('cfMessage').value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name}`);
  window.location.href = `mailto:oussamaossalh67@email.com?subject=${subject}&body=${body}`;
});

/* ---------- mobile hamburger ---------- */
const hamburger = document.getElementById('hamburger');
const mainnav = document.querySelector('.mainnav');
hamburger.addEventListener('click', ()=>{
  mainnav.classList.toggle('mobile-open');
  mainnav.style.display = mainnav.classList.contains('mobile-open') ? 'flex' : '';
});
