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

const USER_COLLECTIONS = db.collection('users');

const logout = document.querySelector('.logout');

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
                setLoggedUser(doc.data());


                if (typeof toStore === 'function') {

                    toStore();
                }
            }

        });

    } else {

        loggedUser = null;
        userLoggedOut();

    }



});

setLoggedUser = (docDat) => {

    let user = docDat.user;
    loggedUser = user;
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

}