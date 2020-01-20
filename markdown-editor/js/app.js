/* global marked */
class Application extends Seemple {
    constructor() {
        super();
        this.set('source', localStorage.mdSource || '# Hey')
            .bindNode({
                source: '.source',
                result: {
                    node: '.result',
                    binder: Seemple.binders.html()
                }
            })
            .calc('result', 'source', marked, { debounceCalcDelay: 300 })
            .on('change:result', () => {
                localStorage.mdSource = this.source;
            });
    }
}

window.app = new Application();
