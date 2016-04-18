$(document).ready(function() {
	
$('.spinner-wrap').click(function() {

var $this = $(this),
	audio = $this.siblings ('audio')[0],
	bpm = Number($this.siblings('audio').data('bpm'))
	pulse = (60/bpm)*1000;//transferring to milliseconds as this is the rhythym in which the player will pulse
	// console.log(pulse); 483.8709677419355 --number in miliseconds that player will animate  = (60/bpm)*1000
	//console.log(bpm);getting the bpm to make sure it's been captured properly



	if (audio.paused === false) {
		audio.pause();
		audio.currentTime = 0;
		$this.removeClass('playing');
		clearInterval(intervals);
	}

	else {

		audio.play();
		$this.addClass('playing');
		pulsing(); //making player relative to pulse as opposed to playing
		intervals = setInterval (function() {pulsing()}, pulse); //when audio plays we will start function called pulsing at an interval


	}

function pulsing() {


	$this.addClass('pulse'); //finds this and adds class pulse

	setTimeout(function() {
		$this.removeClass('pulse');}, pulse-50); //remove class of pulse so remove happens a little quicker

}


});

});



