
// Load below-the-fold CSS
// the CSS will automatically execute when loaded
(function loadCSS(){
    $('head').append('<link rel="stylesheet" href="css/styles.css">');
})();

//Animation
// Fade-in/up game features
$('.features li').each(function(i, el) {
	$(el).velocity({
		opacity: 1,
		translateY: "-20px",
	}, {
		duration: 500,
		delay: i*250,
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
