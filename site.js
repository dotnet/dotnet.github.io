require(["jquery"], function ($) {
    $(document).ready(function () {
    	var projectsTopUrl = "https://dnfrepos.blob.core.windows.net/output/projects_top.json";
    	var projectsUrl = "https://dnfrepos.blob.core.windows.net/output/projects.json"; 

    	$.getJSON(projectsTopUrl, function(data)
    	{
			require(["moment","ko"], function (moment,ko) {

				var timeFilters = [{"name": "Unfiltered", "days":-1}, {"name": "Last 24 hours", "days": 1},{"name" :"Last 7 days", "days" : 8} , {"name": "Last month", "days": 31}];
				var minProjects = 30;
				var p = data.Projects;
				var config = true;

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
				    query: ko.observable('').extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } }),
					pages: ko.observableArray([]),
					timeFilters: timeFilters,
					selectedTimeFilter: ko.observable(),
					selectedTimeFilterInDays: -1,
					countFilter : ko.observable(true),
					countFilters : ko.observableArray([]),
					selectedCountFilter: ko.observable(minProjects),
					filter: function(value)
					{
				    	console.log('filter');
						if (config) 
							{
								console.log("filter no-op");
								return;
							}
					    var index = indexOf(viewModel.timeFilters,value.name);
					    viewModel.selectedTimeFilterInDays = viewModel.timeFilters[index].days;
					    beforeFilter = value;
				    	filterProjects();
					},
				    gotoRepo: function() {
				    	window.location.href=this.project.Url;
					},
					search: function(value) {
						console.log("search");
						if (config) 
							{
								console.log("search no-op");
								return;
							}
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
				viewModel.selectedCountFilter.subscribe(viewModel.search);				
				viewModel.selectedTimeFilter.subscribe(viewModel.filter);
				console.log("apply bindings");
				ko.applyBindings(viewModel);
				config = false;

				$.getJSON(projectsUrl, function(data)
    			{
    				p = data.Projects;
    				configureCountFilter(p.length);
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

				function configureCountFilter(count)
				{
					if (count <36)
					{
						viewModel.countFilter(false);
					}
					else if (count > 400)
					{					
						viewModel.countFilters([minProjects, 90, 300, count]);
						viewModel.countFilter(true);
					}					
					else if (count > 120)
					{					
						viewModel.countFilters([minProjects, 90, count]);
						viewModel.countFilter(true);
					}
					else 
					{
						viewModel.countFilters([minProjects, count]);
						viewModel.countFilter(true);
					}
				}

				function configurePaging(count)
				{
					var pageCount;
					var pages = [];
					var selectedCount = viewModel.selectedCountFilter();
					pageCount = count / selectedCount;

					pageCount = Math.ceil(pageCount);
					pageCount++;
					for (i = 1; i < pageCount; i++)
					{
						pages.push(i);
					}
					viewModel.pages(pages);
				}

				function filterProjects() {
					console.log("filterProjects");
				    viewModel.projectList([]);
				    var value = viewModel.query().toLowerCase();
				    var count = 0;
				    var maxCount = viewModel.selectedCountFilter();

				    for(var x in p) {

				    	// validate tile count
				    	if (count >= maxCount)
				    	{
				    		count++;
				    		continue;
				    	}
				    	
				    	// determine if query matches, as empty string, repo name or contributor name
				      	if(value == "" || p[x].Name.toLowerCase().indexOf(value) >= 0 || p[x].Contributor.toLowerCase().indexOf(value) >=0) {
					      	// if no time filter, just add
					      	if (viewModel.selectedTimeFilterInDays == -1)
					      	{
					      		count++;
					        	viewModel.projectList.push(new Project(p[x]));
					        }
					        else
					        {
					        	var commit = moment(p[x].CommitLast);
					        	var filterDate = moment().subtract(viewModel.selectedTimeFilterInDays,'days')
					        	if (commit >= filterDate)
					        	{
					        		count++;
					        		viewModel.projectList.push(new Project(p[x]));
					        	}
					        }
			      		}
			    	}

			    	configurePaging(count);
		      	}
			});
    	});
    });
});


