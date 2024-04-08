import { detectType,setStorage } from "./helper.js";
//which comes from html
const form = document.querySelector("form");
const list = document.querySelector("ul");
console.log(list);
//olay izleyiciler
form.addEventListener("submit",handleSubmit);

//ortak kullanim alani
var notes= JSON.parse(localStorage.getItem("notes")) || [];
var map;
var coords = [];
var layerGroup = [];


navigator.geolocation.getCurrentPosition(
    loadMap, 
    console.log("Kabul edilmedi")
    );
//Haritaya tıklayınca çalıştır.
function onMapClick(e) {
    form.style.display = "flex";
  //  console.log(e);
  coords = [e.latlng.lat,e.latlng.lng];
  console.log(coords);
}

function renderMarker(item) {
console.log(item);
};

//kullanicinin konumuna göre ekrana haritayı getirme
function loadMap(e) {
    //console.log(e);
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

//localden gelen notları harita geldiğinde ekrana renderlama
renderNoteList(notes);
//Haritada bir tıklanma olduğunda çalışacak fonksiyon
map.on("click", onMapClick);
}
//formun gönderilme olayında çalışıyor.
function handleSubmit(e) {
    e.preventDefault();
  console.log(e);
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  notes.push({id: new Date().getTime(),desc,date,status,coords});
  console.log(notes);
  //localstorageyi güncelle.
  setStorage(notes);
  renderNoteList(notes);
}
//ekrana notları basma
function renderNoteList(item) {
  //notlar alanını temizler
list.innerHTML = "";
//herbir not için diziyi dön ve notlara aktar
item.forEach((item) => {
  // console.log(item);
  const listElement = document.createElement("li");
  //datasına sahip olduğu id yi ekleme
  listElement.dataset.id = item.id;
  listElement.innerHTML =`
  <div>
      <p>${item.desc}</p>
      <p><span>Tarih:</span>${item.date}</p>
      <p><span>Durum:</span>${detectType(item.status)
      }</p>


      <i class="bi bi-x" id="delete"></i>
      <i class="bi bi-airplane-fill" id="fly"></i>
  </div>
`;
//console.log(listElement);
list.insertAdjacentElement("afterbegin", listElement);
renderMarker(item);
});
}