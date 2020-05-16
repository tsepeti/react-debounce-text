import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

export default class DebounceText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      items: [],

      // initial false
      showResults: false,
    };

    this.debounced = debounce(500, this.fetch);
  }

  componentDidMount() {
    const { initialValue } = this.props;

    if (initialValue) {
      this.setState({
        value: initialValue
      })
    }
  }

  changeQuery(event) {
    const { value } = event.target;

    return this.setState(
      {
        value,
        showResults: !!value.trim(),
      },
      () => {
        this.debounced(this.state.value);
      }
    );
  }

  fetch(q) {
    return this.props.fetch(q, items => {
      return this.setState({
        items,
        showResults: !!items.length,
      });
    });
  }

  renderItem(item, i) {
    return (
      <li
        className="react-debounce-text__results-item"
        onClick={() => this.onSelect(item, i)}
        key={i}
      >
        {this.props.renderItem(item, i)}
      </li>
    );
  }

  onFocus() {
    const { items } = this.state;

    return this.setState({
      showResults: !!items.length,
    });
  }

  onSelect(item, i) {
    return this.setState({ showResults: false, value: item.value }, () => {
      return this.props.onSelect(item, i);
    });
  }

  render() {
    const { value, items, showResults } = this.state;
    const { placeholder = 'Type something here' } = this.props;

    return (
      <div className="react-debounce-text">
        <input
          type="text"
          className="react-debounce-text__input"
          placeholder={placeholder}
          value={value}
          onChange={this.changeQuery.bind(this)}
          onFocus={this.onFocus.bind(this)}
        />
        {showResults && (
          <ul className="react-debounce-text__results">
            {items.map((item, i) => {
              return this.renderItem(item, i);
            })}
          </ul>
        )}
      </div>
    );
  }
}
