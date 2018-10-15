Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="">
            </div>
            <div class="product-info">  
                <h1>{{ title }} </h1>
                <p v-if="inStock">In Stock</p>
                <p v-else class="outOfStock">Out of Stock</p>
                <p>Shipping: {{ shipping }} </p>

                <h2>Details</h2>
                <product-details :details="details"></product-details>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId" 
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)">
                </div>

                <h2>Sizes</h2>
                <ul>
                    <li v-for="size in sizes"> {{ size }} </li>
                </ul>
                <br>

                <div>
                        <button v-on:click="addToCart" 
                                :disabled="!inStock"
                                :class="{ disabledButton: !inStock }">Add to Cart</button>
                </div>                    
                
                <div>
                    <button @click="removeFromCart()">Remove from Cart</button>
                </div>
                <br>

            </div>
            <div>
                <product-review @review-submitted="addReview"></product-review>
            </div>
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name}} </p>
                    <p>{{ review.rating}} </p>
                    <p>{{ review.review}} </p>
                    </li>
                </ul>
            </div>

            <div class="onSale">
                <h2>On Sale!!! ({{ sale }})</h2>
            </div>
        </div>
    `,

    data () {
        return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
        {   
            variantId: 2234,
            variantColor: "green",
            variantImage: './assets/vmSocks-green.jpg',
            variantQuantity: 10
        },
        {
            variantId: 2235,
            variantColor: "blue",
            variantImage: './assets/vmSocks-blue.jpg',
            variantQuantity: 0
        }
        ],
        sizes: ["small","medium","large"],
        reviews: [],
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
    }},
    methods: {
        addToCart: function (event) {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
            this.variants[this.selectedVariant].variantQuantity -= 1
        },
        removeFromCart(){
            this.$emit('rm-from-cart',this.variants[this.selectedVariant].variantId)
            this.variants[this.selectedVariant].variantQuantity += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview (productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title () {
            return this.brand + ' ' + this.product
        },
        image () {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale () {
            return this.brand + ' ' + this.product
        },
        shipping () {
            if (this.premium) {
                return "Free"
            }
            else {
                return 2.99
            }
        }
    }
})

Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
  })

  Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `,
    data () {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit () {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted',productReview)
            this.name = null,
            this.review = null,
            this.rating = null
        }
    }

  })

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        pushCart (id) {
            this.cart.push(id)
        },
        popCart (id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                   break;
                }
            }
        }
    }
})