window.app = new Class({
	'extends': MK,
	constructor: function() {
		this
			.set('source', localStorage.mdSource || '# Hey')
			.bindNode('source', '.source')
			.bindNode('result', '.result', MK.binders.html())
			.onDebounce('change:source', function() {
				localStorage.mdSource = this.source;
				this.result = marked(this.source);
			}, 300, true);
	}
});