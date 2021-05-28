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
const auth = firebase.auth();
const cart__span = document.querySelector('.cart__span');

const USER_COLLECTIONS = db.collection('users');
const CART_COLLECTION = db.collection('cart');
const ORDER_COLLECTIONS = db.collection('orders');
const PRODUCTS_COLLECTIONS = db.collection('products');

const logout = document.querySelector('.logout');
let cart = [];

if (logout) {
    logout.addEventListener('click', () => {

        auth.signOut();
    });
}

let loggedUser = null;

auth.onAuthStateChanged((user) => {


    if (user) {

        USER_COLLECTIONS.doc(user.uid).get().then((doc) => {

            if (!doc) {
                return;
            } else {


                console.log(doc.data());
                setLoggedUser(doc.data());


                if (typeof toStore === 'function') {

                    toStore();
                }



                if (typeof renderOrders === 'function') {



                    renderOrders();
                }
            }

        });

    } else {

        loggedUser = null;
        userLoggedOut();
        if (typeof toStore === 'function') {

            toStore();
        }


        if (typeof renderOrders === 'function') {

            renderOrders();
        }

    }



});

setLoggedUser = (docDat) => {


    console.log(docDat);
    let user = docDat.user;


    loggedUser = user;
    getMyCart(loggedUser.id);
    userLoggedIn();

}

userLoggedIn = () => {



    const loggedIn = document.querySelectorAll('.userLoggedIn');
    loggedIn.forEach(elem => {
        elem.classList.remove('hidden');
    });

    const loggedOut = document.querySelectorAll('.userLoggedOut');
    loggedOut.forEach(elem => {
        elem.classList.add('hidden');
    });


    if (loggedUser.admin) {
        const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
        showLoggedAdmin.forEach((elem) => {
            elem.classList.remove('hidden');
        });
    }

}


userLoggedOut = () => {

    const loggedIn = document.querySelectorAll('.userLoggedIn');
    loggedIn.forEach(elem => {
        elem.classList.add('hidden');
    });

    const loggedOut = document.querySelectorAll('.userLoggedOut');
    loggedOut.forEach(elem => {
        elem.classList.remove('hidden');
    });

    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
    showLoggedAdmin.forEach((elem) => {
        elem.classList.add('hidden');
    });
}



getMyCart = (uid) => {


    CART_COLLECTION.doc(uid).get().then(

        dataDoc => {
            const data = dataDoc.data();
            if (!data) {
                return;
            } else {
                if (cart__span) {
                    data.cart.forEach(elem => {
                        cart.push(elem);
                    });

                    if (typeof renderCart == 'function') {
                        renderCart();
                    }
                    refreshCartSpan();
                }
            }
        }


    );

}

refreshCartSpan = () => {
    if (cart.length > 0) {
        cart__span.classList.remove('hidden');
        cart__span.innerText = cart.length;

    } else {
        cart__span.classList.add('hidden');
    }
}

refreshCartSpan();