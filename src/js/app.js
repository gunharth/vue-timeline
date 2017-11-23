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
        numItems: 0,
        options: []
    },
    created: function () {
        // add window scroll listener
        window.addEventListener('scroll', this.renderItems);
    },
    mounted: function () {
        this.items = this.list;

        // calculate all items for options select
        var allItems = this.items.length;
        this.options = [{ 'text': 'All projects (' + allItems + ')', 'value': '' }];

        // calculate all items per category
        var count = {};
        for (var i = 0, j = this.items.length; i < j; i++) {
            count[this.items[i]['cat']] = (count[this.items[i]['cat']] || 0) + 1;
        }
        // build all select options from items
        var optionsFromList = this.items.filter(function (item, index, self) {
            return index === self.findIndex((i) => (
                i.cat === item.cat
            ))
        }).map(function (item) {
            var option = {};
            option.text = item.cat + ' (' + count[item.cat] + ')';
            option.value = item.cat;
            return option;
        });
        Array.prototype.push.apply(this.options, optionsFromList);

        // filter items to display the year
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
        // filter items by category
        itemsFilter: function (sort) {
            this.items = this.list;

            this.items = this.items.filter(function (item) {
                var reg = new RegExp(sort, 'g');
                return item.cat.match(reg)
            })
            this.yearFilter();
        },
        // filter items to display the year prominently
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
        // check if item is in viewport
        isElementInViewport: function (el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        // hide all items on category change
        hideItemsBeforeRender: function () {
            var items = this.$el.querySelectorAll(".timeline li");
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove("in-view");
            }
        },
        // dispay items
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
