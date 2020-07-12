//**************************************************************   Panier     ************************************************************************
//Ajout des produits au panier

//Déclaration des variables dont nous aurons besoins dans le scope global
let cpt
let arrayPrices = [] // création d un tableau vide dans lequel nous stockerons les prix des articles
let products = [] // et dans la variable products un tableau vide dans lequel nous stocjerons les id des produits
// ajoutés au panier que nous enverrons au serveur lors de la confirmation de commande par l'utilisateur
let store
let sousTotal
let tbody = document.getElementById('tbody')
let calcul = 0

function addPanier (product, name) {
  // La fonction addPanier ajoute une ligne au panier a chaque click de l'utilisateur sur le produit
  //selectionné dans la page précédente et les données sont celle qui sont récupérées dans le localStorage.

  tbody.innerHTML += `<tr class="rowProduct">
                            <td><img class='images' src=${product.image} width="80"></td>
                            <td class = 'nom'>${name}</td>
                            <td class = 'priceU'>${product.price}€</td>
                            <td class = 'quantite'><span class='nb'>${product.productNumber}</span></td>
                            <td class = 'soustotal'>${sousTotal}€</td>
                            <td class='sup'><button class="btn btn-danger deleteButton"><i class="fas fa-trash"></i></button></td>
                        </tr>`
}

function calculCart () {
  // La fonction calculCart permet de calculer le total des sous-totaux

  let somme = document.getElementById('somme')
  somme.innerHTML = `${0}€`

  for (let i in arrayPrices) {
    // la boucle for in parcours le tableau arrayPrices dans lequel sont ajouté chaque nouveau
    //prix des produits sélectionnés par l'utilisateur donc à chaque ajout d'un article dans le panier le prix est ajouté
    //dans arrayPrices, et la boucle for in permet de recalculer le total a chaque ajout

    calcul = calcul + arrayPrices[i]
    somme.innerHTML = `${calcul}€` // le prix est affiché dans la case total
  }
}

if (localStorage.length > 0) {
  //Récupération des données présentes dans le localStorage

  for (i = 0; i < localStorage.length; i++) {
    store = JSON.parse(localStorage.getItem(localStorage.key(i))) // On convertit l'objet JSON en objet JS
    let productName = localStorage.key(i) // On récupère le nom de la clé qu'on stock dans une variable

    sousTotal = store.price * store.productNumber // Le sous total corresspond au prix d'un article qu'on multipli
    // par le nombre de la quantité sélectionnée par l'utilisateur

    arrayPrices.push(sousTotal) // On insère chaque nouveau prix qui provient du localStorage dans le tableau
    products.push(store.id) // on insère chaque id dans le tableau "products" qui nous servira lors de l'envoi au serveur

    addPanier(store, productName) // On apelle la fonction addPanier
  }
}
calculCart(store) // on apelle la fonction calculCart

//Nous récupèrons les éléments html dont nous avons besoin pour effacer le panier ligne par ligne
// et nous les stockons dans des constantes

const deleteRow = document.getElementsByClassName('rowProduct')
const deleteButton = document.getElementsByClassName('deleteButton')

const deleteAll = document.getElementById('deleteAll')
const displayTitle = document.getElementById('h2')

localStorage.length !== 0 ? (displayTitle.style.display = 'none') : (displayTitle.style.display = 'block')
// ternaire pour l'affichage du texte pour la suppression globale du panier

//Fonction qui efface le panier en totalité au click sur le bouton "vider le panier"
deleteAll.addEventListener('click', () => {
  tbody.remove() //éfface tout le tableau
  somme.innerHTML = 0 + '€' // remet le prix affiché à 0
  localStorage.clear() // efface toutes les informations du localStaorage
  displayTitle.style.display = 'block' // réaffiche le titre "le panier est vide"
})

//******************************************   Validation du formulaire    *****************************************************************

//Récupération de données du formulaire que nous assignons comme valeurs de variables
const form = document.querySelector('#form')

let firstValue = form.firstName
let secondValue = form.lastName
let adressValue = form.address
let townValue = form.city
let emailValue = form.email

const submitButton = document.querySelector('#submit')

const smallFistName = document.getElementById('smallFirstName')
const smallLastName = document.getElementById('smallLastName')
const smallAdress = document.getElementById('smallAdress')
const smallCity = document.getElementById('smallCity')
const smallEmail = document.getElementById('smallEmail')

const regObject = {
    // Création d'un objet avec plusieurs propriétés, chaque propriétés est une regex qui concerne
    //un input précis
    firstName: /^[a-zâäàéèùêëîïôöçñA-Z-\s]{3,25}$/, // exemple EXEMPLE de Prenom 3 à 25 caractères
    name: /^[a-zâäàéèùêëîïôöçñA-Z-\s]{3,25}$/, // exemple EXEMPLE de Nom 3 à 25 caractères
    adress: /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç]+)+$/, // 12 rue des exemples
    ville: /^[a-zâäàéèùêëîïôöçñA-Z]{2,30}$/, // Exemple Ville 2 à 30 caractères
    email: /^[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}$/ // monemail-exemple_TEST02 @ email-_TEST99 . test
  }

