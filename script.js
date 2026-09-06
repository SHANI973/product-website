/**
 * ============================================================================
 * MINIMEIS G5 PAKISTAN — OFFICIAL STORE ENGINE & INTERACTION CONTROLLER
 * ============================================================================
 */

// ============================================================================
// 1. EDITABLE STORE CONFIGURATION
// Change your price, WhatsApp number, and delivery details here in one place.
// ============================================================================
const STORE_CONFIG = {
  // Enter phone with country code (e.g. "923315667047" without '+' or spaces for wa.me API)
  whatsappNumber: "923315667047",
  displayWhatsapp: "0331 5667047",
  
  // Base price in PKR (numerical)
  price: 5000,
  currency: "PKR",
  
  // Delivery & Service texts (used throughout the website)
  deliveryTime: "2–4 business days (major cities) / 3–6 business days nationwide",
  shippingFee: "Free Nationwide Delivery",
  
  // Set to true if Cash on Delivery is offered
  codAvailable: true,
  
  // Product info
  productName: "Erhan Up",
  productType: "Shoulder Child Carrier",
  defaultColor: "Nordic Sage / Olive (Signature)"
};

// ============================================================================
// 2. DOM INITIALIZATION & DYNAMIC CONFIG INJECTION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  applyStoreConfig();
  initNavigation();
  initScrollReveals();
  initNumberCounters();
  initFoldableSequence();
  initFaqAccordion();
  initOrderForm();
  initHeroTilt();
  initStickyMobileBar();
  initOrderImageSwitcher();
});

/**
 * Injects STORE_CONFIG values into all relevant DOM elements
 */
