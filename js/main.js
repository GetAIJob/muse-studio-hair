'use strict';

/* ===== HEADER SCROLL ===== */
(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ===== BURGER / MOBILE NAV ===== */
(function initMobileNav() {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link, .mobile-nav__cta') : [];

  if (!burger || !mobileNav) return;

  function openNav() {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close navigation menu');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation menu');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  burger.addEventListener('click', toggleNav);

  // Close on nav link click
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeNav();
      burger.focus();
    }
  });
})();

/* ===== SMOOTH SCROLL WITH HEADER OFFSET ===== */
(function initSmoothScroll() {
  const header = document.getElementById('site-header');

  function getHeaderHeight() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = getHeaderHeight();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
})();

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ===== FORM VALIDATION & SUBMISSION ===== */
(function initBookingForm() {
  const form = document.getElementById('booking-form');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');

  if (!form) return;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = {
    name: {
      el: document.getElementById('field-name'),
      errorEl: document.getElementById('error-name'),
      validate: function (val) {
        if (!val.trim()) return 'Please enter your name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      el: document.getElementById('field-email'),
      errorEl: document.getElementById('error-email'),
      validate: function (val) {
        if (!val.trim()) return 'Please enter your email address.';
        if (!EMAIL_REGEX.test(val.trim())) return 'Please enter a valid email address.';
        return '';
      }
    },
    phone: {
      el: document.getElementById('field-phone'),
      errorEl: document.getElementById('error-phone'),
      validate: function (val) {
        if (!val.trim()) return 'Please enter your phone number.';
        if (val.trim().length < 6) return 'Please enter a valid phone number.';
        return '';
      }
    },
    service: {
      el: document.getElementById('field-service'),
      errorEl: document.getElementById('error-service'),
      validate: function (val) {
        if (!val) return 'Please select a service.';
        return '';
      }
    }
  };

  function showFieldError(fieldKey, message) {
    const field = fields[fieldKey];
    if (!field) return;
    field.errorEl.textContent = message;
    field.el.classList.add('is-invalid');
    field.el.setAttribute('aria-describedby', field.errorEl.id);
  }

  function clearFieldError(fieldKey) {
    const field = fields[fieldKey];
    if (!field) return;
    field.errorEl.textContent = '';
    field.el.classList.remove('is-invalid');
    field.el.removeAttribute('aria-describedby');
  }

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    if (!field) return true;
    const val = field.el.value;
    const error = field.validate(val);
    if (error) {
      showFieldError(fieldKey, error);
      return false;
    }
    clearFieldError(fieldKey);
    return true;
  }

  function validateAll() {
    let isValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) {
        isValid = false;
      }
    });
    return isValid;
  }

  // Live validation on blur
  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    if (!field.el) return;

    field.el.addEventListener('blur', function () {
      validateField(key);
    });

    field.el.addEventListener('input', function () {
      if (field.el.classList.contains('is-invalid')) {
        validateField(key);
      }
    });
  });

  function setFormLoading(isLoading) {
    const submitBtn = form.querySelector('.form-submit');
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Sending…' : 'Request Appointment';
  }

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
  }

  function showError() {
    errorEl.hidden = false;
    setTimeout(function () {
      errorEl.hidden = true;
    }, 6000);
  }

  function simulateSubmit() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // Simulate 95% success rate in demo
        if (Math.random() > 0.05) {
          resolve();
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 800);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide any previous feedback
    successEl.hidden = true;
    errorEl.hidden = true;

    const isValid = validateAll();
    if (!isValid) {
      // Focus the first invalid field
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setFormLoading(true);

    simulateSubmit()
      .then(function () {
        setFormLoading(false);
        showSuccess();
      })
      .catch(function () {
        setFormLoading(false);
        showError();
      });
  });
})();
