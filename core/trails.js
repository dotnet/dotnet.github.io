(function($, WOW){
		
	function Trails() {
		$(".trail-start").click(this.showTrail);
	}	
	
	Trails.prototype.showTrail = function(e) {
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