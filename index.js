
const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]')
}
class CountdownTimer {
    constructor({ selector, targetDate,onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;;
        this.onTick=onTick
    }

    start() {
            const startTime = this.targetDate.getTime()
            setInterval(() => {
                const currentTime = Date.now()
                const deltaTime = (startTime - currentTime);
                const time = this.getTimeComponents(deltaTime);
                this.onTick(time)
            }, 1000);
    }

    getTimeComponents(time) {
     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
     const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };        
    }
    
    pad(value) {
    return String(value).padStart(2, '0');
}

}
const timer =  new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Jun 1, 2022'),
  onTick: updateClockface
});
timer.start()



function updateClockface({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
    
}






