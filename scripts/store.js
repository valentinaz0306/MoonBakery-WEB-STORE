const list= document.querySelector('.list');
const filters= document.querySelector('.filters');

db.collection("products")
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data=doc.data();
        const product= document.createElement('section');
        let img= data.images[0]?.url;
        if(!img){
            img='./img/placeholder-24.png';
        }
    product.innerHTML=`
    
    <section class="cookie">
            <a href="#"> 
                <img class="cookie__img" src="${img}" alt="">
            </a>
            <div class="cookie__information">
                <p class="cookie__subtitle"> <strong> baked to order</strong> </p>
                <p class="cookie__name"> ${data.name}</p>
            </div>
            <div class="cookie__information2">
                <div class="cookie__starContainer">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                </div>
                <p class="cookie__price">FROM $ ${data.price}</p>
            </div>

        </section>
    
    `;
    product.classList.add('cookie');
    product.setAttribute('href','#');

    list.appendChild(product);
   });
})





