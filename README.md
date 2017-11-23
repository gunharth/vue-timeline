# vue-timeline - wip

Demo: http://gunharth.io/vue-timeline/

Inspired by George Martsouko's article at [tuts+](https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528)-  Thank you!


For the json data file I used https://www.json-generator.com

```js
[
  '{{repeat(98, 100)}}',
  {
    started_at: '{{date(new Date(2000, 0, 1), new Date(), "YYYY-MM-dd")}}',
    title: '{{lorem(2, "words")}}',
    cat: '{{random("Category 1", "Category 2", "Category 3")}}'
  }
]
```

Todo: write more documentation
