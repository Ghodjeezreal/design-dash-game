const canvas = document.getElementById('canvas');

function addElement(type) {
  let el = document.createElement('div');
  el.classList.add('element');
  el.style.top = '50px';
  el.style.left = '50px';

  if (type === 'text') {
    el.innerText = 'Edit text!';
    el.contentEditable = true;
  } else if (type === 'image') {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/100';
    img.style.width = '100px';
    el.appendChild(img);
  } else if (type === 'square') {
    el.classList.add('shape-square');
  } else if (type === 'circle') {
    el.classList.add('shape-circle');
  } else if (type === 'triangle') {
    el.classList.remove('element');
    el = document.createElement('div');
    el.classList.add('shape-triangle');
    el.style.position = 'absolute';
    el.style.top = '50px';
    el.style.left = '50px';
  }

  makeMovable(el);
  canvas.appendChild(el);
}

function makeMovable(el) {
  el.onmousedown = function (e) {
    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      el.style.left = pageX - shiftX + 'px';
      el.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    el.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;
    };
  };

  el.ondragstart = () => false;
}

function changeBackground() {
  const colors = ['#ffffff', '#e3f2fd', '#fff3e0', '#fce4ec', '#e8f5e9'];
  const current = getComputedStyle(canvas).backgroundColor;
  let next = colors[(colors.indexOf(current) + 1) % colors.length] || colors[1];
  canvas.style.background = next;
}

function captureDesign() {
  alert("Design captured! (You can use html2canvas to turn this into an image later.)");
}
