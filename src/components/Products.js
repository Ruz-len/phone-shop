import { PRODUCTS_ELEMENT } from '../constants/roots';

class Products {
    listener({ onFavorite, onCart }) {
        PRODUCTS_ELEMENT.querySelectorAll('.card__heart').forEach(btn => {
            btn.addEventListener('click', onFavorite);
        });

        PRODUCTS_ELEMENT.querySelectorAll('.card__btn').forEach(btn => {
            btn.addEventListener('click', onCart);
        });
    }

    render({ products, ...cb }) {
        if (!products.length) {
            PRODUCTS_ELEMENT.innerHTML = 'Nothing..'
            return;
        }

        PRODUCTS_ELEMENT.innerHTML = products.map(item => {
            const activeClass = item.isFavorite ? '_active' : '';
            const cartLabel = item.isCart ? 'Удалить' : 'Добавить';

            return (`
                <li class="products__item card">
                    <div class="card__header">
                        <img src="${item.image}" alt="" class="card__img">
                    </div>
                    <div class="card__body">
                        <h3 class="card__name">${item.name}</h3>
                    </div>
                    <div class="card__footer">
                        <div class="card__price">${item.price.toLocaleString()} ₽</div>
                        <button class="card__btn" data-id="${item.id}">${cartLabel}</button>
                    </div>
                    <button class="card__heart ${activeClass}" data-id="${item.id}"></button>
                </li>
            `);

        }).join('');
        
        this.listener(cb);
    }
}

export default new Products;