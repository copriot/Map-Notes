var map;
var coords = [];

navigator.geolocation.getCurrentPosition(loadMap, console.log("Kabul edilmedi"));

function loadMap(e) {
    console.log(e);
    //haritanın kurulumu
    map = new L.map('map').setView([51.505, -0.09], 10);
    L.control;


    //haritanın nasıl gözükeceğini belirliyor
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}