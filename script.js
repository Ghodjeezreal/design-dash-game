document.querySelectorAll('.tool').forEach(tool => {
  tool.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', tool.dataset.type);
  });
});

const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', e => {
  e.preventDefault();
});

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');

  let newElement;
  if (type === 'text') {
    newElement = document.createElement('div');
    newElement.textContent = 'Edit Me!';
    newElement.contentEditable = true;
    newElement.style.padding = '5px 10px';
    newElement.style.position = 'absolute';
    newElement.style.top = `${e.offsetY}px`;
    newElement.style.left = `${e.offsetX}px`;
    newElement.style.border = '1px dashed #999';
    newElement.style.background = '#fff';
  } else if (type === 'image') {
    newElement = document.createElement('img');
    newElement.src = 'https://via.placeholder.com/100';
    newElement.style.position = 'absolute';
    newElement.style.top = `${e.offsetY}px`;
    newElement.style.left = `${e.offsetX}px`;
    newElement.style.width = '100px';
  }

  if (newElement) {
    canvas.appendChild(newElement);
  }
});
