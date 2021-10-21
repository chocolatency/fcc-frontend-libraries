import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import './styles.scss';

const quotes = [
  {
    "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "author": "Thomas Edison"
  },
  {
    "text": "You can observe a lot just by watching.",
    "author": "Yogi Berra"
  },
  {
    "text": "A house divided against itself cannot stand.",
    "author": "Abraham Lincoln"
  },
  {
    "text": "Difficulties increase the nearer we get to the goal.",
    "author": "Johann Wolfgang von Goethe"
  },
  {
    "text": "Fate is in your hands and no one elses",
    "author": "Byron Pulsifer"
  },
  {
    "text": "Be the chief but never the lord.",
    "author": "Lao Tzu"
  },
  {
    "text": "Nothing happens unless first we dream.",
    "author": "Carl Sandburg"
  },
  {
    "text": "Well begun is half done.",
    "author": "Aristotle"
  },
  {
    "text": "Life is a learning experience, only if you learn.",
    "author": "Yogi Berra"
  },
  {
    "text": "Self-complacency is fatal to progress.",
    "author": "Margaret Sangster"
  },
  {
    "text": "Peace comes from within. Do not seek it without.",
    "author": "Buddha"
  }
]

const GET_QUOTE = 'GET_QUOTE'

const rootReducer = ( state = {}, action ) => {
  switch( action.type ) {
    case GET_QUOTE: 
      return { ...state, payload: action.payload }
  }
  return state
}

const randomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length )]
}

const getQuote = () => {

  return function( dispatch ) {
    setTimeout(() => {
      dispatch( {type: GET_QUOTE, payload: randomQuote()} )
    }, 1000)
    
  }
}

const store = createStore( rootReducer, applyMiddleware( thunk ) )


class App extends React.Component {

  constructor(props) {
    super(props)
    this.renderQuote = this.renderQuote.bind(this)
    this.handleNewQuoteClick = this.handleNewQuoteClick.bind(this)
  }

  componentDidMount() {
    this.props.getQuote()
    // console.log("componentDidMount")
  }

  handleNewQuoteClick() {
    this.props.getQuote()
  }

  renderQuote( quote ) {
    if( quote ) {
      return (
        <div className="container" id="quote-box">
          <div className="quote-text">
            <p id="text">{quote.text}</p>
            <span id="author">{quote.author}</span>
          </div>
          <div className="buttons">
            <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank">Tweet quote</a>
            <div onClick={this.handleNewQuoteClick} id="new-quote">Get new quote</div>
          </div>
        </div>
      )
    }
    return null
  }

  render() {

      const quote = this.props.quote; 
      return (
        <div className="wrapper">
          {this.renderQuote( quote )}
        </div>
      )
  }

}

const mapStateToProps = ( state ) => {
  // console.log(state)
  return {
    quote: state.payload
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getQuote: function() {
      dispatch( getQuote() )
    }
  }
}

const RenderApp = connect( mapStateToProps, mapDispatchToProps )(App)

ReactDOM.render(
  <Provider store={store} >
    <RenderApp />
  </Provider>,
  document.getElementById('root')
);

