const firebaseConfig = {
    apiKey: "AIzaSyAkAwiy8kSED_CZWMUf4MnMJ5eEgYuF4LQ",
    authDomain: "moonbakery-webstore.firebaseapp.com",
    projectId: "moonbakery-webstore",
    storageBucket: "moonbakery-webstore.appspot.com",
    messagingSenderId: "944877331887",
    appId: "1:944877331887:web:7e27f4d22c0d1bd875bb5a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.firestore();

const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');

const imageFiles = [];

//image load 
productForm.image.addEventListener('change', function () {
    const file = productForm.image.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        const productFormImg = document.createElement('img');
        productFormImg.classList.add('productForm__img');
        productFormImg.setAttribute('src', event.target.result);
        productFormImages.appendChild(productFormImg);
    }

    reader.readAsDataURL(file); // convert to base64 string
    imageFiles.push(file);
});

productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //console.log('name:', productForm.name.value);
    //console.log('price:', productForm.price.value);

    //array products
    const product = {
        name: productForm.name.value,
        price: parseFloat(productForm.price.value),
        popularity: productForm.popularity.value,
        flavor: [],
        chips: [],
    };
    //flavor
    if (productForm.chocolate.checked) product.flavor.push('chocolate');
    if (productForm.vanilla.checked) product.flavor.push('vanilla');
    if (productForm.strawberry.checked) product.flavor.push('strawberry');
    if (productForm.coffee.checked) product.flavor.push('coffee');
    if (productForm.banana.checked) product.flavor.push('banana');
    if (productForm.lemon.checked) product.flavor.push('lemon');
    if (productForm.carrot.checked) product.flavor.push('carrot');
    if (productForm.honey.checked) product.flavor.push('honey');
    if (productForm.peanutButter.checked) product.flavor.push('peanutButter');
    if (productForm.condensedMilk.checked) product.flavor.push('condensedMilk');

    //Chips
    if (productForm.chocolateChip.checked) product.chips.push('chocolateChip');
    if (productForm.vanillaChip.checked) product.chips.push('vanillaChip');
    if (productForm.mymsChip.checked) product.chips.push('mymsChip');
    if (productForm.macadamiaChip.checked) product.chips.push('macadamiaChip');
    if (productForm.blueberryChip.checked) product.chips.push('blueberryChip');

    //when user doesnt complete the form

    let error = '';

    if (!product.name) {
        error += 'Product name is required. <br/>';
    }

    if (!product.price) {
        error += 'Product price is required. <br/>';
    }

    if (!product.popularity) {
        error += 'You must select a number. <br/>';

    }

    if (error) {
        productFormError.innerHTML = error;
        productFormError.classList.remove('hidded');
        //return;

    } else {
        productFormError.classList.add('hidded');
    }

    console.log(imageFiles);

    // firestore information 
    db.collection('products').add(product)
        .then(function (docRef) {
            console.log('document added', docRef.id)
            productFormLoader.classList.add('hidded');
            productFormSuccess.classList.remove('hidden');

            const uploadPromises = [];
            const downloadUrlPromises = [];

            imageFiles.forEach(function (file) {
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

                //image upload 
                uploadPromises.push(fileRef.put(file));

            });// cierra for each 

            Promise.all(uploadPromises).then(function (snapshots) {

                snapshots.forEach(function (snapshot) {

                    // get url download img
                    downloadUrlPromises.push(snapshot.ref.getDownloadURL());
                    console.log(snapshot);
                    console.log('Uploaded a blob or file!');
                });

                Promise.all(downloadUrlPromises).then(function (downloadURLs) {
                    console.log(downloadURLs);
                });
            })

            /*.then(function (downloadURL) {
               productFormLoader.classList.remove('hidded');
               product.imageUrl = downloadURL;
               product.imageRef = snapshot.ref.fullPath;

               console.log('File available at', downloadURL);
           });*/

        })
        .catch(function (error) {
            productFormLoader.classList.add('hidded');
            productFormError.classList.remove('hidded');
        });


});

