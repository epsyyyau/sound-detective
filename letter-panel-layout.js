function letterChoiceLayouts(buttons, count) {
  const layouts = [];
  function choose(start, chosen) {
    if (chosen.length === Math.min(count, buttons.length)) {
      // Rotations cover wrapping tall image cards into either answer row.
      chosen.forEach((_, offset) => layouts.push([...chosen.slice(offset), ...chosen.slice(0, offset)]));
      return;
    }
    for (let index = start; index < buttons.length; index += 1) choose(index + 1, [...chosen, buttons[index]]);
  }
  choose(0, []);
  return layouts;
}

class LetterPanelLayout {
  constructor(panel) {
    this.panel = panel;
    this.options = panel.querySelector('[data-answer-options]');
    this.observer = new ResizeObserver(() => {
      if (this.width !== panel.getBoundingClientRect().width) this.measure();
    });
    this.observer.observe(panel);
    document.fonts.ready.then(() => this.measure());
  }

  prepare(buttons, count) {
    this.layouts = letterChoiceLayouts(buttons, count);
    this.measure();
  }

  measure() {
    if (!this.layouts) return;
    this.width = this.panel.getBoundingClientRect().width;
    const probe = this.panel.cloneNode(true);
    probe.setAttribute('aria-hidden', 'true');
    probe.inert = true;
    Object.assign(probe.style, {
      position: 'absolute', left: '0', top: '0', width: `${this.width}px`,
      minHeight: '0', height: 'auto', visibility: 'hidden', pointerEvents: 'none',
    });
    const learn = probe.querySelector('[data-learn-view]');
    const quiz = probe.querySelector('[data-quiz-view]');
    const options = probe.querySelector('[data-answer-options]');
    options.style.minHeight = '0';
    probe.querySelector('[data-complete-view]').hidden = true;
    probe.querySelector('[data-feedback]').textContent = '';
    probe.querySelector('[data-next-question]').hidden = true;
    this.panel.after(probe);
    try {
      learn.hidden = false;
      quiz.hidden = true;
      let height = probe.getBoundingClientRect().height;
      learn.hidden = true;
      quiz.hidden = false;
      let answerHeight = 0;
      for (const layout of this.layouts) {
        options.replaceChildren(...layout.map(button => button.cloneNode(true)));
        answerHeight = Math.max(answerHeight, options.getBoundingClientRect().height);
      }
      options.style.minHeight = `${Math.ceil(answerHeight)}px`;
      height = Math.max(height, probe.getBoundingClientRect().height);
      this.options.style.minHeight = `${Math.ceil(answerHeight)}px`;
      this.panel.style.minHeight = window.matchMedia('(max-width: 680px)').matches
        ? '0px'
        : `${Math.ceil(height)}px`;
    } finally {
      probe.remove();
    }
  }
}

if (typeof module !== 'undefined') module.exports = { letterChoiceLayouts };
