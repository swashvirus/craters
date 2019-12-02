function countDownDate (year) {
	
	return new Date('August 13, '+ year +' 00:00:00')
}

function year (plus) {
	var plus = plus || 0;
	return new Date().getFullYear() + plus
}
// Update the count down every 1 second
var tick = setInterval(function () {
	
	// Get todays date and time
	var now = new Date().getTime();
	
	// Find the distance between now an the count down date
	var years = (( countDownDate(year()) - now) > 0) ? (year()) : (year(1));
	var distance = (countDownDate(years) - now);
	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	if (distance > 0) {
		document.querySelector("#seconds").innerHTML = seconds;
		document.querySelector("#minutes").innerHTML = minutes;
		document.querySelector("#hours").innerHTML = hours;
		document.querySelector("#days").innerHTML = days;
		document.querySelector("#years").innerHTML = years;
	}
	else {
		document.querySelector("#seconds").innerHTML = '-';
		document.querySelector("#minutes").innerHTML = '-';
		document.querySelector("#hours").innerHTML = '-';
		document.querySelector("#days").innerHTML = '-';
		document.querySelector("#years").innerHTML = '-';
	}

}, 1000);