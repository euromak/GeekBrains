/**
 * Компонент каталога корзины
*/

Vue.component('catalog', {
    props: ['data', 'img'],
    data() {
      return {
          products: [],
          filtred: [],
          imgCatalog: 'https://placehold.it/200x150',
      }
    },

    methods: {

    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtred.push(el);
                }
            });
    },

    template: `
        <div class="products-grid-items">
            <a href="page.html">
                <div class="img-wrap">
                    <img class="product-image">
                 </div>
                 <div class="product-name"></div>
                 <div class="price">$ </div>
            </a>
            <a href="" class="product-hover-block">
            <img src="img/cart-white.svg" alt="cart" class="product-icon-cart">Add to Cart</a>
        </div>    
    `,
});

