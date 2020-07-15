/* requête ajax pour récupérer les informations de l'API avec l'utilisation de fetch,
 sous forme de fonction asynchrone stockée dans une constante pour pouvoir la réutiliser */
const getData = async url => { //un url est assigné en paramètre
  try {
    let reponse = await fetch(url) // attente de l'url pour le fetch qui retournera un objet json
    return reponse.json()
  } catch (e) {//ou de l'erreur 
    throw e
  }
}

const globalProducts = getData('http://localhost:3000/api/cameras') // Appel de la fonction avec l'adresse de l'Api
//qui contient tous les produits

globalProducts.then(data => {

  const creation = i => {/* la fonction création utilisera les données renvoyées par l'api et manipulera le dom html 
  pour créer les différents élements nécéssaires à l'affichage de la page */
  
    const newDiv = document.createElement('div') // Création d'une première div avec assignation des classes
    newDiv.classList.add('row')
    newDiv.classList.add('Largeur')
    document
      .getElementById('global')
      .insertBefore(newDiv, document.getElementById('foot'))

    const productDiv = document.createElement('div') // Création d'une seconde div avec assignation de classes et id
    productDiv.classList.add('col')
    productDiv.classList.add('proDiv')
    productDiv.id = `divNumber${[i]}`

    newDiv.appendChild(productDiv) // On ajoute la div ".col" dans la div ".row"

    /*Dans chaque div col on va créer un élement par type d'informations (name, price, ect... 
    et on ajoute l'image qui correspond à l'article)*/

    const productName = document.createElement('h3')
    productName.textContent = data[i].name // data[i].name correspont à la donnée name de l'objet json renvoyé par l'api

    const productPrice = document.createElement('p')
    productPrice.textContent = `Prix: ${data[i].price / 100}  €` // la donnée price
    productPrice.classList.add('Prices')

    const productLenses = document.createElement('p')
    productLenses.textContent = `Personnalisez le ${data[i].name} avec la lentille de votre choix`
    productLenses.classList.add('perso')

    const productImg = new Image(250)
    productImg.src = data[i].imageUrl // le lien vers l'image du produit qui est ajouté en attribut src de l'objet Image

    productImg.classList.add('photos')

    const button = document.createElement('div')
    button.innerHTML = `<a href=html/produits.html?id=${data[i]._id}><button class="buttons">Personnaliser</button></a>`
    /*Le boutton qui a été crée renvoi vers la page products.html en incluant l'id du produit qui sera
    //récupéré sur la page products.js et qui permettra d'afficher le produit sélectionné dynamiquement
    
      On ajoute chaque élément qui a été créer dans la div parent (productDiv)*/

    productDiv.appendChild(productName)
    productDiv.appendChild(productImg)
    productDiv.appendChild(productPrice)
    productDiv.appendChild(productLenses)
    productDiv.appendChild(button)
  }
  for (let i in data) {
    // la boucle for in permet d'appeler la fonction creation pour chaque itération au sein de l'api
    creation(i)
  }
})