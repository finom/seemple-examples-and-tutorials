"use strict";

var Phones = Class({
	'extends': MK.Array,
	Model: Phone,
	itemRenderer: '#phone-template',
	constructor: function(data, app) {
		this
			.set({
				sortDir: -1,
				sortBy: null
			})
			.bindNode({
				sandbox: app.select('.result-container'),
				container: ':sandbox .result',
				search: ':sandbox .search',
				searchList: ':sandbox #search-list'
			})
			.on({
				'click::([data-sort])': function(evt) {
					var sortBy = evt.target.dataset.sort,
						sortDir = this.sortBy == sortBy ? -this.sortDir : -1;

					this.sort(function(a, b) {
						return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? -sortDir : sortDir;
					});

					this.sortDir = sortDir;
					this.sortBy = sortBy;
				},
				'modify *@modify': function() {
					var searchList = this.nodes.searchList;
					searchList.innerHTML = '';
					this.forEach(function(item) {
						item.each(function(value, key) {
							searchList.appendChild(MK.extend(document.createElement('option'), {
								value: value,
								innerHTML: value
							}))
						});
					});
				},
				'change:search modify *@modify': function() {
					var search = this.search.toLowerCase();
					this.forEach(function(item) {
						var include = false;
						item.each(function(value) {
							if(~value.toLowerCase().indexOf(search)) {
								include = true;
							}

						});
						item.visible = include;
					});
				}
			})
			.recreate(data);
	}
});
