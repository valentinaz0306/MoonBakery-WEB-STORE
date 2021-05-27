const params = new URLSearchParams(location.search);
const id = params.get('id');
console.log(id)

if (!id) {
    location.href = './404.html';
}

const detailImg = document.querySelector('.detail__product');
const detailTitle = document.querySelector('.detail__title');
const detailText = document.querySelector('.detail__text');
const left = document.querySelector('.detail__product--larrow');
const right = document.querySelector('.detail__product--rarrow');
<<<<<<< HEAD

let counter = 1;


=======
const detailDescription = document.querySelector('.detail__description');
>>>>>>> 4404267ed886457f9e17e819a0332821e278e0ec


let counter = 1;


db.collection('products')
    .doc(id)
    .get()
    .then(function(doc) {
        console.log(doc.id, doc.data());
        const data = doc.data();


        let images = data.images;
        console.log(images);

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
<<<<<<< HEAD
        detailText.innerText = `$ ${data.price}`;
=======
        detailDescription.innerText = data.description;
        detailText.innerText = `4PK  $ ${data.price}`;
>>>>>>> 4404267ed886457f9e17e819a0332821e278e0ec

    });