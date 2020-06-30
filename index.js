//requête HTML pour récupérer les informations de l'API avec l'utilisation de fetch, sous forme de fonction pour pouvoir la réutiliser 
const getData = async (url) => {
        try{
            let reponse = await fetch (url);
            return reponse.json(); 
        }
        catch (e) {
             
            throw(e)
        };
    };

    const globalProducts = getData("http://localhost:3000/api/cameras")

    globalProducts.then((data) => {

        const creation = (i) => {
            //création div (bootstrap)
            const newDiv = document.createElement('div'); // Création de la  div "row"
            newDiv.classList.add('row');
            document.getElementById('global').insertBefore(newDiv,document.getElementById("foot"));
            
            let productDiv = document.createElement('div'); // Création de la div "col"
            productDiv.classList.add('col');
            productDiv.classList.add('proDiv');
           
            newDiv.appendChild(productDiv); // On ajoute la div "col" dans la div "row"
    
            //Dans chaque div col on va créer un élement par type d'informations (name, price, ect... et on ajoute l'image qui correspond à l'article)
    
            const productName = document.createElement("h3");
            productName.textContent = data[i].name;
            
            const productPrice = document.createElement("p");
            productPrice.textContent = `Prix: ${data[i].price/100}  €`;
            
            const productLenses = document.createElement("p");
            productLenses.textContent = `Personnalisez le ${data[i].name} avec la lentille de votre choix`
    
            const productImg = new Image(350);
            productImg.src = data[i].imageUrl;

            const button = document.createElement('div');
            button.innerHTML = `<a href=html/produits.html?id=${data[i]._id}><button class="buttons">Personnaliser</button></a>`

            // On ajoute chaque information en tant qu'enfant de productDiv
    
            productDiv.appendChild(productName);
            productDiv.appendChild(productImg);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productLenses);
            productDiv.appendChild(button);  
    };

   for (let i in data) {
       creation(i);
   };
   
});