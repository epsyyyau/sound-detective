function clueSlotStates(total, current, collected) {
  return Array.from({ length: total }, (_, index) => collected.has(index)
    ? 'collected' : index === current ? 'current' : 'empty');
}

class ClueProgress {
  constructor(kind) {
    this.kind = kind;
    this.collections = new Map();
    const page = document.querySelector('.sound-lesson-page');
    page.classList.add('has-clue-progress');
    let levels = page.querySelector('[data-level-track]');
    if (!levels) {
      levels = document.createElement('nav');
      levels.className = 'level-track circle-level-track';
      levels.setAttribute('aria-label', '學習關卡');
      levels.innerHTML = '<button type="button" class="is-current" aria-current="step" aria-label="第 1 關" disabled><i>1</i></button>';
      page.querySelector('.lesson-panel').before(levels);
    }
    this.row = document.createElement('div');
    this.row.className = `clue-progress clue-progress-${kind}`;
    this.row.setAttribute('role', 'list');
    this.row.setAttribute('aria-label', '本關線索收集進度');
    this.row.tabIndex = 0;
    levels.after(this.row);
    this.status = document.createElement('span');
    this.status.className = 'clue-progress-status';
    this.status.setAttribute('role', 'status');
    this.row.after(this.status);
  }

  show(total, current, key = 0) {
    if (key !== this.key) {
      this.status.textContent = '';
      this.animateIndex = -1;
    }
    this.key = key;
    this.total = total;
    this.current = current;
    if (!this.collections.has(key)) this.collections.set(key, new Set());
    this.render();
  }

  reset(key) {
    this.animateIndex = -1;
    this.status.textContent = '';
    this.collections.delete(key);
    this.show(0, -1, key);
  }

  collect({ animate = false } = {}) {
    const collected = this.collections.get(this.key);
    if (this.current < 0 || this.current >= this.total || collected.has(this.current)) return;
    collected.add(this.current);
    this.animateIndex = animate ? this.current : -1;
    this.render();
    this.status.textContent = `已收集 ${collected.size} 個線索，共 ${this.total} 個。`;
  }

  finish() {
    this.current = -1;
    this.render();
  }

  render() {
    const collected = this.collections.get(this.key);
    this.row.hidden = this.total === 0;
    this.row.replaceChildren();
    clueSlotStates(this.total, this.current, collected).forEach((state, index) => {
      const slot = document.createElement('span');
      slot.className = `clue-slot is-${state}`;
      slot.setAttribute('role', 'listitem');
      slot.setAttribute('aria-label', `第 ${index + 1} 題：${state === 'collected' ? '已收集線索' : state === 'current' ? '目前題目' : '尚未收集'}`);
      if (state === 'current') slot.setAttribute('aria-current', 'step');
      if (state === 'collected') {
        if (index === this.animateIndex) slot.classList.add('is-newly-collected');
        const icon = document.createElement('img');
        icon.src = `assets/game-style/clue-${this.kind}.webp`;
        icon.alt = '';
        slot.append(icon);
      }
      this.row.append(slot);
    });
    // Desktop rows can scroll; wrapped phone rows keep every clue visible.
    const active = this.row.children[this.current];
    if (active && this.row.scrollWidth > this.row.clientWidth) {
      this.row.scrollLeft = active.offsetLeft - this.row.offsetLeft - (this.row.clientWidth - active.offsetWidth) / 2;
    }
  }
}

if (typeof module !== 'undefined') module.exports = { clueSlotStates, ClueProgress };
