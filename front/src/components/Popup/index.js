import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  showPopup = () => {
    this.setState({
      isOpen: true
    })
    this.props.handleSubmitFetch();
  }

  handleClickYes = () => {
    this.props.history.push("/");
  };

  handleClickNo = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div>
        <button type="button" className="btn" onClick={() => this.showPopup()} disabled={this.props.disabled}>
          {this.props.nameOpenPopupBtn}
        </button>
        <div className={this.state.isOpen ? "popup" : " close"}>
          <h3>{this.props.messageFetch}</h3>
          <div className="button-groupe">
            <button className="cta" onClick={this.handleClickYes}>
              Go home page
            </button>
            <button className="cta" onClick={this.handleClickNo}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Popup);
