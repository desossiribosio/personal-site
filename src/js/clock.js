function updateTimer() {
	const timerElement = document.getElementById("timer");
	const currentTime = new Date();
	const hours = currentTime.getHours().toString().padStart(2, "0");
	const minutes = currentTime.getMinutes().toString().padStart(2, "0");
	const seconds = currentTime.getSeconds().toString().padStart(2, "0");
	const timeString = hours + ":" + minutes + ":" + seconds;
	timerElement.textContent = timeString;
}

// Call the function initially to display the initial time
updateTimer();

// Update the timer every second (1000 milliseconds)
setInterval(updateTimer, 1000);
