const kartlar = [
  "🍎", "🍎", "🚗", "🚗", "🐱", "🐱", "🎵", "🎵",
  "🌞", "🌞", "⚽", "⚽", "📱", "📱", "🍕", "🍕"
];

let ilkKart = null;
let ikinciKart = null;
let kilitli = false;
let eşleşenKartSayısı = 0;
let sayaç;
let süre = 90;

function karistir(array) {
  return array.sort(() => 0.5 - Math.random());
}

function kartOlustur(kart) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.dataset.value = kart;
  div.innerHTML = `<span>${kart}</span>`;
  div.addEventListener("click", kartTikla);
  return div;
}

function kartTikla() {
  if (kilitli || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.querySelector("span").style.display = "block";

  if (!ilkKart) {
    ilkKart = this;
  } else {
    ikinciKart = this;
    kilitli = true;

    if (ilkKart.dataset.value === ikinciKart.dataset.value) {
      eşleşenKartSayısı += 2;
      ilkKart = null;
      ikinciKart = null;
      kilitli = false;

      if (eşleşenKartSayısı === kartlar.length) {
        clearInterval(sayaç);
        document.getElementById("message").innerText = "🎉 Tebrikler! Kazandın!";

        // Konfeti efekti
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    } else {
      setTimeout(() => {
        ilkKart.classList.remove("flipped");
        ikinciKart.classList.remove("flipped");
        ilkKart.querySelector("span").style.display = "none";
        ikinciKart.querySelector("span").style.display = "none";
        ilkKart = null;
        ikinciKart = null;
        kilitli = false;
      }, 1000);
    }
  }
}

function oyunBaslat() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  const karisik = karistir([...kartlar]);
  karisik.forEach(kart => board.appendChild(kartOlustur(kart)));
  süreyiBaslat();
}

function süreyiBaslat() {
  const mesaj = document.getElementById("message");
  sayaç = setInterval(() => {
    süre--;
    mesaj.innerText = `⏱ Kalan Süre: ${süre} saniye`;
    if (süre <= 0) {
      clearInterval(sayaç);
      mesaj.innerText = "⏰ Süre doldu! Kaybettin.";
      kilitli = true;
    }
  }, 1000);
}

function yenidenBaslat() {
  clearInterval(sayaç);
  süre = 90;
  ilkKart = null;
  ikinciKart = null;
  kilitli = false;
  eşleşenKartSayısı = 0;
  document.getElementById("message").innerText = `⏱ Kalan Süre: 90 saniye`;
  oyunBaslat();
}

function muzikToggle() {
  const muzik = document.getElementById("bg-music");
  if (muzik.paused) {
    muzik.play();
  } else {
    muzik.pause();
  }
}

oyunBaslat();
