import React from 'react'
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
// import { Provider, connect } from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import marked from 'marked'
import './marked-styles.scss'

// Run marked
const Textarea = ( props ) => {
	// console.log(props)
	return (
		<div className='text-area'>
			<textarea id="editor" autoFocus className="textarea-input" onChange={props.handleChange} name="markdown-textarea" cols="50" rows="20" value={props.markdown}>

			</textarea>
		</div>
	)
}


const MarkdownMarkup = ( props ) => {


	const createMarkup = ( markdown ) => {
		const markup = marked( markdown )
		return ( markup )	
	}

	return (
		<div id="preview" className="preview" dangerouslySetInnerHTML={{ __html: createMarkup(props.markdown)}}>
		</div>
	)
}

const Header = () => {
	return (
		<header className="header">
			This is markdown human transpliter
		</header>
	)
}

const Footer = () => {
	return (
		<footer className="footer">
			<span className="thunk">

			</span>	
						<span className="thunk">
				
			</span>	
						<span className="thunk">
				
			</span>	
		</footer>
	)
}


class App extends React.Component {
	
	constructor( props ) {
		super(props);
		this.state = {
			markdown: '',
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange( event ) {
		console.log(event.target.value.replace(/\r/, '  \n'))
		this.setState({
			markdown: event.target.value.replace(/\r/, '  \n')
		})
	}

	defaultMarkupText = () => {

		let defalutinput = `# The title\n## The subtitle\n[The link] (https://usefulluselessness.com)\n\`My awesome inline code\`\n\n    it smain awesome() {\n        script\n    }\n## List\n* item 1\n* item 2\n  * item 1\n  * item 2\n\n> wise man said\n\n_**Bold** Italic_\n\n![GitHub Logo](https://infostart.ru/upload/iblock/206/206715a232219a2ad06670a2b2db4bfb.jpg)`
		// let defalutinput = '$ latex code $\n\n` other code `'
		return defalutinput
	}

	componentDidMount() {
		this.setState({
			markdown: this.defaultMarkupText(),
		})
	}

	render() {

		const markdown = this.state.markdown
		// console.log( markdown )
		return (
			<div className="container">
				<Header />
				<Textarea handleChange={this.handleChange} markdown={markdown}/>
				<MarkdownMarkup markdown={markdown} />
				<Footer />
			</div>
		)
	}

}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)