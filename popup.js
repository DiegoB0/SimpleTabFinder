document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search');
  const tabsList = document.getElementById('tabsList');
  let selectedIndex = -1;
  let filteredTabs = [];

  input.focus();

  chrome.tabs.query({}, function (fetchedTabs) {
    filteredTabs = fetchedTabs;
    renderTabs(filteredTabs);

    input.addEventListener('input', function () {

      const query = input.value.toLowerCase();
      filteredTabs = fetchedTabs.filter(tab => tab.title.toLowerCase().includes(query));

      selectedIndex = 0; // Reset to first filtered result
      renderTabs(filteredTabs);
    });

    document.addEventListener('keydown', function (event) {
      if (event.altKey) {
        if (event.key === 'j') {
          selectedIndex = Math.min(filteredTabs.length - 1, selectedIndex + 1);
          renderTabs(filteredTabs);
        } else if (event.key === 'k') {
          selectedIndex = Math.max(0, selectedIndex - 1);
          renderTabs(filteredTabs);

        }
      } else if (event.key === 'Enter' && selectedIndex >= 0) {

        chrome.tabs.update(filteredTabs[selectedIndex].id, { active: true });
        window.close();
      }
    });

    function renderTabs(filteredTabs) {
      tabsList.innerHTML = '';

      if (selectedIndex === -1) selectedIndex = 0;

      filteredTabs.forEach((tab, index) => {
        const li = document.createElement('li');
        li.textContent = tab.title;

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

