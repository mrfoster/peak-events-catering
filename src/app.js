import './scss/app.scss';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/fullpage.js/dist/jquery.fullpage';

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
	var theme = getParameterByName('theme') || 'theme1';
	var timeout;
	function autoScroll(index) {
		if (timeout) {
			clearTimeout(timeout);
		}

		if (index !== 2) {
			return;
		}

		timeout = setTimeout(function () {
			$.fn.fullpage.moveSlideRight();
		}, 5000);
	}
	$('html').addClass('js').removeClass('no-js');
	$(document.body).addClass(theme);
	$('.header').addClass('animated fadeInDown');
	$('#section0 h2')
		.css('animation-delay', '1s')
		.css('animation-duration', '2s')
		.addClass('animated fadeIn');
	$('#fullpage').fullpage({
		anchors: ['about-us', 'events', 'menus', 'gallery'],
		menu: '#menu',
		verticalCentered: false,
		slidesNavigation: true,
		afterRender: function () {
		},
		onLeave: function (index, nextIndex, direction) { },
		afterLoad: function (anchorLink, index) {
			autoScroll(index);
		},
		afterRender: function () { },
		afterResize: function () { },
		afterResponsive: function (isResponsive) { },
		afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
			autoScroll(index);
		},
		onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) { }
	});
});
