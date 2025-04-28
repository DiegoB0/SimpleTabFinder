chrome.commands.onCommand.addListener((command) => {
  if (command === 'open_modal') {
    chrome.windows.create({
      url: 'index.html',

      type: 'popup',
      width: 400,

      height: 300,
      left: Math.round((window.screen.width - 400) / 2),
      top: Math.round((window.screen.height - 300) / 2) - 50
    });
  }
});

