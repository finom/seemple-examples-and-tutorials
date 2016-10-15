# A collection of binder examples

## CodeMirror

Initializes a binding of [CodeMirror editor](http://codemirror.net/).

```js
const codeMirror = () => ({
    on(callback) {
        this.CodeMirror.on('change', callback);
    },
    getValue() {
        return this.CodeMirror.getValue();
    },
    setValue(value) {
        this.CodeMirror.setValue(value);
    },
    initialize() {
        CodeMirror.fromTextArea(this, {
            lineNumbers: true
        });
    }
});

// usage
this.bindNode('code', 'textarea', codeMirror());
```
                
