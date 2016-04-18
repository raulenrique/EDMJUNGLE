$( document ).ready(function() {
                                                  // selecting the spinner wrap and when clicked will have a function call back
  $('.spinner-wrap').click(function() {
                                                //caching the variable instead of dipping into the DOM every time to discover what this is
    var $this = $(this),                        //identify the source within the audio tag
        audio = $this.siblings('audio')[0],       //becuase audio tag is a sibling of what we just clicked we have to identify it as a sibling. 
                                              //Look at index zero for the actual audio. At this point player works but can't turn it off.
        bpm = Number($this.siblings('audio').data('bpm')) 
        pulse = (60/bpm)*1000;
    
    //enable if statement to allow user to play and pause song.
    //when we click on the button check if the audio is paused. If it's not paused then play it. If it is paused then play it it.
      audio.pause();
      audio.currentTime = 0;
      $this.removeClass('playing');
      clearInterval(intervals);
    }
    
    else {
      audio.play();
      $this.addClass('playing');
      pulsing();
      intervals = setInterval(function() {pulsing()}, pulse);
      
    }
    
    
    function pulsing() {
      
      $this.addClass('pulse');
      
      setTimeout(function() {
        $this.removeClass('pulse');  
      }, pulse-100);
      
    }
    

});