chrome.runtime.onInstalled.addListener(function () {
  console.log("Tab Fuzzy Finder is installed!");
});


chrome.commands.onCommand.addListener((command) => {
  if (command === "open_finder") {
    chrome.action.openPopup();
  }
});

