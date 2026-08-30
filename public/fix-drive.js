document.addEventListener("DOMContentLoaded", function() {
    function prosesDrive() {
        document.querySelectorAll('.galeri-slide:not(.drive-fixed), .card-img-circle:not(.drive-fixed), .hero-image:not(.drive-fixed)').forEach(function(el) {
            var tag = el.tagName;
            var img = (tag === 'IMG') ? el : el.querySelector('img');
            if (!img) return;
            
            var src = img.getAttribute('src');
            if (!src || !src.includes('drive.google.com')) return;
            
            var match = src.match(/\/d\/([^/]+)/) || src.match(/[?&]id=([^&]+)/);
            if (!match) return;
            var id = match[1];

            if (src.includes('/preview')) {
                var slide = el.closest('.galeri-slide');
                if (slide && !slide.classList.contains('drive-fixed')) {
                    var captionEl = slide.querySelector('.galeri-caption');
                    var captionHtml = captionEl ? captionEl.outerHTML : '';
                    slide.classList.add('drive-fixed');
                    slide.innerHTML = '<iframe src="https://drive.google.com/file/d/' + id + '/preview" style="width:100%;height:100%;border:none;position:absolute;top:0;left:0;" allow="autoplay" allowfullscreen></iframe>' + captionHtml;
                }
            } else {
                if (tag === 'IMG') { img.src = 'https://lh3.googleusercontent.com/d/' + id; img.classList.add('drive-fixed'); }
                else { el.classList.add('drive-fixed'); img.src = 'https://lh3.googleusercontent.com/d/' + id; }
            }
        });
    }

    var observer = new MutationObserver(function() { prosesDrive(); });
    var cek = setInterval(function() {
        var track = document.getElementById('galeriTrack');
        if (track) { observer.observe(track, { childList: true }); prosesDrive(); clearInterval(cek); }
    }, 500);
    setInterval(prosesDrive, 3000);
});
