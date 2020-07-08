const confirmObject = JSON.parse(sessionStorage.getItem('resume'));

console.log(confirmObject.idCom);

const orderNumber = confirmObject.idCom.substring(0, 8);
console.log(orderNumber);

const section = document.createElement('section');
section.id = 'sectionText';

const confirmH1 = document.createElement('h2');
confirmH1.id = 'bravo'
confirmH1.innerHTML = `Félicitation <span>${confirmObject.prenom}</span>`

const recap = document.createElement('p');
recap.id = 'recap';
recap.innerHTML = ` Votre commande N°<span>${orderNumber}</span>`


const prixFinal = document.createElement('p');
prixFinal.id = 'prixFinal';
prixFinal.innerHTML = `d'un montant de  <span>${confirmObject.prix}€</span> à été enregistrée`



const confirmH2 = document.createElement('p');
confirmH2.id = 'merci'
confirmH2.textContent = `Toute l'équipe d'orinoco vous remerice pour votre visite, à bientôt !`;

section.appendChild(confirmH1);
section.appendChild(recap);
section.appendChild(prixFinal);
section.appendChild(confirmH2);


const confirmHead = document.getElementById('confirmHead');
const lastImage = document.getElementById('lastImage');

lastImage.appendChild(section);

const clearSession = document.getElementById('clearSession');

clearSession.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
});

const endButton = document.getElementById('return');

endButton.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
});