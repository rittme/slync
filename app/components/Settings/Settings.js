import React from "react";
import {connect} from "react-redux";
import {updateCredentials, openSettings} from "actions";
import classNames from "classnames";

//let ; // eslint-disable-line no-unused-vars

let Settings = React.createClass({
  render(){
    let input;
    const {dispatch, isOpen, credentials} = this.props;
    const {openSettings, sendSettings} = this.props;
    return (
      <div className="settings-box">
        <button className={classNames("settings-button",{disabled: isOpen})} onClick={openSettings}>
            Show settings
          </button>
        <form className="settings-form" hidden={!isOpen} onSubmit={(e) => sendSettings(e, input)}>
          <input placeholder="Username" autoCapitalize="off" autoCorrect="off" ref={node => {
            input = node
            if(node) {
              node.select();
            }
          }} />
          <button type="submit">
            Change user
          </button>
        </form>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    isOpen: state.settingsOpen,
    credentials: state.credentials,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSettings: (e) => {
      e.preventDefault()
      dispatch(openSettings())
    },
    sendSettings: (e, input) => {
      e.preventDefault()
      if (!input.value.trim()) {
        return
      }
      dispatch(updateCredentials(input.value))
    }
  }
}

Settings = connect(mapStateToProps, mapDispatchToProps)(Settings)

export default Settings
