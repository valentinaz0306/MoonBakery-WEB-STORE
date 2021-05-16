const params = new URLSearchParams(location.search);
const id = params.get('id');
console.log(id)

if (!id) {
  location.href = './404.html';
}

const detailImg = document.querySelector('.detail__product');
const detailTitle = document.querySelector('.detail__title');
const detailText = document.querySelector('.detail__text');



db.collection('products')
  .doc(id)
  .get()
  .then(function (doc) {
    console.log(doc.id, doc.data());
    const data = doc.data();
    if (!data) {
      location.href = './404.html';
    }

    detailImg.setAttribute('src', data.images[0].url);
    detailTitle.innerText= data.name;
    detailText.innerText= `$ ${data.price}`;

  });

