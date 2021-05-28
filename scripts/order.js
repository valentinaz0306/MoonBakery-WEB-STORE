const container = document.querySelector('.order__maincontainer');




renderOrders = () => {

    container.innerHTML = '';

    if (!loggedUser.admin) {
        window.location.href = './store.html';
        return;
    }

    ORDER_COLLECTIONS.get().then(
        (order) => {
            order.forEach(element => {


                let o = element.data().order;


                let orderHTML = document.createElement('div');
                orderHTML.className = 'order__product';



                let innerHtmlString = `
                  
                    <img class="order__img" src="${o.url}">
                    <div class="order__productInfo">
                        <p class="order__order">your order of cookies</p>
                        <p class="order__cookieName name">${o.cookie}</p>

                        <div class="order__container">
                            <p class="order__subtitle"> <strong> Name: </strong> </p>
                            <p class="order__name"> ${o.name}</p>
                        </div>

                        <div class="order__container">
                            <p class="order__subtitle"> <strong> ID: </strong> </p>
                            <p class="order__name"> ${o.id} </p>
                        </div>

                 
                        <div class="order__container">
                            <p class="order__subtitle"> <strong> Credit Card Number: </strong> </p>
                            <p class="order__name"> ${o.cc} </p>
                        </div>

                        <div class="order__container">
                            <p class="order__subtitle"> <strong> Address: </strong> </p>
                            <p class="order__name"> ${o.addressValue} </p>
                        </div>

                    </div>
                    <div class="order__symbols">
                        <img class="order__equis" src="img/equis.png">
                        <p class="order__price">${o.quantity + ' packages $' + o.quantity*o.price}</p>
                    </div>
        
                
                
                
                
                
                `;

                orderHTML.innerHTML = innerHtmlString;
                container.appendChild(orderHTML);







            });
        }
    );


}