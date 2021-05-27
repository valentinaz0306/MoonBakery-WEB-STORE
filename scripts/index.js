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

    if (!checkBox4.checked && !checkBox2.checked && !checkBox3.checked && !checkBox1.checked) {

        image.src = '/MoonBakery-WEB-STORE/img/vainilla_cookie.png';
    }
}

function handleCheckBox2() {
    dough = 'chocolate';
    if (checkBox1.checked) {
        checkBox1.checked = false;
    }
    if (!checkBox4.checked && !checkBox1.checked && !checkBox3.checked && !checkBox2.checked) {

        image.src = '/MoonBakery-WEB-STORE/img/vainilla_cookie.png';
    }
}

function handleCheckBox3() {
    chips = 'vanilla';
    if (checkBox4.checked) {
        checkBox4.checked = false;
    }
    if (!checkBox4.checked && !checkBox1.checked && !checkBox2.checked && !checkBox3.checked) {

        image.src = '/MoonBakery-WEB-STORE/img/vainilla_cookie.png';
    }
}

function handleCheckBox4() {
    chips = 'chocolate';
    if (checkBox3.checked) {
        checkBox3.checked = false;
    }
    if (!checkBox1.checked && !checkBox2.checked && !checkBox3.checked && !checkBox4.checked) {

        image.src = '/MoonBakery-WEB-STORE/img/vainilla_cookie.png';
    }
}

//Events
checkBox1.addEventListener('click', handleCheckBox1);
checkBox2.addEventListener('click', handleCheckBox2);
checkBox3.addEventListener('click', handleCheckBox3);
checkBox4.addEventListener('click', handleCheckBox4);
button.addEventListener('click', makeCookie);


//Algorithm
function makeCookie() {

    if (((checkBox1.checked) || (checkBox2.checked)) && ((checkBox3.checked) || (checkBox4.checked))) {

        switch (dough) {

            case 'vanilla':
                if (chips === 'chocolate') {
                    url = '/MoonBakery-WEB-STORE/img/vainilla_chocolate_chip.png';
                } else {
                    url = '/MoonBakery-WEB-STORE/img/vainilla_vainilla_chip.png';
                }

                break;

            case 'chocolate':
                if (chips === 'chocolate') {
                    url = '/MoonBakery-WEB-STORE/img/chocolate_chocolate_chip.png';
                } else {
                    url = '/MoonBakery-WEB-STORE/img/chocolate_vainilla_chip.png';
                }

                break;

        }

        image.src = url;

    } else {
        alert('Please select all the options');
    }
}

const slider = document.querySelector('.carrousel__slider');
let currentSlider = 0;

function handleInterval() {
    currentSlider++;
    if (currentSlider >= 3) {

        currentSlider = 0;
    }
    slider.style.transform = `translate(-${ 100 * currentSlider }%,0px)`;
}
setInterval(handleInterval, 1000);