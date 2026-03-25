/**
 * Story Utilities - Shared functions for story pages
 */

/**
 * 
 */
function initSiteUtils() {
    loadStorySidebar();
}

/**
 * Load and display a text file with markdown support
 * @param {string} filePath - Path to the text/markdown file
 * @param {string} contentElementId - ID of the element to insert content into
 * @param {string} title - Title to display above the content
 */
function loadStoryContent(filePath, contentElementId, title) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            // Convert markdown and newlines to HTML
            const html = markdownToHtml(text);
            
            const contentElement = document.getElementById(contentElementId);
            contentElement.innerHTML = `<h2>${title}</h2>` + html;
        })
        .catch(error => {
            console.error('Error loading story:', error);
            document.getElementById(contentElementId).innerHTML = '<p>Error loading story.</p>';
        });
}

/**
 * Load sidebar from external HTML file
 * @param {string} sidebarElementId - ID of the sidebar container
 */
function loadStorySidebar(sidebarElementId = 'story-sidebar') {
    fetch('story-sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById(sidebarElementId).innerHTML = html;
        })
        .catch(error => console.error('Error loading sidebar:', error));
}


/**
 * Convert markdown to HTML
 * Supports:
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - # Headers
 * - - Bullet lists
 * - [Link text](url)
 * - Line breaks (single \n becomes <br>, double \n becomes paragraph break)
 * 
 * @param {string} markdown - Markdown text
 * @returns {string} - HTML string
 */
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Split by double newlines to create paragraphs
    const paragraphs = html.split('\n\n');
    
    html = paragraphs.map(paragraph => {
        // Skip if empty
        if (!paragraph.trim()) return '';
        
        // Check for headers (# ## ### etc)
        if (paragraph.match(/^#+\s/)) {
            const match = paragraph.match(/^(#+)\s(.*)/);
            const level = match[1].length;
            const headerText = match[2];
            return `<h${level}>${convertInlineMarkdown(headerText)}</h${level}>`;
        }
        
        // Check for bullet lists (lines starting with -)
        if (paragraph.match(/^\s*-\s/)) {
            const items = paragraph.split('\n').filter(line => line.trim());
            const listHTML = items.map(item => {
                const text = item.replace(/^\s*-\s/, '').trim();
                return `<li>${convertInlineMarkdown(text)}</li>`;
            }).join('');
            return `<ul>${listHTML}</ul>`;
        }
        
        // Otherwise treat as paragraph with inline markdown
        const convertedText = convertInlineMarkdown(paragraph);
        
        // Replace single newlines with <br> within paragraph
        const withBreaks = convertedText.replace(/\n/g, '<br>');
        
        return `<p>${withBreaks}</p>`;
    }).join('<br><br>');
    
    return html;
}

/**
 * Convert inline markdown elements
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - [Link text](url)
 * 
 * @param {string} text - Text with inline markdown
 * @returns {string} - HTML string
 */
function convertInlineMarkdown(text) {
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic: *text* or _text_
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Links: [text](url)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    return text;
}
