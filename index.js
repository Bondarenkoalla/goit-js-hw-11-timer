class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate.getTime();
    this.refs = {
      days: document.querySelector(`${selector} span[data-value="days"]`),
      hours: document.querySelector(`${selector} span[data-value="hours"]`),
      mins: document.querySelector(`${selector} span[data-value="mins"]`),
      secs: document.querySelector(`${selector} span[data-value="secs"]`),
    };
    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const timeComponents = this.getTimeComponents(deltaTime);
      this.updateClockface(timeComponents);
    }, 1000);
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  updateClockface({ days, hours, mins, secs }) {
    this.refs.days.innerHTML = days;
    this.refs.hours.innerHTML = hours;
    this.refs.mins.innerHTML = mins;
    this.refs.secs.innerHTML = secs;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});
