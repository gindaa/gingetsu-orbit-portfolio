import { experiencesData, projectsData } from './data.js';

const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const htmlElement = document.documentElement;

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
if (moonIcon && sunIcon) updateIcons(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (moonIcon && sunIcon) updateIcons(newTheme);
  });
}

function updateIcons(theme) {
  if (theme === 'dark') {
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
  } else {
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
  }
}

// Generate subtle starry background
const starsContainer = document.createElement('div');
starsContainer.className = 'stars-container';
// Insert right after body start
document.body.insertBefore(starsContainer, document.body.firstChild);

// 70 stars for a minimalist, non-overwhelming effect
for (let i = 0; i < 70; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  // Random position
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  // Randomize animation delay so they don't all twinkle at once
  star.style.animationDelay = `${Math.random() * 4}s`;
  // Randomize size slightly
  const size = Math.random() * 1.5 + 0.5;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  starsContainer.appendChild(star);
}

// Generate light mode atmospheric orbs
const orbsContainer = document.createElement('div');
orbsContainer.className = 'orbs-container';
document.body.insertBefore(orbsContainer, document.body.firstChild);

const orb1 = document.createElement('div');
orb1.className = 'orb orb-1';
const orb2 = document.createElement('div');
orb2.className = 'orb orb-2';

orbsContainer.appendChild(orb1);
orbsContainer.appendChild(orb2);

// --------------------------------------------------------
// Render Experiences & Handle Modal
// --------------------------------------------------------
const timelineContainer = document.getElementById('experience-timeline');
const experienceWrapper = document.getElementById('experience-wrapper');
const expDetailsClose = document.getElementById('exp-details-close');

