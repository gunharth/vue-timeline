window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    data: {
        list: [
            { year: '2018', title: 'Foo 2017', cat: 'Web Sites' },
            { year: '2017', title: 'Foo2 2017', cat: 'Web Applications' },
            { year: '2017', title: 'Foo3 2016', cat: 'Web Sites' },
            { year: '2017', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2017', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2016', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2016', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2015', title: 'Foo4 2016', cat: 'Web Applications' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
            { year: '2014', title: 'Foo4 2016', cat: 'Music Projects' },
        ],
        items: '',
        selected: '',
        options: [
            { 'text': 'All projects', 'value': '' }
        ]
    },
    created: function () {
        window.addEventListener('scroll', this.renderItems);
    },
    mounted: function () {
        this.items = this.list;

        var optionsFromList = this.items.filter(function (item, index, self) {
            return index === self.findIndex((i) => (
                i.cat === item.cat
            ))
        }).map(function (item) {
            var option = {};
            option.text = item.cat;
            option.value = item.cat.trim();
            return option;
        });
        Array.prototype.push.apply(this.options, optionsFromList);

        this.yearFilter();
    },
    watch: {
        selected: function (selected) {
            this.itemsFilter(selected);
        }
    },
    updated: function () {
        this.$nextTick(function () {
            this.hideItemsBeforeRender();
            this.renderItems();
        })
    },
    methods: {
        itemsFilter: function (sort) {
            this.items = this.list;

            this.items = this.items.filter(function (item) {
                var re = new RegExp(sort, 'g');
                return item.cat.match(re)
            })
            this.yearFilter();
        },
        yearFilter: function (sort) {
            var current;
            var i = 0;
            this.items = this.items.filter(function (item) {
                item.yearshow = false;
                if (i == 0) {
                    current = item.year;
                    item.yearshow = true;
                }
                if (current != item.year) {
                    item.yearshow = true;
                    current = item.year;
                }
                i++;
                return item;
            })
        },
        isElementInViewport: function (el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        hideItemsBeforeRender: function () {
            var items = this.$el.querySelectorAll(".timeline li");
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove("in-view");
            }
        },
        renderItems: function () {
            var items = this.$el.querySelectorAll(".timeline li");
            setTimeout(() => {
                for (var i = 0; i < items.length; i++) {
                    if (this.isElementInViewport(items[i])) {
                        items[i].classList.add("in-view");
                    }
                }
            }, 500);
        }
    }
})
