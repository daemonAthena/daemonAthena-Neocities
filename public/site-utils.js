/**
 * Load sidebar from external HTML file
 * @param {string} sidebarElementId - ID of the sidebar container
 */
function loadSidebar(sidebarElementId = 'sidebar-container') {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById(sidebarElementId).innerHTML = html;
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

/**
 * Initialize audio player
 */
function initAudioPlayer() {
    // Just ensure the audio player element exists
    const audioPlayer = document.getElementById('audio-player');
    if (!audioPlayer) {
        console.warn('Audio player element not found');
    }
}

/**
 * Play audio
 * @param {string} audioPath - Path to audio file
 * @param {string} trackName - Optional track name for display
 */
function playAudio(audioPath, trackName) {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    
    if (!audioPlayer || !audioSource) {
        console.error('Audio player not found');
        return;
    }
    
    audioSource.src = audioPath;
    audioPlayer.load();
    audioPlayer.play().catch(err => console.log('Play failed:', err));
}
