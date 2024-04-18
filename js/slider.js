const slides = document.querySelectorAll('.slide');
let index = 0;

function prevSlide(){
    slides[index].classList.remove('active');
    index--;

    if(index < 0)
        index = slides.length -1;

    slides[index].classList.add('active');      
}

document.querySelector('.prev').addEventListener('click', e => {
    prevSlide();
});

function nextSlide(){
    slides[index].classList.remove('active');
    index++;

    if(index > slides.length -1)
        index = 0;

    slides[index].classList.add('active');      
}

document.querySelector('.next').addEventListener('click', e => {
    nextSlide();
});

const fullPage = document.querySelector('#fullPage');
slides.forEach(slide => {
    slide.addEventListener('click', function() {
    fullPage.style.backgroundImage = 'url(' + slide.src + ')';
    fullPage.style.display = 'block';
  });
});