var canvas, context;
// Utils

// Vector

/**
 * @method
 */
function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

/**
 * @method
 */
function getAngle(from, to) {
	return Math.atan2(from.y - to.y, from.x - to.x);
}

/**
 * @method
 */
function getDirectionVector(angle) {
	return {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};
}

/**
 * @method
 */
function getVectorTowards(from, to) {
	var angle = getAngle(from, to);
	return getDirectionVector(angle - Math.PI);
}



/** 
 * @class Particle
 */
class Particle {
  
  /**
   * @constructor
   */
	constructor(
		x, y,
		style = '#fff',
		diameter = Math.random() * 4 + 0.5,
		direction = Math.random() * Math.PI,
		damping = 0.85,
		steeringRandomness = 0.25,
		steeringForce = 0.1,
		boundaryForce = 0.3,
		movementRadius = Math.random() * 10 + 10
	) {
		this.position = {
			current: {
				x,
				y
			},
			home: {
				x,
				y
			}
		};

		this.velocity = {
			x: 0,
			y: 0
		};

		this.direction = direction;

		this.settings = {
			boundaryForce,
			style,
			diameter,
			damping,
			movementRadius,
			steeringForce,
			steeringRandomness
		};
	}

  /**
   * @method
   */
	move() {
		const { steeringForce, movementRadius, boundaryForce, damping } = this.settings;

		var { current, home } = this.position;

		var { velocity } = this;
		if (typeof getDirectionVector == 'undefined'){
			return;
		}
		// Add velocity in the current direction.
		const steeringVector = getDirectionVector(this.direction);
		velocity.x += steeringVector.x * steeringForce;
		velocity.y += steeringVector.y * steeringForce;

		// Randomly steer the direction around
		this.setDirection();

		// Get distance from home coordinates
		var dist = distance(current.x, current.y, home.x, home.y);

		// Apply a force shoving each particle back toward the "home" position modulated by the distance from that home point compared to the `movementRadius` threshold.
		if (dist > 0) {
			var steerToHome = getVectorTowards(current, home);

			dist = (movementRadius + dist) / 2;
			dist = (dist / movementRadius);

			velocity.x += steerToHome.x * dist * boundaryForce;
			velocity.y += steerToHome.y * dist * boundaryForce;
		}

		velocity.x *= damping;
		velocity.y *= damping;

		current.x += velocity.x;
		current.y += velocity.y;
	}
  
  /**
   * @method
   */
	draw() {
		const { diameter, style } = this.settings;
		var { current } = this.position;
		var radius = diameter / 2;
		if (typeof context == 'object'){
			context.fillStyle = typeof style === 'function' ? style() : style;
			if (typeof context.beginPath == 'function'){
				context.beginPath();
			}
			if (typeof context.arc == 'function'){
				context.arc(current.x, current.y, radius, 0, Math.PI * 2, false);
			}
			if (typeof context.closePath == 'function'){
				context.closePath();
			}
			if (typeof context.fill == 'function'){
				context.fill();
			}
		}
	}

  /**
   * @method
   */
  setHome(home) {
    this.position.home = home;
  }

  /**
   * @method
   */
	setDirection(target) {
		const { steeringRandomness } = this.settings;

		if (target) {
			let { current } = this.position;
			this.hasTarget = true;
			this.direction = getAngle(target, current);
		} else {
			this.hasTarget = false;
			this.direction += (Math.random() * 2 - 1) * steeringRandomness;
		}
	}
}



/**
 * @class Sine
 */
class Sine {

	/** 
	 * @constructor
	 */
  constructor(
    hz = 1,
    style = 'rgba(255, 255, 255, 0.9)',
    speed = 1,
    offset = 0,
    spread = 3,
    amp = canvas.height * 0.9,
    xOffset = canvas.width * 0.05,
    yOffset = canvas.height * 0.05
  ) {
    this.hz = hz;
    this.speed = speed * hz;
    this.offset = offset * Math.PI * 2 / hz;
    this.spread = spread;
      
    this.amp = amp;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
      
    const width = canvas.width - xOffset * 2;
    const particles = [];
    for (let x = 0; x < width; x = x + spread) {
      let y = Math.sin(x / (width) * Math.PI * 2 * hz + offset) * amp / 2 + amp / 2 + xOffset;
      particles.push(new Particle(
        canvas.width / 2,
        canvas.height / 2,
        typeof style === 'function' ? style(particles.length) : style
      ));
    }
    this.particles = particles;
      
    this.draw();
  }

