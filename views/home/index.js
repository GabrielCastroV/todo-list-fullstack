const h1 = document.querySelector('#title');
const div = document.querySelector('#desc-container');

const mostrar = [
    { opacity: 0, transform: 'translateY(-10px)' },
    { opacity: 1, transform: 'translateY(-10px)' },
];

const array = h1.innerHTML.split('');
h1.innerHTML = '';
array.forEach(l => {
    const span = document.createElement('span');
    span.innerHTML = l;
    span.classList.add('hola', 'opacity-0');
    h1.innerHTML += span.outerHTML;
});

const spans = document.querySelectorAll('.hola');
[...spans].forEach((sp, index) => {
    sp.animate(mostrar, {
        duration: 500,
        delay: index * 250,
        iterations: 1,
    });
    setTimeout(() => {
        sp.classList.remove('opacity-0');
        sp.classList.add('opacity-1');
    }, index * 250 + 500);
});

setTimeout(() => {
    div.classList.remove('opacity-0');
    div.classList.add('opacity-1');
}, 2000);