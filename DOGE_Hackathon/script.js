const slideTitle = document.getElementById('slide-title');
const slideImage = document.getElementById('slide-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let data = [];
let currentIndex = 0;

// Fetch slide configuration
async function fetchSlideConfig() {
    try {
        const response = await fetch('slide_config.json');
        const jsonData = await response.json();
        data = jsonData.slides;
        loadSlide(currentIndex);
    } catch (error) {
        console.error('Error loading slide configuration:', error);
    }
}

function loadSlide(index) {
    if (data.length === 0) return;

    const slide = data[index];
    slideTitle.textContent = slide.id.replace('_', ' ');
    slideImage.src = slide.image;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    loadSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % data.length;
    loadSlide(currentIndex);
});

// Initialize
fetchSlideConfig();
