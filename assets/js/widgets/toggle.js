function Toggle($trigger) {
  this.$trigger = $trigger;

  this.targetSelector = $trigger.getAttribute('data-toggle');

  this.targetActiveClass = $trigger.getAttribute('data-target-active-class') || this.opts.targetActiveClass;

  this.$target = document.querySelector(this.targetSelector);
  this.init();
}

Toggle.prototype = {
  constructor: Toggle,
  init() {
      this.bind();
  },
  bind() {
      this.$trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
      });
  },
  toggle() {
      this.$trigger.classList.toggle(this.opts.triggerActiveClass);
      this.$target.classList.toggle(this.opts.targetActiveClass);
  },
  opts: {
      triggerActiveClass: 'is',
      targetActiveClass: 'is--hidden',
  },
};

const initToggles = (global) => {
  global.widgets = global.widgets || {};
  global.widgets.toggles = [...document.querySelectorAll('[data-toggle]')].map(t => new Toggle(t));
};


window.addEventListener('DOMContentLoaded', () => initToggles(window.SHU));
