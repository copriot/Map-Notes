import { setStorage } from "./helper.js";
//which comes from html
const form = document.querySelector("form");

//olay izleyiciler
form.addEventListener("submit",handleSubmit);

//ortak kullanim alani
var notes= [];
var map;
var coords = [];
var layerGroup = [];


navigator.geolocation.getCurrentPosition(
    loadMap, 
    console.log("Kabul edilmedi")
    );

function onMapClick(e) {
    form.style.display = "flex";
  //  console.log(e);
  coords = [e.latlng.lat,e.latlng.lng];
  console.log(coords);
}



//kullanicinin konumuna göre ekrana haritayı getirme
function loadMap(e) {
    console.log(e);
    //haritanın kurulumu
    map = new L.map('map').setView([e.coords.latitude, e.coords.longitude], 9);
    L.control;


    //haritanın nasıl gözükeceğini belirliyor
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// haritada ekrana basılacak imleçleri tutacağımız katman
layerGroup = L.layerGroup().addTo(map);
//Haritada bir tıklanma olduğunda çalışacak fonksiyon
map.on("click", onMapClick);
}

function handleSubmit(e) {
    e.preventDefault();
  console.log(e);
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  notes.push({id: new Date().getTime(),desc,date,status,coords});
  console.log(notes);
  setStorage(notes)
}