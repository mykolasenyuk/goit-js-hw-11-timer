
const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]')
}


class CountdownTimer {
    constructor({ selector, targetDate,onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTick = onTick;
        this.intervalId = null;
        this.isActive = false;
    }

    start() {
        if (this.isActive) {
            return;
        }
        const startTime = this.targetDate.getTime();
        this.isActive = true;

          this.intervalId=setInterval(() => {
                const currentTime = Date.now()
                const deltaTime = (startTime - currentTime);
                const time = this.getTimeComponents(deltaTime);
                this.onTick(time)
            }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
         const time = this.getTimeComponents(0);
                this.onTick(time)
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
};


const timer =  new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Aug 25, 2021'),
  onTick: updateClockface
});



function updateClockface({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`; 
};



const startBtn = document.querySelector('.startBtn-js');
// console.log(startBtn)
startBtn.addEventListener('click', () => {
    timer.start()
});



const stopBtn = document.querySelector('.stopBtn-js');
stopBtn.addEventListener('click', () => {
    timer.stop()
});









