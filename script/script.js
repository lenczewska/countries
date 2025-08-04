
const container = document.querySelector('.cards');
const showMoreBtn = document.getElementById('showMoreBtn');
const searchInput = document.getElementById('searchInput');
const regionLinks = document.querySelectorAll('.region-link');

let currentIndex = 0;
const initialCount = 12;
const stepCount = 20;

let currentDataRegion = data; 
let currentData = data;       

let featuredWrapper = null; 

function renderFeaturedCountry() {
  const randomIndex = Math.floor(Math.random() * data.length);
  const featuredCountry = data[randomIndex];

  const featuredWrapper = document.createElement('div');
  featuredWrapper.className = "flex justify-center my-10";

  const featuredContainer = document.createElement('div');
  featuredContainer.className = `
    w-[600px] h-[400px] p-4
    bg-white rounded-xl shadow-lg overflow-hidden
    flex
  `;

  featuredContainer.innerHTML = `
    <div class="w-[250px] h-full flex flex-col">
      <img src="${featuredCountry.flags.png}" alt="${featuredCountry.name} Flag"
        class="w-full h-[300px] object-cover border-r border-gray-300">     
    </div>

    <div class="w-[350px] h-full px-6 py-8 gap-3">
     <div class="text-center text-lg font-semibold py-2 bg-gray-50 border-t  border-gray-300 rounded-bl-xl">
        ${featuredCountry.name}
      </div>
      <p class="text-gray-700"><strong>Region:</strong> ${featuredCountry.region}</p>
      <p class="text-gray-700"><strong>Capital:</strong> ${featuredCountry.capital}</p>
      <p class="text-gray-700"><strong>Population:</strong> ${featuredCountry.population.toLocaleString()}</p>
      <button class="more-btn text-blue-600 hover:underline mt-4">More</button>
    </div>
  `;

  const moreBtn = featuredContainer.querySelector('.more-btn');
  moreBtn.addEventListener('click', () => {
    localStorage.setItem('country', JSON.stringify(featuredCountry));
    window.location.href = 'details.html';
  });

  featuredWrapper.appendChild(featuredContainer);
  container.parentNode.insertBefore(featuredWrapper, container);
}


function renderCards(dataset, start, count) {
  const end = Math.min(start + count, dataset.length);
  for (let i = start; i < end; i++) {
    const item = dataset[i];
    const card = document.createElement('div');
    card.className = "max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border p-4";

    const flagUrl = item.flags?.png;

  

    card.innerHTML = `
  <img class="w-full h-48 object-cover rounded" src="${flagUrl}" alt="${item.name} Flag">
  <div class="px-2 py-4">
    <h2 class="font-bold text-xl mb-1" style="color: black;">${item.name}</h2>
    <p class="text-gray-700 text-sm mb-1"><strong>Region:</strong> ${item.region}</p>
    <p class="text-gray-700 text-sm"><strong>Capital:</strong> ${item.capital}</p>
  </div>
`;

    card.addEventListener('click', () => {
      localStorage.setItem('country', JSON.stringify(item));
      window.location.href = 'details.html';
    });

    container.appendChild(card);
  }

  currentIndex = end;

  if (currentIndex >= dataset.length) {
    showMoreBtn.classList.add('hidden');
  } else {
    showMoreBtn.classList.remove('hidden');
  }
}


function filterAndRender() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  let filtered = currentDataRegion;

  if (searchTerm) {
    filtered = filtered.filter(country =>
      country.name.toLowerCase().includes(searchTerm)
    );
  }

  currentData = filtered;
  currentIndex = 0;

  container.innerHTML = '';

  if (searchTerm || currentDataRegion !== data) {
    if (featuredWrapper) featuredWrapper.style.display = 'none';
  } else {
    if (featuredWrapper) featuredWrapper.style.display = 'flex';
  }

  renderCards(currentData, 0, stepCount);

  if (currentData.length <= stepCount) {
    showMoreBtn.classList.add('hidden');
  } else {
    showMoreBtn.classList.remove('hidden');
  }
}

searchInput.addEventListener('input', () => {
  filterAndRender();
});

regionLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const selectedRegion = link.dataset.region;

    if (!selectedRegion) {
      currentDataRegion = data;
      if (featuredWrapper) featuredWrapper.style.display = 'flex';
    } else {
      currentDataRegion = data.filter(country => country.region === selectedRegion);
      if (featuredWrapper) featuredWrapper.style.display = 'none';
    }

    searchInput.value = '';
    filterAndRender();
  });
});

showMoreBtn.addEventListener('click', () => {
  renderCards(currentData, currentIndex, stepCount);
});


renderFeaturedCountry();
filterAndRender();


//dark mood

let flag = false

function dayNight() {
  flag = !flag
  theme.innerHTML = flag ? '<i class="fa-regular fa-moon"></i>' :
    '<i class="fa-regular fa-sun"></i>'
  document.documentElement.classList.toggle('dark')
}
dayNight()