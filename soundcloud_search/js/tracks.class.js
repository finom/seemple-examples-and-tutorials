var Tracks = Class({
	'extends': MK.Array,
	Model: Track,
	itemRenderer: '#track_template',
	constructor: function() {
		this
			.set({
				query: localStorage.matreshkaTracksQuery || ''
			})
			.bindNode({
				sandbox: 'main',
				container: ':sandbox .tracks',
				form: ':sandbox .search',
				query: ':bound(form) .query'
			})
			.on({
				'submit::form': function(evt) {
					this.loadTracks(function(response) {
						this.recreate(response);
					});
					localStorage.matreshkaTracksQuery = this.query;
					evt.preventDefault();
				},
				'*@ended::stream': function(evt) {
					var track = evt.self;
					this[(this.indexOf(track) + 1) % this.length].play();
				},
				'*@play::stream': function(evt) {
					var track = evt.self;
					if (this.lastPlayed && this.lastPlayed !== track) {
						this.lastPlayed.stop();
					}

					this.lastPlayed = track;
				}
			});

		if (this.query) {
			this.loadTracks(function(response) {
				this.recreate(response);
			});
		}
	},
	loadTracks: function(callback) {
		$.ajax({
			url: '//api.soundcloud.com/tracks.json',
			dataType: "json",
			data: {
				q: this.query,
				client_id: client_id,
				limit: 20,
				offset: 0,
				filter: 'streamable',
				order: 'hotness'
			},
			success: callback.bind(this)
		});
	}
});
