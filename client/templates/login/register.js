Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var name = $('[name=name]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: name,
            email: email,
            password: password
        }, function(error){
            if(error){
              console.log(error.reason); // Output error if registration fails
            } else {
              Router.go("home"); // Redirect user if registration succeeds
            }
        });
    }
});
