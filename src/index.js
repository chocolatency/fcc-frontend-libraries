import React from 'react'
import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './clock.scss'

class App extends React.Component {

	constructor( props ) {
		super(props)
		this.state = {
			defaultSessionBreak: 5,
			defaultSessionDuration: 25,
			sessionBreak: 5,
			sessionDuration: 25,
			seconds: 0,
			active: 'session', // break
			action: 'pause',
			timeLeft: "25:00"
		}
		this.interval = ''
		this.audio = ''
	}

	increaseDuration = ( event ) => {
		
		if( event.target.dataset.control === 'session' ) {
			if( this.state.sessionDuration < 60 && this.state.action === 'pause' ) {

				this.setState({
					sessionDuration: this.state.sessionDuration + 1,
					timeLeft: `${this.state.sessionDuration + 1}:00`
				})
			}

		} else {
			if( this.state.sessionBreak < 60 && this.state.action === 'pause' ) {

				this.setState({
					sessionBreak: this.state.sessionBreak + 1,
					// timeLeft: `${this.state.sessionBreak + 1}:00`
				})
			}
		}

	}

	decreaseDuration = ( event ) => {

		if( event.target.dataset.control === 'session' ) {
			if( this.state.sessionDuration > 1 && this.state.action === 'pause' ) {

				this.setState({
					sessionDuration: this.state.sessionDuration - 1,
					timeLeft: `${this.state.sessionDuration - 1}:00`
					
				})
			}
		} else {
			if( this.state.sessionBreak > 1 && this.state.action === 'pause' ) {
				this.setState({
					sessionBreak: this.state.sessionBreak - 1,
					// timeLeft: `${this.state.sessionBreak - 1}:00`

				})
			}
		}

	}

	handlePlay = () => {
		console.log( 'handlePlay' )

		if( this.state.action === "pause" ) {

			this.interval = setInterval( () => {

				// let timeLeft = this.state.timeLeft
				// let sessionDuration = this.state.sessionDuration
				// let sessionBreak = this.state.sessionBreak
				let active = this.state.active
				let action = 'play'

				let timeLeft;
				let mmSs = this.state.timeLeft.split(':')
				let minutes = parseInt( mmSs[0] )
				let seconds = parseInt( mmSs[1] )

				if( seconds === 0 && minutes > 0 ) {
					minutes -= 1;
					seconds = 59
					timeLeft = `${(minutes < 10) ? `0${minutes}`:minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`

				} else if ( seconds > 0 && minutes >= 0 ) {
					seconds -= 1;
					timeLeft = `${(minutes < 10) ? `0${minutes}`:minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`
				} else if ( seconds === 0 && minutes === 0 ) {
					active = ( this.state.active === "session" ) ? "break" : "session"

					if ( this.state.active === "session" ) {
						timeLeft = `${( this.state.sessionBreak < 10 )?`0${this.state.sessionBreak}`:this.state.sessionBreak}:00` 
						// action = "break"
					} else {
						timeLeft = `${( this.state.sessionDuration < 10 )?`0${this.state.sessionDuration}`:this.state.sessionDuration}:00` 
						// action = "session"
					}

					this.audio.play()
				}



				this.setState({
					// sessionDuration: sessionDuration,
					// sessionBreak: sessionBreak,
					active: active,
					timeLeft: timeLeft,
					action: action
				})

				// console.log( mmSs )


			}, 1000)

		} else {
			this.setState({
				action: 'pause'
			})
			clearInterval( this.interval )
			this.audio.pause()
			this.audio.currentTime = 0

		}
	}

	handlePause = () => {
		console.log( 'handlePause' )
		clearInterval( this.interval )
		this.audio.pause()
		this.audio.currentTime = 0
	}

	handleClear = () => {
		console.log( 'handleClear' )
		clearInterval( this.interval )
		this.audio.pause()
		this.audio.currentTime = 0
		this.setState({
			sessionBreak: this.state.defaultSessionBreak,
			sessionDuration: this.state.defaultSessionDuration,
			seconds: 0,
			timeLeft: "25:00",
			action: 'pause'
		})	
	}

	componentDidMount() {
		this.audio = document.querySelector("#beep")

		// const soundNotification = () => {
		// 	if( audio ) {
		// 		audio.addEventListener("canplaythrough", event => {
		// 	  		audio.play();
		// 		});
		// 	}
		// }


	}

