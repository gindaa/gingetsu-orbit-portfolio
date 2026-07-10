import { experiencesData, projectsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const classicBtn = document.getElementById('global-mode-classic');
  const universeBtn = document.getElementById('global-mode-universe');
  const mainContent = document.getElementById('main-content');
  const universeOverlay = document.getElementById('universe-overlay');
  const celestialHud = document.getElementById('celestial-hud');
  
  if (!classicBtn || !universeBtn) return;

  // Toggle Logic
  classicBtn.addEventListener('click', () => {
    classicBtn.classList.add('active');
    universeBtn.classList.remove('active');
    universeOverlay.style.display = 'none';
    if (celestialHud) celestialHud.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = '';
    const navLinks = document.getElementById('nav-links-container');
    if (navLinks) navLinks.style.display = '';
    stopAnimation();
  });

  universeBtn.addEventListener('click', () => {
    universeBtn.classList.add('active');
    classicBtn.classList.remove('active');
    mainContent.style.display = 'none';
    universeOverlay.style.display = 'block';
    if (celestialHud) celestialHud.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent scrolling behind canvas
    const navLinks = document.getElementById('nav-links-container');
    if (navLinks) navLinks.style.display = 'none';
    startAnimation();
  });

  const universeData = {
    core: { x: 0, y: 0, title: "Baginda Praka Ginting", desc: "Lead Mobile Engineer & Full-Stack Consultant", skills: [] }
  };

  // Parse Skills
  document.querySelectorAll('.skills span').forEach(el => {
    universeData.core.skills.push(el.textContent);
  });

  // --------------------------------------------------------
  // Canvas Setup
  // --------------------------------------------------------
  const canvas = document.getElementById('universe-canvas');
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let animationFrameId;

  // Camera & Interaction State
  let camera = { x: 0, y: 0, zoom: 1 };
  window.test_camera = camera;
  let targetCameraX = 0;
  let targetCameraY = 0;
  let preJumpCameraX = 0;
  let preJumpCameraY = 0;
  let preJumpZoom = 1;
  let targetZoom = 1.0;
  
  let isHyperjumping = false;
  let hyperjumpStartTime = 0;
  let hyperjumpDuration = 1200;
  
  let isReturningToOrbit = false;
  let returnStartTime = 0;
  let returnDuration = 1000;
  let startReturnZoom = 1;
  let startReturnX = 0;
  let startReturnY = 0;
  
  // Exploration Mode State
  let isExploring = false;
  let exploreIndex = 0;
  let expStarsOnly = []; // We will extract experience stars specifically to navigate them

  window.test_vars = {
    triggerReturn: () => {
      isReturningToOrbit = true;
      returnStartTime = Date.now();
      startReturnZoom = camera.zoom;
      startReturnX = camera.x;
      startReturnY = camera.y;
      targetCameraX = width / 2;
      targetCameraY = height / 2;
      targetZoom = 1;
    }
  };
  
  let isDragging = false;
  let lastMouse = { x: 0, y: 0 };
  let mouse = { x: -1000, y: -1000, worldX: -1000, worldY: -1000 };
  
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Initial camera position (centered on Core)
    if (camera.x === 0 && camera.y === 0) {
      camera.x = width / 2;
      camera.y = height / 2;
      targetCameraX = width / 2;
      targetCameraY = height / 2;
    }
  }
  
  window.addEventListener('resize', resize);

  // Mouse Handlers
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Calculate world coordinates (where mouse is in the universe, taking zoom into account)
    mouse.worldX = (mouse.x - camera.x) / camera.zoom;
    mouse.worldY = (mouse.y - camera.y) / camera.zoom;
    
    if (isDragging && !isExploring && !isHyperjumping && !isReturningToOrbit) {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      targetCameraX += dx;
      targetCameraY += dy;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    }
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isExploring || isHyperjumping || isReturningToOrbit) return;
    const zoomAmount = e.deltaY * -0.001;
    let newZoom = targetZoom * (1 + zoomAmount);
    newZoom = Math.max(0.3, Math.min(newZoom, 3)); // clamp zoom
    
    // Adjust target so zooming focuses on mouse cursor
    // The point under the mouse shouldn't move in screen space
    const zoomRatio = newZoom / targetZoom;
    targetCameraX = mouse.x - (mouse.x - targetCameraX) * zoomRatio;
    targetCameraY = mouse.y - (mouse.y - targetCameraY) * zoomRatio;
    
    targetZoom = newZoom;
  }, { passive: false });

  // --------------------------------------------------------
  // Physics & Star Generation
  // --------------------------------------------------------
  let stars = [];
  let links = []; // lines between stars
  
  function generateUniverse() {
    stars = [];
    links = [];
    
    // 1. Massive Moon (About Me) detached from constellation
    const moon = {
      type: 'moon',
      baseX: -250, baseY: -200,
      driftSpeed: 0, driftOffset: 0, driftRadius: 0,
      radius: 40,       // Less big, but still prominent
      glow: 60,
      data: universeData.core,
      satellites: []
    };
    stars.push(moon);
    
    // Core Skills (Orbiting the massive Moon)
    universeData.core.skills.forEach((skill, i) => {
      const angle = (Math.PI * 2 / universeData.core.skills.length) * i;
      moon.satellites.push({
        text: skill,
        angle: angle,
        distance: 80 + Math.random() * 20, // Closer orbit
        speed: (Math.random() * 0.001) + 0.0005,
        radius: 2 + Math.random()
      });
    });

    // 2. Experience Constellation (Timeline / Linear)
    const eStarsMap = {};
    let prevExp = null;
    
    const startX = -600;
    const endX = 600;
    experiencesData.forEach((exp, i) => {
      const stepX = (endX - startX) / Math.max(1, experiencesData.length - 1);
      const px = startX + (i * stepX);
      // Zigzag Y position for a natural constellation look
      const py = (i % 2 === 0) ? -50 - Math.random() * 80 : 50 + Math.random() * 80;
      
      const eStar = {
        type: 'experience',
        baseX: px, baseY: py,
        driftSpeed: 0.01 + Math.random() * 0.01,
        driftOffset: Math.random() * Math.PI * 2,
        driftRadius: 5 + Math.random() * 10,
        radius: 8 + Math.random() * 2,
        glow: 20,
        data: {
          title: exp.role + ' @ ' + exp.company,
          desc: exp.shortDesc,
          date: exp.date,
          originalData: exp
        },
        satellites: []
      };
      
      eStarsMap[exp.id] = eStar;
      
      if (prevExp) links.push({ s1: prevExp, s2: eStar, type: 'constellation-link' });
      prevExp = eStar;
      stars.push(eStar);
      expStarsOnly.push(eStar); // Store for exploration mode
    });

    // 4. Projects (Orbiting their Experience)
    const pStarsMap = {};
    Object.keys(projectsData).forEach((projId) => {
      const proj = projectsData[projId];
      // Find which experience owns this project
      let ownerExp = null;
      for (const exp of experiencesData) {
        if (exp.relatedProjects && exp.relatedProjects.includes(projId)) {
          ownerExp = eStarsMap[exp.id];
          break;
        }
      }
      
      const pStar = {
        type: 'project',
        baseX: 0, baseY: 0, 
        driftSpeed: 0.01 + Math.random() * 0.01,
        driftOffset: Math.random() * Math.PI * 2,
        driftRadius: 5 + Math.random() * 10,
        radius: 5 + Math.random() * 2,
        glow: 25,
        data: {
          title: proj.title,
          desc: proj.shortDesc,
          tags: proj.tags || [],
          link: '/project.html?id=' + projId
        },
        satellites: []
      };
      
      if (ownerExp) {
        pStar.orbitCenter = ownerExp;
        const expData = ownerExp.data.originalData;
        const pIndex = expData.relatedProjects.indexOf(projId);
        const totalP = expData.relatedProjects.length;
        
        pStar.orbitAngle = (Math.PI * 2 / totalP) * pIndex;
        // highly randomized distance from experience star
        pStar.orbitDistance = 60 + Math.random() * 120;
        pStar.orbitSpeed = (Math.random() * 0.0005) + 0.0002 * (Math.random() > 0.5 ? 1 : -1);
        
        links.push({ s1: ownerExp, s2: pStar, type: 'orbit-link' });
      } else {
        // Orphan projects orbit the moon
        pStar.orbitCenter = moon;
        pStar.orbitAngle = Math.random() * Math.PI * 2;
        pStar.orbitDistance = 150 + Math.random() * 50;
        pStar.orbitSpeed = 0.0002;
        links.push({ s1: moon, s2: pStar, type: 'orbit-link' });
      }
      
      pStarsMap[projId] = pStar;
      
      if (proj.tags) {
        proj.tags.forEach((tag, j) => {
          pStar.satellites.push({
            text: tag,
            angle: (Math.PI * 2 / proj.tags.length) * j,
            distance: 35 + Math.random() * 35,
            speed: (Math.random() * 0.001) + 0.0005,
            radius: 1.5
          });
        });
      }
      stars.push(pStar);
    });
  }

  // --------------------------------------------------------
  // Helper: Real-world Moon Phase
  // --------------------------------------------------------
  function getMoonPhase() {
    const LUNAR_MONTH = 29.530588;
    // Known new moon: Jan 6, 2000, 12:24:01 UTC
    const newMoon = new Date(Date.UTC(2000, 0, 6, 12, 24, 1));
    const now = new Date();
    const diff = now.getTime() - newMoon.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    const phase = (days % LUNAR_MONTH) / LUNAR_MONTH;
    return phase < 0 ? phase + 1 : phase;
  }

  // --------------------------------------------------------
  // Render Loop
  // --------------------------------------------------------
  function draw() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const starColor = isDark ? '255, 255, 255' : '15, 23, 42';
    const coreColor = isDark ? '226, 232, 240' : '71, 85, 105'; // Silver moonlight for the moon
    const accentColor = isDark ? '148, 163, 184' : '100, 116, 139'; 

    // Smooth camera interpolation
      if (isHyperjumping) {
        const progress = Math.min(1, (Date.now() - hyperjumpStartTime) / hyperjumpDuration);
        // Exponential ease-in for a classic "warp" effect (starts slow, then sudden extreme burst)
        const easeCamera = Math.pow(progress, 5); 
        
        const moon = stars.find(s => s.type === 'moon');
        if (moon) {
          targetZoom = 1 + (200 * easeCamera); // Extreme zoom!
          targetCameraX = (width / 2) - (moon.baseX * targetZoom);
          targetCameraY = (height / 2) - (moon.baseY * targetZoom);
        }
        
        // During warp, follow the exact ease curve for dramatic speed change rather than lerping softly
        camera.x = targetCameraX;
        camera.y = targetCameraY;
        camera.zoom = targetZoom;
        
      } else if (isReturningToOrbit) {
        const progress = Math.min(1, (Date.now() - returnStartTime) / returnDuration);
        const easeOut = 1 - Math.pow(1 - progress, 3); // cubic ease out
        
        camera.zoom = startReturnZoom + (targetZoom - startReturnZoom) * easeOut;
        camera.x = startReturnX + (targetCameraX - startReturnX) * easeOut;
        camera.y = startReturnY + (targetCameraY - startReturnY) * easeOut;
        
        if (progress === 1) isReturningToOrbit = false;
        
      } else {
        camera.x += (targetCameraX - camera.x) * 0.05;
        camera.y += (targetCameraY - camera.y) * 0.05;
        camera.zoom += (targetZoom - camera.zoom) * 0.05;
      }
      
      // Clear with slight trail effect based on hyperjump
      const bgColorDark = '10, 10, 15';
      const bgColorLight = '248, 250, 252'; // matching var(--bg-color) in light mode
      const bgColor = isDark ? bgColorDark : bgColorLight;
      ctx.fillStyle = isHyperjumping ? `rgba(${bgColor}, 0.3)` : `rgba(${bgColor}, 1)`;
      ctx.fillRect(0, 0, width, height);

    ctx.save();
    // Apply camera transform
    ctx.translate(camera.x, camera.y);
    ctx.scale(camera.zoom, camera.zoom);
    
    let hoveredStar = null;
    const time = (Date.now() % 1000000) * 0.001;

    // Update orbital positions first!
    stars.forEach(star => {
      if (star.orbitCenter) {
        star.orbitAngle += star.orbitSpeed;
        star.baseX = star.orbitCenter.baseX + Math.cos(star.orbitAngle) * star.orbitDistance;
        star.baseY = star.orbitCenter.baseY + Math.sin(star.orbitAngle) * star.orbitDistance;
      }
    });

    // --------------------------------------------------------
    // Calculate un-zoomed, absolute screen coordinates first
    // so we can draw lines between them accurately.
    // --------------------------------------------------------
    stars.forEach(star => {
      let bx = star.baseX + Math.sin(time * star.driftSpeed + star.driftOffset) * star.driftRadius;
      let by = star.baseY + Math.cos(time * star.driftSpeed + star.driftOffset) * star.driftRadius;
      star.x = bx;
      star.y = by;
    });

    // Draw Links
    links.forEach(l => {
      ctx.beginPath();
      ctx.moveTo(l.s1.x, l.s1.y);
      ctx.lineTo(l.s2.x, l.s2.y);
      ctx.lineWidth = l.type === 'galaxy-link' ? 1.5 : (l.type === 'orbit-link' ? 0.5 : 0.5);
      ctx.strokeStyle = l.type === 'galaxy-link' ? `rgba(${accentColor}, 0.3)` : `rgba(${accentColor}, 0.15)`;
      if (l.type === 'galaxy-link') {
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = -time * 10;
      }
      if (l.type === 'orbit-link') {
        ctx.setLineDash([2, 4]);
        ctx.lineDashOffset = time * 10;
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
    });

    // Dynamic Constellation Web
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        
        if (s1.type === 'moon' || s2.type === 'moon') continue;
        
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        const threshold = 500;
        
        if (dist < threshold) {
          const opacity = (1 - dist / threshold) * 0.25; 
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.lineWidth = 1.5; // Thicker constellation lines
          ctx.strokeStyle = `rgba(${accentColor}, ${opacity * 1.5})`; // Even brighter
          ctx.stroke();
        }
      }
    }

    // --------------------------------------------------------
    // Stars Loop (Nodes)
    // --------------------------------------------------------
    stars.forEach(star => {
      // Base positions with drift
      let bx = star.baseX + Math.sin(time * star.driftSpeed + star.driftOffset) * star.driftRadius;
      let by = star.baseY + Math.cos(time * star.driftSpeed + star.driftOffset) * star.driftRadius;
      
      // Project to screen (simplified for this logic structure)
      let fx = bx;
      let fy = by;
      
      star.x = fx;
      star.y = fy;
      
      if (typeof star.hoverLerp === 'undefined') star.hoverLerp = 0;
      const distToMouse = Math.hypot(fx - mouse.worldX, fy - mouse.worldY);
      const isHovered = distToMouse < (star.radius * 3) / Math.max(0.5, camera.zoom); 
      
      if (isHovered) hoveredStar = star;
      
      // Smooth interpolation for hover state (gentle animation)
      const targetLerp = isHovered ? 1 : 0;
      star.hoverLerp += (targetLerp - star.hoverLerp) * 0.08;

      const hoverScale = 1 + (0.5 * star.hoverLerp);
      const cRadius = star.radius * hoverScale;
      const baseColor = star.type === 'moon' ? coreColor : starColor;

      // HYPERJUMP VISUALS
      if (isHyperjumping && star.type !== 'moon') {
         const progress = Math.min(1, (Date.now() - hyperjumpStartTime) / hyperjumpDuration);
         const stretch = Math.pow(progress, 3) * 100; // Massive star streak effect
         
         const moon = stars.find(s => s.type === 'moon');
         let moonFx = width / 2;
         let moonFy = height / 2;
         
         if (moon) {
           moonFx = moon.x;
           moonFy = moon.y;
         }
         
         const dx = fx - moonFx;
         const dy = fy - moonFy;
         
         ctx.beginPath();
         ctx.moveTo(fx, fy);
         ctx.lineTo(fx + dx * stretch, fy + dy * stretch);
         // Make streaks glow brighter and fade out exactly at the end
         ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - progress)})`;
         ctx.lineWidth = 1.5 * camera.zoom;
         ctx.stroke();
         return; 
      }
      
      // Draw Orbital Path (Always visible, brighter on hover of self or parent)
      if (star.orbitCenter) {
        ctx.beginPath();
        // Use star.orbitCenter.x/y for accurate center position accounting for drift
        ctx.arc(star.orbitCenter.x, star.orbitCenter.y, star.orbitDistance, 0, Math.PI * 2);
        
        const parentHoverLerp = star.orbitCenter.hoverLerp || 0;
        const combinedLerp = Math.max(star.hoverLerp, parentHoverLerp);
        
        // Base opacity is 0.05, increases to 0.4 on hover
        const ringOpacity = 0.05 + 0.35 * combinedLerp;
        ctx.strokeStyle = `rgba(${accentColor}, ${ringOpacity})`;
        ctx.lineWidth = 0.5 + 0.5 * combinedLerp; 
        
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -time * 15;
        ctx.stroke();
        
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;
      }
      
      // Draw Satellites
      if (star.satellites) {
        star.satellites.forEach(sat => {
          sat.angle += sat.speed;
          const sx = star.x + Math.cos(sat.angle) * sat.distance;
          const sy = star.y + Math.sin(sat.angle) * sat.distance;
          
          // Circular orbit ring for satellite (always visible, dashed, animated)
          ctx.beginPath();
          ctx.arc(star.x, star.y, sat.distance, 0, Math.PI * 2);
          const satRingOpacity = 0.03 + 0.15 * star.hoverLerp; // Brighter on hover
          ctx.strokeStyle = `rgba(${baseColor}, ${satRingOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([2, 5]);
          ctx.lineDashOffset = -time * 10;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineDashOffset = 0;
          
          // Spoke line (only visible on hover)
          ctx.strokeStyle = `rgba(${baseColor}, ${0.1 + 0.4 * star.hoverLerp})`;
          ctx.lineWidth = 1.0 + 1.5 * star.hoverLerp;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          
          // Satellite dot
          ctx.fillStyle = `rgba(${baseColor}, ${0.6 + 0.4 * star.hoverLerp})`;
          ctx.beginPath();
          ctx.arc(sx, sy, sat.radius, 0, Math.PI * 2);
          ctx.fill();
          
          if (isHovered || camera.zoom > 1.5) {
            ctx.font = `${10 / camera.zoom}px Outfit, sans-serif`;
            ctx.fillStyle = `rgba(${baseColor}, 0.9)`;
            ctx.fillText(sat.text, sx + (6 / camera.zoom), sy + (3 / camera.zoom));
          }
        });
      }
      
      // Draw Main Star/Moon
      ctx.shadowBlur = star.glow * (1 + star.hoverLerp);
      ctx.shadowColor = `rgba(${baseColor}, 0.8)`;
      ctx.fillStyle = `rgba(${baseColor}, 1)`;
      
      if (star.type === 'moon') {
        const p = getMoonPhase();
        const cosA = Math.cos(Math.PI * 2 * p);
        
        // --- Armillary Rings on Hover ---
        if (star.hoverLerp > 0.01) {
          ctx.save();
          const t = (Date.now() % 1000000) * 0.001;
          const ringOpacity = 0.5 * star.hoverLerp;
          const maxRingRadius = cRadius * 2.5;
          
          ctx.strokeStyle = `rgba(${baseColor}, ${ringOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 12]);

          // Ring 1 (tilted 30 degrees)
          ctx.beginPath();
          ctx.ellipse(star.x, star.y, maxRingRadius, maxRingRadius * 0.4, Math.PI / 6, 0, Math.PI * 2);
          ctx.lineDashOffset = -t * 20; // Animate dashes along the path
          ctx.stroke();

          // Ring 2 (tilted -30 degrees)
          ctx.beginPath();
          ctx.ellipse(star.x, star.y, maxRingRadius * 0.8, maxRingRadius, -Math.PI / 6, 0, Math.PI * 2);
          ctx.lineDashOffset = t * 20; // Animate dashes along the path in opposite direction
          ctx.stroke();

          // Pulse Field
          const pulsePhase = (t % 2) / 2; // 0 to 1
          ctx.beginPath();
          ctx.arc(star.x, star.y, cRadius + (maxRingRadius * pulsePhase), 0, Math.PI * 2);
          ctx.setLineDash([]);
          ctx.strokeStyle = `rgba(${baseColor}, ${(1 - pulsePhase) * ringOpacity})`;
          ctx.stroke();
          
          ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = `rgba(${baseColor}, 0.15)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, cRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = star.glow * (1 + star.hoverLerp);
        ctx.shadowColor = `rgba(${baseColor}, 0.8)`;
        ctx.fillStyle = `rgba(${baseColor}, 1)`;
        
        ctx.beginPath();
        if (p < 0.5) {
          ctx.arc(star.x, star.y, cRadius, -Math.PI/2, Math.PI/2, false);
          ctx.ellipse(star.x, star.y, Math.abs(cosA) * cRadius, cRadius, 0, Math.PI/2, -Math.PI/2, cosA > 0);
        } else {
          ctx.arc(star.x, star.y, cRadius, Math.PI/2, -Math.PI/2, false);
          ctx.ellipse(star.x, star.y, Math.abs(cosA) * cRadius, cRadius, 0, -Math.PI/2, Math.PI/2, cosA > 0);
        }
        ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(star.x, star.y, cRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      
      // Draw Label if zoomed in enough or hovered
      if (isHovered || camera.zoom > 1.2 || star.type === 'moon') {
        if (star.type === 'moon') {
          // No canvas text on hover; HTML tooltip handles it.
          const standardAlpha = 1 - star.hoverLerp;
          if (standardAlpha > 0.01) {
            ctx.fillStyle = `rgba(${baseColor}, ${standardAlpha})`;
            ctx.font = `600 ${18 / camera.zoom}px Outfit, sans-serif`;
            ctx.fillText('Engage the journey', star.x + cRadius + (10 / camera.zoom), star.y + (4 / camera.zoom));
          }
        } else {
          // Normal Project/Experience Label
          if (star.data.title) {
            ctx.font = `${14 / camera.zoom}px Outfit, sans-serif`;
            ctx.fillStyle = `rgba(${baseColor}, 0.9)`;
            ctx.fillText(star.data.title, star.x + cRadius + (10 / camera.zoom), star.y + (4 / camera.zoom));
          }
        }
      }
    });
    
    ctx.restore();
    
    updateTooltip(hoveredStar);
    
    animationFrameId = requestAnimationFrame(draw);
  }

  // --------------------------------------------------------
  // Tooltip & Navigation
  // --------------------------------------------------------
  const tooltip = document.getElementById('universe-tooltip');
  const ttTitle = document.getElementById('u-tt-title');
  const ttSubtitle = document.getElementById('u-tt-subtitle');
  const ttDesc = document.getElementById('u-tt-desc');
  const ttTags = document.getElementById('u-tt-tags');
  const ttLink = tooltip.querySelector('.project-link');
  
  let currentHoveredNode = null;

  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\\\/[]{}—=+*^?#_';
  function scrambleText(el, finalHTML, isHTML = false, delayMs = 0) {
    if (!el) return;
    if (!finalHTML) return;
    if (el.scrambleInterval) clearInterval(el.scrambleInterval);
    if (el.scrambleTimeout) clearTimeout(el.scrambleTimeout);
    
    if (isHTML) el.innerHTML = '';
    else el.textContent = '';
    
    el.scrambleTimeout = setTimeout(() => {
      const duration = 400; 
      const start = Date.now();
      const plainText = isHTML ? finalHTML.replace(/<[^>]*>?/gm, '') : finalHTML;
      
      el.scrambleInterval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed >= duration) {
          clearInterval(el.scrambleInterval);
          if (isHTML) el.innerHTML = finalHTML;
          else el.textContent = finalHTML;
          return;
        }
        
        const progress = elapsed / duration;
        const splitIndex = Math.floor(plainText.length * progress);
        
        let scrambled = '';
        for(let i=0; i<plainText.length; i++) {
          if (i < splitIndex) {
            scrambled += plainText[i];
          } else if (plainText[i] === ' ') {
            scrambled += ' ';
          } else {
            scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        el.textContent = scrambled;
      }, 20);
    }, delayMs);
  }

  function updateTooltip(star) {
    if (star) {
      document.body.style.cursor = isDragging ? 'grabbing' : 'pointer';
      
      if (currentHoveredNode !== star) {
        currentHoveredNode = star;
        
        if (star.type === 'moon') {
          tooltip.classList.add('moon-hud');
          ttSubtitle.style.display = 'block';
          
          scrambleText(ttTitle, "CORE IDENTITY // GINGETSU ORBIT", false, 0);
          scrambleText(ttSubtitle, "Lead Mobile Engineer & IT System Architect", false, 250);
          scrambleText(ttDesc, "7+ years architecting resilient apps, navigating complex legacy migrations, and building high-performing engineering teams.", false, 500);
          
          ttTags.innerHTML = '';
          const coreSkills = ['Go', 'React', 'Kotlin', 'SwiftUI', 'AWS', 'System Architecture', 'CI/CD'];
          coreSkills.forEach(tag => {
            const s = document.createElement('span');
            s.textContent = tag;
            ttTags.appendChild(s);
          });
          ttLink.style.display = 'none';
        } else {
          tooltip.classList.remove('moon-hud');
          ttSubtitle.style.display = 'none';
          
          scrambleText(ttTitle, star.data.title, false, 0);
          scrambleText(ttDesc, star.data.desc || star.data.date, false, 200);
          
          ttTags.innerHTML = '';
          if (star.data.tags) {
            star.data.tags.forEach(tag => {
              const s = document.createElement('span');
              s.textContent = tag;
              ttTags.appendChild(s);
            });
          }
          
          if (star.type === 'project' && star.data.link) {
            ttLink.style.display = 'inline-flex';
          } else {
            ttLink.style.display = 'none';
          }
        }
      }
      
      let tx = mouse.x + 20;
      let ty = mouse.y + 20;
      
      if (tx + 300 > width) tx = mouse.x - 320;
      if (ty + 150 > height) ty = mouse.y - 160;
      
      tooltip.style.transform = `translate(${tx}px, ${ty}px)`;
      tooltip.style.opacity = '1';
      
    } else {
      document.body.style.cursor = isDragging ? 'grabbing' : (isDragging ? 'grabbing' : 'grab');
      tooltip.style.opacity = '0';
      currentHoveredNode = null;
    }
  }

  canvas.addEventListener('click', () => {
    if (currentHoveredNode && !isDragging) {
      if (currentHoveredNode.type === 'project' && currentHoveredNode.data.link) {
        window.location.href = currentHoveredNode.data.link;
      } else if (currentHoveredNode.type === 'experience') {
        const exp = currentHoveredNode.data.originalData;
        const expModal = document.getElementById('exp-details');
        if (exp && expModal) {
          document.getElementById('exp-details-role').textContent = exp.role;
          document.getElementById('exp-details-company').textContent = exp.company;
          document.getElementById('exp-details-date').textContent = exp.date;
          
          const respContainer = document.getElementById('exp-details-responsibilities');
          respContainer.innerHTML = '';
          if (exp.responsibilities) {
            exp.responsibilities.forEach(r => {
              const li = document.createElement('li');
              li.textContent = r;
              respContainer.appendChild(li);
            });
          }
          
          const projContainer = document.getElementById('exp-details-projects');
          const projTitle = document.getElementById('exp-details-projects-title');
          projContainer.innerHTML = '';
          
          if (exp.relatedProjects && exp.relatedProjects.length > 0 && typeof projectsData !== 'undefined') {
            projTitle.style.display = 'block';
            exp.relatedProjects.forEach(projId => {
              const proj = projectsData[projId];
              if (proj) {
                const card = document.createElement('a');
                card.href = proj.link || '#';
                card.className = 'project-card glass';
                card.innerHTML = `
                  <div class="project-image" style="background-image: url('${proj.image}'); ${proj.invertLogo ? 'filter: invert(1);' : ''}"></div>
                  <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.shortDesc}</p>
                  </div>
                `;
                projContainer.appendChild(card);
              }
            });
          } else {
            projTitle.style.display = 'none';
          }
          
          expModal.classList.add('active');
        }
      } else if (currentHoveredNode.type === 'moon') {
        if (!isHyperjumping) {
          document.getElementById('hyperjump-confirm').classList.remove('hidden');
          tooltip.style.opacity = '0';
        }
      }
    }
  });

  // --------------------------------------------------------
  // Hyperjump Confirmation Logic
  // --------------------------------------------------------
  const engageBtn = document.getElementById('engage-warp-btn');
  const cancelBtn = document.getElementById('cancel-warp-btn');
  const confirmOverlay = document.getElementById('hyperjump-confirm');

  if (engageBtn) {
    engageBtn.addEventListener('click', () => {
      confirmOverlay.classList.add('hidden');
      
      if (!isHyperjumping) {
        isHyperjumping = true;
        preJumpCameraX = targetCameraX;
        preJumpCameraY = targetCameraY;
        preJumpZoom = targetZoom;
        
        hyperjumpStartTime = Date.now();
        tooltip.style.opacity = '0';
        
        setTimeout(() => {
          const flash = document.getElementById('hyperjump-flash');
          const bridge = document.getElementById('ship-bridge');
          flash.classList.add('active');
          
          setTimeout(() => {
            bridge.classList.remove('hidden');
            flash.classList.remove('active');
            isHyperjumping = false;
            // The camera stays zoomed in visually until they exit
            initBridgeTerminal();
          }, 600); 
        }, hyperjumpDuration);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      confirmOverlay.classList.add('hidden');
    });
  }

  // --------------------------------------------------------
  // Ship's Bridge Logic
  // --------------------------------------------------------
  const bridgeCloseBtn = document.getElementById('bridge-close-btn');
  if (bridgeCloseBtn) {
    bridgeCloseBtn.addEventListener('click', () => {
      document.getElementById('ship-bridge').classList.add('hidden');
      
      if (expStarsOnly.length > 0) {
        isExploring = true;
        // Start from oldest (which is the last element in the array)
        exploreIndex = expStarsOnly.length - 1;
        document.getElementById('exploration-hud').classList.remove('hidden');
        document.getElementById('celestial-hud').classList.add('mobile-hidden');
        document.getElementById('exploration-status-indicator').classList.remove('hidden');
        navigateToExploreNode(exploreIndex);
      } else {
        // Fallback to orbit if no experiences
        triggerReturnToOrbit();
      }
    });
  }

  const bridgeCloseOrbitBtn = document.getElementById('bridge-close-orbit-btn');
  if (bridgeCloseOrbitBtn) {
    bridgeCloseOrbitBtn.addEventListener('click', () => {
      document.getElementById('ship-bridge').classList.add('hidden');
      triggerReturnToOrbit();
    });
  }

  function triggerReturnToOrbit() {
    isReturningToOrbit = true;
    returnStartTime = Date.now();
    startReturnZoom = camera.zoom;
    startReturnX = camera.x;
    startReturnY = camera.y;
    
    targetCameraX = width / 2;
    targetCameraY = height / 2;
    targetZoom = 1;
  }

  // Exploration Mode Navigation
  function navigateToExploreNode(index) {
    if (index < 0 || index >= expStarsOnly.length) return;
    exploreIndex = index;
    const star = expStarsOnly[exploreIndex];
    
    targetZoom = 2.5;
    // Position the star on the left (25% of screen width) to leave room for the HUD on the right
    targetCameraX = (width * 0.25) - (star.baseX * targetZoom);
    targetCameraY = (height / 2) - (star.baseY * targetZoom);
    
    updateExplorationHUD(star.data.originalData);
  }

  function updateExplorationHUD(exp) {
    scrambleText(document.getElementById('expl-title'), exp.role, false, 0);
    scrambleText(document.getElementById('expl-subtitle'), exp.company, false, 50);
    scrambleText(document.getElementById('expl-date'), exp.date, false, 100);
    scrambleText(document.getElementById('expl-desc'), exp.shortDesc, false, 150);
    
    const respContainer = document.getElementById('expl-responsibilities');
    respContainer.innerHTML = '';
    if (exp.responsibilities) {
      let delay = 200;
      exp.responsibilities.forEach(resp => {
        const li = document.createElement('li');
        respContainer.appendChild(li);
        scrambleText(li, resp, false, delay);
        delay += 50;
      });
    }

    const projectsContainer = document.getElementById('exploration-projects-external');
    if (projectsContainer) {
      projectsContainer.innerHTML = '';
      
      if (exp.relatedProjects && exp.relatedProjects.length > 0) {
        let delay = 300;
        exp.relatedProjects.forEach(projKey => {
          const proj = projectsData[projKey];
          if (proj) {
            const folder = document.createElement('a');
            folder.className = 'expl-project-folder';
            folder.href = `project.html?id=${projKey}`;
            folder.target = '_blank';
            folder.rel = 'noopener noreferrer';
            
            // Animation staggered entrance
            folder.style.opacity = '0';
            folder.style.transform = 'translateX(20px)';
            folder.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            const imgFilter = proj.invertLogo ? 'filter: brightness(0) invert(1); opacity: 0.8;' : 'opacity: 0.9;';
            const logoPath = proj.image || '/fallback_logo.png';
            
            folder.innerHTML = `
              <img src="${logoPath}" alt="${proj.title}" style="${imgFilter}">
              <div class="tooltip">${proj.title}</div>
            `;
            
            projectsContainer.appendChild(folder);
            
            // Trigger entrance animation
            setTimeout(() => {
              folder.style.opacity = '1';
              folder.style.transform = 'translateX(0)';
            }, delay);
            delay += 150;
          }
        });
      }
    }

    // Update buttons state
    document.getElementById('explore-next').style.visibility = (exploreIndex > 0) ? 'visible' : 'hidden'; // Index 0 is newest
    document.getElementById('explore-prev').style.visibility = (exploreIndex < expStarsOnly.length - 1) ? 'visible' : 'hidden';
  }

  const exploreNextBtn = document.getElementById('explore-next');
  if (exploreNextBtn) {
    exploreNextBtn.addEventListener('click', () => {
      if (exploreIndex > 0) {
        navigateToExploreNode(exploreIndex - 1); // Move towards newest (index 0)
      }
    });
  }

  const explorePrevBtn = document.getElementById('explore-prev');
  if (explorePrevBtn) {
    explorePrevBtn.addEventListener('click', () => {
      if (exploreIndex < expStarsOnly.length - 1) {
        navigateToExploreNode(exploreIndex + 1); // Move towards oldest
      }
    });
  }

  const exploreExitBtn = document.getElementById('explore-exit');
  const exploreStatusBtn = document.getElementById('exploration-status-indicator');
  
  const exitExplorationMode = () => {
    isExploring = false;
    document.getElementById('exploration-hud').classList.add('hidden');
    document.getElementById('celestial-hud').classList.remove('mobile-hidden');
    exploreStatusBtn.classList.add('hidden');
    const extDock = document.getElementById('exploration-projects-external');
    if (extDock) extDock.innerHTML = '';
    triggerReturnToOrbit();
  };

  if (exploreExitBtn) {
    exploreExitBtn.addEventListener('click', exitExplorationMode);
  }
  
  if (exploreStatusBtn) {
    exploreStatusBtn.addEventListener('click', exitExplorationMode);
  }

  function initBridgeTerminal() {
    const term = document.getElementById('bridge-terminal-text');
    if (!term) return;
    
    term.innerHTML = '';
    
    const lines = [
      "> INITIATING SYSTEM OVERRIDE...",
      "> ROOT ACCESS GRANTED.",
      "",
      "> LOADING DOSSIER: BAGINDA PRAKA GINTING",
      "> ROLE: LEAD MOBILE ENGINEER & SYSTEM ARCHITECT",
      "> EXP: 7+ YEARS IN HIGH-AVAILABILITY ENVIRONMENTS",
      "",
      "> ACCOMPLISHMENTS:",
      "  - Architected resilient mobile applications.",
      "  - Navigated complex legacy system migrations.",
      "  - Built & scaled high-performing engineering teams.",
      "  - Drove technical strategy across multiple platforms.",
      "",
      "> READY FOR COMMAND INPUT..."
    ];
    
    let lineIdx = 0;
    
    function typeLine() {
      if (lineIdx >= lines.length) return;
      
      const lineDiv = document.createElement('div');
      term.appendChild(lineDiv);
      
      const text = lines[lineIdx];
      let charIdx = 0;
      
      const typeInterval = setInterval(() => {
        lineDiv.textContent += text[charIdx];
        charIdx++;
        
        if (charIdx >= text.length) {
          clearInterval(typeInterval);
          lineIdx++;
          setTimeout(typeLine, Math.random() * 200 + 100);
        }
      }, 20); // typing speed
    }
    
    // Slight delay before typing starts
    setTimeout(typeLine, 500);
  }

  function startAnimation() {
    if (!width) {
      resize();
      generateUniverse();
    }
    if (!animationFrameId) {
      draw();
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
  
});
