import './scss/app.scss';
import '../node_modules/font-awesome/css/font-awesome.css';
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
var theme = getParameterByName('theme');

$(document).ready(function () {
	$('html').addClass(theme);
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

	$('#fullpage').fullpage({
		anchors: ['about-us', 'events', 'menus', 'gallery'],
		menu: '#menu',
		verticalCentered: false,
		slidesNavigation: true,
		afterLoad: function (anchorLink, index) {
			autoScroll(index);
		},
		afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
			autoScroll(index);
		}
	});
});
