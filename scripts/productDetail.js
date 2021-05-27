const params = new URLSearchParams(location.search);
const id = params.get('id');


if (!id) {
    location.href = './404.html';
}

const detailImg = document.querySelector('.detail__product');
const detailTitle = document.querySelector('.detail__title');
const detailText = document.querySelector('.detail__text');
const left = document.querySelector('.detail__product--larrow');
const right = document.querySelector('.detail__product--rarrow');
const detailDescription = document.querySelector('.detail__description');
const add = document.querySelector('.add');


let counter = 1;
let product = null;

add.addEventListener('click', () => {

    let repeated = false;


    if (cart.length > 0) {

        cart.forEach((elem) => {

            console.log(elem.id + '    ' + id)
            if (elem.id == id) {

                repeated = true;
                return;
            }
        });

        cart.push({...product, id, });


    } else {
        cart.push({...product, id, });
    }

    if (loggedUser == null) {
        window.location.href = './login.html';
    } else {
        if (!repeated) {
            CART_COLLECTION.doc(loggedUser.id).set({ cart }).then(
                () => {
                    window.location.href = './cart.html';
                }
            );
        } else {
            alert('This product have been already added');
        }
    }



});

db.collection('products')
    .doc(id)
    .get()
    .then(function(doc) {

        const data = doc.data();

        product = doc.data();



        let images = data.images;


        detailImg.setAttribute('src', images[1].url);


        left.addEventListener('click', () => {
            if (counter > 1) {
                counter--;
            } else if (counter == 1) {
                counter = images.length - 1;
            }
            detailImg.setAttribute('src', images[counter].url);

        });

        right.addEventListener('click', () => {
            if (counter < images.length - 1) {
                counter++;
            } else if (counter == images.length - 1) {
                counter = 1;
            }
            detailImg.setAttribute('src', images[counter].url);
        });



        if (!data) {
            location.href = './404.html';
        }

        detailImg.setAttribute('src', data.images[1].url);
        detailTitle.innerText = data.name;
        detailDescription.innerText = data.description;
        detailText.innerText = `4PK  $ ${data.price}`;

    });