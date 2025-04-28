chrome.commands.onCommand.addListener((command) => {
  if (command === "open_modal") {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openModal
      });
    });
  }
});

function openModal() {
  const modal = document.createElement("div");
  modal.id = "simple-modal";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.color = "white";
  modal.style.padding = "20px";
  modal.style.borderRadius = "10px";
  modal.style.zIndex = "10000";
  modal.style.textAlign = "center";
  modal.innerText = "It works!";
  document.body.appendChild(modal);

  // Close the modal on click

  modal.addEventListener("click", () => {
    modal.remove();
  });
}

