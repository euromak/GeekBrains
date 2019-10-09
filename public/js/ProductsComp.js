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
          productsCatalog: [],
          currentProductLink: [],
      }
    },

    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtred = this.products.filter(el => regexp.test(el.product_name));
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

Vue.component('catalog-products', {
    props: ['data', 'img'],
    data() {
        return {
            productsCatalog: [],
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
                    this.productsCatalog.push(el);
                    this.productsCatalog.splice(8,1);
                    this.filtred.push(el);
                }
            });
    },

    template: `<div class="products-grid"><product v-for="item of productsCatalog" :key="item.id_product" :img="imgCatalog" :product="item"></product></div>`,
});

Vue.component('product', {
    props: ['product', 'img'],
    methods: {
        translateProduct(product) {
            localStorage.setItem('product', JSON.stringify(product));
        }
    },
    template: `
        <div class="products-grid-items">
            <a href="page.html" target="blank" @click="translateProduct(product)">
                <div class="img-wrap">
                    <img :src="product.image" class="product-image">
                 </div>
                 <div class="product-name">{{product.product_name}}</div>
                 <div class="price">$ {{product.price}}</div>
            </a>
            <div class="product-hover-block" @click="$root.$refs.cart.addProduct(product)">КУПИТЬ</div>
        </div>    
    `,
});