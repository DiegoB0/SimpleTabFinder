chrome.commands.onCommand.addListener((command) => {
  if (command === "open_finder") {
    chrome.action.openPopup();
  }
});

