// store html binder in a short variable
const htmlBinder = Seemple.binders.html;

// create a class that inherits Seemple
class Application extends Seemple {
    constructor() {
        super();

        // bind the property x and the text field
        this.bindNode('x', '.my-input');

        // bind the property x and the ".my-output" block
        this.bindNode('x', '.my-output', htmlBinder());

        // if the property "х" has changed,
        // inform about it in the console
        this.on('change:x', () =>
            console.log(`x is changed to "${this.x}"`)); // eslint-disable-line no-console
    }
}

const app = new Application();

app.x = 'Hello World!';
