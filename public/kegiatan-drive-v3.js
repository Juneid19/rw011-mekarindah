document.addEventListener("DOMContentLoaded", function() {
    function fixKegiatanDrive() {
        document.querySelectorAll('#daftar-kegiatan img').forEach(function(img) {
            if (img.classList.contains('drive-fixed')) return;
            var src = img.getAttribute('src');
            if (src && src.includes('drive.google.com') && src.includes('/preview')) {
                var match = src.match(/\/d\/([^/]+)/);
                if (match) {
                    var id = match[1];
                    var captionEl = img.nextElementSibling;
                    var ketText = (captionEl && captionEl.tagName !== 'DIV') ? captionEl.textContent : 'Video Dokumentasi';
                    
                    img.classList.add('drive-fixed');
                    img.style.display = 'none';
                    
                    var wrapper = document.createElement('div');
                    wrapper.className = 'card';
                    wrapper.style.cssText = 'cursor:pointer; padding:0; overflow:hidden; border-radius:15px; margin-bottom:15px; box-shadow: var(--shadow);';
                    wrapper.innerHTML = '<div style="position:relative; width:100%; aspect-ratio:16/10; background:#000;">' +
                        '<img src="https://lh3.googleusercontent.com/d/' + id + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.src=\'https://placehold.co/600x400/000/fff?text=Video\'">' +
                        '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);">' +
                        '<div style="width:60px;height:42px;background:rgba(0,0,0,0.8);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;">▶</div>' +
                        '</div></div>' +
                        '<div style="padding:15px;"><p style="font-size:0.95rem;font-weight:600;color:var(--dark);">' + ketText + '</p>' +
                        '<p style="font-size:0.75rem;color:var(--gray);margin-top:5px;">📎 Klik untuk memutar video</p></div>';
                    
                    wrapper.onclick = function() { window.open('https://drive.google.com/file/d/' + id + '/preview', '_blank'); };
                    img.parentNode.insertBefore(wrapper, img);
                }
            }
        });
    }
    var observer = new MutationObserver(function() { fixKegiatanDrive(); });
    var cek = setInterval(function() {
        var grid = document.getElementById('daftar-kegiatan');
        if (grid) { observer.observe(grid, { childList: true }); fixKegiatanDrive(); clearInterval(cek); }
    }, 1000);
});
