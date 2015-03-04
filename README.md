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
    * [x] smaller 'balls' when zoom past a certain level
* [-] -- pseudo-clip rendering --
* [x] panning via drag
    * [x] initially show 10 years?
    * [ ] and with arrows
* [x] zooming
* [ ] draggable goals?
* [x] put mouse near line to see number in a tool thing
* [x] adjust to window size

* [x] Browserify

* [ ] move main.js into html. Browserify should only build a lib, not call it as well
    * [ ] Two browserify builds - one builds a lib, one builds an app including that lib

* [ ] Change to gulp

* [ ] Move to event-bus based callbacks from viswin, not panAndZoom calling out to all renderers
* [ ] Introduce karma/jasmine
    * [ ] Write some tests
* [ ] Greater use of templates

* [ ] Split into SVG and 'the drawer'
* [ ] Connect to real data service
