require(["jquery"], function ($) {
    $(document).ready(function () {
    	var projectsUrl = "https://mwdnfwebjob.blob.core.windows.net/output/projects_top.json";

    	$.getJSON(projectsUrl, function(data)
    	{
			require(["moment","ko"], function (moment,ko) {

				var timeFilters = [{"name": "All", "days":-1}, {"name": "Last 24 hours", "days": 1},{"name" :"Last 7 days", "days" : 8} , {"name": "Last month", "days": 31}];
				var p = data.Projects;
	    		var viewModel = {
				    projects: data.Summary.Projects,
				    contributors : data.Summary.Contributors,
				    forks : data.Summary.Forks,
				    projectList : ko.observableArray(p),
				    query: ko.observable(''),
				    gotoRepo: function() {
				    	window.location.href=this.Url;
					},
					search: function(value) {
						filterProjects();
					},
					timeFilters: timeFilters,
					selectedFilter: ko.observable(),
					beforeFilter: timeFilters[0],
					selectedFilterInDays: -1,
					filter: function(value)
					{
						if (value == viewModel.beforeFilter)
						{
							return
						}

					    var index = indexOf(viewModel.timeFilters,value.name);
					    viewModel.selectedFilterInDays = viewModel.timeFilters[index].days;
					    beforeFilter = value;
				    	filterProjects();
					}
				};

				ko.bindingHandlers.datetime = {
				    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				    	var value = valueAccessor();
				    	var valueUnwrapped = ko.unwrap(value);
				    	element.innerHTML = moment(valueUnwrapped).format('MMM. DD, YYYY')
				    }
				};

				viewModel.query.subscribe(viewModel.search);
				viewModel.selectedFilter.subscribe(viewModel.filter);
				ko.applyBindings(viewModel);

				function indexOf(a, v) {
				    for (var i in a)
				    {
				        if (a[i].name == v)
				        {
				            return i;
				        }
				    }
				    return -1;
				}

				function filterProjects() {
				    viewModel.projectList([]);
				    var value = viewModel.query();
				    for(var x in p) {
				      	if(p[x].Name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					      	if (viewModel.selectedFilterInDays == -1)
					      	{
					        	viewModel.projectList.push(p[x]);
					        }
					        else
					        {
					        	var commit = moment(p[x].CommitLast);
					        	var filterDate = moment().subtract(viewModel.selectedFilterInDays,'days')
					        	if (commit >= filterDate)
					        	{
					        		viewModel.projectList.push(p[x]);
					        	}
					        }
			      		}
			    	}
		      	}
			});
    	});
    });
});


