var Timer = {
    
    isPending : true,
    currentSec : 0,
    currentMin : 0,

    startTimer : function(){
        if(!this.isPending){ 
            this.currentSec+=1;
            if(this.currentSec==60){         
                this.currentSec=0;         
                this.currentMin+=1;         
            }     
            document.querySelector('#min').innerHTML = ('0' + this.currentMin).slice(-2);
            document.querySelector('#sec').innerHTML = ('0' + this.currentSec).slice(-2);
            setTimeout("Timer.startTimer()", 1000);         
        } 
    },

    pauseTimer : function(){
        this.isPending = true;
    },

    resetTimer : function(){
        this.isPending = true;
        this.currentSec = 0;
        this.currentMin = 0;
        document.querySelector('#min').innerHTML = "00";
        document.querySelector('#sec').innerHTML = "00";
    }

}
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector('#start').addEventListener('click' , function(){
        if(Timer.isPending){
            Timer.isPending = false;
            Timer.startTimer();
        }
    });

    document.querySelector('#pause').addEventListener('click' , function(){
        Timer.pauseTimer();
    });

    document.querySelector('#reset').addEventListener('click' , function(){
        Timer.resetTimer();
    });
});