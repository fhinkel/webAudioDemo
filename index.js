var audioContext = new AudioContext()


var scale = {
lowd:-7, 
 e: -5, 
 f: -4,
 fis: -3,
 g: -2,
 a: 0,
 h: 2,
 c: 3, 
 d: 5
 };



var pachelbel = ['d','a','h','fis','g','lowd','g','a'];

var m = 0.5;

for (var i = 0; i <  pachelbel.length; i++) {
	var tune = pachelbel[i];
	console.log(tune);
	pitch = scale[tune];
	console.log(pitch)
	play(i, pitch, m)
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

  //oscillator.connect(filter)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100 

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}


function playOld(delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration
  var oscillator = audioContext.createOscillator()
  oscillator.connect(audioContext.destination)
  

    oscillator.detune.value = pitch * 100;
  //oscillator.frequency.value = 440 * Math.pow(2, pitch/ 12)


  oscillator.start(startTime)
  oscillator.stop(endTime)
  
  


}