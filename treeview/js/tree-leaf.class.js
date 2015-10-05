var TreeLeaf = Class({
	'extends': MK.Object,
	constructor: function(data) {
		this.set(data)
			.addDataKeys('subTree label expanded')
			.setClassFor('subTree', Tree)
			.linkProps('length', [this.subTree, 'length'])
			.on('click::expandBtn', function(evt) {
				this.expanded = !this.expanded;
			});
	},

	onRender: function() {
		this
			.bindNode('removeBtn', ':sandbox .remove')
			.bindNode('expandBtn', ':sandbox .expand')
			.bindNode('label', ':sandbox .label', MK.binders.text())
			.bindNode('expanded', ':sandbox', MK.binders.className('!closed'))
			.bindNode('length', ':sandbox', MK.binders.className('vtree-has-children'));
	}
});