const list = document.querySelector('.list');
const filters = document.querySelector('.filters');



const handleCollectionResult = (querySnapshot) => {
    console.log('hola');
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        const product = document.createElement('section');
        let img = data.images[0]?.url;
        if (!img) {
            img = './img/placeholder-24.png';
        }

        let showStars = [];
        const popularity = data.popularity;
        for (let i = 0; i < 5; i++) {


            if (i < popularity)
                showStars[i] = "";
            else
                showStars[i] = "hidden";

        }




        product.innerHTML = `
<section class="cookie">
        <a href="./productDetail.html?id=${doc.id}&name=${data.name}"> 
            <img class="cookie__img" src="${img}" alt="">
        </a>
        <div class="cookie__information">
            <p class="cookie__subtitle"> <strong> baked to order</strong> </p>
            <p class="cookie__name"> ${data.name}</p>
        </div>
        <div class="cookie__information2">
            <div class="cookie__starContainer">
                <img class="cookie__star ${showStars[0]}" src="img/star.png">
                <img class="cookie__star ${showStars[1]}" src="img/star.png">
                <img class="cookie__star ${showStars[2]}" src="img/star.png">
                <img class="cookie__star ${showStars[3]}" src="img/star.png">
                <img class="cookie__star ${showStars[4]}" src="img/star.png">
            </div>
            <p class="cookie__price">FROM $ ${data.price}</p>
        </div>

    </section>

`;
        product.classList.add('cookie');
        product.setAttribute('href', `./productDetail.html?id=${doc.id}&name=${data.name}`);

        list.appendChild(product);
    });
}

filters.addEventListener('change', function() {
    //console.log(filters.flavorFilter.value);

    let productsCollection = db.collection("products");
    let filterInput = document.querySelector('select[name="flavorFilter"] option:checked').parentElement;
    console.log(filterInput.label);

    if (filters.flavorFilter.value) {


        switch (filterInput.label) {

            case "FlavorCookie":
                productsCollection = productsCollection.where('flavor', '==', filters.flavorFilter.value);
                break;

            case "ChipsCookie":
                console.log("FILTRAR POR CHIPS");
                productsCollection = productsCollection.where('chips', '==', filters.flavorFilter.value);
                break;

            case "Popularity":
                console.log("FILTRAR POR POPULARIDAD");
                productsCollection = productsCollection.where('popularity', '==', filters.flavorFilter.value);
                break;


        }

    }


    if (filters.order.value) {
        switch (filters.order.value) {
            case 'price_asc':
                productsCollection = productsCollection.orderBy('price', 'asc');
                break;
            case 'price_desc':
                productsCollection = productsCollection.orderBy('price', 'desc');
                break;
            case 'alpha':
                productsCollection = productsCollection.orderBy('name', 'asc');
                break;
        }
    }

    productsCollection.get().then(handleCollectionResult);
});

db.collection("products")
    .get()
    .then(handleCollectionResult);

/*let productsCollection= db.collection("products");

const params= new URLSearchParams(location.search);
if (params.get('type')){
    productsCollection = productsCollection.where('type','==', params.get('type'));
}
productsCollection.get().then(handleCollectionResult);*/