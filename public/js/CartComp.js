Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,

      }
    },

    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
    },

    mounted(){
        this.$parent.getJson('/api/cart').then(data => {
            for (let el of data.contents) {
                this.cartItems.push(el);
            }
        })
    },

    template: `<div class="cart-icon__modal"><cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item"></cart-item></div>`,
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