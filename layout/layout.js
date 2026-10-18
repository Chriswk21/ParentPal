// Mobile menu functionality
const mobileMenuButton = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuButton && navLinks) {
	mobileMenuButton.setAttribute("aria-expanded", "false");

	mobileMenuButton.addEventListener("click", () => {
		const isOpen = navLinks.classList.toggle("show");
		mobileMenuButton.setAttribute("aria-expanded", String(isOpen));

		const icon = mobileMenuButton.querySelector("i");
		icon.classList.toggle("fa-bars");
		icon.classList.toggle("fa-times");
	});
}

// Mark the current page in the main navigation
(function markActiveNav() {
	if (!navLinks) return;
	const current = window.location.pathname.split("/").pop() || "index.html";
	navLinks.querySelectorAll("a").forEach((link) => {
		const target = (link.getAttribute("href") || "").split("/").pop();
		if (target === current) {
			link.classList.add("is-active");
			link.setAttribute("aria-current", "page");
		}
	});
})();

// Scroll reveal: [data-reveal] containers get .is-in once visible.
// Children opt in with .rv (styles in design-system.css).
(function initReveal() {
	const groups = document.querySelectorAll("[data-reveal]");
	if (!groups.length || !("IntersectionObserver" in window)) return;

	document.documentElement.classList.add("js-reveal");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-in");
					observer.unobserve(entry.target);
				}
			});
		},
		{ rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
	);

	groups.forEach((group) => observer.observe(group));
})();

// Profile dropdown functionality
const profileIcon = document.getElementById("profile-icon");

if (profileIcon) {
	profileIcon.addEventListener("click", function (e) {
		e.stopPropagation();
		this.classList.toggle("active");
	});

	// Close dropdown when clicking outside
	document.addEventListener("click", () => {
		profileIcon.classList.remove("active");
	});
}

// Check authentication status on page load
document.addEventListener("DOMContentLoaded", () => {
	checkAuthStatus();
});

function checkAuthStatus() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const desktopLogin = document.getElementById("desktop-login");
	const profileIcon = document.getElementById("profile-icon");
	const userName = document.getElementById("user-name");
	const userEmail = document.getElementById("user-email");

	if (isLoggedIn === "true" && currentUser) {
		// User is logged in
		if (desktopLogin) desktopLogin.style.display = "none";
		if (profileIcon) profileIcon.style.display = "flex";

		if (userName)
			userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
		if (userEmail) userEmail.textContent = currentUser.email;

		// Handle expert status
    if (currentUser.role === "expert") {
		// Update profile image styling
		const profileImage = profileIcon?.querySelector(".profile-image")
		if (profileImage) profileImage.classList.add("expert")

		// Change icon to medical icon for experts
		const profileIcons = document.querySelectorAll(".profile-image i")
		profileIcons.forEach((icon) => {
			icon.className = "fas fa-user-md"
		})

		// Show expert badge
		const expertBadges = document.querySelectorAll(".expert-badge")
		expertBadges.forEach((badge) => {
			badge.style.display = "inline-flex"
		})
    } else {
		// Remove expert styling for regular users
		const profileImage = profileIcon?.querySelector(".profile-image")
		if (profileImage) profileImage.classList.remove("expert")

		// Regular user icon
		const profileIcons = document.querySelectorAll(".profile-image i")
		profileIcons.forEach((icon) => {
			icon.className = "fas fa-user"
		})

		// Hide expert badge
		const expertBadges = document.querySelectorAll(".expert-badge")
		expertBadges.forEach((badge) => {
			badge.style.display = "none"
		})
    }
	} else {
		// User is not logged in
		if (desktopLogin) desktopLogin.style.display = "block";
		if (profileIcon) profileIcon.style.display = "none";
	}
}

// Helper function to get correct path based on current location
function getCorrectPath(targetPage) {
	const currentPath = window.location.pathname;

	if (currentPath.includes("/html/")) {
		return targetPage;
	}

	return "html/" + targetPage;
}

function goToDashboard() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {
		if (currentUser.role === "expert") {
			window.location.href = getCorrectPath("expert-dashboard.html");
		} else {
			window.location.href = getCorrectPath("user-dashboard.html");
		}
	}
}

function logout() {
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("currentUser");

	const currentPath = window.location.pathname;
	if (currentPath.includes("/html/")) {
		window.location.href = "../index.html";
	} else {
		window.location.href = "index.html";
	}
}
