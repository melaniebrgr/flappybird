window.addEventListener("load", function(event) {
	// Calculate TTFB (time to first byte) with Navigation Timing API
	// Calculate back-end load time with Navigation Timing API
	// Calculate front-end load time with Navigation Timing API
	// Console.log the names, resource type, and load times for all our resources using the Resource Timing API		
	var loadEventTime = new Date().getTime(),
		timings = window.performance.timing,
		ttfb = timings.responseStart - timings.navigationStart,
		backEndLoadTime = timings.responseStart - timings.requestStart,
		frontEndLoadTime = loadEventTime - timings.domLoading,
		resources = performance.getEntriesByType("resource");
		answer = 'TTFB: '+ttfb+'ms\nBack-end load time: '+backEndLoadTime+'ms\nFront-end load time: '+frontEndLoadTime+'ms\n\nResources:\n';
		
	resources.forEach(function(el) {
		var loadTime = el.responseEnd - el.responseStart;
		answer += 'name: '+el.name+' \ntype: '+el.entryType+' \nload time: '+loadTime.toFixed(2)+'\n\n';
	});

	console.log(answer);
});

$(function() {
	// Load below-the-fold CSS
	// the CSS will automatically execute when loaded
	// (function loadCSS(){
	//     $('head').append('<link rel="stylesheet" href="css/styles.css">');
	// })();

	//Animation
	// Fade-in/up game features
	$('.features li').each(function(i, el) {
		$(el).velocity({
			opacity: 1,
			translateY: "-20px",
		}, {
			duration: 500,
			delay: (i*250+250),
			easing: "easeOutQuad"
		});
	});

	// Wiggle CTA after delay
	$('.call-to-action .button').velocity({
		rotateZ: 4
	}, {
		duration: 100,
		delay: 4000
	}).velocity({
		rotateZ: -4
	}, {
		duration: 100
	}).velocity("reverse").velocity({
		rotateZ: 0
	}, {
		duration: 100
	});
});