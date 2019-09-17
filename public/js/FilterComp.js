Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },

    template: `<form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                    <label for="search"></label>
                    <input type="text" name="search" placeholder="Search for item..." id="search" v-model="userSearch">
                    <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                </form>`
});