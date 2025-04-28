document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search');
  const tabsList = document.getElementById('tabsList');
  let selectedIndex = -1;
  let tabs = [];

  // Focus the input when the popup opens
  input.focus();


  // Fetch open tabs and render them
  chrome.tabs.query({}, function (fetchedTabs) {
    tabs = fetchedTabs;


    renderTabs(tabs);

    // Add a listener for the input change to filter results
    input.addEventListener('input', function () {
      const query = input.value.toLowerCase();

      const filteredTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query));

      selectedIndex = 0;

      renderTabs(filteredTabs);
    });

    // Listen for keypress events to navigate and select tabs
    document.addEventListener('keydown', function (event) {
      if (event.altKey) {
        if (event.key === 'j') {

          // Navigate down
          selectedIndex = Math.min(filteredTabs.length - 1, selectedIndex + 1);
          renderTabs(filteredTabs);
        } else if (event.key === 'k') {

          // Navigate up
          selectedIndex = Math.max(0, selectedIndex - 1);

          renderTabs(filteredTabs);
        }
      } else if (event.key === 'Enter' && selectedIndex >= 0) {
        chrome.tabs.update(filteredTabs[selectedIndex].id, { active: true });
        window.close();
      }
    });

    // Render the tabs to the list
    function renderTabs(filteredTabs) {
      tabsList.innerHTML = '';

      if (selectedIndex === -1) {
        selectedIndex = 0;
      }

      filteredTabs.forEach((tab, index) => {
        const li = document.createElement('li');
        li.textContent = tab.title;


        // Highlight the selected tab
        if (index === selectedIndex) {
          li.style.backgroundColor = '#9ba1aa';
          li.style.color = 'white';
        } else {
          li.style.backgroundColor = 'transparent';
          li.style.color = 'black';

        }


        li.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true });

          window.close();
        });

        tabsList.appendChild(li);
      });
    }
  });
});

