if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.tree.helpers({
    nodes: function() {
      return Nodes;
    },
    rootNode: function() {
      return {
        title: 'Projekt A'
      };
    }
  });

  Template.tree.events({
    'click #rootNode': function (e) {
      Router.go('/');
    },
    'click .pc-tree-node': function() {
      Router.go('node', {
        nodeId: this.context._id
      });
    }
  });
}

Nodes = new Meteor.Collection('nodes');

if (Meteor.isServer) {
  Meteor.publish('nodes', function() {
    return Nodes.find();
  });
  Meteor.startup(function() {
    // code to run on server at startup
    if (Nodes.find().count() === 0) {
      for(var i=0; i<5; i++){
        var root = {
          title: 'Building '+i,
          children: [],
          parent: null
        };
        rootId = Nodes.insert(root);

        var zeroFloor = {
          title: 'Floor 0',
          children: [],
          parent: rootId
        };
        zeroFloorId = Nodes.insert(zeroFloor);

        var firstFloor = {
          title: 'Floor 1',
          children: [],
          parent: rootId
        };
        firstFloorId = Nodes.insert(firstFloor);

        var secondFloor = {
          title: 'Floor 2',
          children: [],
          parent: rootId
        };
        secondFloorId = Nodes.insert(secondFloor);

        Nodes.update({
          _id: rootId
        }, {
          $set: {
            children: [zeroFloorId, firstFloorId, secondFloorId]
          }
        });
      }
    }
  });
}