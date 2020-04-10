import React from 'react';

class Search extends React.Component  {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  handleChange = (e) => {
    const { weatherStore } = this.props;
    weatherStore.newPlace = e.target.value;
  }

  handleKey = (e) => {
    const { weatherStore } = this.props;
    if (e.key === 'Enter') {
      weatherStore.updateLocation();
      weatherStore.newPlace = '';
      this.input.current.value = ''
    }
  }
  render() {
    return (
      <input type="text" id="search-input" placeholder="Enter a city" ref={this.input} onChange={this.handleChange} onKeyDown={this.handleKey} />
    );
  }
}

export default Search;