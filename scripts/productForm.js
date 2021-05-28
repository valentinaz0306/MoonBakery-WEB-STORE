const productForm = document.querySelector('.productForm');
const productFormLoader = document.querySelector('.productForm__loader');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');
const imagesLabel = document.querySelector('.imagesLabel');

const imageFiles = [];

let imagesCounter = 0;

toStore = () => {

    if (loggedUser) {
        if (!loggedUser.admin) {
            window.location.href = './store.html';
        }
    } else {
        window.location.href = './store.html';
    }

}

//image load 
productForm.image.addEventListener('change', function() {

    if (imagesCounter < 4) {

        const file = productForm.image.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            const productFormImg = document.createElement('img');
            productFormImg.classList.add('productForm__img');
            productFormImg.setAttribute('src', event.target.result);
            productFormImages.appendChild(productFormImg);
        }

        reader.readAsDataURL(file); // convert to base64 string
        imageFiles.push(file);
        imagesCounter++;
        imagesLabel.innerText = 'Images (' + (3 - imagesCounter) + ' images missing)';
        if (imagesCounter == 3) {
            console.log(productForm.image);
            productForm.image.classList.add('hidden');
        }
    }





});

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log('name:', productForm.name.value);
    //console.log('price:', productForm.price.value);


    //favlor
    let f = '';
    if (productForm.chocolate.checked) f = 'chocolate';
    if (productForm.vanilla.checked) f = 'vanilla';
    if (productForm.strawberry.checked) f = 'strawberry';
    if (productForm.coffee.checked) f = 'coffee';
    if (productForm.banana.checked) f = 'banana';
    if (productForm.lemon.checked) f = 'lemon';
    if (productForm.carrot.checked) f = 'carrot';
    if (productForm.honey.checked) f = 'honey';
    if (productForm.peanutButter.checked) f = 'peanutButter';
    if (productForm.condensedMilk.checked) f = 'condensedMilk';


    //ChipS
    let c = '';
    if (productForm.chocolateChip.checked) c = 'chocolateChip';
    if (productForm.vanillaChip.checked) c = 'vanillaChip';
    if (productForm.mymsChip.checked) c = 'mymsChip';
    if (productForm.macadamiaChip.checked) c = 'macadamiaChip';
    if (productForm.blueberryChip.checked) c = 'blueberryChip';

    //array products
    const product = {
        name: productForm.name.value,
        description: productForm.description.value,
        price: parseFloat(productForm.price.value),
        popularity: productForm.popularity.value,
        flavor: f,
        chips: c,
    };

    //when user doesnt complete the form

    let error = '';

    if (!product.description) {
        error += 'Product description is required. <br/>';
    }

    if (!product.name) {
        error += 'Product name is required. <br/>';
    }

    if (!product.price) {
        error += 'Product price is required. <br/>';
    }

    if (!product.popularity) {
        error += 'You must select a number. <br/>';
    }

    if (imagesCounter != 3) {
        error += 'There are not 3 images';
    }



    if (error) {
        productFormError.innerHTML = error;
        productFormError.classList.remove('hidden');
        //return;

    } else {
        productFormError.classList.add('hidden');
    }

    //console.log(imageFiles);

    productFormLoader.classList.remove('hidden');
    productFormError.classList.add('hidden');

    const genericCatch = function(error) {
        productFormLoader.classList.add('hidden');
        productFormError.classList.remove('hidden');
        productFormError.innerHTML = 'There was an error in the product upload.';
    }

    // firestore information 

    if (imagesCounter == 3) {
        db.collection('products').add(product)
            .then(function(docRef) {


                const uploadPromises = [];
                const downloadUrlPromises = [];

                imageFiles.forEach(function(file) {
                    var storageRef = firebase.storage().ref();
                    var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

                    //image upload 
                    uploadPromises.push(fileRef.put(file));

                }); // cierra for each 

                Promise.all(uploadPromises).then(function(snapshots) {

                        snapshots.forEach(function(snapshot) {

                            // get url download img
                            downloadUrlPromises.push(snapshot.ref.getDownloadURL());


                        });

                        Promise.all(downloadUrlPromises).then(function(downloadURLs) {
                                const images = [];
                                downloadURLs.forEach(function(url, index) {
                                    images.push({

                                        url: url,
                                        ref: snapshots[index].ref.fullPath

                                    });
                                });

                                db.collection('products').doc(docRef.id).update({
                                        images: images
                                    }).then(function() {
                                        productFormLoader.classList.add('hidden');
                                        productFormSuccess.classList.remove('hidden');
                                    })
                                    .catch(genericCatch);
                            })
                            .catch(genericCatch);
                    })
                    .catch(genericCatch);
            })
            .catch(genericCatch);
    } else {
        productFormError.innerHTML = 'There are not 3 images';
    }



});