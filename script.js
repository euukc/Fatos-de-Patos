
const manchetes = document.querySelectorAll('.manchete');
const video = document.getElementById('video');


manchetes.forEach(manchete => {
    manchete.addEventListener('click', () => {
        
        video.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
});