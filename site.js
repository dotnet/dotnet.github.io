require(["jquery"], function ($) {
    $(document).ready(function () {
    	var projectsTopUrl = "https://mwdnfwebjob.blob.core.windows.net/output/projects_top.json";
    	var projectsUrl = "https://mwdnfwebjob.blob.core.windows.net/output/projects.json"; 
    	var maxProjectsVisible = 50;

    	$.getJSON(projectsTopUrl, function(data)
    	{
			require(["moment","ko"], function (moment,ko) {

				var timeFilters = [{"name": "Unfiltered", "days":-1}, {"name": "Last 24 hours", "days": 1},{"name" :"Last 7 days", "days" : 8} , {"name": "Last month", "days": 31}];
				var p = data.Projects;

				function Project(project)
				{
					var self = this;
					self.project = project;
					self.summaryVisible = ko.observable(true);
				}

				ko.observable.fn.toggle = function () {
				    var obs = this;
				    return function () {
				        obs(!obs())
				    };
				};

	    		var viewModel = {
				    projects: data.Summary.Projects,
				    contributors : data.Summary.Contributors,
				    forks : data.Summary.Forks,
				    projectList : ko.observableArray([]),
				    query: ko.observable(''),
				    gotoRepo: function() {
				    	window.location.href=this.project.Url;
					},
					search: function(value) {
						filterProjects();
					},
					timeFilters: timeFilters,
					selectedFilter: ko.observable(),
					selectedFilterInDays: -1,
					filter: function(value)
					{
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

				$.getJSON(projectsUrl, function(data)
    			{
    				p = data.Projects;
    			});

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
				    var count = 0;
				    for(var x in p) {
				      	if(count < maxProjectsVisible && p[x].Name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					      	if (viewModel.selectedFilterInDays == -1)
					      	{
					      		count++;
					        	viewModel.projectList.push(new Project(p[x]));
					        }
					        else
					        {
					        	var commit = moment(p[x].CommitLast);
					        	var filterDate = moment().subtract(viewModel.selectedFilterInDays,'days')
					        	if (commit >= filterDate)
					        	{
					        		count++;
					        		viewModel.projectList.push(new Project(p[x]));
					        	}
					        }
			      		}
			    	}
		      	}
			});
    	});
    });
});


