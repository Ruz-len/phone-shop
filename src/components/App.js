import { DataApi } from '../services/DataApi';

import Header from './Header';

import Products from './Products';

import Cart from './Cart';

const dataApi = new DataApi();

class App {
    constructor() {
        this.state = {
            products: [],
            favorite: JSON.parse(localStorage.getItem('favorite')) || [],
            cart: JSON.parse(localStorage.getItem('cart')) || []
        };
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.render();
    }

    async init() {
        this.render();
        const products = await dataApi.getRedmiProducts();
        this.setState({
            products,
            loading: false
        });
    }

    transformProducts(arr) {
        return this.state.products.map(item => {
            if (this.state.favorite.indexOf(item.id) !== -1) item.isFavorite = true;
            else item.isFavorite = false;

            if (this.state.cart.indexOf(item.id) !== -1) item.isCart = true;
            else item.isCart = false;

            return item;
        });
    }

    filterCart(products) {
        return products.filter(item => {
            return this.state.cart.indexOf(item.id) !== -1;
        });
    }

    onFavorite(e) {

        const btn = e.target;
        const id = btn.getAttribute('data-id');
        const index = this.state.favorite.indexOf(id);

        if (index === -1) this.state.favorite.push(id);
        else this.state.favorite.splice(index, 1);

        localStorage.setItem('favorite', JSON.stringify(this.state.favorite));

        this.render();
    }

    onCart(e) {
        const btn = e.target;
        const id = btn.getAttribute('data-id');
        const index = this.state.cart.indexOf(id);

        if (index === -1) this.state.cart.push(id);
        else this.state.cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(this.state.cart));

        this.render();
    }

    onOpenCart() {
        Cart.show();
    }

    render() {
        const onFavorite = this.onFavorite.bind(this);
        const onCart = this.onCart.bind(this);
        const products = this.transformProducts();

        const favoriteCounter = this.state.favorite.length;
        const cartCounter = this.state.cart.length;
        const onOpenCart = this.onOpenCart.bind(this);

        const cartProducts = this.filterCart(products);

        Header.render({ favoriteCounter, cartCounter, onOpenCart });
        Products.render({ products, onFavorite, onCart });
        Cart.render({ cartProducts });
    }
}

export default new App;