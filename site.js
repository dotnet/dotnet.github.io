require(["jquery"], function ($) {
    $(document).ready(function () {
    	var projectsUrl = "projects_top.json";

    	$.getJSON(projectsUrl, function(data)
    	{
    		var myViewModel = {
		    projects: data.Summary.Projects,
		    contributors : data.Summary.Contributors,
		    forks : data.Summary.Forks,
		    projectList : data.Projects
			};

			require(["ko","moment"], function (ko,moment) {
				ko.bindingHandlers.datetime = {
				    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				    	var value = valueAccessor();
				    	var valueUnwrapped = ko.unwrap(value);

				    	element.innerHTML = moment(valueUnwrapped).format('MMM. DD, YYYY')
				    }
				};

				ko.applyBindings(myViewModel);
			});
    	});
    });
});