	setTimer = ( active, seconds, sessionDuration, sessionBreak ) => {

		let time = ``;

		if( active === "session" ) {

			time = `${sessionDuration}:${( seconds < 10 ) ? `0${ seconds }` : seconds}`

		} else {

			time = `${sessionBreak}:${( seconds < 10 ) ? `0${ seconds }` : seconds}`

		}
		console.log( time )
		return (
			<>{ time }</>
		)

	}

	render() {

		const seconds = this.state.seconds
		const sessionDuration = this.state.sessionDuration
		const sessionBreak = this.state.sessionBreak
		const active = this.state.active

		return (
			<>	
				<h1 className="page-title">25 + 5 Clock</h1>
				<div className="settings">
					<section className="settings-block">
						<h2 id="break-label">Session break</h2>
						<div className="session-controls">
							<i id="break-increment" className="fas fa-arrow-down" onClick={this.decreaseDuration} data-control="break"></i>
							<span id="break-length">{this.state.sessionBreak}</span>
							<i id="break-decrement" className="fas fa-arrow-up" onClick={this.increaseDuration} data-control="break"></i>
						</div>
					</section>
					<section className="settings-block">
						<h2 id="session-label">Session duration</h2>
						<div className="session-controls">
							<i id="session-increment" className="fas fa-arrow-down" onClick={this.decreaseDuration} data-control="session"></i>
							<span id="session-length">{this.state.sessionDuration}</span>
							<i id="session-decrement" className="fas fa-arrow-up" onClick={this.increaseDuration} data-control="session"></i>
						</div>
					</section>

				</div>

				<section className="session">
					<h2 id="timer-label" style={{textTransform:"capitalize"}}>{this.state.active}</h2>
					<div id="time-left">{ this.state.timeLeft }</div>
				</section>

				<div className="controls">
					<button id="start_stop" onClick={this.handlePlay} >
						<i className="fas fa-play"></i>
						<i className="fas fa-pause"></i>
					</button>
					<button id="reset" onClick={this.handleClear}>
						<i className="fas fa-redo-alt"></i>
					</button>
				</div>

				<div>
					<audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
				</div>

			</>
		)
	}
	
}


ReactDOM.render( <App />, document.getElementById("root"))


// class App extends React.Component {

// 	constructor( props ) {
// 		super(props)
// 		this.state = {
// 			defaultSessionBreak: 5,
// 			defaultSessionDuration: 25,
// 			sessionBreak: 5,
// 			sessionDuration: 25,
// 			seconds: 0,
// 			active: 'session', // break
// 			action: 'pause',
// 			timeLeft: "25:00"
// 		}
// 		this.interval = ''
// 		this.audio = ''
// 	}

// 	increaseDuration = ( event ) => {
		
// 		if( event.target.dataset.control === 'session' ) {
// 			if( this.state.sessionDuration < 60 ) {
// 				this.setState({
// 					sessionDuration: this.state.sessionDuration + 1,
// 					defaultSessionDuration: this.state.sessionDuration + 1
// 				})
// 			}

// 		} else {
// 			if( this.state.sessionBreak < 60 ) {
// 				this.setState({
// 					sessionBreak: this.state.sessionBreak + 1,
// 					defaultSessionBreak: this.state.sessionBreak + 1
// 				})
// 			}
// 		}

// 	}

// 	decreaseDuration = ( event ) => {

// 		if( event.target.dataset.control === 'session' ) {
// 			if( this.state.sessionDuration > 1 ) {

// 				this.setState({
// 					sessionDuration: this.state.sessionDuration - 1,
// 					defaultSessionDuration: this.state.sessionDuration - 1
// 				})
// 			}
// 		} else {
// 			if( this.state.sessionBreak > 1 ) {
// 				this.setState({
// 					sessionBreak: this.state.sessionBreak - 1,
// 					defaultSessionBreak: this.state.sessionBreak - 1
// 				})
// 			}
// 		}

// 	}

// 	handlePlay = () => {
// 		console.log( 'handlePlay' )

// 		if( this.state.action === "pause" ) {

// 			this.interval = setInterval( () => {

// 				console.log( this.state.active)

// 				if( this.state.seconds === 0 ) {

// 					if( this.state.active === "session" ) {

// 						if( this.state.sessionDuration >= 1 ) {
// 							this.setState({
// 								seconds: 59,
// 								sessionDuration: this.state.sessionDuration - 1,
// 								action: 'play'
// 							})

