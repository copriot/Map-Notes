//Tipi analiz edip ona göre fonksiyonun cagirildigi yere tipe denk gelen açıklamatyı gönderme 
export const detectType = (type) => {
  // console.log(type);
  switch (type) {
    case "park":
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
