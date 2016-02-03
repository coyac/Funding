Template.formWizard.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.formWizard.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.formWizard.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
      NomePork: $(e.target).find('[name=NomePork]').val(),
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


Template.formWizard.rendered = function(){

    // Initialize steps plugin
    $("#wizard").steps();

    $("#form").steps({
        bodyTag: "fieldset",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex)
            {
                return true;
            }

            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18)
            {
                return false;
            }

            var form = $(this);

            // Clean up if user went backward before
            if (currentIndex < newIndex)
            {
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }

            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";

            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18)
            {
                $(this).steps("next");
            }

            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3)
            {
                $(this).steps("previous");
            }
        },
        onFinishing: function (event, currentIndex)
        {
            var form = $(this);

            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";

            // Start validation; Prevent form submission if false
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {
            var form = $(this);

            // Submit form input
            form.submit();

    Meteor.call('postInsert', form, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
      
      Router.go('projectDetail', {_id: result._id});  
    });

        }
    }).validate({
        errorPlacement: function (error, element)
        {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

};