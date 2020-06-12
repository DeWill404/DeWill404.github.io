$(document).ready(function() {

	// Owl Carousel Initialzer
	$( ".owl-carousel").owlCarousel({
    	center : true,
		items : 1,
		nav : true,
		dots : false,
		navText : [
			'<button class="inline-block px-2 py-1 bg-teal-700 mr-2 my-1 text-center text-white border-blue hover:shadow-outline hover:bg-teal-900 rounded-lg focus:outline-none"><i class="fas fa-angle-double-left"></i></button>', 
			'<button class="inline-block px-2 py-1 bg-teal-700 ml-2 my-1 text-center text-white border-blue hover:shadow-outline hover:bg-teal-900 rounded-lg focus:outline-none"><i class="fas fa-angle-double-right"></i></button>'
		],
		loop : true,
		margin : 10,
		responsive : {
			// breakpoint from 480 up
			480 : {
				items : 2
			},
			// breakpoint from 768 up
			768 : {
				items : 3
			}
		}
	});

	// Navigation Toggler
	$(".nav-toggler").each(function(_, navToggler) {
		var target = $(navToggler).data("target");
		$(navToggler).on("click", function() {
			$(target).animate({ height: "toggle" });
		});
	});

	// To hide and show header if not on home page
	scrollFunction();

});

// js-change-theme

// Storing current scrolled height
var offsetHeight = document.getElementById('profile').offsetHeight;
var head = document.querySelector('nav');
// Redefining Scroll function
window.onscroll = function() { scrollFunction() };
function scrollFunction() {
	if (document.body.scrollTop < offsetHeight && document.documentElement.scrollTop < offsetHeight) {
		if ( ! head.classList.contains('hidden') ) {
			$('#header').addClass('hidden');
		}
	} else {
		$('#header').removeClass('hidden');
	}
}



//Init tooltips
tippy('.link', { placement: 'bottom' } );



//Toggle mode
const body = document.querySelector('body');
const profile = document.getElementById('profile');
const header = document.getElementById('header');
const skill = document.getElementById('skills');
const project = document.getElementById('projects');
const about = document.getElementById('aboutme');
const contact = document.getElementById('contact');

// Theme changing function
function changeTheme() {
	if (body.classList.contains('text-gray-900')) {
		// Button Text
		this.innerHTML = "🌞";
		// Body Class
		body.classList.remove('text-gray-900');				body.classList.add('text-gray-100');
		// Profile Class
		profile.classList.remove('bg-white');				profile.classList.add('bg-gray-900');
		// Header Class
		header.classList.remove('bg-white');				header.classList.add('bg-black');
		header.classList.remove('border-black');				header.classList.add('border-white');
		// Skill Class
		skill.classList.remove('bg-white');					skill.classList.add('bg-gray-900');
		// Project Class
		project.classList.remove('bg-white');				project.classList.add('bg-gray-900');
		// Card Class
		$('.card').removeClass('bg-white');					$('.card').addClass('bg-gray-800');
		// About Me Class
		about.classList.remove('bg-white');					about.classList.add('bg-gray-900');
		// contact Me Class
		contact.classList.remove('bg-white');				contact.classList.add('bg-gray-900');
		// contact links modification
		$('.link').removeClass('border-black');				$('.link').addClass('border-white');
	} else {
		// Button Text
		this.innerHTML = "🌙";
		// Body Class
		body.classList.remove('text-gray-100');				body.classList.add('text-gray-900');
		// Profile Class
		profile.classList.remove('bg-gray-900');			profile.classList.add('bg-white');	
		// Header Class
		header.classList.remove('bg-black');				header.classList.add('bg-white');
		header.classList.remove('border-white');				header.classList.add('border-black');
		// Skill Class
		skill.classList.remove('bg-gray-900');				skill.classList.add('bg-white');
		// Project Class
		project.classList.remove('bg-gray-900');			project.classList.add('bg-white');
		// Card Class
		$('.card').removeClass('bg-gray-800');				$('.card').addClass('bg-white');
		// About Me Class
		about.classList.remove('bg-gray-900');				about.classList.add('bg-white');
		// contact Me Class
		contact.classList.remove('bg-gray-900');			contact.classList.add('bg-white');
		// contact links modification
		$('.link').removeClass('border-white');				$('.link').addClass('border-black');
	}
}



// Skill Chart Function
function radar_chart(selector, data) {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create(selector, am4charts.RadarChart);


	chart.data = data;

	// Make chart not full circle
	chart.startAngle = -90;
	chart.endAngle = 180;
	chart.innerRadius = am4core.percent(20);

	// Set number format
	chart.numberFormatter.numberFormat = "#.#'%'";

	// Create axes
	var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.fontWeight = 500;
	categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
		return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
	});
	categoryAxis.renderer.minGridDistance = 10;

	var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = 0;
	valueAxis.max = 100;
	valueAxis.strictMinMax = true;

	// Create series
	var series1 = chart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueX = "full";
	series1.dataFields.categoryY = "category";
	series1.clustered = false;
	series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	series1.columns.template.fillOpacity = 0.08;
	series1.columns.template.cornerRadiusTopLeft = 20;
	series1.columns.template.strokeWidth = 0;
	series1.columns.template.radarColumn.cornerRadius = 20;

	var series2 = chart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueX = "value";
	series2.dataFields.categoryY = "category";
	series2.clustered = false;
	series2.columns.template.strokeWidth = 0;
	series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
	series2.columns.template.radarColumn.cornerRadius = 20;

	series2.columns.template.adapter.add("fill", function (fill, target) {
		return chart.colors.getIndex(target.dataItem.index);
	});

	// Add cursor
	chart.cursor = new am4charts.RadarCursor();
}

chart_data = [
	{ "category": "Web Dev",	"value": 70,	"full": 100 }, 
	{ "category": "Android",	"value": 20,	"full": 100 },
	{ "category": "Python",		"value": 75,	"full": 100 },
	{ "category": "Java",		"value": 75,	"full": 100 },
	{ "category": "C",			"value": 70,	"full": 100},
	{ "category": "Git",		"value": 60,	"full": 100}
];

// Skill Chart Function Call
am4core.ready(function () { radar_chart("chartdiv", chart_data) }); // end am4core.ready()

