// main.js
//

"use strict";

(function(win, $, undefined) {

	var doc = win.document;

	// HOOK
	// Page loaded

	$(win).on('load', function() {
		$('body').addClass('loaded');
	});

	// Keyboard shortcuts
	$(doc).on('keyup', function(e) {
		switch(e.which) {
			case 37:
				Gallery.previousImage();				
				break;

			case 39:
				Gallery.nextImage();
				break;

			case 67:
				Gallery.toggleCaption();
				break;

			default:
				console.log(e.which);
		}
	});

	// MODULES
	// - Gallery

	var Gallery = {

		config: {
			numImages: 10,
			imageWidth: 976
		},

		isCaptionVisible: false,
		isThumbsTruncated: true,
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

			// Don't navigate if we're already on that image
			if(index === Gallery.activeImage) {
				return;
			}

			// Move carousel
			var position = Gallery.config.imageWidth * index;
			$('#js-gallery-images', Gallery.$self).css('transform', 'translateX('+ -position +'px)');

			// Update current index
			Gallery.activeImage = index;

			// Update appearances
			Gallery.updateThumbs();
			Gallery.updatePreviousNext();
		},

		updateThumbs: function() {
			$('li.active', Gallery.$thumbs).removeClass('active');
			$('li', Gallery.$thumbs)
				.eq(Gallery.activeImage)
				.addClass('active');
		},

		updatePreviousNext: function() {

			// By default
			$('#js-gallery-previous', Gallery.$self).removeClass('deactivated');
			$('#js-gallery-next', Gallery.$self).removeClass('deactivated');

			// At the beginning
			if(Gallery.activeImage <= 0) {
				$('#js-gallery-previous', Gallery.$self).addClass('deactivated');
			}

			// At the end
			if(Gallery.activeImage >= (Gallery.config.numImages - 1)) {
				$('#js-gallery-next', Gallery.$self).addClass('deactivated');
			}
		},

		toggleThumbsTruncated: function() {
			Gallery.isThumbsTruncated = !Gallery.isThumbsTruncated;
			console.log(Gallery.isThumbsTruncated);
		}

	};

	$(function() {
		Gallery.init('#js-gallery');
	});
})(this, jQuery);