// 						} else {
// 							this.audio.play();
// 							this.setState({
// 								seconds: 0,
// 								sessionDuration: this.state.defaultSessionDuration,
// 								active: 'break',
// 								action: 'play'
// 							})
// 						}


// 					} else {
// 						if( this.state.sessionBreak >= 1 ) {
// 							this.setState({
// 								seconds: 59,
// 								sessionBreak: this.state.sessionBreak - 1,
// 								action: 'play'
// 							})
// 						} else {
// 							this.audio.play();
// 							this.setState({
// 								seconds: 0,
// 								sessionBreak: this.state.defaultSessionBreak,
// 								active: 'session',
// 								action: 'play'
// 							})
// 						}

// 					}



// 				} else {
// 					this.setState({
// 						seconds: this.state.seconds - 1
// 					})
// 				}


// 			}, 1000)

// 		} else {
// 			this.setState({
// 				action: 'pause'
// 			})
// 			clearInterval( this.interval )
// 			this.audio.pause()
// 			this.audio.currentTime = 0

// 		}
// 	}

// 	handlePause = () => {
// 		console.log( 'handlePause' )
// 		clearInterval( this.interval )
// 		this.audio.pause()
// 		this.audio.currentTime = 0
// 	}

// 	handleClear = () => {
// 		console.log( 'handleClear' )
// 		clearInterval( this.interval )
// 		this.audio.pause()
// 		this.audio.currentTime = 0
// 		this.setState({
// 			sessionBreak: this.state.defaultSessionBreak,
// 			sessionDuration: this.state.defaultSessionDuration,
// 			seconds: 0
// 		})	
// 	}

// 	componentDidMount() {
// 		this.audio = document.querySelector("#beep")

// 		// const soundNotification = () => {
// 		// 	if( audio ) {
// 		// 		audio.addEventListener("canplaythrough", event => {
// 		// 	  		audio.play();
// 		// 		});
// 		// 	}
// 		// }


// 	}

// 	setTimer = ( active, seconds, sessionDuration, sessionBreak ) => {

// 		let time = ``;

// 		if( active === "session" ) {

// 			time = `${sessionDuration}:${( seconds < 10 ) ? `0${ seconds }` : seconds}`

// 		} else {

// 			time = `${sessionBreak}:${( seconds < 10 ) ? `0${ seconds }` : seconds}`

// 		}
// 		console.log( time )
// 		return (
// 			<>{ time }</>
// 		)

// 	}

// 	render() {

// 		const seconds = this.state.seconds
// 		const sessionDuration = this.state.sessionDuration
// 		const sessionBreak = this.state.sessionBreak
// 		const active = this.state.active

// 		return (
// 			<>	
// 				<h1 className="page-title">25 + 5 Clock</h1>
// 				<div className="settings">
// 					<section className="settings-block">
// 						<h2 id="break-label">Session break</h2>
// 						<div className="session-controls">
// 							<i id="break-increment" className="fas fa-arrow-down" onClick={this.decreaseDuration} data-control="break"></i>
// 							<span id="break-length">{this.state.defaultSessionBreak}</span>
// 							<i id="break-decrement" className="fas fa-arrow-up" onClick={this.increaseDuration} data-control="break"></i>
// 						</div>
// 					</section>
// 					<section className="settings-block">
// 						<h2 id="session-label">Session duration</h2>
// 						<div className="session-controls">
// 							<i id="session-increment" className="fas fa-arrow-down" onClick={this.decreaseDuration} data-control="session"></i>
// 							<span id="session-length">{this.state.defaultSessionDuration}</span>
// 							<i id="session-decrement" className="fas fa-arrow-up" onClick={this.increaseDuration} data-control="session"></i>
// 						</div>
// 					</section>

// 				</div>

// 				<section className="session">
// 					<h2 id="timer-label" style={{textTransform:"capitalize"}}>{this.state.active}</h2>
// 					<div id="time-left">{ this.setTimer( this.state.active, this.state.seconds, this.state.sessionDuration, this.state.sessionBreak ) }</div>
// 				</section>

// 				<div className="controls">
// 					<button id="start_stop" onClick={this.handlePlay} >
// 						<i className="fas fa-play"></i>
// 						<i className="fas fa-pause"></i>
// 					</button>
// 					<button id="reset">
// 						<i className="fas fa-redo-alt" onClick={this.handleClear}></i>
// 					</button>
// 				</div>

// 				<div>
// 					<audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
// 				</div>

// 			</>
// 		)
// 	}
	
// }


// ReactDOM.render( <App />, document.getElementById("root"))