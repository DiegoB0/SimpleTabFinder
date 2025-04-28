chrome.commands.onCommand.addListener((command) => {
  if (command === 'open_modal') {
    chrome.action.openPopup(); // Opens the popup (modal)
  }

});


