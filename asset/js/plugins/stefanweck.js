/**
 * Constants
 */
const TWO_PI = Math.PI * 2;
var canvas_width = 0;
var canvas_height = 0;
/**
 * Application Class
 */
class Application {
    /**
     * Application constructor
     */
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = canvas_width;
        this.height = this.canvas.height = canvas_height;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];

        //Resize listener for the canvas to fill browser window dynamically
       // window.addEventListener('resize', () => this.resizeCanvas(), false);
    }

    /**
     * Simple resize function. Reinitializes everything on the canvas while changing the width/height
     */
    resizeCanvas() {
        this.width = this.canvas.width = canvas_width;
        this.height = this.canvas.height = canvas_height;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        //Empty the previous container and fill it again with new CircleContainer objects
        this.circleContainers = [];
        this.initializeCircleContainers();
    }

    /**
     * Create a number of CircleContainer objects based on the numberOfContainers variable
     * @return void
     */
    initializeCircleContainers() {
        for (let x = 0; x < this.width + 100; x += 100) {
            for (let y = 0; y < this.height + 100; y += 100) {
                //Initialize a new instance of the CircleContainer class
                let circleContainer = new CircleContainer(this.context, x, y);

                //Let the CircleContainer initialize it's children
                circleContainer.initializeCircles();

                //Add the container to our array of CircleContainer objects
                this.circleContainers.push(circleContainer);
            }
        }
		jQuery(document).trigger("slide_next_complete", ['vt-imaging-app']);
    }

    /**
     * Updates the application and every child of the application
     * @return void
     */
    update() {
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].update();
        }
    }

    /**
     * Renders the application and every child of the application
     * @return void
     */
    render() {
        //Clear the entire canvas every render
        this.context.clearRect(0, 0, this.width, this.height);

        //Trigger the render function on every child element
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].render();
        }
		
    }

    /**
     * Update and render the application at least 60 times a second
     * @return void
     */
    loop() {
		
        this.update();
        this.render();

        window.requestAnimationFrame(() => this.loop());
    }
}

/**
 * CircleContainer Class
 */
class CircleContainer {
    /**
     * CircleContainer constructor
     * @param context - The context from the canvas object of the Application
     * @param x
     * @param y
     */
    constructor(context, x, y) {
        this.context = context;
        this.position = {x, y};

        this.numberOfCircles = 19;
        this.circles = [];

        this.baseRadius = 20;
        this.bounceRadius = 150;
        this.singleSlice = TWO_PI / this.numberOfCircles;
    }

    /**
     * Create a number of Circle objects based on the numberOfCircles variable
     * @return void
     */
    initializeCircles() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
    }

    /**
     * Try to update the application at least 60 times a second
     * @return void
     */
    update() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].update(this.context);
        }
    }

    /**
     * Try to render the application at least 60 times a second
     * @return void
     */
    render() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].render(this.context);
        }
    }
}

/**
 * Circle Class
 */
class Circle {
    /**
     * Circle constructor
     * @param x - The horizontal position of this circle
     * @param y - The vertical position of this circle
     * @param baseRadius
     * @param bounceRadius
     * @param angleCircle
     */
    constructor(x, y, baseRadius, bounceRadius, angleCircle) {
        this.basePosition = {x, y};
        this.position = {x, y};
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = (x + y);
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
    }

    /**
     * Update the position of this object
     * @return void
     */
    update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;

        this.angle += this.speed;
    }

    /**
     * Renders this Circle object on the canvas
     * @param context - The context from the canvas object of the Application
     * @return void
     */
    render(context) {
        context.fillStyle = "hsl(195, 100%, "+this.size * 4+"%)";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        context.fill();
    }
}

window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_stefanweck'];
}
function vt_imaging_plg_stefanweck(_self, imaging, audio, div_slide)
{
	_self.createScreenLoading();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	audio.find('source').attr('src', _self.getCurrentImage().audio_src);
	audio.find('source').attr('type', 'audio/mpeg');
	audio[0].load();
	audio[0].play();
	var old_height = imaging.height();
	var old_width = imaging.width();
	imaging.find('img').attr('src', 'none');
	imaging.find('img').attr('alt', '');
	imaging.css({
		'height': old_height,
		'width': old_width,
		'background':'#FFF',
		'display':'inline-block'
	});
	_self.resizeFix();
	canvas_width = imaging.width();
	canvas_height = imaging.height();
	div_slide.append('<canvas id="canvas">Your browser doesn\'t support canvas</canvas>'
+'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'
+'    <defs>'
+'      <filter id="shadowed-goo">'
+'          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />'
+'          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />'
+'          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />'
+'          <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />'
+'          <feOffset in="shadow" dx="1" dy="1" result="shadow" />'
+'          <feBlend in2="shadow" in="goo" result="goo" />'
+'          <feBlend in2="goo" in="SourceGraphic" result="mix" />'
+'      </filter>'
+'      <filter id="goo">'
+'          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />'
+'          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />'
+'          <feBlend in2="goo" in="SourceGraphic" result="mix" />'
+'      </filter>'
+'    </defs>'
+'</svg>');
	_self.clearScreenLoading();
	vt_imaging_application = new Application();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
    //vt_imaging_application the CircleContainer objects
    vt_imaging_application.initializeCircleContainers();
	
    //Start the initial loop function for the first time
    vt_imaging_application.loop();
	_self.onCompletePlugin("vt_imaging_plg_stefanweck", "noneimage");
	div_slide.show();
	div_slide.css({
		'background-color':'hsl(195, 100%, 7%)'
	});
}