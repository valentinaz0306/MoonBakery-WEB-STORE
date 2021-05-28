const cartContainer = document.querySelector('.cart__container');
const totalHtml = document.querySelector('.subtotal');
const fullname = document.querySelector('.fullname');
const id = document.querySelector('.id');
const address = document.querySelector('.address');
const ccnumber = document.querySelector('.ccnumber');
const buy = document.querySelector('.buy');

let quantities = new Map();
let prices = new Map();

let total = 0;



buy.addEventListener('click', () => {

    let fullnameValue = fullname.value;
    let idValue = id.value;
    let ccnumberValue = ccnumber.value;
    let addressValue = address.value;

    let error = '';

    if (!fullnameValue) {
        error += 'Please add the fullname \n';
    }

    if (!idValue) {
        error += 'Please add the id \n';
    }

    if (!ccnumberValue) {
        error += 'Please add your credit card number \n'
    }

    if (!addressValue) {
        error += 'Please add address \n';
    }

    if (error == '') {


        cart.forEach(

            (elem) => {

                let order = {
                    cookie: elem.name,
                    name: fullnameValue,
                    id: idValue,
                    cc: ccnumberValue,
                    addressValue: addressValue,
                    price: elem.price,
                    quantity: quantities.get(elem.id),
                    url: elem.images[0].url

                }

                ORDER_COLLECTIONS.doc().set({ order }).then(
                    () => {

                        cart = [];
                        CART_COLLECTION.doc(loggedUser.id).set({ cart }).then(
                            () => {
                                window.location.href = './confirmation.html';
                            }
                        );
                    }
                );




            }

        );




    } else {
        alert(error);
    }


});




renderCart = () => {


    total = 0;
    let products = '';

    cart.forEach((elem) => {

        quantities.set(elem.id, 1);
        prices.set(elem.id, elem.price);

        let currentCookie = elem;

        let imageURL = currentCookie.images[1].url;

        total += currentCookie.price;


        let product = document.createElement('div');
        product.className = 'cart__product';




        product.innerHTML = `
       
                    <img class="cart__img" src="${imageURL}">
                    <div class="cart__productInfo">
                        <p class="cart__order">your order of cookies</p>
                        <p class="cart__cookieName">${currentCookie.name}</p>
                        <div class="cart__btn">
                            <img class="cart__subtraction add" src="img/subtraction.png">
                            <p class="cart__number number">1</p>
                            <img class="cart__addition subs" src="img/addition.png">
                        </div>
                    </div>
                    <div class="cart__symbols">
                        <img class="cart__equis x" src="img/equis.png">
                        <p class="cart__price">$${currentCookie.price}</p>
                    </div>
          
        `;

        let deleteBtn = product.querySelector('.x');

        deleteBtn.addEventListener('click', () => {

            let idToDelete = currentCookie.id;

            let i = searchProduct(idToDelete);

            if (i != -1) {
                cart.splice(i, 1);
                cartContainer.innerHTML = '';
                total = 0;
                CART_COLLECTION.doc(loggedUser.id).set({ cart });
                refreshCartSpan();
                renderCart();
            }



        });

        const number = product.querySelector('.number');
        const add = product.querySelector('.add');
        const subs = product.querySelector('.subs');

        addF = () => {
            let n = number.innerHTML;
            n++;
            number.innerHTML = n;
            quantities.set(elem.id, n);
            total = getTotal();
            totalHtml.innerText = '$' + total;
        }

        subF = () => {
            let n = number.innerHTML;
            if (n > 1) {
                n--;
                number.innerHTML = n;
                quantities.set(elem.id, n);
                total = getTotal();
                totalHtml.innerText = '$' + total;

            }
        }


        add.addEventListener('click', subF);
        subs.addEventListener('click', addF);
        cartContainer.appendChild(product);



    });

    console.log(quantities);
    console.log(prices);
    total = getTotal();

    totalHtml.innerText = '$' + total;


}


searchProduct = (id) => {

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) return i;
    }

    return -1;

}

getTotal = () => {


    let t = 0;
    cart.forEach((elem) => {

        t += quantities.get(elem.id) * prices.get(elem.id);


    });

    return t;

}