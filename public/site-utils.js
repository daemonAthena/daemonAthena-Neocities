
/**
 * Initialize site utils
 */
function initSiteUtils() {
    // Load the sidebar
    loadSidebar();
}


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
