// Mengambil element penting
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const apologyScene = document.getElementById('apology-scene');
const animationWrapper = document.getElementById('animation-wrapper');

// --- LOGIKA TOMBOL "NO" LOMPAT ---

// Fungsi untuk mendapatkan posisi acak
function getRandomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

// Saat mouse mendekat atau menyentuh tombol No
function moveNoButton() {
  // Mendapatkan ukuran layar browser
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Mendapatkan ukuran tombol No
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // Menghitung batas aman agar tombol tidak keluar layar
  const maxTop = screenHeight - btnHeight - 50; // Jarak 50px dari bawah
  const maxLeft = screenWidth - btnWidth - 50; // Jarak 50px dari kanan

  // Menghitung posisi lompatan baru yang acak
  const newTop = getRandomPosition(50, maxTop); // Jarak 50px dari atas
  const newLeft = getRandomPosition(50, maxLeft); // Jarak 50px dari kiri

  // Menerapkan posisi baru secara paksa (override)
  noBtn.style.position = 'fixed';
  noBtn.style.top = `${newTop}px`;
  noBtn.style.left = `${newLeft}px`;
  // Miringkan sedikit agar terlihat lucu
  noBtn.style.transform = `rotate(${getRandomPosition(-15, 15)}deg)`;
}

// Event listener untuk mouse (desktop) dan touch (HP)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

// Jika Nurmah sangat cepat dan berhasil meng-klik tombol No, tampilkan alert lucu
noBtn.addEventListener('click', () => {
    alert("Yahh, kok berhasil dipencet sih? 🥺 Coba pencet 'Yes' aja deh sayang..");
});


// --- LOGIKA TOMBOL "YES" GANTI SCENE ---

yesBtn.addEventListener('click', () => {
  // 1. Fade-out Scene 1 (Permintaan Maaf)
  apologyScene.style.opacity = '0';
  
  // 2. Tunggu 0.5 detik (sesuai durasi transisi CSS) sebelum ganti scene
  setTimeout(() => {
    // Sembunyikan total Scene 1
    apologyScene.style.display = 'none';
    
    // Tampilkan Scene 2 (Wrapper Animasi 3D Jantung)
    animationWrapper.style.display = 'block';
    
    // Tambahkan class agar foto langsung muncul sempurna di CSS
    animationWrapper.classList.add('active');
    
    // Aktifkan logika gerakan 3D jantung
    enable3DRotation();
    
    // Reset opacity agar fade-in smooth
    animationWrapper.style.opacity = '0';
    requestAnimationFrame(() => {
      animationWrapper.style.opacity = '1';
    });
    
  }, 500); 
});


// LOGIKA GERAKAN 3D JANTUNG ASLI (Dibungkus dalam fungsi)
function enable3DRotation() {
  let container = document.querySelector('.container');

  // Mouse Move di Desktop
  window.addEventListener('mousemove',(e)=>{
    var x = e.pageX;
    var y = e.pageY;
    
    // Matikan animasi otomatis agar gerakan mouse lancar
    container.style.animation = "none";
    // Gerakan rotasi berdasarkan posisi mouse (dibagi agar tidak terlalu liar)
    container.style.transform = `rotateY(${x / 5}deg) rotateX(${-y / 5}deg)`;
  })

  // Mouse Out di Desktop (Balik ke animasi otomatis)
  window.addEventListener('mouseout',(e)=>{
    container.style.animation = "animate 45s linear infinite";
  })

  // Touch Move di HP
  window.addEventListener("touchmove",(e)=>{
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    
    container.style.animation = "none";
    container.style.transform = `rotateY(${x / 5}deg) rotateX(${-y / 5}deg)`;
  })

  // Touch End di HP (Balik ke animasi otomatis)
  window.addEventListener('touchend',(e)=>{
    container.style.animation = "animate 45s linear infinite";
  })
}