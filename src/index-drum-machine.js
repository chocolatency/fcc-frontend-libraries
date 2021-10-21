import React from 'react'
import ReactDOM from 'react-dom'
import "./drum-machine.scss"

const buttons = {
	genre1: {
		Q: {
			id: "Heater-1",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
			name: "Heater 1"
		},
		W: {
			id: "Heater-2",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
			name: "Heater 2"
		},
		E: {
			id: 'Heater-3',
			src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
			name: "Heater 3"
		},
		A: {
			id: "Heater-4",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
			name: "Heater 4",
		},
		S: {
			id: "Heater-6",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
			name: "Heater 6"
		},
		D: {
			id: "Dsc-Oh",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
			name: "Dsc Oh"
		},
		Z: {
			id: "Kick-n-Hat",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
			name: "Kick n Hat"
		},
		X: {
			id: "RP4-Kick",
			src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
			name: "RP4 Kick"
		},
		C: {
			id: "Cev-h2",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
			name: "Cev h2"
		},
	},
	genre2: {
		Q: {
			id: "Chord-1",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
			name: "Chord 1"
		},
		W: {
			id: "Chord-2",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
			name: "Chord 2"
		},
		E: {
			id:"Chord-3",
			src:"https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
			name: "Chord 3"
		},
		A: {
			id: "Give-us-a-light",
			src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
			name: "Light beam"
		},
		S: {
			id:"Dry-ohh",
			src:"https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
			name: "Dry ohh"
		},
		D: {
			id:"Bld-h1",
			src:"https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
			name: "Bld h1"
		},
		Z: {
			id:"punchy_kick_1",
			src:"https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
			name:"Punchy Kick"
		},
		X: {
			id:"side-stick",
			src:"https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
			name:"Side stick"
		},
		C: {
			id:"Brk_Snr",
			src:"https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
			name:"Brk Snr"
		},
	}
}

const renderButton = ( buttonHit, buttons ) => {
	

	let template = [];
	let i = 0;
	for( let key in buttons ) {
		template.push(
			<div id={buttons[key].id} key={i} className="drum-pad" onClick={buttonHit} data-name={buttons[key].name}>
				<audio className="clip" id={key} src={buttons[key].src}></audio>
				{key}
			</div>
		)

		i++
	}

	return template
}

const Controller = ( props ) => {
	return (
			<section className="keyboard" >
				{renderButton( props.buttonHit, props.buttons )}
			</section>
		)
}

const Switcher = (props) => {
	let classes = "switcher "
	if( props.power === 'on' || props.genre === 'genre2') {
		classes += "on"
	}
	return (
		<div className={classes} onClick={props.handleClick}>

		</div>
	)
}

const Adjust = (props) => {
	return (
		<section className='adjust-pad'>
			<div className="adjust-pad-container">
				<h2 className="power-label">Power</h2>
				<Switcher handleClick={props.handlePower} power={props.power} />
				<div id="display">{props.display}</div>
				
				<label htmlFor="volume-range" className="volume-label">Volume</label>	
				<input id="volume-range" className="volume-range" type="range" step="0.01" min="0" max="1" value={props.volume} onChange={props.handleVolume} />

				<h2 className="genre-label">Genre</h2>
				<div className="genre-switcher">
					<Switcher className="genre-switcher" handleClick={props.handleGenrePick} genre={props.genre} />
				</div>
			</div>
		</section>
	)
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			genre: 'genre1',
			power: 'on',
			volume: 1,
			display: ""
		}
		this.audio = ''
	}

	powerOn = () => {
		this.setState({
			power: ( this.state.power === 'on' ) ? 'off' : 'on',
		})
	}

	handleVolume = (event) => {
		this.setState({
			volume: event.target.value
		})
	}

	handleGenrePick = () => {
		this.setState({
			genre: ( this.state.genre === 'genre1' ) ? 'genre2' : 'genre1',
		})
	}

	buttonHit = (event) => {
		let key = event.target.textContent
		
		this.triggerAudio(key)
	}

	triggerAudio = (key) => {

		if( this.state.power === 'on' && buttons.genre1.hasOwnProperty(key)) {

			this.audio = document.querySelector(`#${key}`)

			this.audio.pause()
			this.audio.currentTime = 0
	        this.audio.volume = this.state.volume
	        this.audio.play()
	        let button = this.audio.parentElement

		  	button.style.transform = `scale(.95)`;
		  	setTimeout(() => {
		  		button.style.transform = `scale(1)`;
		  	}, 100);

		  	this.setState({
		  		display: button.dataset.name
		  	})
		}

	}

	componentDidMount() {
		document.addEventListener('keypress', (event) => {

			const keyName = event.key.toUpperCase();
			this.triggerAudio( keyName )
			
		});
	}

	render() {

		return (
			<div id="drum-machine">
				<Controller buttons={buttons[this.state.genre]} buttonHit={this.buttonHit} />
				<Adjust 
					handlePower={this.powerOn} 
					power={this.state.power} 
					volume={this.state.volume} 
					handleVolume={this.handleVolume} 
					handleGenrePick={this.handleGenrePick}
					genre={this.state.genre}
					display={this.state.display}
				/>
			</div>
		)		
	}

	
}

ReactDOM.render(<App />, document.querySelector('#root'))