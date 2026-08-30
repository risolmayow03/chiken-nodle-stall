/* Chicken Noodle Stall — interaksi ringan
   1) Bayangan header saat halaman di-scroll
   2) Menu mobile (burger) buka/tutup
   3) Animasi fade-in halus saat elemen masuk layar
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {

  /* 1) Header dapat bayangan begitu discroll ke bawah */
  var header = document.querySelector('header');
  function updateHeaderShadow() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });

  /* 2) Menu mobile */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    burgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      burgerBtn.classList.toggle('open', isOpen);
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    /* tutup menu begitu salah satu link diklik */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    /* tutup menu otomatis kalau layar dilebarkan ke ukuran desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) closeMobileMenu();
    });
  }

  /* 3) Fade-in halus untuk elemen bertanda class="reveal" */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (el, i) {
      /* jeda kecil antar kartu menu supaya muncul berurutan, bukan serentak */
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      observer.observe(el);
    });
  } else {
    /* browser lama: langsung tampilkan tanpa animasi */
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

});
