chrome.commands.onCommand.addListener((command) => {
  if (command === 'open_modal') {
    chrome.system.display.getInfo((displays) => {
      const primaryDisplay = displays.find(display => display.isPrimary);
      if (primaryDisplay) {
        const screenWidth = primaryDisplay.workArea.width;
        const screenHeight = primaryDisplay.workArea.height;
        const modalWidth = 400;  // Modal width
        const modalHeight = 300; // Modal height
        const left = Math.round((screenWidth - modalWidth) / 2);
        const top = Math.round((screenHeight - modalHeight) / 2) - 50; // Add top padding


        chrome.windows.create({
          url: 'index.html', // The file to open
          type: 'popup', // Makes it a popup window
          width: modalWidth, // Width of the modal
          height: modalHeight, // Height of the modal
          left: left, // Centers it horizontally
          top: top // Centers it vertically with padding
        });
      }
    });
  }
});

