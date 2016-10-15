# A collection of binder examples

## CodeMirror

```js
{
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
}
```
                
