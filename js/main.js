const urlBase = 'https://dog.ceo/api'
const container = document.querySelector('.container')

// List all dogs

async function fetchGetAllBreeds() {
  try {
    const response = await fetch(`${urlBase}/breeds/list/all`);
    const data = await response.json();
    let dataSlice = Object.entries(data.message).slice(0,16).map(breed => breed[0]);
    let breeds = Object.assign({}, dataSlice);
    await printCardsDogs(breeds)
  } catch (error) {
    console.log(error);
  }
}

async function printCardsDogs(breeds) {
  let row = document.createElement('div')  
  row.setAttribute('class', 'row')
  container.appendChild(row);
  
  for (const index in breeds) {
    let cardBreed;
    let urlImage = await getImageBreed(breeds[index]);

    cardBreed = document.createElement('div')
    cardBreed.setAttribute('class', 'col-md-4 p-2')
    cardBreed.innerHTML = `<div class="card shadow">
        <img class="card-img-top img-thumbnail" src="${urlImage}" alt="${breeds[index]}">
        <div class="card-body">
          <h4 class="card-title text-capitalize">${breeds[index]}</h4>
        </div>
      </div>`
    row.appendChild(cardBreed);
    console.log(breeds[index]);
  }
}

async function getImageBreed(breed){
  const response = await fetch(`${urlBase}/breed/${breed}/images/random`)
  const data = await response.json()
  const urlImage = data.message
  return urlImage
}

fetchGetAllBreeds()