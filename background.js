chrome.commands.onCommand.addListener((command) => {
  if (command === 'open_modal') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({

        target: { tabId: tabs[0].id },
        func: openModalInTab,
      });

    });
  }
});

function openModalInTab() {
  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'simple-modal';
  modal.style.position = 'fixed';

  modal.style.top = '20%';
  modal.style.left = '50%';
  modal.style.transform = 'translateX(-50%)';
  modal.style.width = '400px';
  modal.style.height = '300px';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.color = 'white';

  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.borderRadius = '8px';

  modal.style.zIndex = '9999';

  // Add modal content
  const modalText = document.createElement('p');

  modalText.innerText = 'It works!';
  modalText.style.fontSize = '24px';
  modalText.style.textAlign = 'center';

  modal.appendChild(modalText);

  // Add close button
  const closeButton = document.createElement('button');

  closeButton.innerText = 'Close';

  closeButton.style.marginTop = '20px';
  closeButton.style.padding = '10px';
  closeButton.style.fontSize = '16px';

  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);

  });
  modal.appendChild(closeButton);

  // Append modal to the body
  document.body.appendChild(modal);
}

