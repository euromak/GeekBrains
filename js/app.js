'use strict';

const app = new Vue({
    el: '#app',
    data: {
        productsDataURL: 'data.json',
        productsData: [],
    },

    methods: {
        getJSON(url) {
            return fetch(url).then(result => result.json()).catch(error => console.log(error));
        }
    },

    mounted() {
        this.getJSON(this.productsDataURL).then(data => console.log(data)).catch(error => console.log(error));
    }
});
