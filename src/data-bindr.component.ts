import { Flatten } from "./utils/flatten";

export class DataBindr extends HTMLElement {
  private _state = {};
  private _fl = new Flatten();
  get state() {
    return this._state;
  }

  set state(newState: any) {
    this._state = { ...this._state, ...newState };
    const bindings = this._fl.flatten(newState);
    this._updateBindings(bindings);
  }

  constructor() {
    super();
  }

  private _updateBindings(bindings: { [key: string]: string }) {
    Object.keys(bindings).forEach(key => {
      let el = this._selectNode(key);
      if (el) {
        el.textContent = bindings[key];
      }
    });
  }

  private _selectNode(key: string): HTMLElement {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(`[data-bind="${key}"]`)
      : this.querySelector(`[data-bind="${key}"]`);
  }
}
