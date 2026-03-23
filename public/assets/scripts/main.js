/**
 * Load head of the HTML file
 * @param {string} headElementId - ID of the head container
 */
function loadHead(headElementId = 'head-container') {
    fetch('head.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById(headElementId).innerHTML = html;
        })
        .catch(error => console.error('Error loading head:', error));
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

