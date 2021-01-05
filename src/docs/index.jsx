import React from 'react';
import { render } from 'react-dom';
import MyClass from './../lib/index';

import './styles.css';

function update(e, t, d) {
	//console.log(e, t, d);
}

function Demo() {
	return (
		<MyClass
			fps={24}
			url={{ mp4: 'https://dlcdnwebimgs.asus.com/files/media/6570DD19-B43C-4496-9A24-53CBFB320D9B/vid/enter/video/20201224_Intro_Video_Mobile.mp4' }}
			width={window.innerWidth}
			height={window.innerHeight}
			onupdate={update}
		/>
	);
}

render(<Demo />, document.getElementById('app'));
