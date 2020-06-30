const searchUrl = location.search;
const endUrl = searchUrl.substring('4');
let quantVar;
let quantitySelected;
let resultOption;
let parsedVar;
let objectProd;

const productUrl = `http://localhost:3000/api/cameras/${endUrl}`;

const getData = async (url) => {
    try{
        let reponse = await fetch (url);
        return reponse.json(); 
    }
    catch (e) {
        throw(e)
    };
};

const products = getData(productUrl);

products.then((data) => {

    const layoutProduct = () => {
         //création div (bootstrap)
         const newDiv = document.createElement('div'); // Création de la  div "row"
         newDiv.classList.add('row');
         newDiv.id = 'layDiv';
         document.getElementById('global').insertBefore(newDiv,document.getElementById("foot"));
         
         let productDiv = document.createElement('div'); // Création de la div "col"
         productDiv.classList.add('col');
         
         newDiv.appendChild(productDiv); // On ajoute la div "col" dans la div "row"
 
         //Dans chaque div col on va créer un élement par type d'informations (name, price, ect... et on ajoute l'image qui correspond à l'article)
 
         const productName = document.createElement("h2");
         productName.textContent = data.name;
         
         const productLenses = document.createElement("form");
         const lentilles = document.createElement('select');
      
         let option = document.createElement('option');
         option.textContent = 'Lentilles disponibles';
         lentilles.appendChild(option)
         productLenses.appendChild(lentilles);
 
         for (let i of data.lenses) {
            lentilles.innerHTML += `<option id="option">${[i]}</option>`;  
         };

         const createParagraphe = document.createElement('p');
         createParagraphe.textContent = 'Veuillez sélectionner la quantité voulu';

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
 
         let productPrice = document.createElement('p');
         productPrice.innerHTML = `Prix: ${data.price/100}  €`;
        
         const button = document.createElement('div');
         button.id = 'button';
         
         button.innerHTML = `<button class="buttons">Ajouter au panier</button>`
         
                // On ajoute chaque information en tant qu'enfant de productDiv
                productDiv.appendChild(productName);
                productDiv.appendChild(productImg);
                productDiv.appendChild(productId);
                productDiv.appendChild(productLenses);
                productDiv.appendChild(createParagraphe);
                productDiv.appendChild(quantity);
                productDiv.appendChild(productDescrip);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(button);    

      function addElement(key, object) {
       
          if (!localStorage.getItem(key)) {
            let produitString = JSON.stringify(object);
            localStorage.setItem(key, produitString);
          };
      };     

     const numberQuantity = document.getElementById('selectQuantity');

     for (let c = 0; c < 101; c++) {
       numberQuantity.innerHTML += `<option class="values" selected="selected" value="${[c]}"}>${[c]}</option>`; 
     };

     let values = document.getElementsByClassName('values');
     
     numberQuantity.addEventListener('change', () => {console.log(values[numberQuantity.selectedIndex].value)
    
      quantVar = (values[numberQuantity.selectedIndex].value);
      parsedVar = parseInt(quantVar);
      console.log(parsedVar);

       objectProd = {

        price: data.price/100,
        id: data._id,
        image: data.imageUrl,
        productNumber: parsedVar
     };
    });

   function addElement(){
    let produitString = JSON.stringify(objectProd);
    localStorage.setItem(data.name, produitString);
};
    function setToStorage () {
            
       button.addEventListener('click', (e) => {

        if(values[numberQuantity.selectedIndex].value == 0){
            e.preventDefault();
            alert('Veuillez sélectionnez au moins un article à ajouter au panier');
        }else{
            addElement();
            window.location = 'panier.html'   
        };
            
       });

      };
    setToStorage(data);
    };
    layoutProduct();                    
});       