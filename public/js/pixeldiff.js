$(document).ready(function () {

	var imgCurrent;
	var imgPrevious;
	var index;

	function onComplete(data){
		var diffImage = new Image();
		diffImage.src = data.getImageDataUrl();

		$('#impress div:nth-child('+index+')').find('img').attr('src', data.getImageDataUrl());
	}

	var file1;
	var file2;
	var resembleControl;
	var toggleNum = true;

	$('.btn-pixeldiff').click(function(e){


		e.preventDefault(); // Prevent carrousel from moving to the beginning
		index = $("#impress div").index($(".present")); // obtain index number of current slide

		if (index == 1) { //If first image, return 
			return false;
		}

		$('.pixeldiff-on').toggleClass("invisible"); // hide/show "ON" text by adding/removing class "invisible"
		$('.pixeldiff-off').toggleClass("invisible"); // hide/show "OFF" text by adding/removing class "invisible"

		if (toggleNum) {

			imgCurrent = $('#impress div:nth-child('+index+')').find('img').attr("src"); //obtain img path of current slide
			imgPrevious = $('#impress div:nth-child('+(index-1)+')').find('img').attr("src"); //obtain img path of previous slide

			var xhr = new XMLHttpRequest();
			var xhr2 = new XMLHttpRequest();
			var done = $.Deferred();
			var dtwo = $.Deferred();

			xhr.open('GET', imgPrevious, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				done.resolve(this.response);
			};
			xhr.send();

			xhr2.open('GET', imgCurrent, true);
			xhr2.responseType = 'blob';
			xhr2.onload = function(e) {
				dtwo.resolve(this.response);
			};
			xhr2.send();

			$.when(done, dtwo).done(function(file, file1){
				resembleControl = resemble(file).compareTo(file1).onComplete(onComplete);
			});			

			toggleNum = false;


		} else {

			$('#impress div:nth-child('+index+')').find('img').attr('src', imgCurrent);
			toggleNum = true;
		}


	});


});