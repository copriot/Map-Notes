//Tipi analiz edip ona göre fonksiyonun cagirildigi yere tipe denk gelen açıklamatyı gönderme 
export const detectType = (type) => {
  // console.log(type);
  switch (type) {
    case "Park":
      return "Park Yeri";
    case "home":
      return "Ev";
    case "job":
      return "İş Yeri";
    case "goto":
      return "Ziyaret Yeri";
  }
};

export const setStorage = (data) => {
  console.log(data);
  //veriyi locale göndermek için stringe çevirdim
  const strData = JSON.stringify(data);
  //localStorage güncelledim
  localStorage.setItem("notes", strData);
};
var carIcon = L.icon({
    iconUrl: 'assets/car.png',
    iconSize: [50, 50],
});
var homeIcon = L.icon({
    iconUrl: 'assets/home-marker.png',
    iconSize: [50, 50],
});
var jobIcon = L.icon({
    iconUrl: 'assets/job.png',
    iconSize: [50, 50],
});
var gotoIcon = L.icon({
    iconUrl: 'assets/visit.png',
    iconSize: [50, 50],
});

export function detectIcon (type) {
    switch(type) {
        case "Park":
        return carIcon;
        case "home":
        return homeIcon;
        case "job":
        return jobIcon;
        case "goto":
        return gotoIcon;
    }
}