import React, { Component } from 'react';
import { ThemeType } from '../../Constants/ThemeTypes';
import './switch.scss';

export default class Switch extends Component {
  state = {
    isDark: localStorage.getItem('theme') === ThemeType.dark
  };

  changeToggle = () => {
    this.setState(
      {
        isDark: !this.state.isDark
      },
      () => {
        this.props.theme.changeTheme(this.state.isDark ? ThemeType.dark : ThemeType.light);
      }
    );
  };

  render() {
    return (
      <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" defaultChecked={this.state.isDark} />
          <div className="slider round" onClick={this.changeToggle} />
        </label>
      </div>
    );
  }
}
