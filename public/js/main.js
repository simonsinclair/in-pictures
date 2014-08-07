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

		isCaptionVisible: false,
		isThumbsVisible: true,

		init: function(id) {
			Gallery.$elem = $(id);
			Gallery.bindEvents();
			Gallery.setImagesWidth();
		},

		bindEvents: function() {
			$('#js-gallery-previous').on('click', Gallery.previousImage);
			$('#js-gallery-next').on('click', Gallery.nextImage);
			$('#js-toggle-thumbs').on('click', Gallery.toggleThumbs);
			$('#js-toggle-caption').on('click', Gallery.toggleCaption);
			$('#js-gallery-thumbs').on('click', 'li', Gallery.navigateToThumb);
		},

		setImagesWidth: function() {
			var imagesWidth = Gallery.config.imageWidth * Gallery.config.numImages;
			$('#js-gallery-images', Gallery.$elem).css('width', imagesWidth);
		},

		previousImage: function(e) {
			console.log(this);
		},

		nextImage: function(e) {
			console.log(this);
		},

		toggleThumbs: function(e) {
			console.log(this);
		},

		toggleCaption: function() {
			if(Gallery.isCaptionVisible) {
				$('#js-toggle-caption', Gallery.$self).text('Hide caption');
				$('#js-gallery-caption', Gallery.$self).removeClass('gallery__caption--hidden');
			} else {
				$('#js-toggle-caption', Gallery.$self).text('Show caption');
				$('#js-gallery-caption', Gallery.$self).addClass('gallery__caption--hidden');
			}
			Gallery.isCaptionVisible = !Gallery.isCaptionVisible;
		},

		navigateToThumb: function(e) {
			console.log(this);
		}

	};

	$(function() {
		Gallery.init('#js-gallery');
	});
})(this, jQuery);
