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

const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');

productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('name:', productForm.name.value);
    console.log('price:', productForm.price.value);

    //flavor
    const product = {
        name: productForm.name.value,
        price: parseFloat(productForm.price.value),
        flavor: [],
    }

    if (productForm.chocolate.checked) product.flavor.push('chocolate');
    if (productForm.vanilla.checked) product.flavor.push('vanilla');
    if (productForm.strawberry.checked) product.flavor.push('strawberry');

    console.log(product);
    productFormLoader.classList.remove('hidded');
    db.collection('products').add(product)
    .then(function (docRef) {
        console.log('document added', docRef.id)
        productFormLoader.classList.add('hidded');
        productFormSuccess.classList.remove('hidden');
    })
    .catch(function (error) {
        productFormLoader.classList.add('hidded');
        productFormError.classList.remove('hidded');
    });

});

