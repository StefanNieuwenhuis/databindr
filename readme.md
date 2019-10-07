# DataBindr
Enables simple data binding for Web Components by providing a base class. 

> By [@stefannhs](//twitter.com/stefannhs)

## Installation
```html
# unpkg
<script nomodule src="https://unpkg.com/@stefannhs/databindr@latest/dist/index.js"></script>
```

```bash
# npm
npm i @stefannhs/databindr
```

```bash
# yarn
yarn add @stefannhs/databindr
```

## Basic usage
1. Create a Web Component
2. Extend `DataBindr` in stead of `CustomElement`
3. Define a `state` object
4. Assign it to the component through the `data-bind` attribute

```js
// Step 1 & 2: Create a Custom Element with template
const template = document.createElement('template');
// Notice the data-bind attribute in the template's innerHTML 
// This means that state.greeting is bound to this element
template.innerHTML = `<h1 data-bind="greeting"></h1>`;

// Notice that GreeterComponent extends DataBindr in stead of CustomElement
class GreeterComponent extends DataBindr {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('my-greeter', GreeterComponent);

// Create a new instance of my-greeter
const myGreeterComponent = document.createElement('my-greeter');
// Define a state by assigning a key/value pair to the component.
// In this case myGreeterComponent.state.greeting contains the value Hello World
myGreeterComponent.state = {'greeting': 'Hello World!'};
```

## Browser support
The following browsers are supported natively:
* Chrome >= 54
* Firefox >= 63
* Safari >= 10.1

It's recommended for not natively supported browsers to use polyfills to optimally load Web Components. We recommend the use of [webcomponents.js polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).
