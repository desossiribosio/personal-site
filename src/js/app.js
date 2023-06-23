function onPageChange() {
	// Tab title easter egg
	let pageTitle = document.title;
	// console.log(pageTitle);
	let message = "Torna qui... :c";
	document.addEventListener("visibilitychange", function (e) {
		let isPageActive = !document.hidden;
		if (!isPageActive) {
			document.title = message;
		} else {
			document.title = pageTitle;
		}
	});

	// Homepage
	if (["/", "/index.html"].indexOf(location.pathname) + 1) {
		const loadingPage = document.querySelector(".loading-page");
		const confetti = new ConfettiCannon();
		// Funzione per nascondere la pagina di caricamento
		function hideLoadingPage() {
			if (!loadingPage) return;
			loadingPage.style.opacity = 0;
			setTimeout(function () {
				loadingPage.classList.add("hidden");
			}, 2000); // Ritardo di 1.5 secondi (corrispondente alla durata dell'animazione CSS)
		}

		// Ritardo di 3.5 secondi prima di chiamare la funzione per nascondere la pagina di caricamento
		setTimeout(hideLoadingPage, 7500);

		// Show confetti cannon
		const canvas = document.querySelector("canvas#canvas");
		canvas.style.display = "block";

		// Run clock
		updateTimer();
		const timerInterval = setInterval(updateTimer, 1000);
	}

	// Projects
	if (location.pathname.startsWith("/project-")) {
		const el = document.querySelector("#bcg");
		el.addEventListener("mousemove", (e) => {
			el.style.backgroundPositionX = -e.offsetX + "px";
			// el.style.backgroundPositionY = -e.offsetY + "px";
		});

		el.addEventListener("mouseout", () => {
			el.style.backgroundPositionX = "0px";
			el.style.backgroundPositionY = "0px";
		});
	}

	if (["/contact.html"].indexOf(location.pathname) + 1) {
		let nameElement = document.getElementById("name");
		let photoElement = document.getElementById("photo");
		nameElement.addEventListener("mouseenter", function () {
			var tl = anime.timeline({
				easing: "easeInOutExpo",
			});

			tl.set(photoElement, {
				translateY: -100,
				opacity: 0,
			}).add({
				targets: photoElement,
				translateY: -0,
				opacity: 1,
				duration: 800,
			});
		});
		nameElement.addEventListener("mouseout", function () {
			var tl = anime.timeline({
				easing: "easeInOutExpo",
			});

			tl.add({
				targets: photoElement,
				translateY: -100,
				opacity: 0,
				duration: 800,
			});
		});

		document.getElementById("contact-form").addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent the default form submission

			var form = event.target;
			var formData = new FormData(form);
			var formDataObj = {};

			formData.forEach((value, key) => (formDataObj[key] = value));

			function handleError() {
				const errorMessage = document.getElementById("errorMessage");
				errorMessage.style.display = "block";
				form.reset();
				setTimeout(() => {
					anime({
						targets: errorMessage,
						opacity: 0,
						duration: 800,
						complete: function (anim) {
							errorMessage.style.display = "none";
						},
					});
				}, 5000);
			}

			fetch(form.action, {
				method: form.method,
				body: JSON.stringify(formDataObj),
				headers: { "Content-Type": "application/json" },
			})
				.then(function (response) {
					if (response.ok) {
						return response.json();
					} else {
						handleError();
						throw new Error("Error submitting the form.");
					}
				})
				.then(function (data) {
					if (data.success) {
						// Show the success message
						const successMessage = document.getElementById("successMessage");
						successMessage.style.display = "block";
						form.reset();
						setTimeout(() => {
							anime({
								targets: successMessage,
								opacity: 0,
								duration: 800,
								complete: function (anim) {
									successMessage.style.display = "none";
								},
							});
						}, 5000);
					} else {
						handleError();
						throw new Error("Form submission unsuccessful.");
					}
				})
				.catch(function (error) {
					console.error(error);
				});
		});
	}
}

function unload() {
	// Hide confetti cannon
	const canvas = document.querySelector("canvas#canvas");
	if (canvas) canvas.style.display = "none";

	const loadingPage = document.querySelector(".loading-page");
	if (loadingPage) loadingPage.style.display = "none";

	if (typeof timerInterval !== "undefined" && timerInterval !== null) clearInterval(timerInterval);

	const el = document.querySelector("#bcg");
	if (el) el.style.display = "none";
}

function updateTimer() {
	const timerElement = document.getElementById("timer");
	const currentTime = new Date();
	const hours = currentTime.getHours().toString().padStart(2, "0");
	const minutes = currentTime.getMinutes().toString().padStart(2, "0");
	const seconds = currentTime.getSeconds().toString().padStart(2, "0");
	const timeString = hours + ":" + minutes + ":" + seconds;
	if (timerElement) timerElement.textContent = timeString;
}

// Swup Init

const swup = new Swup();

// Run once when page loads
if (document.readyState === "complete") {
	onPageChange();
} else {
	document.addEventListener("DOMContentLoaded", () => onPageChange());
}

swup.on("pageView", () => onPageChange());
swup.on("willReplaceContent", () => unload());
