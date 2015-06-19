(function($, WOW, window){

	function Trails() {
		$(".trail-start").click(this.showTrail);
		this.initTrail();
	}

	Trails.prototype.showTrail = function(e) {
		$(e.target).addClass("jquery-active");
		$(".trail-start").not(e.target).removeClass("jquery-active");
		var activeTrail = "." + $(e.target).data("trailTarget");
		// console.log(activeTrail);
		$(".step").not(activeTrail).addClass("step-none");
		$("#step-final").addClass("step-none");
		$(activeTrail).removeClass("step-none").addClass("wow fadeInUp");
		$("#step-final").removeClass("step-none").addClass("wow fadeInUp");
		new WOW().init();
		// console.log($(activeTrail));

	}

	Trails.prototype.initTrail = function(){
		var osPlatform = window.navigator.platform;
		// console.log("OS platform is " + osPlatform);
		var startTrail = "";
		if (osPlatform.indexOf("Win") != -1){
			startTrail = "windows-trail";
		}else if (osPlatform.indexOf("Mac") != -1 || osPlatform.indexOf("iPhone") != -1) {
			startTrail = "macosx-trail";
		} else if (osPlatform.indexOf("Linux") != -1 || osPlatform.indexOf("Android") != -1) {
			startTrail = "linux-trail";
		}
		$(".trail-start[data-trail-target='" + startTrail + "']").trigger("click");
	}

	new Trails();

})($, WOW, window, undefined);
