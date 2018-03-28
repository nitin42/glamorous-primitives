# glamorous-primitives 💄
[![Build Status](https://travis-ci.org/nitin42/glamorous-primitives.svg?branch=master)](https://travis-ci.org/nitin42/glamorous-primitives)

> style primitive React interfaces with glamorous

## Table of contents
* [Problem](#problem)
* [Solution](#solution)
* [Install](#install)
* [Examples](#examples)
* [Demo](#demo)
* [Documentation](#documentation)
* [More](#whats-more-)
* [Caveats](#caveats)
* [Resources](#resources)

## Problem
You cannot use [glamorous](https://github.com/paypal/glamorous) together with [react-primitives](https://github.com/lelandrichardson/react-primitives) to style the components.

## Solution
Combine glamorous with react-primitives by removing implicit dependencies to render the same code across the targets.

> Use this package **only** when you want to share the same code across multiple platforms. If you're looking to style the components for a specific platform use [glamorous-native](https://github.com/robinpowered/glamorous-native) for React Native or [glamorous](https://github.com/paypal/glamorous) for React

## Install

```
npm install glamorous-primitives --save
```

This also depends on `react` and `react-primitives`. Make sure you have them installed.

## Examples

You can find all the examples [here](./examples).

## Demo

**Code**
<p align="center">
  <img src="https://i.gyazo.com/8ccdfa06be2546370ab40e8851bcc518.png" />
</p>

**Renders on Sketch, Web and Mobile**
<p align="center">
  <img src="http://g.recordit.co/459MOJ19X4.gif" />
</p>


## Documentation

There are no breaking changes in `glamorous-primitives` except for [one thing](#caveats) which means you can do everything you used to do with `glamorous` and `glamorous-native` 😄

## What's more ?
I am working on 👇🏼

- [ ] className as prop using babel transform 
- [ ] css prop (like glamorous)

## Caveats
`glamorous-primitives` does not export the "tiny" version of glamorous like glamorous and glamorous-native. 

## Resources
Below is the list of resources where you can learn more about primitive interfaces, rendering process across multiple platform and styling the components
* [react-primitives](https://github.com/lelandrichardson/react-primitives)
* [react-native-web](https://github.com/necolas/react-native-web)
* [react-sketchapp](https://github.com/airbnb/react-sketchapp)

## License 
MIT
