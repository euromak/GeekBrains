Vue.component('productInfo', {
   data(){
       return {
            product: [],
       }
   },

    methods: {
        addProduct(product){
            console.log(product);
            let find = this.$root.$refs.cart.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod).then(data => {
                    if (data.result === 1) {
                        this.$root.$refs.cart.cartItems.push(prod);
                    }
                });
            }

            this.$root.$refs.cart.totalPrice += product.price;
            this.$root.$refs.cart.totalQuantity++;
        },
    },

    created(){
       this.product.push(JSON.parse(localStorage.getItem('product')));
       //localStorage.clear();
    },

   template: `
     		<div class="product-info">
			<div class="product-info__foto">
				<div class="video-wrap">
					<video src="video.mp4" autoplay loop muted preload="auto" class="video" ></video>
				</div>
				<div class="product-info__foto__nav__left">
					<i class="fa fa-chevron-left" aria-hidden="true"></i>
				</div>
				<div class="product-info__foto__nav__right">
					<i class="fa fa-chevron-right" aria-hidden="true"></i>
				</div>
			</div>
			<div class="product-info__description container">
				<div class="product-category">WOMEN COLLECTION</div>
				<div class="product-heading">{{product[product.length-1].product_name}}</div>
				<div class="product-description">Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals. </div>
				<div class="product-param">
					<div><span class="product-param__text">MATERIAL:</span> COTTON</div>
					<div><span class="product-param__text">DESIGNER:</span> BINBURHAN</div>
				</div>
				<div class="product-price">{{product[product.length-1].price}} $</div>
				<hr class="product-line">
				<form action="#" class="single-product-form">
					<fieldset>
						<label for="color">CHOOSE COLOR</label>
						<select name="color" id="color">
							<option value="red">Red</option>
							<option value="green">Green</option>
							<option value="blue">Blue</option>
						</select>
					</fieldset>
					<fieldset>
						<label for="size">CHOOSE SIZE</label>
						<select name="size" id="size">
							<option value="xl">Xl</option>
							<option value="l">L</option>
							<option value="m">M</option>
						</select>
					</fieldset>
					<fieldset>
						<label for="quantity">QUANTITY</label>
						<input type="number" name="quantity" id="quantity" min="0" max="10" value="1">
					</fieldset>
					<button class="single-product-form-btn" @click.prevent="addProduct(product[0])"><img src="img/cart1.svg" alt="cart">Add to Cart</button>
				</form>
			</div>
			<div class="product-info__related-products container">
				<h2>you may like also</h2>
				<div class="single-products-grid">
					<div class="single-products-grid__item">
						<a href="page.html">
							<img src="img/products/related/related_01.jpg" class="single-products-grid__item-image" alt="related_product">
							<div class="single-products-grid__item-name">BLAZE LEGGINGS</div>
							<div class="single-products-grid__item-price">$52.00</div>
						</a>
					</div>
					<div class="single-products-grid__item">
						<a href="page.html">
							<img src="img/products/related/related_02.jpg" class="single-products-grid__item-image" alt="related_product2">
							<div class="single-products-grid__item-name">ALEXA SWEATER</div>
							<div class="single-products-grid__item-price">$52.00</div>
						</a>
					</div>
					<div class="single-products-grid__item">
						<a href="page.html">
							<img src="img/products/related/related_03.jpg" class="single-products-grid__item-image" alt="related_product3">
							<div class="single-products-grid__item-name">AGNES TOP</div>
							<div class="single-products-grid__item-price">$52.00</div>
						</a>
					</div>
					<div class="single-products-grid__item">
						<a href="page.html">
							<img src="img/products/related/related_04.jpg" alt="related_product4" class="single-products-grid__item-image">
							<div class="single-products-grid__item-name">SYLVA SWEATER</div>
							<div class="single-products-grid__item-price">$52.00</div>
						</a>
					</div>
				</div>
			</div>
		</div>
   `,
});