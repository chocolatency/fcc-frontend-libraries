import { React, Component } from 'react';
import ReactDOM from 'react-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './calculator.scss'


let Calculator = (props) => {
	return (
		<div className="calculator">


			<div className="equation">{props.priorValue ? props.priorValue : '|'}</div>
			<div id="display">{props.value ? props.value : 0}</div>
			<button id="clear" data-value="clear" onClick={props.handleClick}>AC</button>
			<button id="divide" data-value="div" onClick={props.handleClick}>/</button>
			<button id="multiply" data-value="mul" onClick={props.handleClick}>x</button>


			<button id="seven" data-value="7" onClick={props.handleClick}>7</button>
			<button id="eight" data-value="8" onClick={props.handleClick}>8</button>
			<button id="nine" data-value="9" onClick={props.handleClick}>9</button>

			<button id="add" data-value="add" onClick={props.handleClick}>+</button>

			<button id="four" data-value="4" onClick={props.handleClick}>4</button>
			<button id="five" data-value="5" onClick={props.handleClick}>5</button>
			<button id="six" data-value="6" onClick={props.handleClick}>6</button>

			<button id="subtract" data-value="sub" onClick={props.handleClick}>-</button>

			<button id="one" data-value="1" onClick={props.handleClick}>1</button>
			<button id="two" data-value="2" onClick={props.handleClick}>2</button>
			<button id="three" data-value="3" onClick={props.handleClick}>3</button>
			<button id="equals" data-value="eq" onClick={props.handleClick}>=</button>

			<button id="zero" data-value="0" onClick={props.handleClick}>0</button>
			<button id="decimal" data-value="del" onClick={props.handleClick}>.</button>
		</div>
	)
}

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {

			priorValue: '',
			value: '0',
			result: '',
			maxNumCount: false,
			action: ''
		}
		this.test = '';
	}

	handleClick = ( event ) => {
		let val = event.target.dataset.value
		let priorValue = '';
		let value = this.state.value;
		let result;
		let maxNumCount;
		let action;


		let operations = {
			div: '/',
			mul: '*',
			sub: '-',
			add: '+'
		}

		switch( val ) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.test += val
				// console.log( val )
				if( this.state.value === '0' || this.state.action === 'eq' ) {

					value = val;
				
				} else if ( this.state.value !== '0' ) {


						value = this.state.value + val;

					if( /[\+\-\/\*]/.test( this.state.value ) ) {
						value = val;
					}

					priorValue = this.state.priorValue;


				}

				action = val
				break

			case "clear": 
				value = '0'
				break

			case "div" : 
			case "mul" : 
			case "sub" : 
			case "add" : 

				this.test += operations[val]
				console.log( this.state.priorValue, operations[val])
				if( this.state.priorValue === '' ) {
				
					priorValue = value + operations[val]
					value = operations[val]
				
				} else {

					if( operations[val] === '-' && /[0-9\.]+[\/\*\+\-]{1}$/.test( this.state.priorValue ) ) {
						
						console.log( this.state.priorValue )

						if( /[\/\*\+\-]/.test( this.state.value ) ) {
							priorValue = this.state.priorValue + operations[val]
						}else{

							priorValue = Math.round( eval( this.state.priorValue + this.state.value ) * 1000000) / 1000000 + operations[val]
						}

					} else {

						if( /[\/\*\+\-]$/.test( this.state.value ) ) {

							if( /[\/\*\+\-]{2}$/.test( this.state.priorValue ) ) {
								priorValue = this.state.priorValue.slice(0, -2) + operations[val]
							} else {
								priorValue = this.state.priorValue.slice(0, -1) + operations[val]

							}

						} else {

							if( this.state.action !== 'eq' ) {
								priorValue = Math.round(eval( this.state.priorValue + this.state.value ) * 1000000) / 1000000 + operations[val]
							} else {
								priorValue = this.state.value + operations[val]
							}

						}


						

					}

					value = operations[val]
				}

				action = val
				break

			case "eq":

				if( /[\/\*\+\-]$/.test( this.state.priorValue ) && 
				 /[\/\*\+\-]/.test( this.state.value ) ) {

					if( /[\/\*\+\-]{2}$/.test( this.state.priorValue ) ) {
						priorValue = this.state.priorValue.slice(0, -2)

					} else {
						priorValue = this.state.priorValue.slice(0, -1)

					}

				} else if ( this.state.action !== 'eq' ) {
					priorValue = this.state.priorValue + this.state.value
				}

				priorValue = priorValue.replace('--', '+')

				value = Math.round(eval( priorValue ) * 1000000) / 1000000 
				action = val

				console.log( "*********" ,value, "*********")

				this.test = ''
				break
			case "del" :
				if( this.state.value.indexOf('.') === -1 ) {
					value = this.state.value + '.'
					priorValue = this.state.priorValue
				}
				break

			default:
				break


		}

		this.setState( {
			priorValue: priorValue,
			value: value,
			action: action,
			maxNumCount: maxNumCount,
			result: result
		} )
	}

	render() {
		return (
			<div>
				<Calculator 
					value={this.state.value} 
					handleClick={this.handleClick} 
					maxNumCount={this.state.maxNumCount}  
					priorValue={this.state.priorValue}
				/>
			</div>
		)
	}

}

