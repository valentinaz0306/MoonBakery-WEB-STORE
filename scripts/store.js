
const products = [

    {
        src: "img/macadamia.png",
        title: 'aaaaaa',
        price: 7.00,
    },

    {
        src: "img/macadamia.png",
        title: 'aaaaaa',
        price: 8.00,
    },

      {
        src: "img/macadamia.png",
        title: 'aaaaaa',
        price: 89.00,
    }
];

const list= document.querySelector('.list');

function handleProductItem(item){
    const product= document.createElement('section');
    product.innerHTML=`
    
    <section class="cookie">
            <a href="#"> 
                <img class="cookie__img" src="img/macadamia.png">
            </a>
            <div class="cookie__information">
                <p class="cookie__subtitle"> <strong> baked to order</strong> </p>
                <p class="cookie__name"> MACADAMIA<br>COOKIE</p>
            </div>
            <div class="cookie__information2">
                <div class="cookie__starContainer">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                    <img class="cookie__star" src="img/star.png">
                </div>
                <p class="cookie__price">FROM $ ${item.price}</p>
            </div>

        </section>
    
    `;
    product.classList.add('cookie');
    product.setAttribute('href','#');

    list.appendChild(product);
}

products.forEach(handleProductItem)