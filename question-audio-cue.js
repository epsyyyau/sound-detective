// One cue moves from the question audio to all available answers together.
class QuestionAudioCue {
  constructor(playButton, options) {
    this.playButton = playButton;
    this.options = options;
    this.phase = 'idle';
    this.epoch = 0;
    this.audio = null;
    this.cleanup = null;
    options.classList.add('question-cue-options');
    window.addEventListener('pagehide', () => {
      const resumePhase = this.resumePhase;
      this.clear();
      this.resumePhase = resumePhase;
    });
    window.addEventListener('pageshow', event => {
      if (event.persisted && playButton.getClientRects().length) this.setPhase(this.resumePhase);
    });
  }

  setPhase(phase = 'idle') {
    this.phase = phase;
    this.playButton.dataset.audioCue = phase;
    this.playButton.classList.toggle('needs-listen', phase === 'listen');
    this.options.classList.toggle('needs-choice', phase === 'choose');
    const awaitingAudio = phase === 'listen' || phase === 'playing';
    this.options.classList.toggle('awaiting-play', awaitingAudio);
    this.options.inert = awaitingAudio;
    this.resumePhase = phase === 'playing' ? 'listen' : phase;
  }

  cancelAudio() {
    this.epoch += 1;
    if (this.cleanup) this.cleanup();
    this.cleanup = null;
    if (this.audio) this.audio.pause();
    this.audio = null;
  }

  reset() {
    this.cancelAudio();
    this.setPhase('listen');
  }

  clear() {
    this.cancelAudio();
    this.setPhase('idle');
  }

  play(audio, onFailure = () => {}) {
    const questionActive = this.phase !== 'idle';
    this.cancelAudio();
    const token = this.epoch;
    this.audio = audio;
    audio.pause();
    audio.currentTime = 0;
    this.setPhase(questionActive ? 'playing' : 'idle');
    let settled = false;
    const finish = ok => {
      if (settled || token !== this.epoch) return;
      settled = true;
      this.cleanup();
      this.cleanup = null;
      this.audio = null;
      if (questionActive) this.setPhase(ok ? 'choose' : 'listen');
      if (!ok) { audio.pause(); onFailure(); }
    };
    const ended = () => finish(true);
    const reachedEnd = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0 && audio.currentTime >= audio.duration - 0.05) finish(true);
    };
    const failed = () => finish(false);
    const timer = setTimeout(failed, 15000);
    this.cleanup = () => {
      clearTimeout(timer);
      audio.removeEventListener('ended', ended);
      audio.removeEventListener('timeupdate', reachedEnd);
      audio.removeEventListener('error', failed);
    };
    audio.addEventListener('ended', ended);
    audio.addEventListener('timeupdate', reachedEnd);
    audio.addEventListener('error', failed);
    try { return Promise.resolve(audio.play()).catch(failed); }
    catch { failed(); return Promise.resolve(); }
  }
}
