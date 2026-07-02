/* SCRIPT TAB SELECTOR DINAMIS */
function switchTab(tabId, clickedCard) {
    // Sembunyikan semua section kontainer materi
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Hapus kelas aktif pada 3 kartu navigasi atas
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => card.classList.remove('active'));

    // Aktifkan tab konten dan kartu yang dipilih
    document.getElementById(tabId).classList.add('active');
    clickedCard.classList.add('active');
}

/* SCRIPT JAVASCRIPT DRAG AND DROP GAME */
const parts = document.querySelectorAll('.drag-part');
const slots = document.querySelectorAll('.target-slot');
let draggedId = null;

parts.forEach(part => {
    part.addEventListener('dragstart', function(e) {
        draggedId = this.id;
        e.dataTransfer.setData('text/plain', this.id);
        this.style.opacity = '0.5';
    });
    part.addEventListener('dragend', function() { this.style.opacity = '1'; });
});

slots.forEach(slot => {
    slot.addEventListener('dragover', function(e) {
        e.preventDefault();
        if(!this.classList.contains('correct')) this.classList.add('hovered');
    });
    slot.addEventListener('dragleave', function() { this.classList.remove('hovered'); });
    slot.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('hovered');
        
        const dataId = e.dataTransfer.getData('text/plain');
        const acceptId = this.getAttribute('data-accept');

        if(dataId === acceptId) {
            this.classList.add('correct');
            this.innerText = "✓ " + document.getElementById(dataId).innerText + " Terpasang!";
            document.getElementById(dataId).style.display = 'none';
            checkGame();
        } else {
            const m = document.getElementById('assembly-message');
            m.innerHTML = "❌ Salah wadah! Karakternya tidak cocok dengan slot hardware ini.";
            m.className = "message error";
        }
    });
});

function checkGame() {
    const correctSlots = document.querySelectorAll('.target-slot.correct');
    const m = document.getElementById('assembly-message');
    if(correctSlots.length === slots.length) {
        m.innerHTML = "🎉 Luar biasa Fikri! Seluruh hardware vital terpasang sempurna pada sirkuit Motherboard.";
        m.className = "message success";
    }
}

function resetAssemblyGame() {
    document.getElementById('assembly-message').innerText = '';
    document.getElementById('s-mobo').className = "target-slot";
    document.getElementById('s-mobo').innerText = "Dudukan Casing Komputer";
    document.getElementById('s-cpu').className = "target-slot";
    document.getElementById('s-cpu').innerText = "Soket Persegi Kunci Processor";
    document.getElementById('s-ram').className = "target-slot";
    document.getElementById('s-ram').innerText = "Slot DIMM Panjang Motherboard";
    parts.forEach(p => p.style.display = 'block');
}
