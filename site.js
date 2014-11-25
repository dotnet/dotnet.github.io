require(["jquery","ko"], function ($,ko) {
    $(document).ready(function () {

    	var projectsUrl = "projects_top.json";

    	$.getJSON(projectsUrl, function(data)
    	{
    		var myViewModel = {
		    projects: data.Summary.Projects,
		    contributors : data.Summary.Contributors,
		    organizations : data.Summary.Organizations,
		    openIssues : data.Summary.OpenIssues,
		    stars : data.Summary.Stars,
		    forks : data.Summary.Forks
			};

			ko.applyBindings(myViewModel);
    	});
    });
});


