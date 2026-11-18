let pokemones = [];

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')         
  .then(response => response.json())  
  .then(data => {                     
    console.log('Pokemones cargados desde la API:');
    
    data.results.forEach(element => {
      const numero = Number(element.url.split('/')[6]);
      const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png`;

      fetch(element.url)
        .then(res => res.json())
        .then(detalle => {
          const tipos = detalle.types.map(t => t.type.name).join(' / ');

          pokemones.push({
            numero: numero,
            name: element.name,
            imagen: imagen,
            tipos: tipos
          });

          mostrarPokemones(pokemones);
        });
    });
  })
  .catch(error => {                  
    console.error('Error al leer la api:', error);
  });

const container = document.getElementById('contenedor');

function mostrarPokemones(lista) {
  lista.sort((a, b) => a.numero - b.numero);

  container.innerHTML = '';
  lista.forEach(element => {
    container.innerHTML += `
      <article class="card">
        <div class="arriba">
          <span>#${element.numero}</span>
          <span class="tipos">${element.tipos}</span>
        </div>

        <div class="medio">
          <img src="${element.imagen}" alt="${element.name}">
        </div>

        <div class="abajo">
          <p>${element.name}</p>
        </div>
      </article>
    `;
  });
}

const filtroTipo = document.getElementById("filtroTipo");
const busqueda = document.getElementById("buscador");

function filtrar() {
  let pokemonesFiltrados = pokemones.filter(element => {
    return element.tipos.includes(filtroTipo.value);
  });

  mostrarPokemones(pokemonesFiltrados);
}

function buscar() {
  let textoBusqueda = busqueda.value.toLowerCase();

  let pokemonesFiltrados = pokemones.filter(element => {
    return element.name.toLowerCase().includes(textoBusqueda)
        || element.tipos.toLowerCase().includes(textoBusqueda)
        || String(element.numero).includes(textoBusqueda); 
  });

  mostrarPokemones(pokemonesFiltrados);
}

filtroTipo.addEventListener("change", () => filtrar());
busqueda.addEventListener("input", () => buscar());