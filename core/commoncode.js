(function ($){
	function CoreCode() {
		$(".show-value-props").click(this.showValueProps);
	}

	CoreCode.prototype.showValueProps = function(e){
		console.log(e);
		e.preventDefault();
		if ($("#rest-vps").css("display") === "none"){
			$("#rest-vps").addClass("animated fadeIn");
			$("#rest-vps").toggle();
			$(e.currentTarget).children("span").removeClass("fa-chevron-down").addClass("fa-chevron-up");
			//console.log($(e.target).children("span").attr("class"));
		} else {
			$("#rest-vps").toggle();
			$(e.currentTarget).children("span").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		}
	}

	new CoreCode();

})($, undefined);
