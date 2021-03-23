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
            $('#min').html( ('0' + this.currentMin).slice(-2) );
            $('#sec').html( ('0' + this.currentSec).slice(-2) );
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
        $('#min').html("00");
        $('#sec').html("00");
    }

}
$(document).ready(function(){

    $('#start').click(function(){
        if(Timer.isPending){
            Timer.isPending = false;
            Timer.startTimer();
        }
    });

    $('#pause').click(function(){
        Timer.pauseTimer();
    });

    $('#reset').click(function(){
        Timer.resetTimer();
    });

});