
import { DataBindr } from 'https://unpkg.com/@stefannhs/databindr@0.0.1/dist/index.es.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .card {
        font-family: Arial, Helvetica, sans-serif;
        width: 300px;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        padding: 25px;
        margin: 25px 0;

        text-align: center;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      }
    </style>
    <div class="card">
        <h3 class="name"><span data-bind="firstname"></span> <span data-bind="lastname"></span></h3>
        <div>
        <strong>Address</strong><br/>
        <span data-bind="address.street"></span><br/>
        <span data-bind="address.city"></span>, <span data-bind="address.country"></span>
        </div>
`;

export class CardComponent extends DataBindr {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('my-business-card', CardComponent);
