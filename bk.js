const pool = document.getElementById('sortable-pool');
let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('text/plain', this.getAttribute('data-value'));
    this.style.opacity = '0.4';
}

function handleDragOver(e) {
    if (e.preventDefault) { e.preventDefault(); }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation(); }
    
    if (dragSrcEl !== this) {
        // Tukar innerHTML
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        
        // Tukar attribute data-value
        let srcValue = dragSrcEl.getAttribute('data-value');
        dragSrcEl.setAttribute('data-value', this.getAttribute('data-value'));
        this.setAttribute('data-value', srcValue);
    }
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    cards.forEach(function (card) {
        card.style.opacity = '1';
    });
}

function initDragAndDrop() {
    cards = document.querySelectorAll('.num-card');
    cards.forEach(function(card) {
        card.addEventListener('dragstart', handleDragStart, false);
        card.addEventListener('dragover', handleDragOver, false);
        card.addEventListener('drop', handleDrop, false);
        card.addEventListener('dragend', handleDragEnd, false);
    });
}

// Jalankan Drag & Drop pertama kali
let cards = document.querySelectorAll('.num-card');
initDragAndDrop();

// Fungsi Memeriksa Hasil Sorting siswa
function checkSorting() {
    const currentCards = document.querySelectorAll('.num-card');
    const values = Array.from(currentCards).map(card => parseInt(card.getAttribute('data-value')));
    
    // Cek apakah data sudah berurutan naik (ascending)
    let isCorrect = true;
    for(let i = 0; i < values.length - 1; i++) {
        if(values[i] > values[i+1]) {
            isCorrect = false;
            break;
        }
    }

    const msgBox = document.getElementById('game-message');
    if(isCorrect) {
        msgBox.innerHTML = "🎉 Luar biasa! Algoritma kamu berhasil. Angka telah berurutan dengan benar.";
        msgBox.className = "message success";
    } else {
        msgBox.innerHTML = "❌ Hmm, urutannya masih belum tepat. Coba perhatikan polanya lagi!";
        msgBox.className = "message error";
    }
}

// Fungsi Reset/Acak Kartu Baru
function resetGame() {
    const defaultNumbers = [37, 12, 89, 25, 50];
    // Mengacak array secara random
    const shuffled = defaultNumbers.sort(() => Math.random() - 0.5);
    
    pool.innerHTML = '';
    shuffled.forEach(num => {
        const card = document.createElement('div');
        card.className = 'num-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-value', num);
        card.innerText = num;
        pool.appendChild(card);
    });
    
    document.getElementById('game-message').innerText = '';
    initDragAndDrop(); // Re-assign event listener untuk elemen baru
}

/* ==================== SCRIPT GAME 2: PATTERN RECOGNITION ==================== */
let currentCorrectAnswer = 32; // Default jawaban untuk pola awal (x2)

// Bank data pola matematika sederhana
const patternBank = [
    { seq: [2, 4, 8, 16], ans: 32 },       // Pola: dikali 2
    { seq: [5, 10, 15, 20], ans: 25 },     // Pola: ditambah 5
    { seq: [1, 4, 9, 16], ans: 25 },       // Pola: bilangan kuadrat (1², 2², 3², 4², 5²)
    { seq: [50, 44, 38, 32], ans: 26 },    // Pola: dikurangi 6
    { seq: [3, 9, 27, 81], ans: 243 }      // Pola: dikali 3
];

function checkPattern() {
    const playerAnswer = parseInt(document.getElementById('pattern-answer').value);
    const msgBox = document.getElementById('pattern-message');

    if (isNaN(playerAnswer)) {
        msgBox.innerHTML = "⚠️ Harap masukkan angka terlebih dahulu!";
        msgBox.className = "message error";
        return;
    }

    if (playerAnswer === currentCorrectAnswer) {
        msgBox.innerHTML = "🎉 Keren! Kamu berhasil mengenali struktur pola aturan angka dengan tepat.";
        msgBox.className = "message success";
    } else {
        msgBox.innerHTML = "❌ Jawaban salah. Amati ulang selisih atau pola dari deret angka tersebut!";
        msgBox.className = "message error";
    }
}

function generateNewPattern() {
    // Ambil pola acak yang berbeda dari bank data
    const randomIndex = Math.floor(Math.random() * patternBank.length);
    const selectedPattern = patternBank[randomIndex];

    // Terapkan ke elemen HTML
    document.getElementById('p1').innerText = selectedPattern.seq[0];
    document.getElementById('p2').innerText = selectedPattern.seq[1];
    document.getElementById('p3').innerText = selectedPattern.seq[2];
    document.getElementById('p4').innerText = selectedPattern.seq[3];
    
    // Simpan jawaban benarnya
    currentCorrectAnswer = selectedPattern.ans;
    
    // Reset input dan pesan
    document.getElementById('pattern-answer').value = '';
    document.getElementById('pattern-message').innerText = '';
}