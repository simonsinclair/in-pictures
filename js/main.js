// main.js
//

"use strict";

(function(w, $, undefined) {

	// HOOK
	// - Page loaded

	$(w).on('load', function() {
		$('body').addClass('loaded');
	});

	// MODULES
	// - Gallery

	var Gallery = {

		config: {
			numImages: 10,
			imageWidth: 976
		},

		init: function(id) {
			Gallery.$elem = $(id);
			Gallery.setImagesWidth();
		},

		setImagesWidth: function() {
			var imagesWidth = Gallery.config.imageWidth * Gallery.config.numImages;
			$('#js-gallery-images').css('width', imagesWidth);
		}

	};

	$(function() {
		Gallery.init('#js-gallery');
	});
})(this, jQuery);
