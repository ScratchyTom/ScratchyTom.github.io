(function () {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const dotsContainer = document.getElementById('carouselDots');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  if (!slides.length || !dotsContainer || !prev || !next) return;

  let index = 0;
  let timer;

  function renderDots() {
    slides.forEach((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ': ' + slide.dataset.label);
      dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        setSlide(i);
        restartAuto();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function setSlide(nextIndex) {
    slides[index].classList.remove('active');
    dotsContainer.children[index].classList.remove('active');
    dotsContainer.children[index].setAttribute('aria-pressed', 'false');
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add('active');
    dotsContainer.children[index].classList.add('active');
    dotsContainer.children[index].setAttribute('aria-pressed', 'true');
  }

  function restartAuto() {
    clearInterval(timer);
    timer = setInterval(() => setSlide(index + 1), 5000);
  }

  prev.addEventListener('click', () => {
    setSlide(index - 1);
    restartAuto();
  });

  next.addEventListener('click', () => {
    setSlide(index + 1);
    restartAuto();
  });

  const carousel = document.querySelector('.hero-carousel');
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      setSlide(index - 1);
      restartAuto();
    }
    if (event.key === 'ArrowRight') {
      setSlide(index + 1);
      restartAuto();
    }
  });

  renderDots();
  restartAuto();
})();
