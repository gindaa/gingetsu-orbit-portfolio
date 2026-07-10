document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignore if it's an external link, a new tab, or an anchor link on the same page
      if (!href || href.startsWith('#') || href.startsWith('http') || link.target === '_blank') {
        return;
      }
      
      e.preventDefault();
      document.body.classList.add('page-fade-out');
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 400); // 400ms duration for the fade out
    });
  });
});
