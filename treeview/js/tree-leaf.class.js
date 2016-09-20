class TreeLeaf extends Matreshka.Object {
	constructor(data) {
		super()
			.set(data)
			.addDataKeys('subTree', 'label', 'expanded')
			.instantiate('subTree', Tree)
			.calc('subTreeLength', {
				object: this.subTree,
				key: 'length'
			})
			.on('click::expandBtn', function(evt) {
				this.expanded = !this.expanded;
			});
	}

	onRender() {
		this.bindNode({
			removeBtn: ':sandbox .remove',
			expandBtn: ':sandbox .expand',
			label: {
				node: ':sandbox .label',
				binder: Matreshka.binders.text()
			},
			expanded: {
				node: ':sandbox',
				binder: Matreshka.binders.className('closed', false)
			},
			subTreeLength: {
				node: ':sandbox',
				binder: Matreshka.binders.className('vtree-has-children')
			}
		});
	}
}
