require(["jquery","ko"], function ($,ko) {
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

			ko.applyBindings(myViewModel);
    	});
    });
});


