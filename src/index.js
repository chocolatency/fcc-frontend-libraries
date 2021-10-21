import { React, Component } from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './calculator.scss'


const Calculator = (props) => {
	return (
		<div className="calculator bg-primary shadow">
			<div className="">
				<div className="row g-0 position-relative">
					<div className="col-12 bg-white text-primary text-end px-2">
					{props.priorValue ? props.priorValue : '|'}
					</div>
					<div id="display" className="col-12 bg-white display-5 text-primary text-end px-2">
					{props.value ? props.value : 0}
					</div>
					{props.maxNumCount
					 ? <div className="max-num-count text-start fs-6 text-primary">Max num count exceeded!</div>
					 : null}
				</div>
			</div>
			<div className="buttons overflow-hidden p-2">
				<div className="row g-0">
					<div className="col-6 calc-btn border border-primary">
						<div id="clear" className="p-2" 
							data-value='clear'
							onClick={props.handleClick}>AC</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="divide" className="p-2" 
						data-value='div'
						onClick={props.handleClick}>/</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="multiply" className="p-2" 
						data-value='mul'
						onClick={props.handleClick}>x</div>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-3 calc-btn border border-primary">
						<div id="seven" className="p-2" 
						data-value='7'
						onClick={props.handleClick}>7</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="eight" className="p-2" 
						data-value='8'
						onClick={props.handleClick}>8</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="nine" className="p-2" 
						data-value='9'
						onClick={props.handleClick}>9</div>
					</div>
					<div id="subtract" className="col-3 calc-btn border border-primary">
						<div className="p-2" 
						data-value='sub'
						onClick={props.handleClick}>-</div>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-3 calc-btn border border-primary">
						<div id="four" className="p-2" 
						data-value='4'
						onClick={props.handleClick}>4</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="five" className="p-2" 
						data-value='5'
						onClick={props.handleClick}>5</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="six" className="p-2" 
						data-value='6'
						onClick={props.handleClick}>6</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div id="add" className="p-2" 
						data-value='add'
						onClick={props.handleClick}>+</div>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-9 ">
						<div className="row g-0">
							<div className="col-4 calc-btn border border-primary" >
								<div id="one" className="p-2" 
									data-value='1'
									onClick={props.handleClick}>1</div>
							</div>
							<div className="col-4 calc-btn border border-primary">
								<div id="two" className="p-2" 
									data-value='2'
									onClick={props.handleClick}>2</div>
							</div>
							<div className="col-4 calc-btn border border-primary">
								<div id="three" className="p-2" 
									data-value='3'
									onClick={props.handleClick}>3</div>
							</div>
						</div>
						<div className="row g-0">
							<div className="col-8 calc-btn border border-primary">
								<div id="zero" className="p-2" 
									data-value='0'
									onClick={props.handleClick}>0</div>
							</div>
							<div className="col-4 calc-btn border border-primary">
								<div id="decimal" className="p-2" 
									data-value='del'
									onClick={props.handleClick}>.</div>
							</div>
						</div>
					</div>
					<div className="col-3 calc-btn border border-primary">
						<div className="row g-0" style={{height: '100%'}}>
							<div className="col">
								<div id="equals" className="p-2 d-flex align-items-center justify-content-center" style={{height: '100%'}} data-value='eq' onClick={props.handleClick}>=</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			priorValue: '',
			value: '',
			result: '',
			maxNumCount: false,
			action: ''
		}
	}

	handleClick = ( event ) => {
		let val = event.target.dataset.value

		const processEquation = ( data ) => {

			// math operation priority
			const mathPriority = ['/', '*', '+', '-'];

			// create equation instance
			let equation = data.slice();

			mathPriority.forEach( operation => {

				
				let operationMembers = equation.split( operation )
				// console.log( operationMembers )
				if ( operationMembers.length > 1 ) {
					
					let regExTest = `[0-9\\.\\s\\${operation}]+`
					regExTest = new RegExp( regExTest, 'g')
					
					let matches = equation.match( regExTest )
					
					matches.forEach( operands => {
						if( operands.indexOf( operation ) > -1 ) {
						    let	operandsArray = operands.split( operation )

							let intermediateResult = operandsArray.reduce( ( prev, next) => {

								let operationResult;
								prev = parseInt( prev )
								next = parseInt( next )

								switch( operation ) {
									case "/":
										operationResult = prev / next
										break
									case "*":
										operationResult = prev * next
										break
									case "+":
										operationResult = prev + next
										break
									case "-":
										operationResult = prev - next
										break
									default:
										break
								}

								return operationResult 
							})

							equation = equation.replace( operands, intermediateResult )
							
						}
					})


				}

			})

			return equation

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
				// console.log( typeof this.state.value, this.state.value, typeof val )

				// if( this.state.action == 'eq' ) {
				// 	this.setState({
				// 		action: val,
				// 		priorValue: this.state.value,
				// 		value: val
				// 	})
				// }

				// if( parseInt(this.state.value) === 0 && parseInt(val) > 0 && this.state.action != 'eq' ) {
				// 	this.setState({
				// 		value: val,
				// 		action: val
				// 	})					
				// }else if ( parseInt( this.state.value ) > 0 && parseInt( this.state.value.length ) < 13 && this.state.action != 'eq'  ) {
				// 	this.setState({
				// 		value: this.state.value + val,
				// 		action: val
				// 	})
				// }else if( parseInt( this.state.value.length ) >= 13 && this.state.action != 'eq'  ) {
				// 	this.setState({
				// 		maxNumCount: true
				// 	})
				// }else if ( /[\/\*\+\-]{1}/.test(this.state.value) && this.state.action != 'eq'  ) {
				// 	this.setState({
				// 		value: val,
				// 		action: val
				// 	})
				// }
				// console.log( /[\/\*\+\-]/.test( this.state.value ), val )

				let actionOperation = /[\/\*\+\-]/.test( this.state.value )
				let action = this.state.action
				console.log( action )

				if( this.state.value.length < 13 && ! actionOperation && action != 'eq' ) {
					this.setState({
						value: this.state.value + val,
						action: 'num'
					})
				} else if( this.state.value.length >= 13 ) {
					this.setState( {
						maxNumCount: true,
						action: 'num'
					})
				} else if ( actionOperation ) {
					console.log( val)
					this.setState( {
						// priorValue: this.state.value,
						value: val,
						action: 'num'
					})
				} else if( action === 'eq') {
					this.setState({
						priorValue: '',
						value: val,
						action: 'num'
					})
				}
					

				break
			case "clear": 
				this.setState({
					value: '',
					priorValue: '',
				})
				break
			case "div" : 
				this.setState({
					priorValue: ( this.state.priorValue === '' ) ? this.state.value + '/' : this.state.priorValue + this.state.value + '/',
					value: '/'
				})
				break
			case "mul" : 
				this.setState({
					priorValue: ( this.state.priorValue === '' || this.state.priorValue === this.state.value ) ? this.state.value + '*' : this.state.priorValue + this.state.value + '*',
					value: '*'
				})
				break
			case "add" : 

				if( this.state.priorValue === '' || this.state.action === 'eq' ) {
					this.setState({
						priorValue: this.state.value + '+',
						value: '+'
					})
				} else if( /\+$/.test(this.state.priorValue) ) {
					
					this.setState({
						priorValue: ( ! /[\/\*\+\-]/.test(this.state.value) ) ? this.state.priorValue + this.state.value + '+' : this.state.priorValue,
						value: '+'
					})
				} else {
					this.setState({
						priorValue: this.state.priorValue + '+' + this.state.value + '+',
						value: '+'
					})
				}



				// this.setState({
				// 	priorValue: ( this.state.priorValue === '' || this.state.action == 'eq' ) ? this.state.value + '+' : this.state.priorValue + this.state.value + '+',
				// 	value: '+'
				// })
				break
			case "sub" : 
				this.setState({
					priorValue: ( this.state.priorValue === '' ) ? this.state.value + '-' : this.state.priorValue + this.state.value + '-',
					value: '-'
				})
				break

			case "eq":


				let equation = this.state.priorValue

				// if( /[\/\*\+\-]{1}/.test( this.state.value ) ) {
				// 	equation = equation.slice(0, -1)
				// }

				console.log( equation )

				if( this.state.value != 0 && 
					this.state.value != '' && 
					! /[\/\*\+\-]{1}/.test(this.state.value) && 
					/[\/\*\+\-]{1}$/.test( this.state.priorValue ) ) {

					equation = this.state.priorValue + this.state.value
				} else if ( /[\/\*\+\-]{1}/.test( this.state.value ) ){
					equation = equation.slice(0, -1)

				} else {
					equation = this.state.value
				}

				// console.log( equation )

				let result = processEquation( equation )

				this.setState( {
					priorValue: equation,
					value: result,
					action: 'eq'
				})
				break

			default:
				break
		}

		// console.log( event.target.dataset.value )
	}

	render() {
		console.log( this.state)
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