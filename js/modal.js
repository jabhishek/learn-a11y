var tabbable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary'
  .split(',')
  .map(e => e.trim());

var modal        = document.querySelector('.focus-modal');
var modalButton  = document.querySelector('.focus-modal-button');
var modalOverlay = document.querySelector('.focus-modal-overlay');
var cancelButton = document.querySelector('.focus-modal-cancel');
var tabbableNodes = modal.querySelectorAll(tabbable);

modalButton.addEventListener('click', open);
cancelButton.addEventListener('click', close);
modalOverlay.addEventListener('click', close);

console.log(tabbable, tabbableNodes);
// Get a list of tabbable elements here:
// https://github.com/jkup/focusable

function onKeydown(e) {
  if (e.key === 'Tab') {
    if (e.shiftKey && e.target === tabbableNodes[0]) {
      e.preventDefault();
      console.log('go to last element');
      tabbableNodes[tabbableNodes.length - 1].focus();
    } else if (!e.shiftKey && e.target === tabbableNodes[tabbableNodes.length - 1]) {
      e.preventDefault();
      console.log('go to first element');
      tabbableNodes[0].focus();
    }
  }
  
  if (e.key === 'Escape') {
    close();
  }
}

function open() {
  // Show the modal and overlay
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
  modal.addEventListener('keydown', onKeydown);
  tabbableNodes[0].focus();
}

function close() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
}
