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
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
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

    template: `<div class="products-grid"><product v-for="item of filtred" :key="item.id_product" :img="imgCatalog" :product="item"></product></div>`,
});

Vue.component('product', {
   props: ['product', 'img'],
    template: `
        <div class="products-grid-items">
            <a href="page.html">
                <div class="img-wrap">
                    <img :src="product.image" class="product-image">
                 </div>
                 <div class="product-name">{{product.product_name}}</div>
                 <div class="price">$ {{product.price}}</div>
            </a>
            <a href="" class="product-hover-block">
            <img src="img/cart-white.svg" alt="cart" class="product-icon-cart">Add to Cart</a>
        </div>    
    `,
});