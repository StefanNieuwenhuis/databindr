import { Binding } from './data-bindr.model';

export class DataBindr extends HTMLElement {
  private bindrState: Binding = {};

  get state(): Binding {
    return this.bindrState;
  }

  set state(newState: Binding) {
    if (!this.isEqual(this.bindrState, { ...this.bindrState, ...newState })) {
      this.generateBindings(newState);
      this.updateBindings();
    }
  }

  /**
   * Traverses through all keys of provided object to generate a bindings path
   *
   * @prop keys - a subset of a state
   * @prop root - the root key of a path
   */
  private traverseBindings(keys: Binding, root: string): void {
    Object.keys(keys).forEach(key => {
      if (typeof keys[key] === 'string') {
        this.bindrState = { ...this.bindrState, ...{ [`${root}.${key}`]: keys[key] } };
      } else {
        this.traverseBindings(keys[key] as Binding, key);
      }
    });
  }

  /**
   * Generates bindings and updates the state
   * @prop state - any new state object
   */
  private generateBindings(state: Binding): void {
    Object.keys(state).forEach(key => {
      // skip if state[key] is equal to the new state
      if (this.bindrState[key] === state[key]) {
        return;
      }

      // if state[key] is an object: generate a binding from the path
      // else: add state[key] to the state
      if (typeof state[key] === 'object') {
        this.traverseBindings(state[key] as Binding, key);
      } else {
        this.bindrState[key] = state[key] as string;
      }
    });
  }

  /**
   * Loop through all bindings in the state
   * Find the corresponding node
   * Update its textContent
   */
  private updateBindings(): void {
    Object.keys(this.bindrState).forEach(binding => {
      const el = this.selectNode(binding);
      if (el) {
        el.textContent = this.bindrState[binding] as string;
      }
    });
  }

  /**
   * Selects the node in either shadow or regular DOM
   * @param binding - key to select a node with
   *
   */
  private selectNode(binding: string): HTMLElement {
    if (this.shadowRoot) {
      return this.shadowRoot.querySelector(`[data-bind='${binding}']`);
    }

    return this.querySelector(`[data-bind='${binding}']`);
  }

  /**
   * Checks if two objects are exactly the same
   * @param a - the first object
   * @param b - the second object
   * @returns - if two objects are exactly the same or not
   */
  private isEqual = (a: object, b: object): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
}
