(function($, WOW, window){

	function Trails() {
        $(".trail-start").click(this, this.clickHandler);
        $(window).on("popstate", "", this, this.navHandler);
		this.initTrail();
	}

    Trails.prototype.navHandler = function(e) {
        e.data.initTrail(e.type);
    }

    Trails.prototype.setLocation = function(hash) {
        window.history.pushState({id: 1}, "", "#/" + hash.split("-")[0]);
    }

	Trails.prototype.clickHandler = function(e) {
        e.data.showTrails(e.target, e.type);
	}

    Trails.prototype.showTrails = function(target, event) {
        $(target).addClass("jquery-active");
		$(".trail-start").not(target).removeClass("jquery-active").blur();
        var trailTarget = $(target).data("trailTarget");
        if (event === "click") {
            this.setLocation(trailTarget);
        }
		var activeTrail = "." + trailTarget;
		$(".step").not(activeTrail).addClass("step-none");
		$("#step-final").addClass("step-none");
		$(activeTrail).removeClass("step-none").addClass("wow fadeInUp");
		$("#step-final").removeClass("step-none").addClass("wow fadeInUp");
		new WOW().init();
    }



	Trails.prototype.initTrail = function(event){
        if (typeof(event) === "undefined") {
            event = "click";
        }
        var hash = window.location.hash;
		var startTrail = "";
        if (hash !== "" && hash.match(/#\/(.+)/)) {
            startTrail = hash.substr(2) + "-trail";
        } else {
            var osPlatform = window.navigator.platform;
            if (osPlatform.indexOf("Win") != -1){
                startTrail = "windows-trail";
            }else if (osPlatform.indexOf("Mac") != -1 || osPlatform.indexOf("iPhone") != -1) {
                startTrail = "macosx-trail";
            } else if (osPlatform.indexOf("Linux") != -1 || osPlatform.indexOf("Android") != -1) {
                startTrail = "linux-trail";
            }
        }
        this.showTrails(".trail-start[data-trail-target='" + startTrail + "']", event);
	}

	new Trails();

})($, WOW, window, undefined);
