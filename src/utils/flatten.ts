export class Flatten {
  private _result: any = {};
  private _recurse(cur: any, prop: string) {
    if (this._isObject(cur)) {
      let isEmpty = true;
      for (let p in cur) {
        isEmpty = false;
        this._recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) {
        this._result[prop] = {};
      }
    } else {
      this._result[prop] = cur;
    }
  }

  private _isObject(object: any): boolean {
    return Object.prototype.toString.call(object).indexOf("Object") > -1;
  }

  public flatten(data: any): { [key: string]: string } {
    this._recurse(data, "");
    return this._result;
  }
}
