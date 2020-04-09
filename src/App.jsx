import React from "react";
import WeatherChart from "./Components/WeatherChart";
import "./App.css";
import { inject, observer } from "mobx-react";

@inject('weatherStore')
@observer
class App extends React.Component {
  render() {
    const { weatherStore } = this.props;
    return (
      <div className="App">
        <WeatherChart weatherStore={weatherStore} />
      </div>
    );
  }
}

export default App;
