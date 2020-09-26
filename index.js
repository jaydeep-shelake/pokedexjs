console.log('pokedex');

let = pokeCatch ={};


let sumbmit = document.getElementById('sumbmit');



sumbmit.addEventListener('click',(e)=>{
let copy = document.getElementById('copy');
copy.style.top="0vh";
e.preventDefault() 

let text = document.getElementById('text').value;
// console.log(text);
const pokedex = document.getElementById('pokedex'); // getting order list from html
const fetchPokemon =()=>{

    let promises =[];
    for(let i=1;i<= text; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url)
    .then((res)=>{
        return res.json();
    }))
}

Promise.all(promises).then(result=>{
    const pokemon = result.map((data)=>({
          name:data.name,
          id:data.id,
          image:data.sprites.front_default,
          type:data.types.map((type)=>{
              return type.type.name
          }).join(', ')
    
    }));
    displayPokemon(pokemon)
})
   
};


const displayPokemon = (pokemon)=>{
    // console.log(pokemon);
    let str = pokemon.map(element=>

        `<li class="card" onclick="viewCard(${element.id})">
          <img src="${element.image}" class="card-image">
          <h2 class="title">${element.id}. ${element.name}</h2>
        
        </li>
       ` 
    
    ).join('')
    pokedex.innerHTML=str;

}

fetchPokemon();
});





function viewCard(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    fetch(url)
    .then((res)=>{
        return res.json()

    }).then((pokemon)=>{
        displayPopUp(pokemon);
    })
}
/* <p class="subtitile">Type: ${element.type}</p> */

displayPopUp=(pokemon)=>{
 const type = pokemon.types.map((type)=>{
     return type.type.name
 }).join(',')

 const abilities = pokemon.abilities.map((ablity)=>{
     return ablity.ability.name
 }).join(',')
//  console.log(type);
//  console.log(abilities);
const image = pokemon.sprites.front_default;

const str = `<div class="popup">
<button id="closeBtn" onclick="closePopUp()">Close</button>
        <li class="card">
        
          <img src="${image}" class="card-image">
          <h2 class="title"> ${pokemon.name}</h2>
          <p>Abilities: ${abilities}.</p>
          <p><small>Height: ${pokemon.height}m | Weight: ${pokemon.weight}kg</small></p>
           <p><small> Type: ${type}</small></p>
        </li>

</div>`;

let pokedex = document.getElementById('pokedex');
pokedex.innerHTML=str+pokedex.innerHTML;
}

const closePopUp=()=>{
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
