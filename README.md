# Vue Simplebar
Vue.js wrapper for simplebar

# Why would you use it ?
First, because custom scrollbars can be very frustrating and you want to add [simplebar](https://github.com/Grsmto/simplebar) to your Vue project in an easy way, with the bonus of having some useful scroll events and helper methods out of the box.

# Install
## npm

```sh
npm install vue-simplebar
```

## yarn

```sh
yarn add vue-simplebar
```

# How to use

## Global Registration

You can import and register the plugin in the entry point of your application like so:
```js
import VueSimplebar from 'vue-simplebar'
import 'vue-simplebar/dist/vue-simplebar.min.css'

Vue.use(VueSimplebar)
```

Then use it like any other component:

```html
<vue-simplebar>
    <p> Your scrollable content goes here </p>
</vue-simplebar>
```

### Global options

Install method takes additional parameters:

#### `name {String}`
Name of your global component.

**Default**: `VueSimplebar`

#### `tag {String}`
Tag which will be render as simplebar container

**Default**: `section`

#### `options {Object}`: [Options](https://github.com/Grsmto/simplebar#options)
simplebar options.

**Default**: `{}`

## Local Registration

```html
<template>
    <vue-simplebar>
        <p> Your scrollable content goes here. </p>
    </vue-simplebar>
</template>

<script>
import { VueSimplebar } from 'vue-simplebar'
export default {
    components: { VueSimplebar }
}
</script>
<style src="vue-simplebar/dist/vue-simplebar.min.css"/>
```

# Props

#### `tag {String}`
Tag which will be render as simplebar container

**Default**: `section`

#### `options {Object}`: [Options](https://github.com/Grsmto/simplebar#options)
simplebar options.

# Events

This wrapper comes with some event helpers.

### `scroll-x-reach-start`

This event fires when scrolling reaches the start of the x-axis.

### `scroll-x-reach-end`

This event fires when scrolling reaches the end of the x-axis.

```
<vue-simplebar @scroll-x-reach-start="" @scroll-x-reach-end="">
    <p> Your scrollable content goes here. </p>
</vue-simplebar>
```

### `scroll-y-reach-start`

This event fires when scrolling reaches the start of the y-axis (useful for
a chat like pagination).

### `scroll-y-reach-end`

This event fires when scrolling reaches the end of the y-axis (useful for
infinite scroll).

```
<vue-simplebar @scroll-y-reach-start="" @scroll-y-reach-end="">
    <p> Your scrollable content goes here. </p>
</vue-simplebar>
```

# Contribution

If you have any reasonable PR you are welcome.

# License

[MIT](http://opensource.org/licenses/MIT)
