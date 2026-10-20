window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-fade-out');
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
      const href = link.getAttribute('href');
      
      // Ignore external links, mailto/tel, anchor links, downloads, or new tabs
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }
      
      e.preventDefault();
      document.body.classList.add('page-fade-out');
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  });
});