ReactDOM.render( <App/>, document.getElementById('root'))


// React calculator (formula mode) with bootstrap 5.0. There is some other element with id='subtract' in the bundle. Hence several tests could not be passed.

// const Calculator = (props) => {
// 	return (
// 		<div className="calculator bg-primary shadow">
// 			<div className="">
// 				<div className="row g-0 position-relative">
// 					<div className="col-12 bg-white text-primary text-end px-2">
// 					{props.priorValue ? props.priorValue : '|'}
// 					</div>
// 					<div id="display" className="col-12 bg-white display-5 text-primary text-end px-2">
// 					{props.value ? props.value : 0}
// 					</div>
// 					{props.maxNumCount
// 					 ? <div className="max-num-count text-start fs-6 text-primary">Max num count exceeded!</div>
// 					 : null}
// 				</div>
// 			</div>
// 			<div className="buttons overflow-hidden p-2">
// 				<div className="row g-0">
// 					<div className="col-6 calc-btn border border-primary">
// 						<div id="clear" className="p-2" 
// 							data-value='clear'
// 							onClick={props.handleClick}>AC</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="divide" className="p-2" 
// 						data-value='div'
// 						onClick={props.handleClick}>/</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="multiply" className="p-2" 
// 						data-value='mul'
// 						onClick={props.handleClick}>x</div>
// 					</div>
// 				</div>
// 				<div className="row g-0">
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="seven" className="p-2" 
// 						data-value='7'
// 						onClick={props.handleClick}>7</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="eight" className="p-2" 
// 						data-value='8'
// 						onClick={props.handleClick}>8</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="nine" className="p-2" 
// 						data-value='9'
// 						onClick={props.handleClick}>9</div>
// 					</div>
// 					<div id="subtract" className="col-3 calc-btn border border-primary">
// 						<div className="p-2" 
// 						data-value='sub'
// 						onClick={props.handleClick}>-</div>
// 					</div>
// 				</div>
// 				<div className="row g-0">
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="four" className="p-2" 
// 						data-value='4'
// 						onClick={props.handleClick}>4</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="five" className="p-2" 
// 						data-value='5'
// 						onClick={props.handleClick}>5</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="six" className="p-2" 
// 						data-value='6'
// 						onClick={props.handleClick}>6</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div id="add" className="p-2" 
// 						data-value='add'
// 						onClick={props.handleClick}>+</div>
// 					</div>
// 				</div>
// 				<div className="row g-0">
// 					<div className="col-9 ">
// 						<div className="row g-0">
// 							<div className="col-4 calc-btn border border-primary" >
// 								<div id="one" className="p-2" 
// 									data-value='1'
// 									onClick={props.handleClick}>1</div>
// 							</div>
// 							<div className="col-4 calc-btn border border-primary">
// 								<div id="two" className="p-2" 
// 									data-value='2'
// 									onClick={props.handleClick}>2</div>
// 							</div>
// 							<div className="col-4 calc-btn border border-primary">
// 								<div id="three" className="p-2" 
// 									data-value='3'
// 									onClick={props.handleClick}>3</div>
// 							</div>
// 						</div>
// 						<div className="row g-0">
// 							<div className="col-8 calc-btn border border-primary">
// 								<div id="zero" className="p-2" 
// 									data-value='0'
// 									onClick={props.handleClick}>0</div>
// 							</div>
// 							<div className="col-4 calc-btn border border-primary">
// 								<div id="decimal" className="p-2" 
// 									data-value='del'
// 									onClick={props.handleClick}>.</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="col-3 calc-btn border border-primary">
// 						<div className="row g-0" style={{height: '100%'}}>
// 							<div className="col">
// 								<div id="equals" className="p-2 d-flex align-items-center justify-content-center" style={{height: '100%'}} data-value='eq' onClick={props.handleClick}>=</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// class App extends Component {

// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			priorValue: '',
// 			value: '',
// 			result: '',
// 			maxNumCount: false,
// 			action: ''
// 		}
// 	}

// 	handleClick = ( event ) => {
// 		let val = event.target.dataset.value

// 		const processEquation = ( data ) => {

// 			// math operation priority
// 			const mathPriority = ['/', '*', '+', '-'];

// 			// create equation instance
// 			let equation = data.slice();



// 			mathPriority.forEach( operation => {

				
// 				let operationMembers = equation.split( operation )

// 				// console.log( operationMembers )
				
// 				if ( operationMembers.length > 1 ) {
					
// 					let regExTest = `[0-9\\.\\s\\${operation}]+`
// 					regExTest = new RegExp( regExTest, 'g')
					
// 					let matches = equation.match( regExTest )
// 					// console.log( matches, regExTest )

// 					matches.forEach( operands => {
// 						if( operands.indexOf( operation ) > -1 ) {
// 						    let	operandsArray = operands.split( operation )
// 						    console.log('test', operandsArray)
// 							let intermediateResult = operandsArray.reduce( ( prev, next) => {

// 								let operationResult;
								
// 								if( prev === '' && typeof Number(next) == 'number' ) {
// 									operationResult = `-${next}`
// 								} else {
									
// 									if( operation === "+" ) {

// 									}

// 									prev = parseFloat( prev )
// 									next = parseFloat( next )

// 									switch( operation ) {
// 										case "/":
// 											operationResult = prev / next
// 											break
// 										case "*":
// 											operationResult = prev * next
// 											break
// 										case "+":
// 											operationResult = prev + next
// 											break
// 										case "-":
// 											operationResult = prev - next
// 											break
// 										default:
// 											break
// 									}
// 								}



// 								return operationResult 
// 							})

// 							equation = equation.replace( operands, intermediateResult )
							
// 						} 
// 					})

// 				}

// 			})

// 			return equation

// 		}

// 		let operations = {
// 			div: '/',
// 			mul: '*',
// 			sub: '-',
// 			add: '+'
// 		}

// 		switch( val ) {
// 			case "0":
// 			case "1":
// 			case "2":
// 			case "3":
// 			case "4":
// 			case "5":
// 			case "6":
// 			case "7":
// 			case "8":
// 			case "9":

// 				let actionOperation = /[\/\*\+\-]/.test( this.state.value )
// 				let action = this.state.action

// 				if( this.state.value.length < 23 && 
// 					! actionOperation && 
// 					action != 'eq' ) {
// 					this.setState({
// 						value: ( val !== 0 && this.state.value !== `0` ) 
// 								? this.state.value + val 
// 								: ( this.state.value === '0' && val !== '0' )
// 								? val 
// 								: '',
// 						action: 'num'
// 					})
// 				} else if( this.state.value.length >= 23 && action != 'eq' ) {
// 					this.setState( {
// 						maxNumCount: true,
// 						action: 'num'
// 					})
// 				} else if ( actionOperation ) {
// 					this.setState( {
// 						value: val,
// 						action: 'num'
// 					})
// 				} else if( action === 'eq') {
// 					this.setState({
// 						priorValue: '',
// 						value: val,
// 						action: 'num'
// 					})
// 				}
					

// 				break
// 			case "clear": 
// 				this.setState({
// 					value: '',
// 					priorValue: '',
// 				})
// 				break

