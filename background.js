chrome.commands.onCommand.addListener((command) => {
  if (command === "open_modal") {
    chrome.scripting.executeScript({
      target: { tabId: chrome.tabs.query({ active: true, currentWindow: true })[0].id },
      func: openModal
    });

  }
});

function openModal() {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.padding = '20px';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.color = 'white';
  modal.style.borderRadius = '8px';
  modal.innerText = 'It works!';


  document.body.appendChild(modal);

  setTimeout(() => {
    modal.remove();
  }, 3000);
}

