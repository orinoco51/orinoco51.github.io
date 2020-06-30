const confirmObject = JSON.parse(sessionStorage.getItem('resume'));

const body = document.getElementsByTagName('body');

body.innerHTML = ''

const section = document.createElement('section');

const confirmH1 = document.createElement('p');
confirmH1.id = 'bravo'
confirmH1.textContent = `Félicitation ${confirmObject.prenom} votre commande N°${confirmObject.idCom} d'un montant de ${confirmObject.prix}€ à bien été enregistrée`

const confirmH2 = document.createElement('p');
confirmH2.id = 'merci'
confirmH2.textContent = `Toute l'équipe d'orinoco vous remerice pour votre visite, à bientôt`;

section.appendChild(confirmH1);
section.appendChild(confirmH2);

const confirmHead = document.getElementById('confirmHead');

confirmHead.appendChild(section);

const clearSession = document.getElementById('clearSession');

clearSession.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
});