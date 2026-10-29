if (!customElements.get('hero-slider')) {
  customElements.define(
    'hero-slider',
    class HeroSlider extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('.hero-slider__slide'));
        this.dots = Array.from(this.querySelectorAll('.hero-slider__dot'));
        this.current = 0;
        this.autoplay = this.dataset.autoplay === 'true' && this.slides.length > 1;
        this.speed = (parseInt(this.dataset.speed, 10) || 6) * 1000;
        this.isRtl = document.documentElement.dir === 'rtl';

        this.querySelector('[name="previous"]')?.addEventListener('click', () => this.go(this.current - 1, true));
        this.querySelector('[name="next"]')?.addEventListener('click', () => this.go(this.current + 1, true));
        this.dots.forEach((dot) => dot.addEventListener('click', () => this.go(Number(dot.dataset.index), true)));

        // Keep moving on hover (the hero fills the first screen); pause only for keyboard focus and hidden tabs.
        this.addEventListener('focusin', (e) => {
          if (e.target.matches(':focus-visible')) this.pause();
        });
        this.addEventListener('focusout', () => this.play());
        document.addEventListener('visibilitychange', () => (document.hidden ? this.pause() : this.play()));
        this.bindSwipe();

        document.addEventListener('shopify:block:select', (event) => {
          const index = this.slides.indexOf(event.target);
          if (index > -1) {
            this.go(index);
            this.pause();
          }
        });
        document.addEventListener('shopify:block:deselect', () => this.play());

        this.play();
      }

      disconnectedCallback() {
        clearInterval(this.timer);
      }

      go(index, userAction = false) {
        const total = this.slides.length;
        if (!total) return;
        const next = (index + total) % total;
        if (next === this.current) return;

        this.slides[this.current].classList.remove('is-active');
        this.slides[this.current].setAttribute('aria-hidden', 'true');
        this.dots[this.current]?.classList.remove('is-active');

        this.current = next;
        this.slides[next].classList.add('is-active');
        this.slides[next].removeAttribute('aria-hidden');
        this.dots[next]?.classList.add('is-active');

        if (userAction) this.restart();
      }

      play() {
        if (!this.autoplay) return;
        clearInterval(this.timer);
        this.classList.remove('is-paused');
        this.timer = setInterval(() => this.go(this.current + 1), this.speed);
      }

      pause() {
        clearInterval(this.timer);
        this.classList.add('is-paused');
      }

      restart() {
        if (this.classList.contains('is-paused')) return;
        this.play();
      }

      bindSwipe() {
        let startX = null;
        const track = this.querySelector('.hero-slider__track');
        track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
        track.addEventListener(
          'touchend',
          (e) => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            startX = null;
            if (Math.abs(dx) < 40) return;
            const forward = this.isRtl ? dx > 0 : dx < 0;
            this.go(this.current + (forward ? 1 : -1), true);
          },
          { passive: true }
        );
      }
    }
  );
}
