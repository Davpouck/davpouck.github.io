class intProperty {

    constructor(int) {
        // invokes the setter
        this.int = int;
        this.listeners = []
    }
  
    get int() {
        return this._int;
    }
  
    set int(value) {
        if (value != this._int) {
            this.listeners.forEach((item) => {
                item.call(window, this._int, value)
            })
        }
        this._int = value;
    }

    addListener = function(fn) {
        this.listeners.push(fn)
    }

    removeListener = function(fn) {
        this.listeners = this.listeners.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    getProperty = function() {
        return this
    }
  
}