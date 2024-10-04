import React from 'react';
import './SortControl.css';

class SortControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSortChange(event.target.value);
  }

  render() {
    return (
      <div className="sort-control">
        <label>Sort by</label>
        <select value={this.props.currentSelection} onChange={this.handleChange}>
          <option value="releaseDate">Release Date</option>
          <option value="title">Title</option>
        </select>
      </div>
    );
  }
}

export default SortControl;