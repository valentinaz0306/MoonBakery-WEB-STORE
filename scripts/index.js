//References
const checkBox1 = document.querySelector('.interaction__check1');
const checkBox2 = document.querySelector('.interaction__check2');
const checkBox3 = document.querySelector('.interaction__check3');
const checkBox4 = document.querySelector('.interaction__check4');
const image = document.querySelector('.interaction__img1');
const button = document.querySelector('.interaction__btn');

var url = '';
var dough = '';
var chips = '';

//Functions
function handleCheckBox1() {

    dough = 'vanilla';
    if (checkBox2.checked) {
        checkBox2.checked = false;
    }
    if (!checkBox4.checked && !checkBox2.checked && !checkBox3.checked) {
        image.src = '../img/vainilla_cookie.png';
    }
}

function handleCheckBox2() {
    dough = 'chocolate';
    if (checkBox1.checked) {
        checkBox1.checked = false;
    }
    if (!checkBox4.checked && !checkBox1.checked && !checkBox3.checked) {
        image.src = '../img/vainilla_cookie.png';
    }
}

function handleCheckBox3() {
    chips = 'vanilla';
    if (checkBox4.checked) {
        checkBox4.checked = false;
    }
    if (!checkBox4.checked && !checkBox1.checked && !checkBox2.checked) {
        image.src = '../img/vainilla_cookie.png';
    }
}

function handleCheckBox4() {
    chips = 'chocolate';
    if (checkBox3.checked) {
        checkBox3.checked = false;
    }
    if (!checkBox1.checked && !checkBox2.checked && !checkBox3.checked) {
        image.src = '../img/vainilla_cookie.png';
    }
}

//Eventos
checkBox1.addEventListener('click', handleCheckBox1);
checkBox2.addEventListener('click', handleCheckBox2);
checkBox3.addEventListener('click', handleCheckBox3);
checkBox4.addEventListener('click', handleCheckBox4);
button.addEventListener('click', makeCookie);


//Algorito Maestro
function makeCookie() {

    if (((checkBox1.checked) || (checkBox2.checked)) && ((checkBox3.checked) || (checkBox4.checked))) {

        switch (dough) {

            case 'vanilla':
                if (chips === 'chocolate') {
                    url = '../img/vainilla_chocolate_chip.png';
                } else {
                    url = '../img/vainilla_vainilla_chip.png';
                }

                break;

            case 'chocolate':
                if (chips === 'chocolate') {
                    url = '../img/chocolate_chocolate_chip.png';
                } else {
                    url = '../img/chocolate_vainilla_chip.png';
                }

                break;

        }
        console.log(url);
        image.src = url;

    } else {
        alert('Please select all the options');
    }



}