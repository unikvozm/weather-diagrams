import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('themeStore')
@observer
class ThemePresenter extends Component {
  render() {
    return (
      <div className={`application-theme--${this.props.themeStore.themeClass}`}>
        {this.props.children}
      </div>
    );
  }
}

export default ThemePresenter;