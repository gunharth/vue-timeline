import list from '../data.json';
import moment from 'moment';
window.Vue = require('vue');

// json field settings
const timelineDate = 'started_at';
const timelineCategory = 'cat';

// sort the json list data by timelineDate DESC
function custom_sort(a, b) {
    return new Date(b[timelineDate]).getTime() - new Date(a[timelineDate]).getTime();
}
list.sort(custom_sort);

const app = new Vue({
    el: '#app',
    data: {
        list: list,
        items: [],
        selected: '',
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
        this.options = [{ 'text': 'All categories (' + allItems + ')', 'value': '' }];

        // calculate all items per category
        var count = {};
        for (var i = 0, j = this.items.length; i < j; i++) {
            count[this.items[i][timelineCategory]] = (count[this.items[i][timelineCategory]] || 0) + 1;
        }
        // build all select options from items
        var optionsFromList = this.items.filter(function (item, index, self) {
            return index === self.findIndex((i) => (
                i[timelineCategory] === item[timelineCategory]
            ))
        }).map(function (item) {
            var option = {};
            option.text = item[timelineCategory] + ' (' + count[item[timelineCategory]] + ')';
            option.value = item[timelineCategory];
            option.count = count[item[timelineCategory]];
            return option;
        });

        // sort categories by item count DESC
        function sort_categories(a, b) {
            return b.count - a.count;
        }
        optionsFromList.sort(sort_categories);

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
                return item[timelineCategory].match(reg)
            })
            this.yearFilter();
        },
        // set item data and filter items to display the year prominently
        yearFilter: function (sort) {
            var current;
            var i = 0;
            this.items = this.items.filter(function (item) {
                item.showYear = false;
                item.year = moment(item[timelineDate]).format('YYYY');
                item.month = moment(item[timelineDate]).format('MMMM');
                if (i == 0) {
                    current = item.year;
                    item.showYear = true;
                }
                if (current != item.year) {
                    item.showYear = true;
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
