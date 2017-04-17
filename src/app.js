import '../node_modules/normalize.css/normalize.css';
import './styles.scss';
import '../node_modules/fullpage.js/dist/jquery.fullpage.css';
import '../node_modules/jquery/dist/jquery';
import '../node_modules/fullpage.js/dist/jquery.fullpage';

$(document).ready(function () {
	$('#fullpage').fullpage({
		anchors: ['about-us', 'events', 'menus', 'gallery'],
		menu: '#menu',
		verticalCentered: false,

		slidesNavigation: true,
		afterRender: function () {
			console.log($.fn.fullpage);
			setInterval(function () {
				$.fn.fullpage.moveSlideRight();
			}, 5000);
		}
	});
});
