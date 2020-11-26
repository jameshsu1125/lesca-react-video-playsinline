module.exports = {
	CanvasVideoPlayer: function (options) {
		var self = this;

		this.cvpHandlers = {
			canvasClickHandler: null,
			videoTimeUpdateHandler: null,
			videoCanPlayHandler: null,
			windowResizeHandler: null,
		};

		this.options = {
			framesPerSecond: 24,
			hideVideo: true,
			autoplay: false,
			audio: false,
			timelineSelector: false,
			resetOnLastFrame: true,
			loop: false,
			onend: function () {},
			onupdate: function (e, t) {},
		};
		for (let i in options) this.options[i] = options[i];

		this.video = this.options.videoSelector;
		this.canvas = this.options.canvasSelector;
		this.timeline = document.querySelector(this.options.timelineSelector);
		this.timelinePassed = document.querySelector(this.options.timelineSelector + '> div');

		if (!this.options.videoSelector || !this.video) {
			console.error('No "videoSelector" property, or the element is not found');
			return;
		}

		if (!this.options.canvasSelector || !this.canvas) {
			console.error('No "canvasSelector" property, or the element is not found');
			return;
		}

		if (this.options.timelineSelector && !this.timeline) {
			console.error('Element for the "timelineSelector" selector not found');
			return;
		}

		if (this.options.timelineSelector && !this.timelinePassed) {
			console.error('Element for the "timelinePassed" not found');
			return;
		}

		if (this.options.audio) {
			if (typeof this.options.audio === 'string') {
				this.audio = document.querySelectorAll(this.options.audio)[0];
				if (!this.audio) {
					console.error('Element for the "audio" not found');
					return;
				}
			} else {
				this.audio = document.createElement('audio');
				this.audio.innerHTML = this.video.innerHTML;
				this.video.parentNode.insertBefore(this.audio, this.video);
				this.audio.load();
			}

			// if (/iPad|iPhone|iPod/.test(navigator.platform)) {
			// 	this.options.autoplay = false;
			// }
		}

		this.ctx = this.canvas.getContext('2d');
		this.playing = false;
		this.resizeTimeoutReference = false;
		this.RESIZE_TIMEOUT = 1000;
		this.setCanvasSize = function () {
			this.width = this.canvas.clientWidth;
			this.height = this.canvas.clientHeight;
			this.canvas.setAttribute('width', this.width);
			this.canvas.setAttribute('height', this.height);
		};
		this.getTime = function () {
			return this.video.currentTime;
		};
		this.getOffset = function () {
			var docElem, rect, doc;
			if (!elem) return;
			rect = elem.getBoundingClientRect();
			if (rect.width || rect.height || elem.getClientRects().length) {
				doc = elem.ownerDocument;
				docElem = doc.documentElement;
				return { top: rect.top + window.pageYOffset - docElem.clientTop, left: rect.left + window.pageXOffset - docElem.clientLeft };
			}
		};
		this.jumpTo = function () {
			this.video.currentTime = this.video.duration * percentage;
			if (this.options.audio) this.audio.currentTime = this.audio.duration * percentage;
		};
		this.goto = function (t) {
			this.video.currentTime = t;
			if (this.options.audio) this.audio.currentTime = t;
		};
		this.init = function () {
			this.video.load();
			this.setCanvasSize();
			if (this.options.hideVideo) this.video.style.display = 'none';
		};
		this.bind = function () {
			this.canvas.addEventListener(
				'click',
				(self.cvpHandlers.canvasClickHandler = function () {
					/*self.playPause();*/
				})
			);
			this.video.addEventListener(
				'timeupdate',
				(self.cvpHandlers.videoTimeUpdateHandler = function () {
					self.drawFrame();
					if (self.options.timelineSelector) {
						self.updateTimeline();
					}
				})
			);
			this.video.addEventListener(
				'canplay',
				(self.cvpHandlers.videoCanPlayHandler = function () {
					self.drawFrame();
				})
			);

			if (this.video.readyState >= 2) {
				self.drawFrame();
			}

			if (self.options.timelineSelector) {
				this.timeline.addEventListener('click', function (e) {
					var offset = e.clientX - self.getOffset(self.canvas).left;
					var percentage = offset / self.timeline.offsetWidth;
					self.jumpTo(percentage);
				});
			}
			window.addEventListener(
				'resize',
				(self.cvpHandlers.windowResizeHandler = function () {
					clearTimeout(self.resizeTimeoutReference);
					self.resizeTimeoutReference = setTimeout(function () {
						self.setCanvasSize();
						self.drawFrame();
					}, self.RESIZE_TIMEOUT);
				})
			);
			this.unbind = function () {
				this.canvas.removeEventListener('click', root.cvpHandlers.canvasClickHandler);
				this.video.removeEventListener('timeupdate', root.cvpHandlers.videoTimeUpdateHandler);
				this.video.removeEventListener('canplay', root.cvpHandlers.videoCanPlayHandler);
				window.removeEventListener('resize', root.cvpHandlers.windowResizeHandler);
				if (this.options.audio) this.audio.parentNode.removeChild(this.audio);
			};
			this.updateTimeline = function () {
				var percentage = ((this.video.currentTime * 100) / this.video.duration).toFixed(2);
				this.timelinePassed.style.width = percentage + '%';
			};
			this.play = function () {
				this.lastTime = Date.now();
				this.playing = true;
				this.loop();
				if (this.options.audio) {
					this.audio.currentTime = this.video.currentTime;
					try {
						this.audio.play();
					} catch {
						console.log('Autoplay video need remove sound track');
					}
				}
			};
			this.pause = function () {
				this.playing = false;
				if (this.options.audio) this.audio.pause();
			};
			this.playPause = function () {
				if (this.playing) this.pause();
				else this.play();
			};
			this.loop = function (argument) {
				var self = this;
				var time = Date.now();
				var elapsed = (time - this.lastTime) / 1000;
				if (elapsed >= 1 / this.options.framesPerSecond) {
					this.video.currentTime = this.video.currentTime + elapsed;
					this.lastTime = time;
					if (this.audio && Math.abs(this.audio.currentTime - this.video.currentTime) > 0.3) this.audio.currentTime = this.video.currentTime;
				}
				this.options.onupdate(this.video.currentTime, this.video.duration, this.video.readyState);
				if (this.video.currentTime >= this.video.duration) {
					this.options.onend();
					this.playing = false;
					if (this.options.resetOnLastFrame === true) this.video.currentTime = 0;
					if (this.options.loop === true) {
						this.video.currentTime = 0;
						this.play();
					}
				}
				if (this.playing) {
					this.animationFrame = requestAnimationFrame(function () {
						self.loop();
					});
				} else {
					cancelAnimationFrame(this.animationFrame);
				}
			};
			this.drawFrame = function () {
				this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
			};
			if (self.options.autoplay) {
				self.play();
			}
		};
		this.init();
		this.bind();
	},
};
