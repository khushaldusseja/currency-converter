import React, { Component } from "react";
import LoadingDotsSvg from "../Common/LoadingDotsSvg";

class Loader extends Component {
  /*
   * State allows React components to change their output over time in response to user actions,
   *network responses, and anything else, without violating this rule
   * React elements are plain objects
   * React DOM compares the element and its children to the previous one,
   * and only applies the DOM updates necessary to bring the DOM to the desired state
   * To render a React element into a root DOM node
   * node whose contents has changed gets updated by React DOM
   */

  render() {
    return (
      <div style={styles.popup}>
      <div style={styles.popupInner}>
        <LoadingDotsSvg />
      </div>
    </div>
    );
  }
}

const styles = {
popup: {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255, 0.8)',
},

popupInner: {
  width: '100px',
  height: '100px',
  margin: 'auto',
  background: '#53617b',
  textAlign: 'center',
  borderRadius: '10px',
}
}
export default Loader;