// 			case "div" : 
// 			case "mul" : 
// 			case "sub" : 
// 			case "add" : 

// 				let regEx = new RegExp(`\\${operations[val]}$`, 'i')

// 				if( this.state.priorValue === '' || this.state.action === 'eq' ) {
// 					this.setState({
// 						priorValue: this.state.value + operations[val],
// 						value: operations[val],
// 						action: val,
// 					})
// 				} else if( regEx.test(this.state.priorValue) && ! /[\/\*\+\-]/.test(this.state.value) ) {
// 					this.setState({
// 						priorValue: ( ! /[\/\*\+\-]/.test(this.state.value) ) 
// 										? this.state.priorValue + this.state.value + operations[val] 
// 										: this.state.priorValue,
// 						value: operations[val],
// 						action: val,
// 					})
// 				} else {
// 					let priorValue = this.state.priorValue;

// 					// console.log( val, operations.hasOwnProperty(val), /[\/\*\+\-]$/.test(this.state.priorValue), priorValue.slice(0, -1))


// 					let regEx = new RegExp(`\\${operations[val]}$`, `i`)

// 					if( ! /[\/\*\+\-]$/.test(this.state.priorValue) ) {
// 						priorValue = this.state.priorValue + operations[val] + this.state.value + operations[val] 
// 					} else if( /[\/\*\+\-]$/.test(this.state.priorValue) && 
// 								operations.hasOwnProperty(val) &&
// 								/[\/\*\+\-]/.test(this.state.value)
// 								) {

// 						if( ! /[\/\*\+\-]{2}$/.test(this.state.priorValue) && val === 'sub' ) {
// 							priorValue = priorValue + operations[val]
// 						} else if ( /[\/\*\+\-]{2}$/.test(this.state.priorValue) && val !== 'sub' ) {
// 							priorValue = priorValue.slice(0, -2) + operations[val]

// 						} else {
// 							priorValue = priorValue.slice(0, -1) + operations[val]
// 						}
// 					} else {
// 						priorValue = this.state.priorValue + this.state.value + operations[val]
// 					}

// 					this.setState({
// 						priorValue: priorValue,
// 						value: operations[val],
// 						action: val,
// 					})
// 				}

// 				break


// 			case "eq":


// 				let equation = this.state.priorValue

// 				if( this.state.value != 0 && 
// 					this.state.value != '' && 
// 					! /[\/\*\+\-]{1}/.test(this.state.value) && 
// 					/[\/\*\+\-]{1}$/.test( this.state.priorValue ) ) {

// 					equation = this.state.priorValue + this.state.value
// 				} else if ( /[\/\*\+\-]{1}/.test( this.state.value ) ){
// 					equation = equation.slice(0, -1)

// 				} else {
// 					equation = this.state.value
// 				}

// 				let result = eval( equation )
// 				if( ! Number.isInteger(result) ) {
// 					result = Math.round( result * 10000000000 ) / 10000000000
// 				}
// 				this.setState( {
// 					priorValue: equation,
// 					value: result,
// 					action: 'eq'
// 				})

// 				// console.log( this.state.value, result, eval(result) )

// 				break
// 			case "del" :
// 				// console.log( Number.isInteger( parseFloat( this.state.value ) ) )
// 				if( this.state.action === 'eq' || 
// 					this.state.value === '' || 
// 					/[\/\*\+\-]/.test( this.state.value ) ) {
// 					this.setState({
// 						value: `0.`,
// 						action: `del`
// 					})
// 				} else if ( this.state.value.indexOf(`.`) === -1 ) {
// 					this.setState({
// 						value: this.state.value + `.`,
// 						action: `del`
// 					})
// 				} 
// 				break

// 			default:
// 				break
// 		}

// 		// console.log( event.target.dataset.value )
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Calculator 
// 					value={this.state.value} 
// 					handleClick={this.handleClick} 
// 					maxNumCount={this.state.maxNumCount}  
// 					priorValue={this.state.priorValue}
// 				/>
// 			</div>
// 		)
// 	}

// }

// ReactDOM.render( <App/>, document.getElementById('root'))