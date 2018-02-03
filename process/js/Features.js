var React = require('react');
const ReactHTML = require('react-render-html');

var FeatureList = React.createClass({
  render: function() {
    
    var parsedHtml = ReactHTML(this.props.singleFeature.description.replace(/�/g, '—'));
    //console.log(parsedHtml);
    if(this.props.singleFeature.thumbnail != undefined && this.props.singleFeature.thumbnail != '') {
        return(
          <div className="grid-row">
          <figure className="grid-col m-col-12 t-col-4 product-block-img">
            <img src={"images/" + this.props.singleFeature.thumbnail} alt="Photo of Product" />
          </figure>
          <div className="grid-col m-col-12 t-col-8 product-block-desc">
            <h2>{this.props.singleFeature.title}</h2>
            <p>{parsedHtml}</p>
          </div>
          </div>
      )//return
    } else {
        return(
          <div className="grid-row">
          <div className="grid-col m-col-12 t-col-12 product-block-desc">
            <h2>{this.props.singleFeature.title}</h2>
            <p>{parsedHtml}</p>
          </div>
          </div>
      )//return
    }
    
  } //render
}); //FeatuerList

module.exports = FeatureList