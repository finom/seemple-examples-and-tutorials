// сохраняем html байндер в переменную с коротким именем
const htmlBinder = Matreshka.binders.html;

// создаём класс, который наследуется от Matreshka
class Application extends Matreshka {
    constructor() {
        super();

        // связываем свойство x и текстовое поле
        this.bindNode('x', '.my-input');

        // связываем свойство x и блок с классом my-output
        this.bindNode('x', '.my-output', htmlBinder());

        // слушаем изменения свойства x
        this.on('change:x', () =>
            console.log(`x изменен на "${this.x}"`));
    }
}

const app = new Application();
