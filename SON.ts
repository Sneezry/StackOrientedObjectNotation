"use strict";

export class SON {
    array(arr: Array<any>): String {
        let stack = [];
        let length = arr.length;
    
        for (let i = 0; i < length; i++) {
            stack.push(this.stringify(arr[i]));
        }
    
        stack.push(`\\A${length}`);
        return stack.join(' ');
    }
    
    object(obj: any): String {
        let stack = [];
        let length = 0;
    
        for (let key in obj) {
            stack.push(this.stringify(obj[key]));
            stack.push(`"${key}"`);
            length++;
        }
    
        stack.push(`\\O${length}`);
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
        let stack = [];
    
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
        let stack = [];
        let _son = son.split(' ');
        let sonItems = [];

        for (let i = 0; i < _son.length; i++) {
            if (/^".*[^"]$/.test(_son[i])) {
                let _sonItem = [];
                while(!/^[^"].*"$/.test(_son[i])) {
                    _sonItem.push(_son[i++]);
                }
                _sonItem.push(_son[i]);
                sonItems.push(_sonItem.join(' '));
            } else {
                sonItems.push(_son[i])
            }
        }
        
        for (let i = 0; i < sonItems.length; i++) {
            let item = sonItems[i];
    
            if (/^\\A/i.test(item)) {
                let length = Number(item.match(/\\A(\d+)/i)[1]);
                let array = [];
                for (let _i = 0; _i < length; _i++) {
                    array.push(stack.pop());
                }
    
                stack.push(array);
            } else if (/^\\O/i.test(item)) {
                let length = Number(item.match(/\\O(\d+)/i)[1]);
                let object = {};
                for (let _i = 0; _i < length; _i++) {
                    let key = stack.pop().replace(/^"|"$/g, '');
                    let value = stack.pop();
                    if (typeof value === 'string') {
                        if (/^".*"$/.test(value)) {
                            object[key] = value.replace(/^"|"$/g, '');
                        } else if (value === 'True' || value === 'False') {
                            object[key] = value === 'True' ? true : false;
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