/* ============================================================
   ARAB FINANCE — PROPOSAL PAGE SCRIPT
   ------------------------------------------------------------
   Vanilla JS only. No dependencies.
============================================================= */

/* ============================================================
   EDITABLE CONFIG — change these values to update the page
============================================================= */
var CONFIG = {
  // YouTube video ID from https://youtu.be/M_t1wbjdISg
  YOUTUBE_ID: 'M_t1wbjdISg',
  // WhatsApp number in international format, no + or spaces
  WHATSAPP_NUMBER: '201000000000',
  WHATSAPP_MESSAGE: "Hi Arab Finance, I'd like to discuss the EIMA partnership proposal"
};

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky WhatsApp CTA link ---------- */
  var whatsappCta = document.getElementById('whatsappCta');
  if (whatsappCta) {
    var waUrl = 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER + '?text=' + encodeURIComponent(CONFIG.WHATSAPP_MESSAGE);
    whatsappCta.setAttribute('href', waUrl);
  }

  /* ---------- Mobile nav toggle ---------- */
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('navbar--open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    var navLinks = document.querySelectorAll('.navbar__links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('navbar--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Navbar shadow on scroll ---------- */
  window.addEventListener('scroll', function () {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(20,43,61,0.08)' : 'none';
    }
  });

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    question.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.setAttribute('data-open', 'false');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.setAttribute('data-open', 'true');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ============================================================
     VIDEO SECTION — thumbnail with graceful fallback
     ------------------------------------------------------------
     Strategy: never show a broken image or a YouTube error inside
     the page. We show a polished thumbnail + play button by
     default. Clicking swaps in the live embed. If the thumbnail
     image itself can't load (no network, blocked host, etc.), we
     fall back to a clean blue-gradient card (defined in CSS on
     .video-card__frame) with the play button still visible, and
     the "Watch the Video" button always works as a guaranteed
     way to view the video on YouTube directly.
  ============================================================= */
  var videoFrame = document.getElementById('videoFrame');
  var videoThumb = document.getElementById('videoThumb');
  var playBtn = document.getElementById('playBtn');
  var playInlineBtn = document.getElementById('playInlineBtn');

  if (videoThumb) {
    // Try the high-res thumbnail first, fall back to a smaller one,
    // then fall back to the plain gradient card (no image) on failure.
    var thumbSources = [
      'https://img.youtube.com/vi/' + CONFIG.YOUTUBE_ID + '/maxresdefault.jpg',
      'https://img.youtube.com/vi/' + CONFIG.YOUTUBE_ID + '/hqdefault.jpg'
    ];
    var thumbAttempt = 0;

    videoThumb.addEventListener('error', function () {
      thumbAttempt++;
      if (thumbAttempt < thumbSources.length) {
        videoThumb.src = thumbSources[thumbAttempt];
      } else {
        // No thumbnail could load — hide the <img> so the CSS
        // gradient background on .video-card__frame shows instead.
        videoThumb.style.display = 'none';
      }
    });

    videoThumb.src = thumbSources[0];
  }

  function playVideo() {
    if (!videoFrame) return;
    if (videoFrame.getAttribute('data-playing') === 'true') return;

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + CONFIG.YOUTUBE_ID + '?autoplay=1&rel=0';
    iframe.title = 'Project overview video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';

    videoFrame.appendChild(iframe);
    videoFrame.setAttribute('data-playing', 'true');
  }

  if (playBtn) playBtn.addEventListener('click', playVideo);
  if (videoThumb) videoThumb.addEventListener('click', playVideo);
  if (playInlineBtn) playInlineBtn.addEventListener('click', playVideo);

});
