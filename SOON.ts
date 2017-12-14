"use strict";

export class SOON {
    array(arr: Array<any>): String {
        let stack: Array<any> = [];
        let length = arr.length;
    
        for (let i = 0; i < length; i++) {
            stack.push(this.stringify(arr[i]));
        }
    
        stack.push(`A${length}`);
        return stack.join(' ');
    }
    
    object(obj: any): String {
        let stack: Array<any> = [];
        let length = 0;
    
        for (let key in obj) {
            stack.push(this.stringify(obj[key]));
            stack.push(`"${key}"`);
            length++;
        }
    
        stack.push(`O${length}`);
        return stack.join(' ');
    }
    
    string(str: String): String {
        return `"${str}"`;
    }
    
    number(num: Number): String {
        return `${num}`;
    }
    
    boolean(bool: Boolean): String {
        return bool ? 'True' : 'False';
    }

    public stringify(obj: any): String {
        let stack: Array<any> = [];
    
        if (Array.isArray(obj)) {
            stack.push(this.array(obj));
        } else if (typeof obj === 'string') {
            stack.push(this.string(obj));
        } else if (typeof obj === 'number') {
            stack.push(this.number(obj));
        } else if (typeof obj === 'boolean') {
            stack.push(this.boolean(obj));
        } else if (obj === null || obj === undefined) {
            stack.push('Null');
        } else {
            stack.push(this.object(obj));
        }
    
        return stack.join(' ');
    }

    public parse(son: String): any {
        let stack: Array<any> = [];
        let _son = son.split(' ');
        let sonItems = [];

        for (let i = 0; i < _son.length; i++) {
            if (/^".*[^"]$/.test(_son[i]) || _son[i] === '"') {
                let _sonItem = [];
                do {
                    _sonItem.push(_son[i++]);
                } while(!/^[^"].*"$/.test(_son[i]) && _son[i] !== '"');
                _sonItem.push(_son[i]);
                sonItems.push(_sonItem.join(' '));
            } else {
                if (_son[i] === 'True') {
                    sonItems.push(true);
                } else if (_son[i] === 'False') {
                    sonItems.push(false);
                } else if (_son[i] === 'Null') {
                    sonItems.push(null);
                } else {
                    sonItems.push(_son[i])
                }
            }
        }
        
        for (let i = 0; i < sonItems.length; i++) {
            let item = sonItems[i];
    
            if (typeof item === 'string' && /^A/i.test(item)) {
                let matches = item.match(/A(\d+)/i);
                if (!matches || matches.length <= 0) {
                    throw new Error('Error: invalid array length.');
                }
                let length = Number(matches[1]);
                let array: Array<any> = [];
                for (let _i = 0; _i < length; _i++) {
                    if (stack.length === 0) {
                        throw new Error('Error: stack is empty.');
                    }
                    let value = stack.pop();
                    if (typeof value === 'string') {
                        if (/^".*"$/.test(value)) {
                            array.unshift(value.replace(/^"|"$/g, ''));
                        } else if (value === 'True' || value === 'False') {
                            array.unshift(value === 'True' ? true : false);
                        } else if (value === 'Null') {
                            array.unshift(null);
                        } else {
                            array.unshift(Number(value));
                        }
                    } else {
                        array.unshift(value);
                    }
                    
                }
    
                stack.push(array);
            } else if (typeof item === 'string' && /^O/i.test(item)) {
                let matches = item.match(/O(\d+)/i);
                if (!matches || matches.length <= 0) {
                    throw new Error('Error: invalid object length.');
                }
                let length = Number(matches[1]);
                let object: any = {};
                for (let _i = 0; _i < length; _i++) {
                    if (stack.length === 0) {
                        throw new Error('Error: stack is empty.');
                    }
                    let key = stack.pop().replace(/^"|"$/g, '');

                    if (stack.length === 0) {
                        throw new Error('Error: stack is empty.');
                    }
                    let value = stack.pop();
                    if (typeof value === 'string') {
                        if (/^".*"$/.test(value)) {
                            object[key] = value.replace(/^"|"$/g, '');
                        } else if (value === 'True' || value === 'False') {
                            object[key] = (value === 'True' ? true : false);
                        } else if (value === 'Null') {
                            object[key] = null;
                        } else {
                            object[key] = Number(value);
                        }
                    } else {
                        object[key] = value;
                    }
                }
    
                stack.push(object);
            } else {
                stack.push(item);
            }
        }
        
        return stack[0];
    }
}