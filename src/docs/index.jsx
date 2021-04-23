import React from 'react';
import { render } from 'react-dom';
import MyClass from './../lib/index';

import './styles.css';

export default class Example extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// script
	}

	click() {
		this.refs.myClass.setURL(
			'https://dlcdnwebimgs.asus.com/files/media/6570DD19-B43C-4496-9A24-53CBFB320D9B/vid/enter/video/20201224_Intro_Video_Mobile.mp4'
		);
	}

	render() {
		return (
			<>
				<MyClass
					ref='myClass'
					fps={24}
					url={{
						mp4:
							'https://dlcdnwebimgs.asus.com/files/media/6570DD19-B43C-4496-9A24-53CBFB320D9B/vid/enter/video/20201224_Intro_Video.mp4',
					}}
					width={window.innerWidth}
					height={window.innerHeight}
					onend={() => {
						console.log('a');
					}}
				/>
				<button onClick={this.click.bind(this)}>click</button>
			</>
		);
	}
}

render(<Example />, document.getElementById('app'));