function applyStoreConfig() {
  const formattedPrice = STORE_CONFIG.price.toLocaleString('en-US');
  
  // Unit price elements
  const unitPriceEl = document.getElementById('displayUnitPrice');
  if (unitPriceEl) unitPriceEl.textContent = formattedPrice;

  // Mobile bar price
  const mobileBarPriceEl = document.getElementById('mobileBarPrice');
  if (mobileBarPriceEl) mobileBarPriceEl.textContent = `${STORE_CONFIG.currency} ${formattedPrice}`;

  // Initial summary total
  const summaryTotalEl = document.getElementById('summaryTotal');
  if (summaryTotalEl) summaryTotalEl.textContent = `${STORE_CONFIG.currency} ${formattedPrice}`;

  // Update elements with data-bind attributes
  document.querySelectorAll('[data-bind]').forEach(el => {
    const bindKey = el.getAttribute('data-bind');
    if (STORE_CONFIG[bindKey] !== undefined) {
      el.textContent = STORE_CONFIG[bindKey];
    }
  });

  // Update COD badges based on codAvailable flag
  const codTrustCard = document.getElementById('codTrustCard');
  const codTrustTitle = document.getElementById('codTrustTitle');
  const orderPropCod = document.getElementById('orderPropCod');

  if (!STORE_CONFIG.codAvailable) {
    if (codTrustTitle) codTrustTitle.textContent = "Secure Advance Bank Payment";
    if (orderPropCod) orderPropCod.textContent = "Fast Online Bank Transfer Available";
  }

  // Update Final CTA WhatsApp button link
  const finalWhatsAppLink = document.getElementById('finalWhatsAppLink');
  if (finalWhatsAppLink) {
    const defaultMsg = encodeURIComponent("Hello MiniMeis Pakistan team! I would like to inquire about the MiniMeis G5 shoulder carrier.");
    finalWhatsAppLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${defaultMsg}`;
  }
}

// ============================================================================
// 3. NAVIGATION & HEADER CONTROLLER
// ============================================================================
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-order-btn');

  // Header background transition on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile hamburger menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const highlightCurrentSection = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightCurrentSection, { passive: true });
}

// ============================================================================
// 4. SCROLL REVEALS (Intersection Observer)
// ============================================================================
function initScrollReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal immediately if observer unsupported
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, parseInt(delay, 10));
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================================================
// 5. ANIMATED NUMBER COUNTERS
// ============================================================================
function initNumberCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
        const duration = 1500; // ms
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = (easeProgress * target).toFixed(decimals);

          counter.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target.toFixed(decimals);
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => countObserver.observe(c));
}

// ============================================================================
// 6. FOLDABLE DESIGN INTERACTION
// ============================================================================
function initFoldableSequence() {
  const steps = document.querySelectorAll('.fold-step');
  const previewImg = document.getElementById('foldablePreviewImg');
  if (!steps.length || !previewImg) return;

  const stepImages = {
    '1': 'assets/images/erhan-up-front.jpg',
    '2': 'assets/images/erhan-up-side.jpg',
    '3': 'assets/images/erhan-up-folded-vertical.jpg',
    '4': 'assets/images/erhan-up-folded-laptop.jpg'
  };

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const stepNum = step.getAttribute('data-step');
      if (stepImages[stepNum]) {
        previewImg.style.opacity = '0.4';
        setTimeout(() => {
          previewImg.src = stepImages[stepNum];
          previewImg.style.opacity = '1';
        }, 150);
      }

      if (stepNum === '1') {
        previewImg.style.transform = 'scale(1)';
      } else if (stepNum === '2') {
        previewImg.style.transform = 'scale(0.96)';
      } else if (stepNum === '3') {
        previewImg.style.transform = 'scale(0.92)';
      } else if (stepNum === '4') {
        previewImg.style.transform = 'scale(1)';
      }
    });
  });
}

function initOrderImageSwitcher() {
  const mainImg = document.querySelector('.order-product-img');
  const thumbBtns = document.querySelectorAll('.order-thumb-btn');
  if (!mainImg || !thumbBtns.length) return;

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetSrc = btn.getAttribute('data-img');
      if (targetSrc) {
        mainImg.style.opacity = '0.3';
        mainImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 140);
      }
    });
  });
}

// ============================================================================
// 7. FAQ ACCORDION
// ============================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for a clean editorial look
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

// ============================================================================
// 8. ORDER FORM & WHATSAPP MESSAGE GENERATOR
// ============================================================================
function initOrderForm() {
  const form = document.getElementById('orderForm');
  const qtyInput = document.getElementById('orderQty');
  const btnMinus = document.getElementById('btnQtyMinus');
  const btnPlus = document.getElementById('btnQtyPlus');
  const summaryQty = document.getElementById('summaryQty');
  const summaryTotal = document.getElementById('summaryTotal');

  if (!form || !qtyInput) return;

  // Quantity adjustments
  const updateTotals = () => {
    let qty = parseInt(qtyInput.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 10) qty = 10;
    qtyInput.value = qty;

    if (summaryQty) summaryQty.textContent = qty;
    const totalAmount = (qty * STORE_CONFIG.price).toLocaleString('en-US');
    if (summaryTotal) summaryTotal.textContent = `${STORE_CONFIG.currency} ${totalAmount}`;
  };

  btnMinus.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value, 10);
    if (qty > 1) {
      qtyInput.value = qty - 1;
      updateTotals();
    }
  });

  btnPlus.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value, 10);
    if (qty < 10) {
      qtyInput.value = qty + 1;
      updateTotals();
    }
  });

  // Validation helpers
  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const cityInput = document.getElementById('city');
  const addressInput = document.getElementById('address');
  const notesInput = document.getElementById('orderNotes');
  const colorInput = document.getElementById('productColor');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const cityError = document.getElementById('cityError');
  const addressError = document.getElementById('addressError');

  // Pakistani phone validation: matches formats like "03001234567", "0300 1234567", "3001234567", "+923001234567"
  function validatePakistaniPhone(raw) {
    const cleaned = raw.replace(/\D/g, '');
    // 03xx xxxxxxx (11 digits starting with 03) or 3xx xxxxxxx (10 digits starting with 3) or 923xxxxxxxxx (12 digits)
    if (/^03\d{9}$/.test(cleaned)) return cleaned;
    if (/^3\d{9}$/.test(cleaned)) return '0' + cleaned;
    if (/^923\d{9}$/.test(cleaned)) return '0' + cleaned.substring(2);
    return false;
  }

  // Clear errors upon typing
  [nameInput, phoneInput, cityInput, addressInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const errorEl = document.getElementById(`${input.id}Error`);
        if (errorEl) errorEl.classList.remove('visible');
      });
    }
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    if (!nameInput.value.trim()) {
      nameError.classList.add('visible');
      nameInput.focus();
      isValid = false;
    } else {
      nameError.classList.remove('visible');
    }

    // Validate Pakistani Phone Number
    const validPhone = validatePakistaniPhone(phoneInput.value.trim());
    if (!validPhone) {
      phoneError.classList.add('visible');
      if (isValid) phoneInput.focus();
      isValid = false;
    } else {
      phoneError.classList.remove('visible');
    }

    // Validate City
    if (!cityInput.value.trim()) {
      cityError.classList.add('visible');
      if (isValid) cityInput.focus();
      isValid = false;
    } else {
      cityError.classList.remove('visible');
    }

    // Validate Address
    if (!addressInput.value.trim()) {
      addressError.classList.add('visible');
      if (isValid) addressInput.focus();
      isValid = false;
    } else {
      addressError.classList.remove('visible');
    }

    if (!isValid) return;

    // Construct the WhatsApp message strictly adhering to requirements
    const quantity = parseInt(qtyInput.value, 10) || 1;
    const totalPayable = (quantity * STORE_CONFIG.price).toLocaleString('en-US');
    const selectedColor = colorInput ? colorInput.value : STORE_CONFIG.defaultColor;
    const additionalNotes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : "None";

    const message = 
`New Erhan Up Order

Name: ${nameInput.value.trim()}
Phone: ${phoneInput.value.trim()}
City: ${cityInput.value.trim()}
Address: ${addressInput.value.trim()}
Quantity: ${quantity}
Colour: ${selectedColor}
Notes: ${additionalNotes}

Product:
${STORE_CONFIG.productName}

Price:
${STORE_CONFIG.currency} ${totalPayable}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab / application
    window.open(whatsappUrl, '_blank');
  });
}

