

var audioContext;

if('webkitAudioContext' in window) {
    audioContext = new webkitAudioContext();
} else {
	audioContext = new AudioContext()

}

var x = document.getElementById("playButton");
x.addEventListener("click", function() {
	playCanon();

});


function playCanon() {
	var scale = {
		lowh: -10,
		d:-7, 
		e: -5, 
		f: -4,
		fis: -3,
		g: -2,
		a: 0,
		h: 2,
		c: 3, 
		cis: 4,
		highd: 5,
		highfis: 9,
		higha: 12
	};

	var pachelbelCello = ['highd','a','h','fis','g','d','g','a'];

	var pachelbelViolin = [
	 	"d", "fis", "a", "g", "fis", "d", "fis", "e", 
	 	"d", "lowh", "d", "a", "g", "h", "a", "g", 
	 	"fis", "d", "e", "cis", "highd", "highfis", "higha", "a",
	 	"h", "g", "a", "fis", "d", "highd", "highd", "cis"
	]

	var m = 0.5;

	for (var i = 0; i <  pachelbelCello.length; i++) {
		var tune = pachelbelCello[i];
		console.log(tune);
		celloPitch = scale[tune] - 12;
		console.log(celloPitch)
		play(i, celloPitch, m)
	}

	var offset = 8;
	for (var i = 0; i <  pachelbelCello.length; i++) {
		var tune = pachelbelCello[i];
		console.log(tune);
		celloPitch = scale[tune] - 12;
		console.log(celloPitch)
		play( offset + i, celloPitch, m)
	}

	for (var i = 0; i < pachelbelViolin.length; i++) {
		var tune = pachelbelViolin[i];
		console.log(tune);
		violinPitch = scale[tune];
		console.log(violinPitch);
		play(offset + i*m/2 , violinPitch, m/2);
	}
}


function play(delay, pitch, duration) {

  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var filter = audioContext.createBiquadFilter()
  filter.connect(audioContext.destination)
  filter.type = 'highpass'
  filter.frequency.value = 10000
  filter.frequency.setValueAtTime(10000, startTime)
  filter.frequency.linearRampToValueAtTime(500,  endTime)

  var oscillator = audioContext.createOscillator()

  var amp = audioContext.createGain()
  amp.gain.value = 0
  amp.gain.setTargetAtTime(1, startTime, 0.1)
  amp.gain.setTargetAtTime(0, endTime, 0.2)
  amp.connect(audioContext.destination)
  oscillator.connect(amp)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}


