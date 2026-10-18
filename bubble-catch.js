class BubbleCatchFlow {
  constructor() {
    this.phase = 'source';
    this.sourceHeard = false;
    this.targetHeard = false;
  }

  finishSource(ok) {
    if (!ok) return;
    this.sourceHeard = true;
    if (this.phase === 'source') this.phase = 'target';
  }

  finishTarget(ok) {
    if (!ok || !this.sourceHeard) return;
    this.targetHeard = true;
    if (this.phase === 'target') this.phase = 'position';
  }

  selectPosition(index, requiredIndex) {
    if (this.phase !== 'position' || index !== requiredIndex) return false;
    this.phase = 'bubbles';
    return true;
  }

  canChooseBubble() { return this.phase === 'bubbles'; }

  solve() {
    if (this.canChooseBubble()) this.phase = 'solved';
  }
}
