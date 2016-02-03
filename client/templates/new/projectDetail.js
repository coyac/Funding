Template.projectDetail.helpers({
  comments: function() {
    return Comments.find({postId: this._id}); //O comment nao esta bom
  }
});
