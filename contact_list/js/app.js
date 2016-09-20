"use srrict";
var app = new Class({
	'extends': MK.Object,
	constructor: function() {
		this
			.set({
				phones: JSON.parse(localStorage.phoneBook || 'null') || fakeData,
				names: ['first_name', 'last_name', 'birth_date', 'phone_number']
			})
			.addDataKeys(this.names)
			.bindNode({
				sandbox: 'body',
				form: ':sandbox .new-phone'
			})
			.setClassFor('phones', Phones)
			.on({
				'phones@modify phones.*@modify': function(evt) {
					localStorage.phoneBook = JSON.stringify(this.phones)
				},
				'submit::form': function(evt) {
					evt.preventDefault();
					if(this.keys().every(function(key) {
						return this[key];
					}, this)) {
						this.phones.push(this.toJSON());
						this.each(function(value, key) {
							this[key] = '';
						}, this);
					}

				}
			})
			.parseForm();


	},

	parseForm: function() {
		for(var i = 0; i < this.names.length; i++){
			this.bindNode(this.names[i], this.nodes.form[this.names[i]]);
		}

		return this;
	}
});
