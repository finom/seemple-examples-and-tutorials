var Track = Class({
	'extends': MK.Object,
	constructor: function(data) {
		this
			.set({
				title: data.title,
				artwork_url: data.artwork_url || data.user.avatar_url,
				stream: data.stream_url + '?client_id=' + client_id
			})
	},
	
	onRender: function() {
		this
			.bindNode({
				artwork_url: ':sandbox .artwork',
				stream: ':sandbox audio'
			}, MK.binders.prop('src'))
			.bindNode('title', ':sandbox .title', MK.binders.html());
	},
	
	play: function() {
		this.nodes.stream.play();
	},
	
	stop: function() {
		this.nodes.stream.pause();
		this.nodes.stream.currentTime = 0;
	}
});