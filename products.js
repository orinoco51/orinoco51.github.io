let quantVar; // déclaration des varaiables au niveau globale pour lesquelles une valeur leur sera assigné lors de l'utilisation de celles ci
let parsedVar;
let objectProd;

const searchUrl = location.search; // récupération de l'url au sein d'une variable (.search nous permet de récupérer
//uniquement la partie de  l'url qui correspond a l'id du produit séléctionné précédemment)

const endUrl = searchUrl.substring('4');// la méthode substring nous permet de supprimer les caractères non désirés
//pour garder exclusivement l'id du produit

const global = document.getElementById('global');

let productUrl = `http://localhost:3000/api/cameras/${endUrl}`;// en incluant la variable endUrl en fin d'adresse de
// l'api l'url de l'api changera dynamiquement en fonction du click de l'utilisateur 

const getData = async (url) => { // utilistation de la même fonction pour appeler cette fois ci le produits séléctionné 
    // précédemment la page produits.html se chargera donc dynamiquement
    try{
        let reponse = await fetch (url);
        return reponse.json(); 
    }
    catch (e) {
        throw(e)
    };
};
const products = getData (productUrl);

products.then((data) => { // Création des diférents éléments de la même manière que sur la page index
    // avec le seul produit sélectionné dynamiquement

         const newDiv = document.createElement('div'); // Création d'une div avec assignation des classes et id
         newDiv.classList.add('row');
         newDiv.id = 'layDiv';
         document.getElementById('global').insertBefore(newDiv,document.getElementById("foot"));
         // et insertion de cette div juste avant le footer (entre le header et le footer)
         
         const productDiv = document.createElement('div'); // Création de la div "col"
         productDiv.classList.add('col');
         
         newDiv.appendChild(productDiv); // On ajoute la div "col" dans la div "row"

         switch (data.name) {//Utilisation du switch pour  changer la couleur de fond du body
            //dynamiquement en fonction du produit séléctioné
            case 'Zurss 50S': document.body.style.backgroundColor = ' rgb(240, 230, 248)';
               break;
            case 'Hirsch 400DTS': document.body.style.backgroundColor = 'rgb(251, 230, 254)';
               break;
            case 'Franck JS 105': document.body.style.backgroundColor = 'rgb(218, 199, 224)';
                break;
            case 'Kuros TTS': document.body.style.backgroundColor = ' rgb(238, 231, 251)';
                break;
            case 'Katatone': document.body.style.backgroundColor = 'rgb(232, 231, 250)';
                break;
        };       
 
         //Dans chaque div ".col" on va créer un élement par type d'informations (name, price, ect... et 
         //on ajoute l'image qui correspond à l'article)
 
         const productName = document.createElement("h2");
         productName.textContent = data.name;
         productName.classList.add('h2');
         
         const productLenses = document.createElement("form");
         const lentilles = document.createElement('select');
      
         let option = document.createElement('option');
         option.textContent = 'Lentilles disponibles';
         lentilles.appendChild(option)
         productLenses.appendChild(lentilles);
 
         for (let i of data.lenses) { // la boucle for of permet de créer une balise option par nombre de choix de lentilles disponible
            lentilles.innerHTML += `<option id="option">${[i]}</option>`;  
         };

         const createParagraphe = document.createElement('p');
         createParagraphe.id = 'quantityText';
         createParagraphe.textContent = 'Choisissez la quantité';
         
         const quantity = document.createElement('form');
         const selectQuantity = document.createElement('select');
         selectQuantity.id = 'selectQuantity';

         quantity.appendChild(selectQuantity);

         const productId = document.createElement("p");
         productId.textContent = `Référence produit : ${data._id}`;
         productId.id = 'reférence';
         
         const productDescrip = document.createElement("p");
         productDescrip.textContent = `Description :   ${data.description}`;
         
         const productImg = new Image(650);
         productImg.src = data.imageUrl;
         productImg.id ='imgproduct';
 
         const productPrice = document.createElement('p');
         productPrice.innerHTML = `Prix: ${data.price/100}  €`;
        
         const button = document.createElement('div');
         button.id = 'button';
         
         button.innerHTML = `<button class="buttons">Ajouter au panier</button>`
         
                // On ajoute chaque élément créer en tant qu'enfant de productDiv
                productDiv.appendChild(productName);
                productDiv.appendChild(productImg);
                productDiv.appendChild(productId);
                productDiv.appendChild(productLenses);
                productDiv.appendChild(quantity);
                productDiv.appendChild(createParagraphe);
                productDiv.appendChild(productDescrip);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(button);    

     const numberQuantity = document.getElementById('selectQuantity');

     for (let c = 0; c < 101; c++) {// La boucle for va servir au choix de la quantité d'appareil que l'utilisateur souhaitera
       numberQuantity.innerHTML += `<option class="values"  value="${[c]}"}>${[c]}</option>`; 
     };

     let values = document.getElementsByClassName('values');
     
     numberQuantity.addEventListener('change', () => {// cette fonction qui s'execute lors de l'évenement "change",
     //va nous permettre de récupérer la quantité choisie par l'utilisateur 
         console.log(values[numberQuantity.selectedIndex].value)
    
      quantVar = (values[numberQuantity.selectedIndex].value);
      // Une fois la quantité récupérer il faut changer le type de la valeur qui est une 'string' en 'number'
      parsedVar = parseInt(quantVar);
      console.log(parsedVar);

       objectProd = {// Un objet est créer contenant toute les informations que nous avons besoins d'envoyer dans le 
       // localStorage notamment la quantité choisie par l'utilisateur qui nous permettra de faire le calcul du prix total
        name: data.name,
        price: data.price/100, // le prix de l'objet
        id: data._id, // l'id qui nous servira lors de l'envoi au serveur
        image: data.imageUrl, //l'image que nous afficherons dans le panier
        productNumber: parsedVar // et la quantité choisi par l'utilisateur
     };
    });
       button.addEventListener('click', (e) => {// Au click sur le bouton ajouté au panier nous ajoutons une condition
        // si la valueur du choix de quantité est égal à zero alors l'execution de la fonction se bloque et un message
        //d'alerte préviens l'utilisateur d'ajouter au moins un article au panier

        if(values[numberQuantity.selectedIndex].value == 0){
            e.preventDefault();
            alert('Veuillez sélectionnez au moins un article à ajouter au panier');
        }else{//Sinon l'objet 'objetcProd' qui a été créer est convertit en objet JSON pour être envoyé dans le localStorage
            let produitString = JSON.stringify(objectProd);
            localStorage.setItem(data.name, produitString); // nous envoyons l'objet 
            window.location = 'panier.html'  // et enfin l'utilisateur est redirigé vers la page panier.html
        };    
       });          
});   
