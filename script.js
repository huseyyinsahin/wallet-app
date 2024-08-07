const tarih = document.querySelector("#tarih");
const harcama = document.querySelector("#harcama");
const harcamaAdi = document.querySelector("#harcama-adi");
const ekleBtn = document.querySelector(".ekle-btn");

const tablo = document.querySelector(".tablo");

const gelir = document.querySelector("#gelir");
const gelirEkleBtn = document.querySelector(".gelir-ekle-btn");

const geliriniz = document.querySelector("#geliriniz");
const gideriniz = document.querySelector("#gideriniz");
const kalan = document.querySelector("#kalan");

const temizleBtn = document.querySelector(".temizle-btn");

const detay = document.querySelector(".detay");

let giderToplam = 0;
let gelirToplam = 0;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function saveLocalStorage() {
  const data = {
    giderToplam,
    gelirToplam,
    tablo: tablo.innerHTML,
    geliriniz: geliriniz.textContent,
    gideriniz: gideriniz.textContent,
    kalan: kalan.textContent,
  };
  localStorage.setItem("myData", JSON.stringify(data));
}

function loadLocalStorage() {
  const savedData = localStorage.getItem("myData");
  if (savedData) {
    const data = JSON.parse(savedData);
    giderToplam = data.giderToplam;
    gelirToplam = data.gelirToplam;
    tablo.innerHTML = data.tablo;
    geliriniz.textContent = data.geliriniz;
    gideriniz.textContent = data.gideriniz;
    kalan.textContent = data.kalan;
    kalan.textContent < 0
      ? (kalan.style.color = "red")
      : (kalan.style.color = "green");
  }
}

document.addEventListener("DOMContentLoaded", loadLocalStorage);

function harcamaFormuEkle() {
  const yeniTablo = document.createElement("tr");
  yeniTablo.classList.add("yeniTr");
  yeniTablo.innerHTML = `
  <td>${tarih.value}</td>
  <td class="harcama">${harcama.value}</td>
  <td>${harcamaAdi.value}</td>
  <td><i style="cursor:pointer;" class="text-danger bi bi-trash"></i></td>
  `;
  tablo.appendChild(yeniTablo);
  giderToplam += Number(harcama.value);
  gideriniz.textContent = giderToplam;
  kalan.textContent = gelirToplam - giderToplam;
  kalan.textContent < 0
    ? (kalan.style.color = "red")
    : (kalan.style.color = "green");
  tarih.value = "";
  harcama.value = "";
  harcamaAdi.value = "";
  saveLocalStorage();
}

ekleBtn.addEventListener("click", (e) => {
  if (tarih.value == "" || harcama.value == "" || harcamaAdi.value == "") {
    Toast.fire({
      icon: "error",
      title: "Lütfen tüm alanları doldurunuz!",
    });
  } else {
    e.preventDefault();
    harcamaFormuEkle();
    Toast.fire({
      icon: "success",
      title: "Tablo eklendi",
    });
  }
});

function gelirEkle() {
  if (gelir.value == "" || gelir.value == "0") {
    Toast.fire({
      icon: "warning",
      title: "Lütfen gelirinizi giriniz!",
    });
  } else {
    gelirToplam += Number(gelir.value);
    geliriniz.textContent = gelirToplam;
    kalan.textContent = gelirToplam - giderToplam;
    gelir.value = "";
    kalan.textContent < 0
      ? (kalan.style.color = "red")
      : (kalan.style.color = "green");
    saveLocalStorage();
    Toast.fire({
      icon: "success",
      title: "Gelir eklendi",
    });
  }
}

gelirEkleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gelirEkle();
});

function tabloSil(e) {
  if (e.target.classList.contains("bi-trash")) {
    let yeniHesap = e.target.closest(".yeniTr").children[1].textContent;
    giderToplam -= Number(yeniHesap);
    gideriniz.textContent = giderToplam;
    kalan.textContent = gelirToplam - giderToplam;
    kalan.textContent < 0
      ? (kalan.style.color = "red")
      : (kalan.style.color = "green");
    e.target.closest(".yeniTr").remove();
    saveLocalStorage();
    Toast.fire({
      icon: "warning",
      title: "Tablo silindi!",
    });
  }
}

tablo.addEventListener("click", (e) => {
  tabloSil(e);
});

function sayfayiTemizle() {
  const onay = window.confirm(
    "Tüm bilgileri temizlemek istediğinizden emin misiniz?"
  );
  if (onay) {
    giderToplam = 0;
    gelirToplam = 0;
    tablo.innerHTML = "";
    geliriniz.textContent = "";
    gideriniz.textContent = "";
    kalan.textContent = "";
    localStorage.removeItem("myData");
    Toast.fire({
      icon: "success",
      title: "Tüm bilgiler temizlendi",
    });
  }
}

temizleBtn.addEventListener("click", () => {
  sayfayiTemizle();
});

detay.addEventListener("click", () => {
  document.querySelector(".tablolar").classList.toggle("animation");
  document.querySelector(".tablolar").classList.toggle("animation5");
  document.querySelector(".table").classList.toggle("table5");
  document.querySelector(".tablolar").classList.toggle("flex-column-reverse");
  document.querySelector(".ekle1").classList.toggle("border");
});
