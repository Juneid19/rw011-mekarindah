// media-renderer.js - Universal media renderer untuk Mading & Kegiatan

function extractYouTubeId(url) {
    if (!url) return null;
    var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.*[?&]v=))([^&\n?#]+)/);
    return m ? m[1] : null;
}

function detectMediaType(url) {
    if (!url) return 'foto';
    var u = url.toLowerCase();
    if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
    if (u.includes('instagram.com')) return 'instagram';
    if (u.includes('tiktok.com')) return 'tiktok';
    if (u.includes('drive.google.com') && u.includes('/preview')) return 'video_drive';
    if (u.includes('archive.org/details/')) return 'archive';
    if (u.match(/\.(mp4|webm|ogg)(\?|$)/i) || u.includes('archive.org/download/')) return 'video';
    return 'foto';
}

function renderMedia(url, tipe) {
    if (!url) return '';

    // Auto-detect kalau tipe kosong atau masih 'foto'
    if (!tipe || tipe === 'foto') {
        var det = detectMediaType(url);
        if (det !== 'foto') tipe = det;
    }

    switch (tipe) {

        case 'youtube':
            var vid = extractYouTubeId(url);
            if (vid) {
                return '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);margin-bottom:15px;background:#000;">' +
                    '<iframe src="https://www.youtube.com/embed/' + vid + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>';
            }
            return fallbackImg(url);

        case 'instagram':
            return '<a href="' + url + '" target="_blank" style="display:block;padding:40px;text-align:center;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:white;border-radius:var(--radius);margin-bottom:15px;text-decoration:none;font-weight:600;font-size:1.2rem;">' +
                '<i class="fab fa-instagram" style="font-size:2rem;display:block;margin-bottom:10px;"></i>Lihat Video di Instagram</a>';

        case 'tiktok':
            return '<a href="' + url + '" target="_blank" style="display:block;padding:40px;text-align:center;background:#010101;color:white;border-radius:var(--radius);margin-bottom:15px;text-decoration:none;font-weight:600;font-size:1.2rem;border:1px solid #333;">' +
                '<i class="fab fa-tiktok" style="font-size:2rem;display:block;margin-bottom:10px;color:#25F4EE;text-shadow:-2px 0 #FE2C55;"></i>Lihat Video di TikTok</a>';

        case 'video':
            return '<div style="border-radius:var(--radius);margin-bottom:15px;overflow:hidden;background:#000;">' +
                '<video controls playsinline preload="metadata" style="width:100%;display:block;"><source src="' + url + '" type="video/mp4">Browser tidak mendukung video.</video></div>';

        case 'video_drive':
            var dm = url.match(/\/d\/([^/]+)/);
            if (dm) {
                return '<a href="https://drive.google.com/file/d/' + dm[1] + '/preview" target="_blank" style="display:block;border-radius:var(--radius);margin-bottom:15px;overflow:hidden;box-shadow:var(--shadow);text-decoration:none;">' +
                    '<div style="position:relative;width:100%;aspect-ratio:16/10;background:#000;">' +
                    '<img src="https://lh3.googleusercontent.com/d/' + dm[1] + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.src=\'https://placehold.co/600x400/000/fff?text=Video\'">' +
                    '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);">' +
                    '<div style="width:60px;height:42px;background:rgba(0,0,0,0.8);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;">&#9654;</div>' +
                    '</div></div></a>';
            }
            return fallbackImg(url);

        case 'archive':
            var arkId = url.match(/archive\.org\/details\/([^/?\s]+)/);
            if (arkId) {
                return '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);margin-bottom:15px;background:#000;">' +
                    '<iframe src="https://archive.org/embed/' + arkId[1] + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>';
            }
            return fallbackImg(url);

        default:
            return fallbackImg(url);
    }
}

function fallbackImg(url) {
    return '<img src="' + url + '" class="card-img" onerror="this.style.display=\'none\'">';
}
