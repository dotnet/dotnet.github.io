require(["jquery","ko"], function ($,ko) {
    $(document).ready(function () {

		var myViewModel = {
		    personName: 'Bob',
		    personAge: 123
		};

		var myObservableArray = ko.observableArray();    // Initially an empty array
		myObservableArray.push('Some value'); 
		myObservableArray.push('Some value2'); 

		myViewModel.list = myObservableArray;

		ko.applyBindings(myViewModel);
    });
});


