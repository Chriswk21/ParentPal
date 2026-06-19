document.addEventListener("DOMContentLoaded", function () {
	// Button hover effects
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("mouseenter", function () {
			this.style.transform = this.classList.contains("cta-btn")
				? "translateY(-3px)"
				: "translateY(-2px)";
			this.style.boxShadow = "0 5px 15px rgba(242, 125, 125, 0.3)";
		});

		button.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0)";
			this.style.boxShadow = "none";
		});
	});

	// Card hover effects
	const cards = document.querySelectorAll(
		".article-card, .video-card, .expert-card, .testimonial-card, .benefit-card"
	);
	cards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-5px)";
			this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
		});

		card.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0)";
			this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
		});
	});

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				// Close mobile menu if open
				if (navLinks.classList.contains("show")) {
					navLinks.classList.remove("show");
					const icon = mobileMenuButton.querySelector("i");
					icon.classList.remove("fa-times");
					icon.classList.add("fa-bars");
				}

				// Scroll to target
				window.scrollTo({
					top: targetElement.offsetTop - 80, // Account for fixed header
					behavior: "smooth",
				});
			}
		});
	});

	// Testimonial
	const track = document.querySelector(".review-track");
	const reviewCards = Array.from(document.querySelectorAll(".review-card"));
	const prevBtn = document.querySelector(".prev-btn");
	const nextBtn = document.querySelector(".next-btn");
	const dotsContainer = document.querySelector(".slider-dots");

	let currentIndex = 0;
	let cardWidth;
	let visibleCards;
	let totalSlides;
	let autoSlideInterval;

	function setupCarousel() {
		if (!track) return;

		if (window.innerWidth >= 992) {
			visibleCards = 3;
		} else if (window.innerWidth >= 768) {
			visibleCards = 2;
		} else {
			visibleCards = 1;
		}

		const containerWidth = track.parentElement.clientWidth;
		cardWidth = containerWidth / visibleCards;

		reviewCards.forEach((card) => {
			card.style.minWidth = `${cardWidth - 20}px`;
		});

		totalSlides = Math.ceil(reviewCards.length / visibleCards);

		moveToIndex(0);

		if (reviewCards.length <= visibleCards) {
			prevBtn.style.display = "none";
			nextBtn.style.display = "none";
			dotsContainer.innerHTML = "";
		} else {
			prevBtn.style.display = "";
			nextBtn.style.display = "";
		}
	}

	function moveToIndex(index) {
		if (!track) return;

		if (index < 0) {
			index = (totalSlides - 1) * visibleCards;
		} else if (index >= totalSlides * visibleCards) {
			index = 0;
		}

		currentIndex = index;

		const offset = -index * cardWidth;
		track.style.transform = `translateX(${offset}px)`;

		updateDots();
	}

	function updateDots() {
		dotsContainer.innerHTML = "";

		for (let i = 0; i < totalSlides; i++) {
			const dot = document.createElement("span");
			dot.classList.add("dot");
			if (i === Math.floor(currentIndex / visibleCards)) {
				dot.classList.add("active");
			}
			dot.addEventListener("click", () => moveToIndex(i * visibleCards));
			dotsContainer.appendChild(dot);
		}
	}

	function startAutoSlide() {
		clearInterval(autoSlideInterval);
		autoSlideInterval = setInterval(() => {
			moveToIndex(currentIndex + visibleCards);
		}, 5000);
	}

	function stopAutoSlide() {
		clearInterval(autoSlideInterval);
	}

	function initCarousel() {
		setupCarousel();
		startAutoSlide();

		window.addEventListener("resize", () => {
			setupCarousel();
			startAutoSlide();
		});

		if (prevBtn && nextBtn) {
			prevBtn.addEventListener("click", () => {
				moveToIndex(currentIndex - visibleCards);
				startAutoSlide();
			});
			nextBtn.addEventListener("click", () => {
				moveToIndex(currentIndex + visibleCards);
				startAutoSlide();
			});
		}

		if (track) {
			track.addEventListener("mouseenter", stopAutoSlide);
			track.addEventListener("mouseleave", startAutoSlide);
		}
	}

	initCarousel();
});