// ==================================================
// 9. SUBTLE DESKTOP HERO 3D TILT EFFECT
// ==================================================
function initHeroTilt() {
  const container = document.getElementById('heroMediaContainer');
  if (!container || window.innerWidth < 1024) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let bounds;

  const onMouseEnter = () => {
    bounds = container.getBoundingClientRect();
  };

  const onMouseMove = (e) => {
    if (!bounds) bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) - 0.5;
    const yPct = (mouseY / bounds.height) - 0.5;

    const tiltX = (yPct * -6).toFixed(2);
    const tiltY = (xPct * 6).toFixed(2);

    container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const onMouseLeave = () => {
    container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  container.addEventListener('mouseenter', onMouseEnter);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);
}

// ==================================================
// 10. STICKY MOBILE ORDER BAR CONTROLLER
// ==================================================
function initStickyMobileBar() {
  const mobileBar = document.getElementById('mobileOrderBar');
  const heroSection = document.getElementById('hero');
  const orderSection = document.getElementById('order');

  if (!mobileBar || !heroSection || !orderSection) return;

  const handleMobileBarVisibility = () => {
    if (window.innerWidth > 768) {
      mobileBar.classList.remove('visible');
      return;
    }

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const orderRect = orderSection.getBoundingClientRect();

    // Show when scrolled past hero, hide when order form is in view
    const isPastHero = heroBottom < 0;
    const isOrderInView = orderRect.top < window.innerHeight && orderRect.bottom > 0;

    if (isPastHero && !isOrderInView) {
      mobileBar.classList.add('visible');
    } else {
      mobileBar.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleMobileBarVisibility, { passive: true });
  window.addEventListener('resize', handleMobileBarVisibility, { passive: true });
  handleMobileBarVisibility();
}
