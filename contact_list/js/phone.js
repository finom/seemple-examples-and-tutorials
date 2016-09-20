"use strict";

var Phone = Class({
	'extends': MK.Object,
	constructor: function(data, parent) {
		this
			.jset(data)
			.set({
				visible: true
			})
			.on({
				'click::(.remove)': function() {
					parent.pull(this);
				},
				render: function() {
					var fields = this.$('[data-key]');
					for(var i = 0; i < fields.length; i++) {
						this.bindNode(fields[i].dataset.key, fields[i], MK.binders.text())
					}

					this.bindNode('visible', ':sandbox', MK.binders.display())
				}
			});
	}
});