if (timelineContainer && experienceWrapper) {
  // Render timeline items
  experiencesData.forEach((exp) => {
    const item = document.createElement('div');
    item.className = 'timeline-item glass';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3>${exp.role}</h3>
        <h4>${exp.company}</h4>
        <span class="date">${exp.date}</span>
        <p>${exp.shortDesc}</p>
      </div>
    `;
    
    // Click event to open details
    item.addEventListener('click', () => {
      document.getElementById('exp-details-role').textContent = exp.role;
      document.getElementById('exp-details-company').textContent = exp.company;
      document.getElementById('exp-details-date').textContent = exp.date;
      
      const respContainer = document.getElementById('exp-details-responsibilities');
      respContainer.innerHTML = '';
      exp.responsibilities.forEach(r => {
        const li = document.createElement('li');
        respContainer.appendChild(li);
        const scrambler = new TextScrambler(li);
        scrambler.setText(r);
      });
      
      const projContainer = document.getElementById('exp-details-projects');
      const projTitle = document.getElementById('exp-details-projects-title');
      projContainer.innerHTML = '';
      
      if (exp.relatedProjects && exp.relatedProjects.length > 0) {
        projTitle.style.display = 'block';
        exp.relatedProjects.forEach(projId => {
          const proj = projectsData[projId];
          if (proj) {
            const card = document.createElement('a');
            card.href = '/project.html?id=' + projId;
            card.className = 'project-card glass';
            card.innerHTML = `
              <div class="project-image" style="background: ${proj.accentGradient || '#2a2a2a'}; position: relative; height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="${proj.image}" alt="${proj.title}" style="max-width: 60%; max-height: 60%; object-fit: contain; ${proj.invertLogo ? 'filter: brightness(0) invert(1); opacity: 0.8;' : 'opacity: 0.9;'}">
              </div>
              <div class="project-info" style="padding: 0.75rem;">
                <h3 style="margin-bottom: 0.15rem; font-size: 0.95rem;">${proj.title}</h3>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0; line-height: 1.2;">${proj.shortDesc || proj.subtitle || ''}</p>
              </div>
            `;
            projContainer.appendChild(card);
          }
        });
      } else {
        projTitle.style.display = 'none';
      }
      
      experienceWrapper.classList.add('split-active');
    });
    
    timelineContainer.appendChild(item);
  });
  
  // Close details logic
  if (expDetailsClose) {
    expDetailsClose.addEventListener('click', () => {
      experienceWrapper.classList.remove('split-active');
    });
  }
}
// Celestial HUD Logic
function updateCelestialHUD() {
  const timeEl = document.getElementById('hud-time');
  const dateEl = document.getElementById('hud-date');
  const moonEl = document.getElementById('hud-moon');
  
  if (!timeEl || !dateEl || !moonEl) return;
  
  const now = new Date();
  
  // Update Time (HH:MM:SS)
  const timeStr = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  timeEl.textContent = timeStr;
  
  // Update Date
  const dateStr = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  dateEl.textContent = dateStr;
  
  // Calculate Moon Phase
  const LUNAR_MONTH = 29.530588;
  const newMoon = new Date(Date.UTC(2000, 0, 6, 12, 24, 1));
  const diff = now.getTime() - newMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  const phase = (days % LUNAR_MONTH) / LUNAR_MONTH;
  const normalizedPhase = phase < 0 ? phase + 1 : phase;
  
  let phaseName = 'New Moon';
  let icon = '🌑';
  
  
  if (normalizedPhase > 0.02 && normalizedPhase < 0.23) { phaseName = 'Waxing Crescent'; }
  else if (normalizedPhase >= 0.23 && normalizedPhase < 0.27) { phaseName = 'First Quarter'; }
  else if (normalizedPhase >= 0.27 && normalizedPhase < 0.48) { phaseName = 'Waxing Gibbous'; }
  else if (normalizedPhase >= 0.48 && normalizedPhase < 0.52) { phaseName = 'Full Moon'; }
  else if (normalizedPhase >= 0.52 && normalizedPhase < 0.73) { phaseName = 'Waning Gibbous'; }
  else if (normalizedPhase >= 0.73 && normalizedPhase < 0.77) { phaseName = 'Last Quarter'; }
  else if (normalizedPhase >= 0.77 && normalizedPhase < 0.98) { phaseName = 'Waning Crescent'; }

  if (timeEl) timeEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
  if (moonEl) {
    moonEl.textContent = phaseName;
  }
}

// Initialize and set interval
setInterval(updateCelestialHUD, 1000);
updateCelestialHUD();

// --------------------------------------------------------
// Text Scramble Utility
// --------------------------------------------------------
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud" style="opacity: 0.5; font-family: monospace;">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// --------------------------------------------------------
// Download Sequence Logic
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-dossier-btn');
  const downloadHud = document.getElementById('download-hud');
  const hudStatusText = document.getElementById('hud-status-text');
  const hudProgress = document.getElementById('hud-progress');

  if (downloadBtn && downloadHud) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Stop immediate download
      
      const fileUrl = downloadBtn.getAttribute('href');
      const fileName = downloadBtn.getAttribute('download');
      
      // Hide the button and show the HUD
      downloadBtn.style.display = 'none';
      downloadHud.classList.remove('hidden');
      
      // Reset HUD state
      hudProgress.style.width = '0%';
      hudStatusText.textContent = 'ESTABLISHING SECURE CONNECTION...';
      
      // Phase 1: Connection
      setTimeout(() => {
        hudProgress.style.width = '20%';
        hudStatusText.textContent = 'EXTRACTING TECHNICAL DATA...';
      }, 500);
      
      // Phase 2: Processing
      setTimeout(() => {
        hudProgress.style.width = '70%';
        hudStatusText.textContent = 'COMPILING DOSSIER...';
      }, 1200);
      
      // Phase 3: Complete
      setTimeout(() => {
        hudProgress.style.width = '100%';
        hudStatusText.textContent = 'DATA TRANSFER COMPLETE.';
        hudStatusText.style.color = '#10b981'; // Success green
        
        // Trigger actual download programmatically
        const tempLink = document.createElement('a');
        tempLink.href = fileUrl;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        // Reset and restore after a moment
        setTimeout(() => {
          downloadHud.classList.add('hidden');
          downloadBtn.style.display = 'inline-block';
          hudProgress.style.width = '0%';
          hudStatusText.style.color = 'var(--accent)';
        }, 3000);
        
      }, 2000);
    });
  }
});
