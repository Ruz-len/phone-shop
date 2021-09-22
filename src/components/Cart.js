import { CART_ELEMENT } from '../constants/roots';

class Cart {
    listener() {
        const closeBtn = CART_ELEMENT.querySelector('.cart__close');
        closeBtn.addEventListener('click', this.hide);
    }

    show() {
        CART_ELEMENT.classList.add('_active');
    }

    hide() {
        CART_ELEMENT.classList.remove('_active');
    }

    renderProducts(cartProducts) {
        return cartProducts.map(({image, name, price}) => {
            return (`
                    <li class="cart__product">
                        <img src="${image}" alt="">
                        <div>
                            <h3>${name}</h3>
                            <span>${price.toLocaleString()} ₽</span>
                        </div>
                    </li>
                `);
        }).join('');
    }

    render({ cartProducts }) {
        const itemsCart = this.renderProducts(cartProducts).trim() || 'Cart is empty...';
        const totalCost = cartProducts.reduce((p, c) => p + c.price, 0);

        CART_ELEMENT.innerHTML = (`
            <div class="cart__dialog">
                <h2 class="cart__title">Корзина</h2>
                <ul class="cart__products">${itemsCart}</ul>
                <div class="cart__total-cost">
                    <b>Общая стоимость:</b>
                    <span>${totalCost.toLocaleString()} ₽</span>
                </div>
                <button class="cart__close">&times;</button>
            </div>  
            `);

        this.listener();
    }
}
    
export default new Cart;