var vm;

function initFun () {
    vm = new Vue({
        el: '.container',
        data: {
            baseUrl: {
            }
        },

        created () {
           
        },

        methods: {
            goPage (url) {
                // window.location.href = `views/${url}.html`
            }
        }
    })
};
