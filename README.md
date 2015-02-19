Chart proto
======

```shell

# start in production mode
npm start

# start in dev mode (and watch for changes)
grunt start-dev

# just build
grunt build

```

TODO
====

* [x] load data in sensible format
* [x] render axes
    * [x] years and minor ticks
* [x] render median
* [ ]   render median in model space
* [x] render other percentiles
* [ ]   in model space
* [ ] render goals
    * [x] group goals by id on load
    * [ ]   two sizes depending on zoom
* [ ] ---pseudo-clip rendering---
* [x] panning via drag
    * [x] initially show 10 years?
    * [ ] and with arrows
* [x] zooming
* [ ] draggable goals?

* [ ] Split into SVG and 'the drawer'
