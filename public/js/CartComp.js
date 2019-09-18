Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,

      }
    },

    methods: {

    },

    mounted(){
        this.$parent.getJson('/api/cart').then(data => {
            for (let el of data.contents) {
                this.cartItems.push(el);
            }
        })
    },

    template: `<div class="cart-icon__modal"><cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="imgCart"></cart-item></div>`,
});

Vue.component('cart-item', {
   props: ['cartItem', 'img'],
   template: `<div class="cart-icon__items">
                <img src="img/products/cart/product25.jpg" alt="product">
                <div class="cart-icon__items-info">
                    <div class="cart-icon__items-info-row cart-icon__items-name"><a href="page.html" class="cart-icon__items-a">Rebox Zane</a></div>
                    <div class="cart-icon__items-info-row cart-icon__rank"><img src="img/products/icons/stars.png" alt="rank"><i class="fa fa-times-circle cart-icon__close" aria-hidden="true"></i></div>
                    <div class="cart-icon__items-info-row cart-icon__items-price">1  x   $250</div>
                </div>
             </div>`,
});