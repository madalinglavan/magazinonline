// URL-ul serverului unde sunt stocate produsele
const apiUrl = 'http://localhost:3000/api/products';

// Selectăm elementul HTML unde vor fi afișate produsele
const productList = document.getElementById('product-list');

// Funcție pentru a prelua produsele de la server
async function fetchProducts(category = '') {
  try {
    let url = apiUrl;
    if (category) {
      url = `${apiUrl}/${category}`; // Dacă există o categorie, adăugăm în URL
    }

    console.log('Se face cererea la URL:', url); // Afișăm URL-ul pentru debugging
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Nu s-a putut prelua lista de produse');
    }

    const products = await response.json();
    console.log('Produse primite:', products); // Afișăm produsele pentru debugging
    displayProducts(products);
  } catch (error) {
    console.error('Eroare:', error);
    productList.innerHTML = '<p>Nu s-a putut încărca lista de produse.</p>';
  }
}

// Funcție pentru a afișa produsele în HTML
function displayProducts(products) {
  productList.innerHTML = ''; // Curățăm lista de produse înainte de a adăuga noi produse

  if (products.length === 0) {
    productList.innerHTML = '<p>Nu sunt produse disponibile în această categorie.</p>';
    return;
  }

  // Iterăm prin fiecare produs și îl adăugăm la listă
  products.forEach(product => {
    const productCard = document.createElement('li');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>Preț: ${product.price} RON</p>
      <button class="add-to-cart-btn">Adaugă în coș</button>
      <button class="view-details-btn" onclick="toggleProductDetails(${product.id}, this)">Vezi detalii</button>
      <div id="product-details-${product.id}" class="product-details" style="display: none;">
        <p><strong>Preț:</strong> ${product.price} RON</p>
        <p><strong>Descriere:</strong> Detalii suplimentare despre produs.</p>
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;" />
      </div>
    `;
    productList.appendChild(productCard);

    // Adaugă funcționalitatea pentru butonul "Adaugă în coș"
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
      alert(`${product.name} a fost adăugat în coș.`);
    });
  });
}

// Funcție pentru a toggle (ascunde/arată) detaliile produsului
function toggleProductDetails(productId, buttonElement) {
  const detailsDiv = document.getElementById(`product-details-${productId}`);

  // Verificăm dacă detaliile sunt deja vizibile
  if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
    // Dacă nu sunt vizibile, le arătăm
    detailsDiv.style.display = 'block';
    buttonElement.textContent = 'Ascunde detalii'; // Schimbăm textul butonului
  } else {
    // Dacă sunt vizibile, le ascundem
    detailsDiv.style.display = 'none';
    buttonElement.textContent = 'Vezi detalii'; // Schimbăm textul butonului înapoi
  }
}

// Funcție pentru a încărca produsele dintr-o anumită categorie
async function loadCategory(category) {
  console.log(`Încărcăm categoria: ${category}`); // Debugging
  await fetchProducts(category);
}

// Apelăm funcția pentru a încărca produsele din categoria implicită "telefoane"
loadCategory('telefoane');

// Funcția pentru a crea butoanele de navigare în funcție de categoriile disponibile
function createCategoryButtons() {
  const categories = ['telefoane', 'laptopuri', 'tablete'];
  const categoriesDiv = document.getElementById('categories');
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    button.onclick = () => loadCategory(category); // La apăsarea butonului, se încarcă categoria
    categoriesDiv.appendChild(button);
  });
}

// Apelăm funcția pentru a crea butoanele de categorii
createCategoryButtons();
