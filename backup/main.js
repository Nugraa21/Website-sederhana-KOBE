function data() {
    document.getElementById("output").textContent = "anjay";
}
window.onload = data;

const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

window.addEventListener('mousedown', () => {
  cursor.classList.add('click');
});

window.addEventListener('mouseup', () => {
  cursor.classList.remove('click');
});
