document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search');
  const tabsList = document.getElementById('tabsList');
  let selectedIndex = -1; // Track selected tab index
  let tabs = []; // Store the tabs for filtering

  // Focus the input when the popup opens
  input.focus();


  // Fetch open tabs and render them
  chrome.tabs.query({}, function (fetchedTabs) {
    tabs = fetchedTabs; // Save the tabs for filtering


    renderTabs(tabs);

    // Add a listener for the input change to filter results
    input.addEventListener('input', function () {
      const query = input.value.toLowerCase();

      const filteredTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query));

      renderTabs(filteredTabs);
    });

    // Listen for keypress events to navigate and select tabs
    document.addEventListener('keydown', function (event) {
      if (event.altKey) {
        if (event.key === 'j') {
          // Navigate down
          selectedIndex = Math.min(tabs.length - 1, selectedIndex + 1);
          renderTabs(tabs);
        } else if (event.key === 'k') {
          // Navigate up
          selectedIndex = Math.max(0, selectedIndex - 1);
          renderTabs(tabs);

        }
      } else if (event.key === 'Enter' && selectedIndex >= 0) {

        // Open the selected tab
        chrome.tabs.update(tabs[selectedIndex].id, { active: true });
        window.close(); // Close the popup once the tab is opened
      }
    });


    // Render the tabs to the list
    function renderTabs(tabs) {
      tabsList.innerHTML = ''; // Clear the list


      // Ensure the first result is selected by default if no navigation has been done
      if (selectedIndex === -1) {
        selectedIndex = 0;
      }

      tabs.forEach((tab, index) => {
        const li = document.createElement('li');
        li.textContent = tab.title;

        // Highlight the selected tab
        if (index === selectedIndex) {
          li.style.backgroundColor = '#9ba1aa'; // Highlight color
          li.style.color = 'white';
        } else {
          li.style.backgroundColor = 'transparent'; // No highlight for non-selected tabs
          li.style.color = 'black';
        }


        li.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true }); // Switch to the clicked tab
          window.close(); // Close the popup once the tab is clicked
        });


        tabsList.appendChild(li);

      });
    }
  });
});

