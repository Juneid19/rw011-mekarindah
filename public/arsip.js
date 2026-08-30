(function() {
    var style = document.createElement('style');
    style.innerHTML = '.item-hidden { display: none !important; } .btn-arsip { display:block; margin:20px auto; padding:12px 30px; background:var(--primary); color:#fff; border:none; border-radius:25px; font-size:0.9rem; cursor:pointer; font-weight:600; transition: all 0.3s ease; } .btn-arsip:hover { background:var(--primary-dark); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }';
    document.head.appendChild(style);

    function setupArchive(gridId) {
        var grid = document.getElementById(gridId);
        if (!grid) return;
        
        var checker = setInterval(function() {
            var cards = grid.querySelectorAll('.card');
            if (cards.length > 0) {
                clearInterval(checker);
                
                if (cards.length > 3) {
                    var hiddenCount = 0;
                    cards.forEach(function(card, index) {
                        if (index >= 3) {
                            card.classList.add('item-hidden');
                            hiddenCount++;
                        }
                    });
                    
                    var btn = document.createElement('button');
                    btn.className = 'btn-arsip';
                    btn.innerHTML = '<i class="fas fa-archive"></i> Lihat Arsip Lengkap (' + hiddenCount + ' item)';
                    btn.onclick = function() {
                        grid.querySelectorAll('.item-hidden').forEach(function(c) { c.classList.remove('item-hidden'); });
                        btn.style.display = 'none';
                    };
                    grid.parentNode.insertBefore(btn, grid.nextSibling);
                }
            }
        }, 1500);
    }

    setupArchive('daftar-kegiatan');
    setupArchive('daftar-mading');
})();
