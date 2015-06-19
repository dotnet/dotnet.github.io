(function($, WOW){
		
	function Trails() {
		$(".trail-start").click(this.showTrail);
		$(".trail-start[data-trail-target='linux-trail']").trigger("click");
	}	
	
	Trails.prototype.showTrail = function(e) {
		$(e.target).addClass("jquery-active");
		$(".trail-start").not(e.target).removeClass("jquery-active");
		var activeTrail = "." + $(e.target).data("trailTarget");
		console.log(activeTrail);
		$(".step").not(activeTrail).addClass("step-none");
		$("#step-final").addClass("step-none");
		$(activeTrail).removeClass("step-none").addClass("wow fadeInUp");
		$("#step-final").removeClass("step-none").addClass("wow fadeInUp");
		new WOW().init();
		console.log($(activeTrail));
		
	}
	
	new Trails();
	
})($, WOW, undefined);