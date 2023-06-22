const swup = new Swup();

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

function onPageChange() {
	const canvas = document.querySelector("canvas#canvas");
	if (["/", "/index.html"].indexOf(location.pathname) + 1) {
		canvas.style.display = "block";
		console.log("Sono in home");
	} else {
		canvas.style.display = "none";
		console.log("Non sono in home");
	}
}

swup.on("pageView", () => onPageChange());


const loadingPage = document.querySelector(".loading-page");

// Funzione per nascondere la pagina di caricamento
function hideLoadingPage() {
	loadingPage.style.opacity = 0;
	setTimeout(function () {
		loadingPage.classList.add("hidden");
	}, 2000); // Ritardo di 1.5 secondi (corrispondente alla durata dell'animazione CSS)
}

// Ritardo di 3.5 secondi prima di chiamare la funzione per nascondere la pagina di caricamento
setTimeout(hideLoadingPage, 7500);


/* let nameElement = document.getElementById("name");
let photoElement = document.getElementById("photo");

nameElement.addEventListener("click", function() {
  photoElement.classList.toggle("visible");
}); */



