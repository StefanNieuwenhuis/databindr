import { DataBindrState } from './data-bindr.model';

export class DataBindr extends HTMLElement {
  private _state: DataBindrState = {};

  get state() {
    return this._state;
  }

  set state(newState: any) {
    if (!this._isEqual(this.state, { ...this.state, ...newState })) {
      this._generateBindings(newState);
      this._updateBindings();
    }
  }

  constructor() {
    super();
  }

  /**
   * Traverses through all keys of provided object to generate a bindings path
   * 
   * @prop keys - a subset of a state
   * @prop root - the root key of a path
   */
  private _traverseBindings(keys, root): void {
    Object.keys(keys).forEach(key => {
      typeof keys[key] === 'string'
        ? this._state = { ...this._state, ...{ [`${root}.${key}`]: keys[key] } }
        : this._traverseBindings(keys[key], key);
    });
  }

  /** 
   * Generates bindings and updates the state
   * @prop state - any new state object
   */
  private _generateBindings(state: any): void {
    Object.keys(state).forEach(key => {
      // skip if state[key] is equal to the new state
      if (this.state[key] === state[key]) {
        return;
      }

      // if state[key] is an object: generate a binding from the path
      // else: add state[key] to the state
      typeof state[key] === 'object'
        ? this._traverseBindings(state[key], key)
        : this._state[key] = state[key];
    });
  }

  /**
   * Loop through all bindings in the state
   * Find the corresponding node
   * Update its textContent
   */
  private _updateBindings(): void {
    Object.keys(this.state).forEach(binding => {
      const el = this._selectNode(binding);
      if (el) {
        el.textContent = this.state[binding];
      }
    });
  }

  /**
   * Selects the node in either shadow or regular DOM
   * @param binding - key to select a node with
   * 
   */
  private _selectNode(binding: string): HTMLElement {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(`[data-bind='${binding}']`)
      : this.querySelector(`[data-bind='${binding}']`);
  }

  /**
   * Checks if two objects are exactly the same
   * @param a - the first object
   * @param b - the second object
   * @returns - if two objects are exactly the same or not
   */
  private _isEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}