class Phones extends Matreshka.Array {
	get Model() {
		return Phone;
	}

	get itemRenderer() {
		return '#phone-template';
	}

	constructor(data, app) {
		super(...data)
			.set({
				order: {
					key: null,
					direction: null
				}
			})
			.bindNode({
				sandbox: app.select('.result-container'),
				container: ':sandbox .result',
				search: ':sandbox .search',
				searchList: ':sandbox #search-list'
			})
			.bindNode('order', '[data-sort]', {
				on: 'click',
				getValue({ previousValue }) {
					const dataSort = this.dataset.sort;
					const newOrder = { key: dataSort };

					if(previousValue.key === dataSort) {
						newOrder.direction = previousValue.direction === 'asc' ? 'desc' : 'asc';
					} else {
						newOrder.direction = 'asc';
					}

					return newOrder;
				}
 			})
			.bindNode('order', '[data-sort]', {
				setValue(v) {
					this.classList.remove('sort-asc', 'sort-desc');

					if(this.dataset.sort === v.key) {
						this.classList.add(`sort-${v.direction}`);
					}
				}
			})
			.on({
				'change:order': () => {
					const { order } = this;
					this.orderBy(order.key, order.direction);
				},
				'modify *@modify': function() {
					const { searchList } = this.nodes;
					searchList.innerHTML = '';

					for(const item of this) {
						for(const value of item) {
							const option = searchList.appendChild(document.createElement('option'));
							option.value = value;
							option.innerHTML = value;
						}
					}
				},
				'change:search modify *@modify': () => {
					const search = this.search.toLowerCase();
					for(const item of this) {
						let include = false;

						for(const value of item) {
							if(value.toLowerCase().includes(search)) {
								include = true;
								break;
							}
						}

						item.visible = include;
					}
				}
			})
			.recreate(data);
	}
}
