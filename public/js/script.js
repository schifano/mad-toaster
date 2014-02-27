$(document).ready(function () {

    var views = $('#impress div').length;
    for (var i = 1; i < (views+1); i++) {
        var xValue = (350 * (i-1)) - 350;
        $('#impress div:nth-child('+i+')').attr("data-x", xValue.toString());
    }

	var descText = $('#impress div:first-child').attr("description");
	$('.version-text').text("V1");
	$('.description-text').text(descText);

	var wto;

	$('body').keyup(function(e) {

		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
			$('.version-text').fadeOut(500);
			$('.description-text').fadeOut(500);	
		}


		clearTimeout(wto);
		wto = setTimeout(function() {
			var index;
			if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
				index = $("#impress div").index($(".present"));
				var descText = $('#impress div:nth-child('+index+')').attr("description");
				$('.version-text').text("V" + index);
				$('.description-text').text(descText);

				$('.version-text').fadeIn(500);
				$('.description-text').fadeIn(500);
			}
				
		}, 500)

	});

	$('.frame').click(function() {
		$('.frame').toggleClass("night");
		$('.night-mode').toggleClass("invisible");
		$('.day-mode').toggleClass("invisible")
	})

	impress().init();


})