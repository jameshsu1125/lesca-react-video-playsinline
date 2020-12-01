[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-react-video-playsinline --save
```

# Usage

```javascript
import Player from 'lesca-react-video-playsinline';

reader(){
    return(
        <Player width='1080' height='768' />
    )
}
```

# Props

| props    |           options           | default |
| :------- | :-------------------------: | ------: |
| width    |         video width         |   560px |
| height   |        video height         |   315px |
| hide     |      style => display       | visible |
| fps      |  only mobile on ios device  |      24 |
| autoplay |      mobile will mute       |    true |
| loop     | restart when video play end |   false |
| onend    |  event when video play end  |         |
| onupdate | update state by every frame |         |

# Method

| props       |          options          | default |
| :---------- | :-----------------------: | ------: |
| getDom      |     return player DOM     |         |
| hide        |     display = 'none'      |         |
| show        |     display = 'block'     |         |
| pause       |        pause video        |         |
| play        |        play video         |         |
| goto        |  goto video current time  |         |
| currentTime | return video current time |         |

```javascript
import Player from 'lesca-react-video-playsinline';

componentDidMount(){
    let player = this.refs.player;
    player.getDom(); // return <div class='video-playsinline-player'></div>
    player.hide();
}

reader(){
    return(
        <Player ref='player' width='1080' height='768' />
    )
}
```
