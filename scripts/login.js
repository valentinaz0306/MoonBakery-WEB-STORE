const loginEmail = document.querySelector('.loginEmail');
const loginPassword = document.querySelector('.loginPassword');

const signupEmail = document.querySelector('.signupEmail');
const signupFirstname = document.querySelector('.signupFirstname');
const signupLastname = document.querySelector('.signupLastname');
const signupPassword = document.querySelector('.signupPassword');

const loginBtn = document.querySelector('.loginB');
const createBtn = document.querySelector('.create');

const errorLbl = document.querySelector('.errorLbl');
const errorLblL = document.querySelector('.errorLblL');


loginBtn.addEventListener('click', () => {

    errorLblL.innerText = '';

    let error = '';

    if (!loginEmail.value) {
        error += 'Add email \n';
    }

    if (!loginPassword.value) {
        error += 'Add password \n';
    }

    errorLblL.innerText = error;

    if (error == '') {
        auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(() => {
            window.location.href = './store.html';
        });
    }





});

createBtn.addEventListener('click', () => {

    errorLbl.innerText = '';

    let error = '';

    if (!signupEmail.value) {
        error += 'Add email \n';
    }

    if (!signupFirstname.value) {
        error += 'Add firstname \n';
    }

    if (!signupLastname.value) {
        error += 'Add lastname \n';
    }

    if (!signupPassword.value) {
        error += 'Add password \n';
    }

    errorLbl.innerText = error;

    if (error == '') {

        auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value).then((userCredential) => {

            const user = {
                name: signupFirstname.value,
                lastname: signupLastname.value,
                email: signupEmail.value,
                id: userCredential.user.uid
            }

            USER_COLLECTIONS.doc(user.id).set({ user }).then(() => {

                signupEmail.value = '';
                signupLastname.value = '';
                signupFirstname.value = '';
                signupPassword.value = '';

                window.location.href = './store.html';

            });
        });


    }


});

toStore = () => {

    if (loggedUser)
        window.location.href = './store.html';
}