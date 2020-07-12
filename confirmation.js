const confirmObject = JSON.parse(sessionStorage.getItem('resume')) //Récupération des information du sessionStorage

console.log(confirmObject.idCom)

const orderNumber = confirmObject.idCom.substring(0, 8) // Utilisation de la méthode substring pour retirer les caractères
// de l'id qui ne changent pas. (le serveur renvoi un id de confirmation de commande avec une trentaines de caractères,
//mais seulement 8 d'entre eux change en fonction des différentes commandes, nous gardons donc les 8 dans une variable orderNumber)
console.log(orderNumber)

//Création des éléments html dans lesquels nous allons insérer les informations de confirmation de commande

const section = document.createElement('section')
section.id = 'sectionText'

const confirmH1 = document.createElement('h2')
confirmH1.id = 'bravo'
confirmH1.innerHTML = `Félicitation <span>${confirmObject.prenom}</span>`

const recap = document.createElement('p')
recap.id = 'recap'
recap.innerHTML = ` Votre commande N°<span>${orderNumber}</span>`

const prixFinal = document.createElement('p')
prixFinal.id = 'prixFinal'
prixFinal.innerHTML = `d'un montant de  <span>${confirmObject.prix}€</span> à été enregistrée`

const confirmH2 = document.createElement('p')
confirmH2.id = 'merci'
confirmH2.textContent = `Toute l'équipe d'orinoco vous remerice pour votre visite, à bientôt !`

// Nous insérons tous les éléments dans la section

section.appendChild(confirmH1)
section.appendChild(recap)
section.appendChild(prixFinal)
section.appendChild(confirmH2)

const confirmHead = document.getElementById('confirmHead')
const lastImage = document.getElementById('lastImage')

lastImage.appendChild(section)

// Au click sur le bouton "revenir à l'acceuil" ou sur le h1 une fonction éfface toutes les informations contenues dans
// le localStorage et dans le sessionStorage

const clearSession = document.getElementById('clearSession')

clearSession.addEventListener('click', () => {
  localStorage.clear()
  sessionStorage.clear()
})

const endButton = document.getElementById('return')

endButton.addEventListener('click', () => {
  localStorage.clear()
  sessionStorage.clear()
})