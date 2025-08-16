// Bookmark functionality
function addToBookmarks() {
    const url = window.location.href;
    const title = document.title;
    
    // Create bookmark data
    const bookmarkData = {
        title: title,
        url: url,
        description: 'MockApe - Virtual Trading Platform'
    };
    
    // Try to add to browser bookmarks automatically
    try {
        // Modern browsers - attempt automatic bookmark
        if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Safari') || navigator.userAgent.includes('Firefox')) {
            // Create a temporary link and trigger bookmark
            const link = document.createElement('a');
            link.href = url;
            link.title = title;
            link.rel = 'bookmark';
            document.body.appendChild(link);
            
            // Try to trigger bookmark dialog
            if (window.sidebar && window.sidebar.addPanel) {
                // Mozilla Firefox
                window.sidebar.addPanel(title, url, '');
            } else if (window.external && ('AddFavorite' in window.external)) {
                // Internet Explorer
                window.external.AddFavorite(url, title);
            } else {
                // For modern browsers, show instructions but also try to add
                showBookmarkInstructions();
            }
            
            document.body.removeChild(link);
        } else {
            showBookmarkInstructions();
        }
    } catch (error) {
        showBookmarkInstructions();
    }
    
    // Store in localStorage for demo purposes
    const bookmarks = JSON.parse(localStorage.getItem('mockape_bookmarks') || '[]');
    bookmarks.push(bookmarkData);
    localStorage.setItem('mockape_bookmarks', JSON.stringify(bookmarks));
    
    // Show success message
    showNotification('Bookmark added successfully!', 'success');
}

function showBookmarkInstructions() {
    const instructions = `
        To add this page to your bookmarks:
        
        1. Press Ctrl+D (Windows/Linux) or Cmd+D (Mac)
        2. Or drag the "Add to Bookmarks" button to your bookmarks bar
        3. Or right-click and select "Bookmark this page"
    `;
    
    alert(instructions);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#a855f7'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        // Close button functionality
        const closeBtn = tab.querySelector('.fa-times');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (tabs.length > 1) {
                    tab.remove();
                }
            });
        }
        
        // Tab click functionality
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });
}

// Navigation icons functionality
function initializeNavigation() {
    const navIcons = document.querySelectorAll('.nav-icons i');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Add visual feedback
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Social icons functionality
function initializeSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const type = icon.classList.contains('discord') ? 'Discord' : 
                        icon.classList.contains('github') ? 'GitHub' : 'Network';
            
            showNotification(`Opening ${type}...`, 'info');
        });
    });
}

// Video player functionality
function initializeVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Simulate video play
            showNotification('Video player would open here', 'info');
            
            // Add visual feedback
            playButton.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);
        });
    }
}

// Trading interface functionality
function initializeTradingInterface() {
    const amountButtons = document.querySelectorAll('.amount-buttons button');
    const percentageButtons = document.querySelectorAll('.percentage-buttons button');
    
    // Amount buttons
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            amountButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });
    
    // Percentage buttons
    percentageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            percentageButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });
}

// New tab button functionality
function initializeNewTabButton() {
    const newTabBtn = document.querySelector('.new-tab-btn');
    
    if (newTabBtn) {
        newTabBtn.addEventListener('click', () => {
            const tabsSection = document.querySelector('.tabs-section');
            const newTab = document.createElement('div');
            newTab.className = 'tab';
            newTab.innerHTML = `
                <i class="fas fa-link"></i>
                <span>New Tab</span>
                <i class="fas fa-times"></i>
            `;
            
            tabsSection.appendChild(newTab);
            
            // Add event listeners to new tab
            const closeBtn = newTab.querySelector('.fa-times');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                newTab.remove();
            });
            
            newTab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                newTab.classList.add('active');
            });
            
            showNotification('New tab created!', 'success');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to bookmark buttons
    const bookmarkBtns = document.querySelectorAll('#bookmarkBtn, #ctaBookmarkBtn');
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', addToBookmarks);
    });
    
    // Make the CTA bookmark button draggable
    const ctaBookmarkBtn = document.getElementById('ctaBookmarkBtn');
    if (ctaBookmarkBtn) {
        ctaBookmarkBtn.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-url'));
            e.dataTransfer.setData('text/html', this.outerHTML);
            e.dataTransfer.effectAllowed = 'copy';
            
            // Add visual feedback
            this.style.opacity = '0.5';
        });
        
        ctaBookmarkBtn.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
        });
        
        ctaBookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addToBookmarks();
        });
    }
    
    // Initialize all components
    initializeTabs();
    initializeNavigation();
    initializeSocialIcons();
    initializeVideoPlayer();
    initializeTradingInterface();
    initializeNewTabButton();
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + D for bookmark
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            addToBookmarks();
        }
        
        // Ctrl/Cmd + T for new tab
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            document.querySelector('.new-tab-btn').click();
        }
    });
    
    console.log('CryptoSim website initialized successfully!');
});

// Add some dynamic content updates
setInterval(() => {
    // Update the rating randomly (for demo purposes)
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        const currentRating = parseFloat(ratingText.textContent);
        const newRating = Math.max(4.0, Math.min(5.0, currentRating + (Math.random() - 0.5) * 0.1));
        ratingText.textContent = newRating.toFixed(1);
    }
    
    // Update user count
    const usersText = document.querySelector('.users');
    if (usersText) {
        const currentUsers = parseInt(usersText.textContent.replace(/[^0-9]/g, ''));
        const newUsers = currentUsers + Math.floor(Math.random() * 3);
        usersText.textContent = `${newUsers.toLocaleString()}+ users`;
    }
}, 10000); // Update every 10 seconds
