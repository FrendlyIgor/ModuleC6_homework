const btn = document.querySelector(".btn");
const width =  window.screen.width;
const height =  window.screen.height;
btn.addEventListener('click', () => {
 alert(`Размер экрана: ${width} на ${height}`);
})
