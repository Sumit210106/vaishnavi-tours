const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

const swiperHome = new Swiper(".home__swiper", {
  speed: 1200,
  effect: "fade",
  loop: true, // Enables infinite looping
  autoplay: {
    delay: 2500, // Changes slide every 3 seconds
    disableOnInteraction: false, // Allows autoplay to continue after user interaction
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: false, // Removes navigation buttons
});

gsap.from(".home__panel-1", { y: -1000, duration: 2 });
gsap.from(".home__panel-2", { y: 1000, duration: 2 });
gsap.from(".home__image", { x: 1000, duration: 2 });
gsap.from(".home__titles", { y: 100, opacity: 0, delay: 2 });
gsap.from(".home__title", { y: 100, opacity: 0, delay: 2.1 });

const blurHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

const apiKey = "c2a177b38371233ec459d1158924de81";

// Map OpenWeather icons to Font Awesome classes
const iconMap = {
  "01d": "fa-sun", // Clear sky day
  "01n": "fa-moon", // Clear sky night
  "02d": "fa-cloud-sun", // Few clouds day
  "02n": "fa-cloud-moon", // Few clouds night
  "03d": "fa-cloud", // Scattered clouds
  "03n": "fa-cloud",
  "04d": "fa-cloud", // Broken clouds
  "04n": "fa-cloud",
  "09d": "fa-cloud-showers-heavy", // Shower rain
  "09n": "fa-cloud-showers-heavy",
  "10d": "fa-cloud-rain", // Rain day
  "10n": "fa-cloud-rain", // Rain night
  "11d": "fa-bolt", // Thunderstorm
  "11n": "fa-bolt",
  "13d": "fa-snowflake", // Snow
  "13n": "fa-snowflake",
  "50d": "fa-smog", // Mist
  "50n": "fa-smog",
};

function fetchWeather(latitude, longitude) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const iconCode = data.weather[0].icon;
      const temperature = data.main.temp;
      const cityName = data.name;

      // Update DOM with Font Awesome Icon and Text
      const weatherIcon = iconMap[iconCode] || "fa-question-circle"; // Default to question mark
      document.getElementById("weather-icon").className = `fas ${weatherIcon}`;
      document.getElementById(
        "weather-text"
      ).textContent = `${temperature}°C, ${cityName}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weather-text").textContent =
        "Weather unavailable";
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        document.getElementById("weather-text").textContent =
          "Location unavailable";
      }
    );
  } else {
    document.getElementById("weather-text").textContent =
      "Geolocation not supported";
  }
}

// Fetch weather on page load
getUserLocation();

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => {
      observer.observe(el);
    });
  });