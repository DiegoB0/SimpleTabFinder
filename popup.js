document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById("search");
  const tabList = document.getElementById("tab-list");

  // Fetch open tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const li = document.createElement("li");

      li.textContent = tab.title;
      li.onclick = () => chrome.tabs.update(tab.id, { active: true });
      tabList.appendChild(li);
    });
  });

  // Fuzzy search filter

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const items = tabList.getElementsByTagName("li");

    Array.from(items).forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
});

