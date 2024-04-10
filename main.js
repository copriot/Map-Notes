import { detectType,setStorage,detectIcon } from "./helper.js";
//which comes from html
const form = document.querySelector("form");
const list = document.querySelector("ul");
const sidebar = document.getElementById('sidebar');
const openButton = document.querySelector('#openButton');
const closeButton = document.querySelector('#closeButton');

console.log(list);
//olay izleyiciler
form.addEventListener("submit",handleSubmit);
list.addEventListener("click",handleClick);

//ortak kullanim alani
var notes= JSON.parse(localStorage.getItem("notes")) || [];
var map;
var coords = [];
var layerGroup = [];


navigator.geolocation.getCurrentPosition(
    loadMap, 
    //console.log("Kabul edilmedi")
    );
//Haritaya tıklayınca çalıştır.
function onMapClick(e) {
    form.style.display = "flex";
  //  console.log(e);
  coords = [e.latlng.lat,e.latlng.lng];
  console.log(coords);
};

  function renderMarker(item) {
    // markerı oluşturur
    L.marker(item.coords, { icon: detectIcon(item.status) })
      // imleçlerin olduğu katmanı ekler
      .addTo(layerGroup)
      // üzerine tıklanınca açılacak popup yapısını ekleme
      .bindPopup(`${item.desc}`);
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
    attribution: ''
}).addTo(map);
// haritada ekrana basılacak imleçleri tutacağımız katman
layerGroup = L.layerGroup().addTo(map);

//localden gelen notları harita geldiğinde ekrana renderlama
renderNoteList(notes);
//Haritada bir tıklanma olduğunda çalışacak fonksiyon
map.on("click", onMapClick);
};





//formun gönderilme olayında çalışıyor.
function handleSubmit(e) {
    e.preventDefault();
  console.log(e);
  const desc = e.target[0].value;
  if(!desc) return; // içerikleri boşsa durdur fonksiyonu
  const date = e.target[1].value;
  if(!date) return;
  const status = e.target[2].value;
  if(!status) return;
  notes.push({id: new Date().getTime(),desc,date,status,coords});
  console.log(notes);
  //localstorageyi güncelle.
  setStorage(notes);
  //5
//renderNoteList fonksiyonuna notes dizisini gönderdik
  renderNoteList(notes);
  //formu kapatma
  form.style.display = "none";
};
//ekrana notları basma
function renderNoteList(item) {
  //notlar alanını temizler
list.innerHTML = "";
layerGroup.clearLayers();
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
};

function handleClick(e) {
  //güncellenecek elemanın id'sini öğrenme
  const id = e.target.parentElement.parentElement.dataset.id;
  console.log(e.target.id);
  if(e.target.id === "delete"){
    //idsini bildiğimiz elemanı diziden kaldırma
    notes = notes.filter((note) => note.id != id);
    //locali güncelle
    setStorage(notes);
    renderNoteList(notes);
  };
  if(e.target.id === "fly") {
    const note = notes.find((note) => note.id == id);
    map.flyTo(note.coords);
  };
};

openButton.addEventListener ("click", openNote);
closeButton.addEventListener ("click", closeNote);


function closeNote() {

  sidebar.style.display = "none";
};

function openNote() {
  sidebar.style.display = "flex";
};

console.log(sidebar);