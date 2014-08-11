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
		activeImage: 0,

		init: function(id) {
			Gallery.$elem 	= $(id);
			Gallery.$thumbs = $('#js-gallery-thumbs', Gallery.$elem);
			Gallery.bindEvents();
			Gallery.setImagesWidth();
		},

		bindEvents: function() {
			$('#js-gallery-previous').on('click', Gallery.previousImage);
			$('#js-gallery-next').on('click', Gallery.nextImage);
			$('#js-toggle-caption').on('click', Gallery.toggleCaption);
			Gallery.$thumbs.on('click', 'li', Gallery.navigateViaThumb);
		},

		setImagesWidth: function() {
			var imagesWidth = Gallery.config.imageWidth * Gallery.config.numImages;
			$('#js-gallery-images', Gallery.$elem).css('width', imagesWidth);
		},

		previousImage: function(e) {
			if(Gallery.activeImage <= 0) {
				return;
			}
			Gallery.navigateToImage( Gallery.activeImage - 1 );
		},

		nextImage: function(e) {
			if(Gallery.activeImage >= (Gallery.config.numImages - 1)) {
				return;
			}
			Gallery.navigateToImage( Gallery.activeImage + 1 );
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

		navigateViaThumb: function() {
			var index = $('li', Gallery.$thumbs).index(this);

			// Navigate to image
			Gallery.navigateToImage(index);
		},

		navigateToImage: function(index) {
			console.log(index);
			// Don't navigate if we're already on that image
			if(index === Gallery.activeImage) {
				return;
			}

			// Move carousel
			var position = Gallery.config.imageWidth * index;
			$('#js-gallery-images', Gallery.$self).css('transform', 'translateX('+ -position +'px)');

			// Update current index
			Gallery.activeImage = index;

			// Update thumbnail appearances
			Gallery.updateThumbs();
		},

		updateThumbs: function() {
			$('li.active', Gallery.$thumbs).removeClass('active');
			$('li', Gallery.$thumbs)
				.eq(Gallery.activeImage)
				.addClass('active');
		}

	};

	$(function() {
		Gallery.init('#js-gallery');
	});
})(this, jQuery);