let contact
let commande

//Fonction qui validera chaque input, à l 'aide des regex, comme les regex diffèrent en fonction de l'input,
//nous utilisons une seule fonction avec des paramètres pour pouvoir la réutilisé pour chaque input

function validInput (regInput, inputValue, smallInput, inputName, smallId) {
  if (regInput.test(inputValue) == false) {
    //Si le test de la regex retourne false, ou que l'input est vide

    document.querySelector(smallInput).innerHTML = `Veuillez entrer ${inputName} valide `
    // la balise small affiche le texte `Veuillez entrer ${inputName} valide `
    smallId.classList.add('text-danger')
    console.log(false)
    return false //et on retourne false
  } else {
    document.querySelector(smallInput).innerHTML = '' // sinon la balise small reste vide
    if (smallId.classList.contains('text-danger')) {
      smallId.classList.remove('text-danger')
    }
    console.log(true)
    return true // et on retourne true
  }
}

//Pour chaque valeur d'un input nous écoutons l'évenement change et nous appelons la fonction validInput
firstValue.addEventListener('change', () => validInput(regObject.firstName, firstValue.value, '#smallFirstName','un Prénom',smallFirstName))

secondValue.addEventListener('change', () => validInput(regObject.name, secondValue.value,'#smallLastName','un Nom', smallLastName))

adressValue.addEventListener('change', () =>validInput(regObject.adress,
    adressValue.value,
    '#smallAdress',
    'une adrese',
    smallAdress
  )
)
townValue.addEventListener('change', () =>
  validInput(
    regObject.ville,
    townValue.value,
    '#smallCity',
    'Un nom de ville',
    smallCity
  )
)
emailValue.addEventListener('change', () =>
  validInput(
    regObject.email,
    emailValue.value,
    '#smallEmail',
    'un email',
    smallEmail
  )
)

form.addEventListener('submit', e => {
  e.preventDefault()

  contact = {
    // L'objet contact récupère toutes les valeurs qui ont été remplie dans les champs input
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    address: e.target.address.value,
    city: e.target.city.value,
    email: e.target.email.value
  }

  commande = {
    // l'objet commande est l'objet final que nous envoyons au serveur il contient un array avec tout les id
    // des produits que l'utilisateur à acheter ainsi que l'objet contact
    products,
    contact
  }

  const options = {
    // cette constante va nous permettre de faire notre requête HTTP en utilisant le fetch,on specifie
    // ici que la méthode utilisé est POST (nous envoyons une requête au serveur, le body sera l'objet commande
    //et nous précisons dans le headers que notre objet sera un json pour faciliter la comprehension au serveur)
    method: 'POST',
    body: JSON.stringify(commande),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const postData = async () => {
    try{
      await fetch('http://localhost:3000/api/cameras/order', options)// notre requete (POST), pour envoyer les informations de commande au serveur
      .then(res => res.json()) //avec nos promises qui sont chainées,
      .then(res => {
          if (
            firstValue.value == false ||
            secondValue.value == false ||
            adressValue.value == false ||
            townValue.value == false ||
            emailValue.value == false
          ) {
            //La condition stop l'envoi de l'objet commande si une des valeurs des input est vide
            e.preventDefault()
            alert('Tous les champs ne sont pas remplis ') // raisons du blocage de l'envoi du formulaire
          } else if (
            smallFistName.classList.contains('text-danger') ||
            smallLastName.classList.contains('text-danger') ||
            smallAdress.classList.contains('text-danger') ||
            smallCity.classList.contains('text-danger') ||
            smallEmail.classList.contains('text-danger')
          ) {
            e.preventDefault()
            alert('Un ou plusieurs champs contiennent des erreur') // raisons du blocage de l'envoi du formulaire
          } else if (commande.products.length == 0) {
            e.preventDefault()
            alert('Veuillez insérer au moins un artcile dans votre panier avant de passer commande')
          } else {
            //si tous les inputs ont été validés et que le panier n'est pas vide
    
            console.log(res.orderId) //on affiche l'id qui nous a été retourné par le serveur dans la console
    
            let objectCom = {
              //Nous créons l'objet ObjectCom que nous enverrons dans le sessionStorage avec toutes les donées
              //qui nous servirons dans notre page confirmation.html
              prix: calcul, //Le prix total final
              prenom: contact.firstName, //le prénom de l'utilisateur
              idCom: res.orderId // et l'id qui nous a été retourné par le serveur
            }
    
            console.log(objectCom)
    
            let confirmation = JSON.stringify(objectCom) // Nous convertissons objectCom au format JSON
            sessionStorage.setItem('resume', confirmation) //Nous envoyons cet objet dans le sessionStorage
            window.location = 'confirmation.html' // et enfin nous redirigeons l'utilisateur vers la page confirmation
          }
        })
    } catch (e){
      throw(e)
    }
}
postData()
})