import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typeahead: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.getSearchUser(e.target.value)
  }

  render() {
    return (
      <form>
        <input type="text" name="typeahead" id="search_data" className="typeahead" autoComplete="false"
          spellCheck="false" onChange={this.handleChange} placeholder="Search" />
        <span className="loop_"></span>
      </form>
    )
  }
}

export default Search;
