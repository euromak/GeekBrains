Vue.component('checkoutCart', {
    data(){
        return {
            cartData: this.$root.$refs.cart.cartItems,
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

            this.totalPrice -= item.price;
            this.totalQuantity--;
        },
    },

    mounted() {
    },

    template: `        <div class="cart container">
            <div class="cart__row cart-heading">
                <div class="cart__row__col-3">Product Details</div>
                <div class="cart__row__col-1">unite Price</div>
                <div class="cart__row__col-1">Quantity</div>
                <div class="cart__row__col-1">shipping</div>
                <div class="cart__row__col-1">Subtotal</div>
                <div class="cart__row__col-1">ACTION</div>
            </div>
            <checkout-cart-item v-for="product of cartData" :key="product.id_product" :product="product" @remove="remove"></checkout-cart-item>
        </div>`,
});

Vue.component('checkoutCartItem', {
    props: ['product'],

    template: `<div class="cart__row cart__row-shadow">
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