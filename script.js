document.querySelectorAll('.tool').forEach(tool => {
  tool.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', tool.dataset.type);
  });
});

const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', e => e.preventDefault());

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  let el = document.createElement('div');
  el.classList.add('element');
  el.style.top = e.offsetY + 'px';
  el.style.left = e.offsetX + 'px';

  if (type === 'text') {
    el.innerText = 'Edit text!';
    el.setAttribute('contenteditable', true);
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
    el.style.top = e.offsetY + 'px';
    el.style.left = e.offsetX + 'px';
  }

  el.draggable = true;
  el.addEventListener('dragstart', dragStart);
  canvas.appendChild(el);
});

function dragStart(e) {
  const style = window.getComputedStyle(e.target, null);
  e.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - e.clientX) + ',' + 
    (parseInt(style.getPropertyValue("top"),10) - e.clientY));
}

canvas.addEventListener('drop', function(e) {
  const offset = e.dataTransfer.getData("text/plain").split(',');
  const element = document.elementFromPoint(e.clientX, e.clientY);
  if (element.classList.contains('element') || element.classList.contains('shape-triangle')) {
    element.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
    element.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
    e.preventDefault();
    return false;
  }
});

function captureDesign() {
  alert("Design captured! (This is a placeholder — use html2canvas to export image later.)");
}

function changeBackground() {
  const colors = ['#ffffff', '#e3f2fd', '#fff3e0', '#fce4ec', '#e8f5e9'];
  const current = getComputedStyle(canvas).backgroundColor;
  let next = colors[(colors.indexOf(current) + 1) % colors.length] || colors[1];
  canvas.style.background = next;
}
