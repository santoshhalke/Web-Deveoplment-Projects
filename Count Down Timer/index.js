const startDate = new Date().getTime();
const goalDate = new Date("January 5, 2025 01:03:00").getTime();

function updateCount(){
    
    const currentTime = new Date().getTime();
    const pendingTime = goalDate - currentTime;
    
    if(pendingTime < 0){
        clearInterval();
        document.getElementById('timer-container').innerHTML = "EXPIRED";
        document.getElementById('progress').style.width = "100%";
    }else{
        
        const day = 86400000;
        const hour = 3600000;
        const minute = 60000;
        
        const remDays = Math.floor(pendingTime / day);
        const remHours = Math.floor((pendingTime % day) / hour);
        const remMinutes = Math.floor((pendingTime % hour) / minute);
        const remSeconds = Math.floor((pendingTime % minute) / 1000);
        
        document.getElementById('days').innerText = remDays;
        document.getElementById('hrs').innerText = remHours;
        document.getElementById('min').innerText = remMinutes;
        document.getElementById('sec').innerText = remSeconds;
        
        // updating progress
        const completedTime = currentTime - startDate; 
        const totalTime = goalDate - startDate;
    
        const completed = Math.floor((completedTime / totalTime) * 100);
        console.log(completed);
        document.getElementById("progress").style.width = completed + '%';

    }

}

setInterval(updateCount, 1000);