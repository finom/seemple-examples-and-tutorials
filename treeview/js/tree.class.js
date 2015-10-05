var Tree = Class({
	'extends': MK.Array,
	Model: TreeLeaf,
	itemRenderer: '#item-template',
	constructor: function(data, top) {
		this.recreate(data);
		
		if (top) {
			top.on('render', function(evt) {
				this.init(top.$('.wrapper'));
			}, this);
		} else {
			this.init('.wrapper');
		}
		
		this
			.on('modify *@modify', function() {
				if(this.initialized) {
					app.save();
				}
			})
			.on('*@click::removeBtn', function(evt) {
				this.pull(evt.self);
			})
			.on('click::addBtn', function(evt) {
				this.push({
					label: 'New Item'
				});
			});
	},
	init: function(sandbox) {
		this.bindNode('sandbox', sandbox)
			.bindNode('addBtn', ':sandbox .add')
			.bindNode('container', ':sandbox .list')
			.rerender()
			.set('initialized', true);
	},
	save: function() {
		localStorage.tree = JSON.stringify(this);
	}
});