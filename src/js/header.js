document.addEventListener('DOMContentLoaded', function () {
    const stickySection = document.querySelector('.sticky-section');
    const header = document.querySelector('header');

    function checkScroll() {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > viewportHeight) {
            stickySection.classList.add('visible');
        } else {
            stickySection.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.swap-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    prevBtn.addEventListener('click', function () {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
});