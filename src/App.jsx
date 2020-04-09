import React from "react";
import WeatherPresenter from "./Presenters/WeatherPresenter";
import "./App.css";
import { inject, observer } from "mobx-react";

@inject('weatherStore')
@observer
class App extends React.Component {
  render() {
    const { weatherStore } = this.props;
    return (
      <div className="App">
        <WeatherPresenter weatherStore={weatherStore} />
      </div>
    );
  }
}

export default App;
