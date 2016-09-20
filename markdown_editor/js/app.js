window.app = new class Application extends Matreshka {
	constructor() {
		super()
			.set('source', localStorage.mdSource || '# Hey')
			.bindNode({
				source: '.source',
				result: {
					node: '.result',
					binder: Matreshka.binders.html()
				}
			})
			.calc('result', 'source', marked, { debounceCalcDelay: 300 })
			.on('change:result', () => {
				localStorage.mdSource = this.source;
			});
	}
}
