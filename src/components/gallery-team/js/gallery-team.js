var INFORMA = window.INFORMA || {};
INFORMA.GalleryTeam = (function (window, $, namespace) {
	'use strict';
	var sticky;
	var header;
	var methodList = $('meet-people-header'), init;
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	init = function () {
		header = document.getElementById('meet-people-header');

		if (isIE) {
			$(".tm-img").each(function () {
				$(this).addClass('ie').css('background-image', 'url(' + $(this).children('img').attr('src') + ')');
			});
		}
	};

	jQuery(".tm-img").on("click", function () {
		var id = $(this).attr("id");
		var idname = $(this).attr("data-profiledata");
		
		$('#hdnid').val(id);
		var id2 = $('#hdnid').val();
		var obj = JSON.parse(idname);
		var htmlStr = "";
		var htmlStr = "";
		htmlStr += " <div class='container'>  <div class='row'> <div class='row'> <div class='col-md-12'> <div class='close' id='close'>";
		htmlStr += "X</div>    </div> </div>     <div class='col-md-4'>   <div class='pro-img'> <img src=" + obj.__interceptors[0].Values.ProfileImage.Src + " alt='' />";
		htmlStr += "  </div>   </div> <div class='col-md-8'>  <div class='header'>  <h2>" + obj.__interceptors[0].Values.FirstName + " " + obj.__interceptors[0].Values.LastName + "</h2>   <h3>" + obj.__interceptors[0].Values.JobTitle + "</h3> </div> <div class='pro-social'>        <div class='unit'></div>  <div class='unit'></div>  </div> <div class='pro-details'>  <p>" + obj.__interceptors[0].Values.ShortDescription + "</p>      </div>    </div>   </div> </div>	";

		$('#team-discription').html(htmlStr);
	});

	jQuery("#close").on("click", function () {
		alert("lala");
		$('#team-discription').css("display", "none");
	});

	return {
		init: init
	};
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.GalleryTeam.init());