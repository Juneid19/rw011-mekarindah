// galeri-video-fix.js - Slider stop saat video main, jalan lagi saat selesai

var _galeriVideoPlaying = false;
var _ytPlayer = null;
var _ytApiReady = false;

// Load YouTube IFrame API
(function(){
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
})();

// Wajib global - dipanggil YouTube saat API siap
function onYouTubeIframeAPIReady() { _ytApiReady = true; }

// Override playYouTube
playYouTube = function(el, videoId) {
    pauseSlideshow();
    _galeriVideoPlaying = true;
    var slide = el.closest('.galeri-slide');
    var ket = slide.getAttribute('data-keterangan') || '';

    if (_ytApiReady) {
        slide.innerHTML = '<div id="ytGaleriPlayer" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>' +
            (ket ? '<div class="galeri-caption">' + ket + '</div>' : '');
        if (_ytPlayer) { try { _ytPlayer.destroy(); } catch(e){} _ytPlayer = null; }
        _ytPlayer = new YT.Player('ytGaleriPlayer', {
            videoId: videoId,
            playerVars: { autoplay: 1, rel: 0 },
            events: {
                onStateChange: function(e) {
                    if (e.data === YT.PlayerState.ENDED) {
                        _galeriVideoPlaying = false;
                        resumeSlideshow();
                    }
                }
            }
        });
    } else {
        // Fallback kalau API belum siap
        slide.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;position:absolute;top:0;left:0;"></iframe>' +
            (ket ? '<div class="galeri-caption">' + ket + '</div>' : '');
    }
};

// Override stopAllVideos
stopAllVideos = function() {
    _galeriVideoPlaying = false;
    if (_ytPlayer) { try { _ytPlayer.destroy(); } catch(e){} _ytPlayer = null; }
    document.querySelectorAll('.galeri-slide iframe, #ytGaleriPlayer').forEach(function(el) { el.remove(); });
};

// Override resumeSlideshow - jangan resume kalau video masih main
var _origResume = resumeSlideshow;
resumeSlideshow = function() {
    if (_galeriVideoPlaying) return;
    _origResume();
};
