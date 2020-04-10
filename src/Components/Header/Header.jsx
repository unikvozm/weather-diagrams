import React from 'react';
import { observer } from 'mobx-react';
import Search from './Search';
import Switch from './Switch';
import { normCoords } from '../../utils/normilizeCoordinates';
import './Header.scss';

const navigationList = (weatherStore, theme, listClassName = '', elementClassName = '') => (
  <ul className={listClassName}>
    <li className={elementClassName}>Longitude: {normCoords(weatherStore.longitude)}</li>
    <li className={elementClassName}>Latitude: {normCoords(weatherStore.latitude)}</li>
    <li className={elementClassName}><Search weatherStore={weatherStore} /></li>
    <li className={elementClassName} key={theme.themeClass}><Switch theme={theme} /> </li>     
  </ul>
);

@observer
class Header extends React.Component {
  render() {
    const { weatherStore, theme } = this.props;
    return (
      <nav className="header">
        <div className="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label className="menu__btn" htmlFor="menu__toggle">
            <span />
          </label>
          {navigationList(weatherStore, theme, 'menu__box', 'menu__item')}
        </div>
        <div className="header__logo">Weather Statistics</div>
        {navigationList(weatherStore, theme)}
      </nav>
    );
  }
}

export default Header;