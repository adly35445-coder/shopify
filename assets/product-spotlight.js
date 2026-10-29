if (!customElements.get('product-spotlight')) {
  customElements.define(
    'product-spotlight',
    class ProductSpotlight extends HTMLElement {
      connectedCallback() {
        this.items = Array.from(this.querySelectorAll('.spotlight__item'));
        if (this.items.length === 0) return;
        this.index = 0;

        this.querySelector('.spotlight__arrow--prev')?.addEventListener('click', () => this.go(this.index - 1));
        this.querySelector('.spotlight__arrow--next')?.addEventListener('click', () => this.go(this.index + 1));

        // Tapping a side product brings it to the middle
        this.items.forEach((item, i) =>
          item.addEventListener('click', (event) => {
            if (i === this.index) return;
            event.preventDefault();
            this.go(i);
          })
        );

        // Swipe on phones
        let startX = null;
        this.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
        this.addEventListener('touchend', (e) => {
          if (startX === null) return;
          const dx = e.changedTouches[0].clientX - startX;
          startX = null;
          if (Math.abs(dx) < 40) return;
          const forward = document.dir === 'rtl' ? dx > 0 : dx < 0;
          this.go(this.index + (forward ? 1 : -1));
        });

        // Theme editor: show the block being edited
        this.addEventListener('shopify:block:select', (e) => {
          const i = this.items.indexOf(e.target);
          if (i >= 0) this.go(i);
        });

        this.go(0);
      }

      go(i) {
        const n = this.items.length;
        this.index = (i + n) % n;
        this.items.forEach((item, k) => {
          item.classList.toggle('is-active', k === this.index);
          item.classList.toggle('is-prev', n > 1 && k === (this.index - 1 + n) % n);
          item.classList.toggle('is-next', n > 2 && k === (this.index + 1) % n);
        });
        const bg = this.items[this.index].dataset.bg;
        if (bg) this.style.setProperty('--spot-bg', bg);
      }
    }
  );
}
