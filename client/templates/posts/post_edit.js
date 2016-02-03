Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});
//comment
Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      NomePork: $(e.target).find('[name=NomePork]').val(),
      NomeBenef: $(e.target).find('[name=NomeBenef]').val(),
      EventType: $(e.target).find('[name=EventType]').val(),
      FinalDate: $(e.target).find('[name=FinalDate]').val(),
      ImagePork: $(e.target).find('[name=ImagePork]').val(),
      PorkDescription: $(e.target).find('[name=PorkDescription]').val(),
      TotalValue: $(e.target).find('[name=TotalValue]').val(),
      SuggestedValue: $(e.target).find('[name=SuggestedValue]').val(),
      UsersEmail: $(e.target).find('[name=UsersEmail]').val(),
      ShareLink: $(e.target).find('[name=ShareLink]').val(),
      PaymentType: $(e.target).find('[name=PaymentType]').val()
    }

    /*/ var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors); /*/

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('home');
    }
  }
});
