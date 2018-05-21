# dom-to-point

[![Build Status](https://travis-ci.org/albinotonnina/dom-to-points.svg?branch=master)](https://travis-ci.org/albinotonnina/dom-to-points)
[![Greenkeeper badge](https://badges.greenkeeper.io/albinotonnina/dom-to-points.svg)](https://greenkeeper.io/)

## Q:What is this thing solving?

If you want to get an SVG like the red thing below

![](https://img.ziggi.org/h731a3oG.jpg)

## Install

```
yarn add dom-to-points // Package size: 640 B
```

## Usage

```javascript
import {getPolygonString} from 'dom-to-points'
// or const {getPointsArray, getPolygonString} = require('dom-to-points')

const points = getPolygonString('.item')
// or const points = getPolygonString([...document.querySelectorAll('.item')])

console.log('polygonString', points)

/*
0,0 300,0 300,100 0,100 0,100 200,100 200,200 0,200 0,200 200,200 200,300 0,300 0,300 300,300 300,400 0,400 0,400 0,300 0,300 0,200 0,200 0,100 0,100 0,0
*/
```

```javascript
const points = getPointsArray('.item')
// or const points = getPointsArray([...document.querySelectorAll('.item')])

console.log('points', points)

/*
[ 
    [ 0, 0 ],
    [ 300, 0 ],
    [ 300, 100 ],
    [ 0, 100 ],
    [ 0, 100 ],
    [ 200, 100 ],
    [ 200, 200 ],
    [ 0, 200 ],
    [ 0, 200 ],
    [ 200, 200 ],
    [ 200, 300 ],
    [ 0, 300 ],
    [ 0, 300 ],
    [ 300, 300 ],
    [ 300, 400 ],
    [ 0, 400 ],
    [ 0, 400 ],
    [ 0, 300 ],
    [ 0, 300 ],
    [ 0, 200 ],
    [ 0, 200 ],
    [ 0, 100 ],
    [ 0, 100 ],
    [ 0, 0 ] 
]
*/
```

## Q: What then?

You could make a polygon with the data and add it to an SVG.

You could use a library, such as [SVG.js](http://svgjs.com/elements/#polyline-constructor) or [paper.js](http://paperjs.org)

Check this [jsfiddle demo](https://jsfiddle.net/albinotonnina/paoqv2c3/).

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs accepted.

## License

MIT © 2018 Albino Tonnina