	/** 
	 * @method
	 * @desc
	 * Draw sine wave at time
	 *
	 * @param {number} time
	 */
  draw(time = 0) {
    const { particles, hz, style, speed, offset, spread, amp, yOffset, xOffset } = this;
    
    time *= speed;
    if (typeof canvas == 'undefined'){
		return;
	}
    const width = canvas.width - xOffset * 2;
    for (let x = 0; x * spread < width; x++) {
      let realX = x * spread;
      let y = Math.sin(realX / (width) * Math.PI * 2 * hz + offset + time) * amp / 2 + amp / 2 + yOffset;
      let particle = particles[x];
      particle.setHome({ x: realX + xOffset, y });
      particle.move();
      particle.draw();
    }
    
  }
}



/**
 * @class Animator
 */
class Animator {

	/** 
	 * @constructor
	 *
	 * @param {number} fps
	 */
	constructor(fps) {
		this.setFps(fps);
    this.frame = 0;
	}

	/** 
	 * @method
	 * @desc
	 * Set target FPS
	 *
	 * @param {number} fps
	 */
	setFps(fps = 30) {
		this.fps = fps;
    this.fis = 1000 / fps; // Frame in seconds

		return this.fps;
	}

	/** 
	 * @method
	 * @desc
	 * Starts animation
	 *
	 * @param {function} draw - Drawing animation to run each cycle
	 */
	animate(draw) {
		this.isAnimating = true;

		if (typeof draw === 'function') {
			this._draw = draw;
		} 

		this.animationFrame = window.requestAnimationFrame(() => this.animate());

		var now = Date.now();
		if (this.lastFrameDate === undefined || (now - this.lastFrameDate > this.fis)) {
			if (this._draw) {
				this._draw(this.frame, this.fps, this.lastFrameDate);
			}
      
      this.frame++;
			this.lastFrameDate = now;
		}

		return this.animationFrame;
	}

	/** 
	 * @method
	 * @desc
	 * Stop animation
	 */
	stop() {
		this.isAnimating = false;
		
		raf.cancelAnimationFrame(this.animationFrame);

		return this.animationFrame;
	}
}




// Get this show rolling

// Generate waves

function laustdeleuran_run()
{
	var waves = [
		new Sine(1, index => `hsl(275, 100%, ${60 + index % 30}%)`, -1),
		new Sine(2, index => `hsl(330, 100%, ${70 + index % 30}%)`, 1)
	];
	// Start animation
	const animator = new Animator(60);
	animator.animate(function (frame, fps){
		if (typeof context != 'undefined'){
			if (typeof context.clearRect == 'function'){
				context.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	  waves.forEach(wave => wave.draw(frame / fps))
	});
}
function vt_imaging_plg_laustdeleuran(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerClearVariables('canvas;context;distance;getAngle;getDirectionVector;getVectorTowards;Particle;Sine;Animator;laustdeleuran_run');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().append('<canvas id="canvas" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	canvas = _self.getImagingOverlay().find('canvas#canvas')[0];
    context = canvas.getContext('2d');
	canvas.width = _self.getImaging().width();
	canvas.height = _self.getImaging().height();
	if (typeof laustdeleuran_run != 'undefined'){
		laustdeleuran_run();
	}
	_self.onCompletePlugin("noneimage");
	_self.getImagingOverlay().css({
		'height': _self.getImaging().height(),
		'width': _self.getImaging().width(),
		'overflow': 'hidden',
		'background': '#000',
		'background-image': 'radial-gradient(ellipse at center, #111 0%,#000 100%)'
	});
}