
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.cards');
  const showMoreBtn = document.getElementById('showMoreBtn');

  let currentIndex = 0;
  const initialCount = 12;
  const stepCount = 20;

  function renderCards(start, count) {
    const end = Math.min(start + count, data.length);
    for (let i = start; i < end; i++) {
      const item = data[i];
      const card = document.createElement('div');
      card.className = "max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border p-4";

      const flagUrl = item.flags?.png || 'https://via.placeholder.com/320x200?text=No+Flag';

      card.innerHTML = `
        <img class="w-full h-48 object-cover rounded" src="${flagUrl}" alt="${item.name} Flag">
        <div class="px-2 py-4">
          <h2 class="font-bold text-xl mb-1">${item.name}</h2>
          <p class="text-gray-700 text-sm mb-1"><strong>Region:</strong> ${item.region}</p>
          <p class="text-gray-700 text-sm mb-2"><strong>Capital:</strong> ${item.capital}</p>
          <button class="text-blue-600 text-sm hover:underline more-toggle">More</button>
          <div class="more-content overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-in-out mt-2 text-sm text-gray-600 space-y-1">
            <p><strong>Population:</strong> ${item.population?.toLocaleString() || 'N/A'}</p>
            <p><strong>Area:</strong> ${item.area?.toLocaleString() || 'N/A'} km²</p>
            <p><strong>Timezones:</strong> ${item.timezones?.join(', ') || 'N/A'}</p>
            <p><strong>Native Name:</strong> ${item.nativeName || 'N/A'}</p>
            <p><strong>Demonym:</strong> ${item.demonym || 'N/A'}</p>
            <p><strong>Languages:</strong> ${item.languages?.map(lang => lang.name).join(', ') || 'N/A'}</p>
            <p><strong>Currencies:</strong> ${item.currencies?.map(cur => `${cur.name} (${cur.symbol})`).join(', ') || 'N/A'}</p>
            <p><strong>Borders:</strong> ${item.borders?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      `;

      const toggleBtn = card.querySelector('.more-toggle');
      const moreContent = card.querySelector('.more-content');

      toggleBtn.addEventListener('click', () => {
        moreContent.classList.toggle('max-h-0');
        moreContent.classList.toggle('opacity-0');
        moreContent.classList.toggle('max-h-[500px]');
        moreContent.classList.toggle('opacity-100');
      });

      container.appendChild(card);
    }

    currentIndex = end;

    if (currentIndex >= data.length) {
      showMoreBtn.classList.add('hidden');
    }
  }

  
  renderCards(0, initialCount);


  showMoreBtn.addEventListener('click', () => {
    renderCards(currentIndex, stepCount);
  });
});
