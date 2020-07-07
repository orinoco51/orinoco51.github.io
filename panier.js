//**************************************************************   Panier     ************************************************************************
//Ajout des produits au panier 
let cpt;
let arrayPrices = [];
let products = [];
let store;
let sousTotal;
let tbody = document.getElementById('tbody');
let calcul = 0;

if ( localStorage.length > 0 ) {
    for ( i = 0; i < localStorage.length; i ++) {
        store = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let productName = localStorage.key(i);

        sousTotal = store.price * store.productNumber;

        arrayPrices.push(sousTotal);
        products.push(store.id);
   
        //Fonction qui ajoute le produit au panier 
        function AddPanier (products, name) {
         
                tbody.innerHTML += `<tr class="rowProduct">
                                        <td><img class='images' src=${products.image} width="80"></td>
                                        <td class = 'nom'>${name}</td>
                                        <td class = 'priceU'>${products.price}€</td>
                                        <td class = 'quantite'><span class='nb'>${products.productNumber}</span></td>
                                        <td class = 'soustotal'>${sousTotal}€</td>
                                        <td class='sup'><button class="btn btn-danger deleteButton"><i class="fas fa-trash"></i></button></td>
                                    </tr>`
        };
        AddPanier(store, productName); 

        }
    };
 
    //Fonction pour le calcul du panier
    function calculCart (){

        const somme = document.getElementById('somme');
        somme.innerHTML = `${0}€`
       
        
        for (let i in arrayPrices) {

            calcul = calcul + arrayPrices[i];
            somme.innerHTML = `${calcul}€`; 
        };    
    }
    calculCart(store); 

    const deleteRow = document.getElementsByClassName('rowProduct');
    const deleteButton = document.getElementsByClassName('deleteButton');
        
    const deleteAll = document.getElementById('deleteAll')
    const displayTitle = document.getElementById('h2');

    for (let b = 0; b < deleteButton.length; b++) {
        
        deleteButton[b].addEventListener('click', () => {

            deleteRow[b].remove();
            localStorage.removeItem(localStorage.key(b));
            calcul = calcul - arrayPrices[b];
            somme.innerHTML = `${calcul}€`; 

            if(calcul == 0){

            displayTitle.style.display = 'block';

            };
        });
        
    };
    //Condition pour qu'un block avec un h2: votre panier est vide lorque le panier ne contient aucun article 

    if(localStorage.length !== 0){
        displayTitle.style.display = 'none';
     }else{
        displayTitle.style.display = 'block'
     };

    //Fonction qui efface le panier en totalité au click sur le bouton "vider le panier"
        deleteAll.addEventListener('click',() => {

                tbody.remove();
                somme.innerHTML = 0+'€';
                localStorage.clear();
                displayTitle.style.display = 'block';
        });
        
       //******************************************   Validation du formulaire    *****************************************************************
const form = document.querySelector('#form');

let firstValue = form.firstName;
let secondValue = form.lastName;
let adressValue = form.address;
let townValue = form.city;
let emailValue = form.email;

const submitButton = document.querySelector('#submit');

const regObject = new Object();

regObject['firstName'] = /^[a-zâäàéèùêëîïôöçñA-Z-\s]{3,25}$/; // exemple EXEMPLE de Prenom 3 à 12 caractères
regObject['name'] = /^[a-zâäàéèùêëîïôöçñA-Z-\s]{3,25}$/; // exemple EXEMPLE de Nom 3 à 12 caractères
regObject['adress'] = /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç]+)+$/; // 12 rue des exemples 
regObject['ville'] = /^[a-zâäàéèùêëîïôöçñA-Z]{2,30}$/; // Exemple Ville 2 à 30 caractères
regObject['email'] = /^[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}$/ // monemail-exemple_TEST02 @ email-_TEST99 . test

function validInput (regInput, inputValue, smallInput, inputName) {

    if(regInput.test(inputValue) == false || inputValue == ""){

        document.querySelector(smallInput).innerHTML = `Veuillez entrer ${inputName} valide `;
        let smalls = document.getElementsByTagName('small')
        for (let i in smalls) {
            smalls[i].classList.add('text-danger');  
            };
        return false
        }else{
        document.querySelector(smallInput).innerHTML = '';
        return true;
    };
};

firstValue.addEventListener('change', () => validInput(regObject.firstName, firstValue.value, '#smallFirstName', 'un Prénom'));
secondValue.addEventListener('change', () => validInput(regObject.name,     secondValue.value,'#smallLastName', 'un Nom'));
adressValue.addEventListener('change', () => validInput(regObject.adress,   adressValue.value, '#smallAdress', 'une adrese'));
townValue.addEventListener('change', () => validInput(regObject.ville,      townValue.value,    '#smallCity', 'Un nom de ville'));
emailValue.addEventListener('change', () => validInput(regObject.email,     emailValue.value,   '#smallEmail', 'un email'));

let contact;
let commande;

form.addEventListener('submit', (e) => {

    e.preventDefault();

       contact = {
        firstName : e.target.firstName.value,
        lastName : e.target.lastName.value,
        address : e.target.address.value,
        city : e.target.city.value,
        email: e.target.email.value
       };

        commande = {
         products,
         contact,
    };

    const options = {
                method: 'POST',
                body: JSON.stringify(commande),
                headers: {
                    'Content-Type': 'application/json'
                }
    };

    fetch('http://localhost:3000/api/cameras/order', options)

    .then (res =>  res.json())
    .then((res) =>  {

    if(firstValue.value == false || secondValue.value == false || adressValue.value == false || townValue.value == false || emailValue.value == false){
        e.preventDefault();
        alert('Tous les champs ne sont pas remplis ');
        
    }else if (commande.products.length == 0) {
        e.preventDefault();
        alert('Veuillez insérer au moins un artcile dans votre panier avant de passer commande')
    }else{
       
        console.log(res.orderId)

        let objectCom = {
            prix: calcul,
            prenom: contact.firstName,
            idCom: res.orderId
            };
     
            console.log(objectCom);
     
            let confirmation = JSON.stringify(objectCom)
            sessionStorage.setItem('resume', confirmation)
            window.location = 'confirmation.html'
        } 
    });
}); 