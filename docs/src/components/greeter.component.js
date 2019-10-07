
import { DataBindr } from 'https://unpkg.com/@stefannhs/databindr@0.0.1/dist/index.es.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .greeter {
        width: 300px;
        margin: 50px 0;
        background: #00bfb6;
        padding: 20px;
        text-align: center;
        font-weight: 900;
        color: #fff;
        font-family: arial;
        position:relative;
    }

    .greeter:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid #00bfb6;
        border-top: 10px solid #00bfb6;
        border-bottom: 10px solid transparent;
        right: 19px;
        bottom: -19px;
    } 
    </style>

    <div class="greeter">Hello <span data-bind="name"></span>👋🏻</div>
`;

export class GreeterComponent extends DataBindr {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('my-greeter', GreeterComponent);
