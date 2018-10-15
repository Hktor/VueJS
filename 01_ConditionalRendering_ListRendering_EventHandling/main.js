var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        image: './assets/vmSocks-green.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester","Gender-neutral"],
        variants: [
        {   
            variantId: 2234,
            variantColor: "green",
            variantImage: './assets/vmSocks-green.jpg'
        },
        {
            variantId: 2235,
            variantColor: "blue",
            variantImage: './assets/vmSocks-blue.jpg'
        }
        ],
        sizes: ["small","medium","large"],
        cart: 0,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
    },
    methods: {
        addToCart: function (event) {
            this.cart += 1
        },
        removeFromCart(){
            if (this.cart > 0) {
                this.cart -= 1
            }   
        },
        updateProduct: function (variantImage) {
            this.image = variantImage
        }
    },
    computed: {
        title () {
            return this.brand + ' ' + this.product
        }
    }
})