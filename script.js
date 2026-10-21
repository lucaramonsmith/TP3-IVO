fetch('https://pokeapi.co/api/v2/pokemon?limit=20')         
  .then(response => response.json())  
  .then(data => {                     

    console.log('Pokemones cargados desde la API:');
    
    
    let pokemones = data.results;

    mostrarPokemones (pokemones)

    console.log(pokemones);
  

  })
  
  .catch(error => {                  
    console.error('Error al leer la api:', error);
  });

  const container = document.getElementById('contenedor')

  function mostrarPokemones (pokemones) {
    container.innerHTML =''
    pokemones.forEach(element => {
        container.innerHTML +=  `
        <article class="card">

          <p>${element.name}</p>
          
          
          
          
        </article>
      `;
 
        });



  }

