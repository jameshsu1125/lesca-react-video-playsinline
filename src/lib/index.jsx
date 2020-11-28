import React, { Component } from 'react';
import './style.less';
import { CanvasVideoPlayer } from './canvas-video-player';
import { UserAgent, Loading } from 'lesca';

class playsinline_player extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}

	componentDidMount() {
		if (UserAgent.get() === 'mobile') {
			if (UserAgent.Ios.is()) this.add_canvas_player();
			else this.add_video_player();
		} else this.add_video_player();

		this.timer = setInterval(() => {
			if (this.refs.video.readyState == 4) {
				if (this.props.ready) this.props.ready();
				clearInterval(this.timer);
			}
		}, 10);

		if (this.props.hide) this.hide();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		if (this.video.unbind) this.video.unbind();
	}

	setSize(w, h) {
		this.refs.main.style.width = w + 'px';
		this.refs.main.style.height = h + 'px';
		if (UserAgent.get() === 'mobile') {
			if (UserAgent.Ios.is()) {
				this.video.video.style.width = w + 'px';
				this.video.video.style.height = h + 'px';
			} else {
				this.video.style.width = w + 'px';
				this.video.style.height = h + 'px';
			}
		} else {
			this.video.style.width = w + 'px';
			this.video.style.height = h + 'px';
		}
	}

	getDom() {
		return this.refs.main;
	}

	hide() {
		this.refs.main.style.display = 'none';
	}

	show() {
		this.refs.main.style.display = 'block';
	}

	jumpTo(v) {
		this.video.jumpTo(v);
	}

	pause() {
		this.video.pause();
	}

	play() {
		this.video.play();
	}

	goto(v) {
		this.video.goto(v);
	}
	currentTime() {
		if (UserAgent.get() === 'mobile') {
			if (UserAgent.Ios.is()) return this.video.video.currentTime;
			else return this.video.currentTime;
		} else return this.video.currentTime;
	}

	mute(v) {
		$('video, video').prop('muted', v);
	}

	add_video_player() {
		this.video = this.refs.video;

		this.video.goto = function (v) {
			this.currentTime = v;
		};

		if (this.props.loop) this.video.setAttribute('loop', true);
		if (this.props.onupdate) {
			this.interval = setInterval(() => {
				this.props.onupdate(this.video.currentTime, this.video.duration, this.video.readyState);
			}, 10);
		}
		if (this.props.autoplay != false) this.video.play();
		this.video.onended = this.props.onend || function () {};
	}

	add_canvas_player() {
		let isMute = true;
		if (UserAgent.get() === 'mobile') if (UserAgent.Ios.is()) isMute = false;
		this.video = new CanvasVideoPlayer({
			videoSelector: this.refs.video,
			canvasSelector: this.refs.canvas,
			framesPerSecond: this.props.fps || 24,
			hideVideo: true,
			autoplay: this.props.autoplay || true,
			audio: this.props.audio || isMute,
			loop: this.props.loop || false,
			resetOnLastFrame: false,
			onend: this.props.onend ? this.props.onend : function () {},
			onupdate: this.props.onupdate ? this.props.onupdate : function (e, t) {},
		});
	}

	append_source() {
		let op = [];
		if (this.props.url.mp4) {
			op.push(<source key={'mp4'} src={this.props.url.mp4} type='video/mp4' />);
		} else if (this.props.url.ogg) {
			op.push(<source key={'ogg'} src={this.props.url.ogg} type='video/ogg' />);
		} else if (this.props.url.ogv) {
			op.push(<source key={'ogv'} src={this.props.url.ogg} type='video/ogv' />);
		} else if (this.props.url.webm) {
			op.push(<source key={'webm'} src={this.props.url.webm} type='video/webm' />);
		}
		return op;
	}

	append_player() {
		if (UserAgent.get() === 'mobile') {
			if (UserAgent.Ios.is()) {
				return (
					<>
						<canvas ref='canvas' width={this.props.width || 560} height={this.props.height || 560} />
						<video muted ref='video' muted width={this.props.width || 560} height={this.props.height || 315}>
							{this.append_source()}
						</video>
					</>
				);
			} else {
				return (
					<video muted ref='video' width={this.props.width} height={this.props.height}>
						{this.append_source()}
					</video>
				);
			}
		} else {
			return (
				<video muted ref='video' width={this.props.width} height={this.props.height}>
					{this.append_source()}
				</video>
			);
		}
	}

	append_loading() {
		if (this.state.loading) return <Loading />;
	}

	render() {
		return (
			<div
				ref='main'
				className='video-playsinline-player'
				style={{
					width: this.props.width ? this.props.width + 'px' : '560px',
					height: this.props.height ? this.props.height + 'px' : '315px',
				}}>
				{this.append_player()}
				{this.append_loading()}
			</div>
		);
	}
}

export default playsinline_player;
