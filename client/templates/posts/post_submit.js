Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
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
      SuggestedValue: $(e.target).find('[name=SuggestedValue]').val(),
      PaymentType: $(e.target).find('[name=PaymentType]').val()
    };

  /* Os erros vão aqui!
var errors = validatePost(post);
if (errors.title || errors.url)
return Session.set('postSubmitErrors', errors);
  */
    
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
      
      Router.go('projectDetail', {_id: result._id});  
    });
  }
});