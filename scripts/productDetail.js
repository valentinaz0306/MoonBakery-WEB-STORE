const params= new URLSearchParams(location.search);
const id= params.get('id');
console.log(id)

if(!id) {
    location.href = './404.html';
  }


  db.collection('products')
  .doc(id)
  .get()
  .then(function (doc) {
      console.log(doc.id,doc.data());
      const data = doc.data();
    if(!data) {
      location.href = './404.html';
    }
  });

