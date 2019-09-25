Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
          totalPrice: 0,
          totalQuantity: 0,
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
                this.$parent.postJson('/api/cart', prod).then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                });
            }

            this.totalPrice += product.price;
        },

        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {if (data.result === 1) this.cartItems.splice(this.cartItems.indexOf(item), 1);});
            }

            this.totalPrice -= item.price;
        },
    },

    mounted(){
        this.$parent.getJson('/api/cart').then(data => {
            for (let el of data.contents) {
                this.cartItems.push(el);
            }
            this.totalPrice = data.amount;
        })
    },

    template: `<div class="cart-icon">
					<img src="img/cart.svg" alt="cart icon" @click="showCart = !showCart">
                    <div class="cart-icon__modal" v-show="showCart">
                    <p v-if="!cartItems.length" class="cart-attention">Корзина пуста</p>
                    <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove"></cart-item>
                    <div class="cart-icon__price">
							<p>TOTAL</p>
							<p>{{totalPrice}} $</p>
						</div>
						<a href="checkout.html" class="cart-icon__btn cart-icon__btn-active">Checkout</a>
						<a href="cart.html" class="cart-icon__btn">Go to cart</a>
                    </div>
				</div>`,
});

Vue.component('cart-item', {
   props: ['cartItem', 'img'],
   template: `<div class="cart-icon__items">
                <img :src="cartItem.image" class="cart-image" alt="product">
                <div class="cart-icon__items-info">
                    <div class="cart-icon__items-info-row cart-icon__items-name"><a href="page.html" class="cart-icon__items-a">{{cartItem.product_name}}</a></div>
                    <div class="cart-icon__items-info-row cart-icon__rank">
                    <img src="img/products/icons/stars.png" alt="rank">
                    <i class="fa fa-times-circle cart-icon__close" aria-hidden="true" @click="$emit('remove', cartItem)"></i>
                    </div>
                    <div class="cart-icon__items-info-row cart-icon__items-price">{{cartItem.quantity}} x {{cartItem.price}} $</div>
                </div>
             </div>`,
});