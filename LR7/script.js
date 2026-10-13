// ====== ГЛОБАЛЬНІ ЗМІННІ ======
let watchId = null;

// Координати Коледжу
const ourCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

// Карта та маркери
let map = null;
let currentMarker = null;
let destMarker = null;
let trackMarkers = [];

// ====== ІНІЦІАЛІЗАЦІЯ ======
document.addEventListener("DOMContentLoaded", function () {
    getMyLocation();
    initMap();
    setupButtons();
});

// ====== ОТРИМАННЯ ПОТОЧНОГО МІСЦЯ ======
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("На жаль, ваш браузер не підтримує геолокацію");
    }
}

// ====== ВІДОБРАЖЕННЯ ЛОКАЦІЇ ======
function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const div = document.getElementById("location");
    div.innerHTML = `Ви знаходитесь на широті: ${latitude}, довготі: ${longitude}`;
    div.innerHTML += ` (точність: ${position.coords.accuracy} метрів)`;

    const km = computeDistance(position.coords, ourCoords);
    const distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = `Ви знаходитесь на відстані ${km.toFixed(2)} км від Коледжу`;

    updateMap(latitude, longitude);
}

// ====== ОБРОБКА ПОМИЛОК ======
function displayError(error) {
    const errorTypes = {
        0: "Невідома помилка",
        1: "Користувач відхилив доступ до геолокації",
        2: "Місцезнаходження недоступне",
        3: "Час очікування вичерпано"
    };

    let errorMessage = errorTypes[error.code];
    if (error.code === 0 || error.code === 2) {
        errorMessage += " " + error.message;
    }

    const div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

// ====== ФОРМУЛА ГАВЕРСИНУСА ======
function computeDistance(startCoords, destCoords) {
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);

    const Radius = 6371; // км

    const distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// ====== КНОПКИ ======
function setupButtons() {
    document.getElementById("watch").addEventListener("click", watchLocation);
    document.getElementById("clearWatch").addEventListener("click", clearWatch);
    document.getElementById("destBtn").addEventListener("click", handleDestination);
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
    console.log("Стеження розпочато. ID:", watchId);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        console.log("Стеження зупинено.");
    }
}

// ====== ІНІЦІАЛІЗАЦІЯ КАРТИ ======
function initMap() {
    map = L.map('map').setView([ourCoords.latitude, ourCoords.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap France'
    }).addTo(map);

    L.marker([ourCoords.latitude, ourCoords.longitude])
        .addTo(map)
        .bindPopup("Коледж")
        .openPopup();
}

// ====== ОНОВЛЕННЯ КАРТИ ======
function updateMap(lat, lng) {
    if (!map) return;

    const coords = [lat, lng];

    map.setView(coords, 15);

    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    currentMarker = L.marker(coords)
        .addTo(map)
        .bindPopup(`Ви тут:<br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup();

    // Якщо активне стеження — додаємо маркер в історію
    if (watchId) {
        const time = new Date().toLocaleTimeString();
        const trackMarker = L.marker(coords, { opacity: 0.6 })
            .addTo(map)
            .bindPopup(`Час: ${time}<br>${lat.toFixed(5)}, ${lng.toFixed(5)}`);

        trackMarkers.push(trackMarker);
    }
}

// ====== ПУНКТ ПРИЗНАЧЕННЯ ======
function handleDestination() {
    const lat = parseFloat(document.getElementById("destLat").value);
    const lng = parseFloat(document.getElementById("destLng").value);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Введіть коректні координати пункту призначення!");
        return;
    }

    if (!map) return;

    if (destMarker) {
        map.removeLayer(destMarker);
    }

    destMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Пункт призначення:<br>${lat}, ${lng}`)
        .openPopup();

    map.setView([lat, lng], 15);
}