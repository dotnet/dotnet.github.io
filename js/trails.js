(function($, WOW, window){

	function Trails() {
		$(".trail-start, .trail-start-link").click(this.showTrail);
		this.initTrail();
	}

	Trails.prototype.showTrail = function(e) {
		if ($(e.target).prop("tagName").toLowerCase() === "button") {
            $(e.target).addClass("jquery-active");
        }
		$(".trail-start").not(e.target).removeClass("jquery-active");
        var trailTarget = $(e.target).data("trailTarget");
        console.log(trailTarget);
        window.location.hash = trailTarget;
		var activeTrail = "." + trailTarget;
		// console.log(activeTrail);
		$(".step").not(activeTrail).addClass("step-none");
		$("#step-final").addClass("step-none");
		$(activeTrail).removeClass("step-none").addClass("wow fadeInUp");
		$("#step-final").removeClass("step-none").addClass("wow fadeInUp");
		new WOW().init();
		// console.log($(activeTrail));

	}

    Trails.prototype.setHash = function(hash) {
        console.log(hash);
        window.location.hash = hash;
    }

	Trails.prototype.initTrail = function(){
        //this.getSamples();
        var hash = window.location.hash;
		var startTrail = "";
        if (hash !== "") {
            var exploded = hash.substr(2);
            console.log(exploded);
            switch (exploded) {
                case "windows": 
                    startTrail = "windows-trail";
                    break;
                case "macosx":
                    startTrail = "macosx-trail";
                    break;
                case "docker":
                    startTrail = "docker-trail";
                    break;
                case "ubuntu":
                    startTrail = "linux-trail";
                    break;
                case "debian":
                    startTrail = "debian-trail";
                    break;
                case "centos":
                    startTrail = "centos-trail";
                    break;
            }
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
