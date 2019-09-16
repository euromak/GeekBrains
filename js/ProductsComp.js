/**
 * Компонент каталога корзины
*/

Vue.component('catalog-item', {
    props: ['data'],

    template: `
        <div class="products-grid-items">
            <a href="page.html">
                <div class="img-wrap">
                    <img :src="data.image" :alt="data.name" class="product-image">
                 </div>
                 <div class="product-name">{{data.name}}</div>
                 <div class="price">$ {{data.price}}</div>
            </a>
            <a href="" class="product-hover-block">
            <img src="img/cart-white.svg" alt="cart" class="product-icon-cart">Add to Cart</a>
        </div>    
    `,
});

