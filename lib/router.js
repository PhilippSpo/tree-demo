Router.route('/', {
	layoutTemplate: 'layout',
	action: function() {
		this.render('tree', {to: 'aside'});
		this.render('root');
	}
});

Router.route('/:nodeId', {
	name: 'node',
	layoutTemplate: 'layout',
	onBeforeAction: function() {
		PlanificaTree.nodeIcon = 'ion-android-folder';
		this.next();
	},
	data: function() {
		return Nodes.findOne({_id: this.params.nodeId});
	},
	action: function() {
		this.render('tree', {to: 'aside'});
		this.render('node');
	}
});