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
  const el = document.createElement('div');
  el.classList.add('element');
  el.style.top = e.offsetY + 'px';
  el.style.left = e.offsetX + 'px';
  el.setAttribute('contenteditable', true);

  if (type === 'text') {
    el.innerText = 'Edit text!';
  } else if (type === 'image') {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/100';
    img.style.width = '100px';
    el.innerHTML = '';
    el.appendChild(img);
    el.setAttribute('contenteditable', false);
  } else if (type === 'shape') {
    el.innerText = '';
    el.style.background = '#ffcccc';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.borderRadius = '10px';
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
  if (element.classList.contains('element')) {
    element.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
    element.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
    e.preventDefault();
    return false;
  }
});

function captureDesign() {
  alert("Design captured! (You can replace this with canvas export or backend logic.)");
}
