document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme & RTL Setup ---
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // --- 2. Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // --- 3. Mobile Navigation Drawer ---
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav-drawer');
  const closeDrawer = document.querySelector('.close-drawer');
  const overlay = document.querySelector('.overlay');

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
    } else {
      drawer.classList.add('open');
      overlay.classList.add('active');
    }
  };

  if (hamburger) hamburger.addEventListener('click', toggleDrawer);
  if (closeDrawer) closeDrawer.addEventListener('click', toggleDrawer);
  if (overlay) overlay.addEventListener('click', toggleDrawer);

  document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', toggleDrawer);
  });

  // --- 4. Global Modals (Enquiry & Profile) ---
  const setupModal = (modalId, triggerSelectors) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll(triggerSelectors).forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    return closeModal;
  };

  const closeEnquiry = setupModal('enquiry-modal', '.btn-enquire, .trigger-enquiry');
  const closeProfile = setupModal('profile-modal', '.trigger-profile');
  
  // Enquiry form submit demo
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = enquiryForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'SENDING...';
      
      setTimeout(() => {
        btn.innerText = 'ENQUIRY RECEIVED';
        btn.classList.add('btn-accent');
        setTimeout(() => {
          if (closeEnquiry) closeEnquiry();
          enquiryForm.reset();
          btn.innerText = originalText;
          btn.classList.remove('btn-accent');
        }, 2000);
      }, 1000);
    });
  }

  // --- 5. Theme / RTL Toggles ---
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // --- 6. Search Overlay ---
  const searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay) {
    const closeSearch = searchOverlay.querySelector('.modal-close');
    const openSearch = (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchOverlay.querySelector('input').focus(), 100);
    };
    
    document.querySelectorAll('.trigger-search').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });
    
    if (closeSearch) {
      closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // --- 7. Interactive Service Explorer (Home Page) ---
  const serviceItems = document.querySelectorAll('.service-item');
  const serviceImgs = document.querySelectorAll('.service-display img');
  const serviceContents = document.querySelectorAll('.service-display-content');

  if (serviceItems.length > 0) {
    serviceItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const target = item.getAttribute('data-target');
        
        serviceItems.forEach(i => i.classList.remove('active'));
        serviceImgs.forEach(img => img.classList.remove('active'));
        serviceContents.forEach(c => c.classList.remove('active'));
        
        item.classList.add('active');
        const activeImg = document.getElementById(`img-${target}`);
        const activeContent = document.getElementById(`content-${target}`);
        if (activeImg) activeImg.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }

  // --- 8. Save Professional (LocalStorage) ---
  const updateSavedState = () => {
    const saved = JSON.parse(localStorage.getItem('savedProfs') || '[]');
    document.querySelectorAll('.btn-save').forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (saved.includes(id)) {
        btn.innerText = 'SAVED';
        btn.classList.add('btn-accent');
      } else {
        btn.innerText = 'SAVE';
        btn.classList.remove('btn-accent');
      }
    });
  };

  document.querySelectorAll('.btn-save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if(!id) return;
      let saved = JSON.parse(localStorage.getItem('savedProfs') || '[]');
      
      if (saved.includes(id)) {
        saved = saved.filter(pid => pid !== id);
      } else {
        saved.push(id);
      }
      
      localStorage.setItem('savedProfs', JSON.stringify(saved));
      updateSavedState();
    });
  });
  updateSavedState();

  // --- 9. Form Passwords ---
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    });
  });

  // --- 10. Contact Page Topics ---
  const topics = document.querySelectorAll('.topic-card');
  if(topics.length > 0) {
    topics.forEach(topic => {
      topic.addEventListener('click', () => {
        topics.forEach(t => t.classList.remove('active'));
        topic.classList.add('active');
        const ctaBtn = document.getElementById('contact-cta-btn');
        if(ctaBtn) {
          ctaBtn.innerText = `ENQUIRE ABOUT ${topic.getAttribute('data-topic').toUpperCase()}`;
        }
      });
    });
  }

  // Escape key for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeOverlay = document.querySelector('.modal-overlay.active, .search-overlay.active, .overlay.active');
      if (activeOverlay) {
        if(activeOverlay.classList.contains('overlay') && drawer.classList.contains('open')) {
          toggleDrawer();
        } else {
          activeOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }
  });

  // --- 11. Scroll to Top ---
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
