import { HEADER_ELEMENT } from '../constants/roots';

class Header {
    listener({ onOpenCart }) {
        const cartBtn = HEADER_ELEMENT.querySelector('.cart-btn');
        cartBtn.addEventListener('click', onOpenCart);
    }

    render({ favoriteCounter, cartCounter, ...cb }) {
        HEADER_ELEMENT.innerHTML = (`
            <div class="header__container container"> 
                <nav class="navigation">
                    <ul class="navigation__list">
                        <li class="nagigation__item">
                            <a href="./public/index.html" class="navigation__link">Все товары</a>
                        </li>
                    </ul>
                </nav>

                <button class="cart-btn icon-cart">${cartCounter}</button>

                <div class="favorite">
                    <a href="#" class="favorite__link icon-heart">${favoriteCounter}</a>
                </div>
            </div>
        `);

        this.listener(cb);
    }
}

export default new Header;