import React from 'react';
import { render } from 'react-dom';
import MyClass from './../lib/index';

import './styles.css';

function Demo() {
	return (
		<>
			<MyClass url={{ mp4: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4' }} width={320} height={300} />
		</>
	);
}

render(<Demo />, document.getElementById('app'));
