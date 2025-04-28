document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search');
  const tabsList = document.getElementById('tabsList');


  // Focus the input when the popup opens
  input.focus();

  // Fetch open tabs and render them
  chrome.tabs.query({}, function (tabs) {
    renderTabs(tabs);

    // Add a listener for the input change to filter results
    input.addEventListener('input', function () {
      const query = input.value.toLowerCase();
      const filteredTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query));

      renderTabs(filteredTabs);
    });

    // Render the tabs to the list
    function renderTabs(tabs) {
      tabsList.innerHTML = ''; // Clear the list

      tabs.forEach(tab => {
        const li = document.createElement('li');
        li.textContent = tab.title;
        li.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true }); // Switch to the clicked tab
          window.close(); // Close the popup once the tab is clicked
        });
        tabsList.appendChild(li);
      });
    }
  });
});

