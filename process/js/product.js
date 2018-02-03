var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
const FeatureList = require('./Features');

var MainInterface = React.createClass({

  getInitialState: function() {
    return {
      products: [],
      featureList: []
    } //return initialState
  }, //getInitialState

  componentDidMount: function() {
    this.serverREquest = $.get('./js/content.json', function(data){
      var tempProduct = data;
      var tempFeaturesList = data.content;
      this.setState({
        products: tempProduct,
        featureList: tempFeaturesList
      }); //setState
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverREquest.abort();
  },

  render: function () {
    var allFeatures = this.state.featureList;
    var slidesInput = this.state.featureList;
    slidesInput = slidesInput.map(function(f, i){
        i++;
        return(<input key={i}  type="radio" name="slides" id={"slide_"+i} />)
      });

    allFeatures = allFeatures.map(function(feature, index){
         // console.log(); 
          if(index == 0) {
            return (
              <li className="product-block-content" key={index}>
              <FeatureList singleFeature = { feature } />
              <footer className="slide-nav">
                <label tabIndex={1} htmlFor={"slide_" + (index+2)} className="next icon-arrow-right"><span>{this.state.products.content[index+1].title}</span></label>
              </footer>
              </li>
            )
          } else if(index >= allFeatures.length - 1) {
            return (
              <li className="product-block-content" key={index}>
              <FeatureList singleFeature = { feature } />
              <footer className="slide-nav">
                <label tabIndex={1} htmlFor={"slide_" + (index)} className="prev icon-arrow-left"><span>{this.state.products.content[index-1].title}</span></label>
              </footer>
              </li>
            )
          } else {
            return (
            <li className="product-block-content" key={index}>
            <FeatureList singleFeature = { feature } />
            <footer className="slide-nav">
              <label tabIndex={1} htmlFor={"slide_" + (index)} className="prev icon-arrow-left"><span>{this.state.products.content[index-1].title}</span></label>
              <label tabIndex={1} htmlFor={"slide_" + (index+2)} className="next icon-arrow-right"><span>{this.state.products.content[index+1].title}</span></label>
            </footer>
            </li>
          )

          }
          
    }.bind(this));

    return (
      <div>
        <input type="checkbox" id="ToggleID" tabIndex={0} className="switch" />
        <header className="grid-row product-block-header has-toggle-switch">
          <h1 className="grid-col m-col-12 icon-doc">{this.state.products.title}</h1>
          <label htmlFor="ToggleID" className="grid-row toggle-arrow"><span className="hidden">Toggle button to show hide conent through pure CSS3 advanced psuedo selectors, Accessibility through space bar</span></label>
        </header>
        <div className="css-slider toggle-this">
       {slidesInput}
        <ul className="slide-container">
        {allFeatures}
        </ul>
        </div>
      </div>
    );
  } //render 
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ProductComponent')
); //render


