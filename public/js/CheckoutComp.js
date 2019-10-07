Vue.component('checkoutCart', {
    data(){
        return {
            cartData: this.$root.$refs.cart.cartItems,
            showEmptyItemsText: true,
            totalPrice: 0,
            totalQuantity: 0,
        }
    },

    methods: {
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
                    .then(data => {if (data.result === 1) this.$root.$refs.cart.cartItems
                        .splice(this.$root.$refs.cart.cartItems.indexOf(item), 1);});
            }

            this.$root.$refs.cart.totalPrice -= item.price;
            this.$root.$refs.cart.totalQuantity--;
        },

        clean() {
          this.$parent.deleteJson('/api/cart/0', {quantity: 0}).then(data => {
              if(data.result === 1) {
                  let a = document.querySelectorAll('.cart__row');
                  a.forEach((item) => {
                     item.remove();
                  });
                  this.$root.$refs.cart.cartItems.length = 0;
                  this.$root.$refs.cart.totalPrice = 0;
                  this.$root.$refs.cart.totalQuantity = 0;
                  this.showEmptyItemsText = true;
              }

          })
        },
    },

    mounted(){
        this.$parent.getJson('/api/cart').then(data => {
            this.totalPrice = data.amount;
            this.totalQuantity = data.countGoods;
        })
    },

    updated() {
        if(this.$root.$refs.cart.cartItems.length > 0) {
            this.showEmptyItemsText = false;
        } else {
            this.showEmptyItemsText = true;
        }
    },

    template: `
    <section id="cart">
        <div class="cart container">
            <div class="cart-heading">
                <div class="cart__row__col-3">Product Details</div>
                <div class="cart__row__col-1">unite Price</div>
                <div class="cart__row__col-1">Quantity</div>
                <div class="cart__row__col-1">shipping</div>
                <div class="cart__row__col-1">Subtotal</div>
                <div class="cart__row__col-1">ACTION</div>
            </div>
            <div v-if="showEmptyItemsText" class="cart-empty-text">В ВАШЕЙ КОРЗИНЕ НЕТ ТОВАРОВ</div>
        <checkout-cart-item v-if="cartData" v-for="product of cartData" :key="product.id_product" :product="product" @remove="remove"></checkout-cart-item>
        </div>
        <div class="cart-button container">
            <div class="cart-button__left" @click="clean">CLEAR SHOPPING CART</div>
			<div class="cart-button__right"><a href="products.html" class="cart-button-link">CONTINUE SHOPPING</a></div>
        </div>
        <div class="cart-forms container">
            <form action="">
                <fieldset class="shipping-adress">
                    <legend class="shipping-adress__legend">Shipping Adress</legend>
					<label for="city"></label>
					<select name="city" id="city" class="shipping-adress__input">
                        <option value="bangladesh">Moscow</option>
                        <option value="novgorod">Novgorod</option>
                        <option value="omsk">Omsk</option>
                        <option value="dmitrov">Dmitrov</option>
                    </select>
					<label for="shipping"></label>
                    <input type="text" placeholder="State" class="shipping-adress__input" id="shipping">
					<label for="shippingAdres"></label>
                    <input type="text" placeholder="Postcode/Zip" class="shipping-adress__input" id="shippingAdres">
                    <button class="shipping-adress__btn">get a quote</button>
                </fieldset>
            </form>
            <form action="">
                <fieldset class="coupon">
                    <legend class="coupon__legend">coupon  discount</legend>
                    <label for="couponInput" class="coupon__label">Enter your coupon code if you have one</label>
                    <input type="text" placeholder="State" name="coupon-input" class="coupon__input" id="couponInput">
                    <button class="coupon__btn">Apply coupon</button>
                </fieldset>
            </form>
            <div class="cart-total-price">
                <p class="cart-total-price__p-up">Total quantity:<span class="p-up__span">
                {{this.$root.$refs.cart.totalQuantity}}</span></p>
                <p class="cart-total-price__p-bottom">GRAND TOTAL:<span class="p-bottom__span">
                {{this.$root.$refs.cart.totalPrice}} $</span></p>
                <div class="cart-total-price__hr"></div>
                <a href="checkout.html" class="cart-total-price__btn">proceed to checkout</a>
            </div>
        </div>
    </section>
`,
});

Vue.component('checkoutCartItem', {
    props: ['product'],

    template: `<div class="cart__row">
                <div class="cart__row__col-3">
                    <img :src="product.image" alt="product12" class="cart-image">
                    <div class="cart-product-text">
						<h3 class="cart-product-text__h3"><a href="page.html" class="cart-product-a">{{product.product_name}}</a></h3>
                        <p class="cart-product-text__p"><span class="cart-product-text__p-bold">Color:</span> Red</p>
                        <p class="cart-product-text__p"><span class="cart-product-text__p-bold">Size:</span> Xll</p>
                    </div>
                </div>
                <div class="cart__row__col-1 cart-item">{{product.price}} $</div>
                <div class="cart__row__col-1 cart-item-input">
                    <form action="#">
						<label for="cartItemNumber1"></label>
                        <input type="text" :placeholder="product.quantity" class="cart-item-number" id="cartItemNumber1">
                    </form>
                </div>
                <div class="cart__row__col-1 cart-item">FREE</div>
                <div class="cart__row__col-1 cart-item">{{product.price * product.quantity}}</div>
                <div class="cart__row__col-1 cart-item"><i class="fa fa-times-circle" aria-hidden="true" @click="$emit('remove', product)"></i></div>
            </div>`,
});