Router.route('/', {
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('nodes');
	},
	action: function() {
		this.render('tree', {to: 'aside'});
		this.render('root');
	}
});

Router.route('/:nodeId', {
	name: 'node',
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('nodes');
	},
	onBeforeAction: function() {
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

if(Meteor.isClient){
	PlanificaTree.nodeIcon = 'fa fa-folder';
	PlanificaTree.nodeOpenIcon = 'fa fa-folder-open';
}