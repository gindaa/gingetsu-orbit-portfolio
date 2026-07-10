import { projectsData } from './data.js';
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

const currentTheme = localStorage.getItem('theme') || 'dark';
const isDark = currentTheme === 'dark';

const textMain = isDark ? '#f8fafc' : '#0f172a';
const textMuted = isDark ? '#94a3b8' : '#64748b';
const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose', // Required to render HTML inside nodes
  flowchart: {
    nodeSpacing: 60, // Tighter spacing so the nodes dominate the canvas
    rankSpacing: 80, // Tighter spacing to prevent the canvas from getting too wide
    curve: 'basis'
  },
  themeVariables: {
    primaryColor: 'transparent',
    primaryTextColor: textMain,
    primaryBorderColor: 'transparent',
    lineColor: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)',
    clusterBkg: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
    clusterBorder: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.3)',
    fontFamily: '"Space Grotesk", system-ui, sans-serif'
  },
  themeCSS: `
    .cluster rect {
      stroke-dasharray: 6 6 !important;
      stroke-width: 3px !important;
      stroke: ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.3)'} !important;
      rx: 20px !important;
      ry: 20px !important;
    }
    .node rect, .node polygon, .node circle {
      fill: transparent !important;
      stroke: transparent !important;
    }
    .edgePath .path {
      stroke-width: 3px !important; /* Extremely bold lines */
    }
    .edgeLabel {
      background-color: ${cardBg} !important;
      color: ${textMain} !important;
      font-size: 1.2rem !important; /* Massive edge text */
      font-weight: 700 !important;
      letter-spacing: 0.05em !important;
      padding: 10px 20px !important;
      border-radius: 20px !important;
      border: 2px solid ${borderColor} !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
    }
    .tech-icon {
      width: 5rem !important; /* Massive icons */
      height: 5rem !important;
      margin: 0 auto 1rem auto !important;
      opacity: 0.7 !important;
      transition: all 0.3s ease !important;
      filter: invert(${isDark ? 1 : 0}) !important;
      display: block !important;
    }
    .tech-icon.inline {
      display: inline-block !important;
      margin-bottom: 0 !important;
    }
    .node:hover .tech-icon {
      opacity: 1 !important;
      transform: scale(1.1) !important;
    }
    .node-title {
      font-weight: 700 !important;
      font-size: 1.8rem !important; /* Huge titles */
      color: ${textMain} !important;
      margin-bottom: 0.4rem !important;
    }
    .node-sub {
      font-size: 1.2rem !important; /* Huge subtitles */
      color: ${textMuted} !important;
    }
  `
});

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const project = projectsData[projectId];

  if (project) {
    // Populate Data
    document.title = `${project.title} - Gingetsu Orbit`;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-subtitle').textContent = project.subtitle;
    document.getElementById('project-description').innerHTML = project.description;
    document.getElementById('project-role').textContent = project.role;
    document.getElementById('project-year').textContent = project.year;
    document.getElementById('banner-text').textContent = project.title;
    
    // Banner Background
    const banner = document.getElementById('project-banner');
    const bannerText = document.getElementById('banner-text');
    
    // Always apply the gradient as the base
    banner.style.background = project.accentGradient;
    
    if (project.image) {
      // Create an overlay div for the logo if one doesn't exist
      let logoOverlay = document.getElementById('banner-logo-overlay');
      if (!logoOverlay) {
        logoOverlay = document.createElement('div');
        logoOverlay.id = 'banner-logo-overlay';
        logoOverlay.style.position = 'absolute';
        logoOverlay.style.inset = '0';
        banner.appendChild(logoOverlay);
      }
      banner.style.position = 'relative';
      logoOverlay.style.background = `url('${project.image}') center/contain no-repeat`;
      logoOverlay.style.backgroundSize = 'min(300px, 80%)'; // Ensure logo doesn't get too massive on desktop
      
      // Conditionally turn the logo pure white for solid line-art logos
      if (project.invertLogo) {
        logoOverlay.style.filter = 'brightness(0) invert(1)';
        logoOverlay.style.opacity = '0.5';
      } else {
        logoOverlay.style.filter = 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4))';
      }
      
      bannerText.style.display = 'none';
    } else {
      // Clean up overlay if returning to a project without an image
      const logoOverlay = document.getElementById('banner-logo-overlay');
      if (logoOverlay) logoOverlay.remove();
      bannerText.style.display = 'block';
    }

    // Tech Stack
    const techContainer = document.getElementById('project-tech');
    if (techContainer && project.techStack) {
      techContainer.innerHTML = '';
      project.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        techContainer.appendChild(span);
      });
    }

    // Tags
    const tagsContainer = document.getElementById('project-tags');
    if (tagsContainer && project.tags) {
      tagsContainer.innerHTML = '';
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }

    // Architecture Diagram (Mermaid Topology)
    const archSection = document.getElementById('architecture-section');
    const archToggle = document.getElementById('architecture-toggle');
    const archToggleIcon = document.getElementById('architecture-toggle-icon');
    const archWrapper = document.getElementById('architecture-wrapper');
    const archContainer = document.getElementById('project-architecture');

    if (project.architectureMermaid) {
      archSection.style.display = 'block';
      archContainer.style.display = 'block';
      archContainer.style.textAlign = 'center';
      archContainer.style.overflowX = 'auto';
      archContainer.style.paddingBottom = '1rem'; // Space for scrollbar if needed
      
      // Toggle Logic: Smooth Celestial Animation
      let isArchOpen = true;
      archToggle.addEventListener('click', () => {
        isArchOpen = !isArchOpen;
        if (isArchOpen) {
          archWrapper.style.gridTemplateRows = '1fr';
          archWrapper.style.opacity = '1';
          archContainer.style.transform = 'translateY(0)';
          archToggleIcon.style.transform = 'rotate(0deg)';
        } else {
          archWrapper.style.gridTemplateRows = '0fr';
          archWrapper.style.opacity = '0';
          archContainer.style.transform = 'translateY(-15px)';
          archToggleIcon.style.transform = 'rotate(-90deg)';
        }
      });
      
      const renderMermaid = async () => {
        archContainer.innerHTML = ''; // Clear previous render
        let mermaidData = project.architectureMermaid;
        
        // Responsive graph: Switch Left-to-Right to Top-Down on mobile
        if (window.innerWidth <= 900) {
          mermaidData = mermaidData.replace('graph LR', 'graph TD');
        }

        const tempDiv = document.createElement('div');
        tempDiv.className = 'mermaid';
        tempDiv.innerHTML = mermaidData;
        archContainer.appendChild(tempDiv);

        try {
          await mermaid.run({
            nodes: [tempDiv]
          });
        } catch (err) {
          console.error("Mermaid parsing failed", err);
        }
      };

      await renderMermaid();

      // Handle window resize dynamically with debounce to prevent performance hit
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Only re-render if it's currently visible to save performance
          if (isArchOpen) renderMermaid();
        }, 300);
      });
    } else {
      archSection.style.display = 'none';
    }

    // Live Link or Private Access
    const linkBtn = document.getElementById('project-live-link');
    if (project.liveLink && project.liveLink === "#") {
      linkBtn.style.display = 'inline-flex';
      linkBtn.href = `mailto:hello@gingetsu.com?subject=Private Demo Request: ${project.title}`;
      
      const textSpan = document.getElementById('project-live-link-text');
      if (textSpan) {
        textSpan.innerHTML = `
          <div class="morph-wrapper">
            <span class="morph-original">Request Private Demo 🔒</span>
            <span class="morph-hover">Under NDA - Request Access</span>
          </div>
        `;
      }
    } else if (project.liveLink && project.liveLink !== "#") {
      linkBtn.style.display = 'inline-flex';
      linkBtn.href = project.liveLink;
      
      const textSpan = document.getElementById('project-live-link-text');
      const displayUrl = project.liveLink.replace(/^https?:\/\//, '');
      
      if (textSpan) {
        textSpan.innerHTML = `
          <div class="morph-wrapper">
            <span class="morph-original">Visit Live Site</span>
            <span class="morph-hover">${displayUrl}</span>
          </div>
        `;
      }
    } else {
      linkBtn.style.display = 'none';
    }

    // Play Store Link
    const playStoreBtn = document.getElementById('project-playstore-link');
    if (project.playStoreLink) {
      playStoreBtn.style.display = 'inline-flex';
      playStoreBtn.href = project.playStoreLink;
    } else {
      playStoreBtn.style.display = 'none';
    }

    // iOS Link
    const iosBtn = document.getElementById('project-ios-link');
    if (project.iosLink) {
      iosBtn.style.display = 'inline-flex';
      iosBtn.href = project.iosLink;
    } else {
      iosBtn.style.display = 'none';
    }
  } else {
    // Fallback if ID is invalid
    document.getElementById('project-title').textContent = "Project Not Found";
    document.getElementById('project-subtitle').textContent = "Return to home to view available projects.";
    document.getElementById('project-description').textContent = "";
    document.getElementById('project-live-link').style.display = 'none';
    document.getElementById('project-architecture').style.display = 'none';
  }
});
