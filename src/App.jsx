import React from "react";
import WeatherPresenter from "./Presenters/WeatherPresenter";
import "./App.css";
import { inject, observer } from "mobx-react";
import ThemePresenter from "./Presenters/ThemePresenter";
import Header from './Components/Header/Header'

@inject('weatherStore', 'themeStore')
@observer
class App extends React.Component {
  render() {
    const { weatherStore, themeStore } = this.props;
    return (
      <ThemePresenter>
        <Header weatherStore={weatherStore} theme={themeStore} />
        <WeatherPresenter weatherStore={weatherStore} />
      </ThemePresenter>
    );
  }
}

export default App;
