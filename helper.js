export const setStorage = (data) => {
    console.log(data);
    //veriyi locale göndermek için stringe çevirdim
    const strData = JSON.stringify(data);
    //localStorage güncelledim
    localStorage.setItem("notes",strData);
}