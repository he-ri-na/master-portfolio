/* ══════════════════════════════════════════
   HERMELA TESFAYE — PORTFOLIO SCRIPT
   Tech-Noir / Premium Cyber-Minimalism
══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring follows with lag
  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge on interactive elements
  const interactive = 'a, button, [data-cursor]';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1.8)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();


/* ──────────────────────────────────────────
   NAVBAR — SCROLL BEHAVIOUR & HAMBURGER
────────────────────────────────────────── */
(function initNav() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const drawer  = document.getElementById('mobileDrawer');
  if (!navbar) return;

  // Scroll shrink
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    // Hide navbar when scrolling down fast, show on up
    if (y > lastY + 8 && y > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else if (y < lastY - 4) {
      navbar.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, { passive: true });
  navbar.style.transition = 'background .3s, border-color .3s, transform .35s cubic-bezier(.3,0,.2,1)';

  // Hamburger toggle
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
})();

function closeMobile() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('mobileDrawer');
  if (burger) burger.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}


/* ──────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────────────
   COUNTER ANIMATION
────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1400;
      const step   = 16;
      const inc    = target / (dur / step);
      let val      = 0;

      const tick = () => {
        val += inc;
        if (val >= target) {
          el.textContent = target + '+';
          return;
        }
        el.textContent = Math.floor(val);
        requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ──────────────────────────────────────────
   ACTIVE NAV LINK HIGHLIGHTING
────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(link => {
        link.style.color = '';
        const isActive = link.getAttribute('href') === `#${id}`;
        if (isActive) link.style.color = 'var(--accent)';
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ──────────────────────────────────────────
   SKILL TAG STAGGER
────────────────────────────────────────── */
(function initSkillStagger() {
  document.querySelectorAll('.skill-block').forEach(block => {
    const tags = block.querySelectorAll('.skill-tags span');
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 40}ms`;
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(8px)';
      tag.style.transition = 'opacity .35s ease, transform .35s ease, border-color .2s, color .2s, background .2s';
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        tags.forEach(tag => {
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    observer.observe(block);
  });
})();


/* ──────────────────────────────────────────
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH   = document.getElementById('navbar')?.offsetHeight || 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ──────────────────────────────────────────
   AWARD CARD TILT EFFECT (subtle 3D)
────────────────────────────────────────── */
(function initTilt() {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.award-card, .proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -6;
      const tiltY  = dx *  6;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'border-color .3s, transform .5s cubic-bezier(.3,0,.2,1), box-shadow .3s';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color .3s, transform .1s, box-shadow .3s';
    });
  });
})();


/* ──────────────────────────────────────────
   HERO PARALLAX ORBS
────────────────────────────────────────── */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const orbs = document.querySelectorAll('.orb-1, .orb-2');

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs[0]?.style.setProperty('transform', `translate(${dx * 20}px, ${dy * 20}px)`);
    orbs[1]?.style.setProperty('transform', `translate(${-dx * 15}px, ${-dy * 15}px)`);
  }, { passive: true });
})();


/* ──────────────────────────────────────────
   TYPING EFFECT — HERO SUB (optional flair)
────────────────────────────────────────── */
(function initTypingFlair() {
  const heroSub = document.querySelector('.hero-sub');
  if (!heroSub) return;
  // Just add a subtle class once visible — CSS handles the rest
  heroSub.style.opacity = '0';
  setTimeout(() => {
    heroSub.style.transition = 'opacity .8s ease';
    heroSub.style.opacity    = '1';
  }, 600);
})();


/* ──────────────────────────────────────────
   CONTACT CARD EMAIL COPY
────────────────────────────────────────── */
(function initEmailCopy() {
  const emailCard = document.querySelector('.contact-card[href^="mailto"]');
  if (!emailCard) return;

  emailCard.addEventListener('click', e => {
    // Default mailto still fires; just show a tooltip
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Opening mail client…';
    tooltip.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
      background: var(--surface-2); color: var(--accent);
      border: 1px solid var(--border-glow);
      padding: .6rem 1.4rem; border-radius: 4px;
      font-family: 'JetBrains Mono', monospace; font-size: .72rem;
      letter-spacing: .1em; z-index: 9999;
      animation: fadeInUp .3s ease both;
    `;
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 2500);
  });
})();


/* ──────────────────────────────────────────
   PAGE LOAD ANIMATION — stagger body-in
────────────────────────────────────────── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  // Fallback
  setTimeout(() => { document.body.style.opacity = '1'; }, 600);
})();
