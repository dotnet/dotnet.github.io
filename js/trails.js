(function($, WOW, window){

	function Trails() {
		$(".trail-start").click(this.showTrail);
		this.initTrail();
	}

    function setHash(hash) {
        console.log(hash);
        window.location.hash = "/" + hash.split("-")[0];
    }

	Trails.prototype.showTrail = function(e) {
		if ($(e.target).prop("tagName").toLowerCase() === "button") {
            $(e.target).addClass("jquery-active");
        }
		$(".trail-start").not(e.target).removeClass("jquery-active");
        var trailTarget = $(e.target).data("trailTarget");
        setHash(trailTarget);
		var activeTrail = "." + trailTarget;
		$(".step").not(activeTrail).addClass("step-none");
		$("#step-final").addClass("step-none");
		$(activeTrail).removeClass("step-none").addClass("wow fadeInUp");
		$("#step-final").removeClass("step-none").addClass("wow fadeInUp");
		new WOW().init();
	}


	Trails.prototype.initTrail = function(){
        var hash = window.location.hash;
		var startTrail = "";
        if (hash !== "" && hash.match(/#\/(.+)/)) {
            startTrail = hash.substr(2) + "-trail";
        } else {
            var osPlatform = window.navigator.platform;
            // console.log("OS platform is " + osPlatform);
            if (osPlatform.indexOf("Win") != -1){
                startTrail = "windows-trail";
            }else if (osPlatform.indexOf("Mac") != -1 || osPlatform.indexOf("iPhone") != -1) {
                startTrail = "macosx-trail";
            } else if (osPlatform.indexOf("Linux") != -1 || osPlatform.indexOf("Android") != -1) {
                startTrail = "linux-trail";
            }
        }
		$(".trail-start[data-trail-target='" + startTrail + "']").trigger("click");
	}

	new Trails();

})($, WOW, window, undefined);
