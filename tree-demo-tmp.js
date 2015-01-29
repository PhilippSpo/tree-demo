if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    nodes: function() {
      return Nodes;
    }
  });
}

Nodes = new Meteor.Collection('nodes');

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    if (Nodes.find().count() === 0) {
      var root = {
        title: 'Building A',
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
  });
}