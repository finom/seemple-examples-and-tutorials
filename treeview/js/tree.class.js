class Tree extends Matreshka.Array {
	get Model() {
		return TreeLeaf;
	}

	get itemRenderer() {
		return '#item-template';
	}

	constructor(data = [], top) {
		super(...data);

		if (top) {
			top.on('render', evt => this.init(top.$('.wrapper')));
		} else {
			this.init('.wrapper');
		}

		this
			.on({
				'modify *@modify': () => {
					if(this.initialized) {
						app.save();
					}
				},
				'*@click::removeBtn': evt => this.pull(evt.self),
				'click::addBtn': evt => this.push({
					label: 'New Item',
					expanded: true
				})
			});
	}

	init(sandbox) {
		this.bindNode({
			sandbox,
			addBtn: ':sandbox .add',
			container: ':sandbox .list'
		})
		.rerender()
		.set('initialized', true);
}

	save() {
		localStorage.tree = JSON.stringify(this);
	}
}
