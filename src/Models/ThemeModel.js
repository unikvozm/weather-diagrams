import { action, observable } from 'mobx';
import { ThemeType } from '../Constants/ThemeTypes';

class ThemeModel {
  @observable themeClass = ThemeType.light;

  constructor() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.themeClass = theme;
    } else {
      this.themeClass = ThemeType.light;
    }
  }

  @action
  changeTheme(theme = ThemeType.light) {
    this.themeClass = theme;
    localStorage.setItem('theme', theme);
  }
}

export default ThemeModel;
