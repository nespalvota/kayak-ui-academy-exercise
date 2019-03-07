import React from 'react';
import styles from './autocomplete.css';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      input: '',
      inputLine: false,
      image: 'https://www.shareicon.net/data/512x512/2016/01/20/706237_cinema_512x512.png'
    }
  }
  
  searchMovies(searchText) {
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query={'+searchText+'}&page=1&include_adult=false';
    fetch(url)
      .then(response => response.json()).then((json) => {
        //  console.log(json);
          let movies = json.results.map((item) => {
                return(
                  <div>
                    <h2>{item.title}</h2>
                    <h3>{item.vote_average} Rating, {item.release_date}</h3> 
                  </div>
                )
            })
        //  console.log(movies);
          this.setState({
              suggestions: movies.slice(0,8)
        });
      })
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    this.setState(() => ({ suggestions, input: value }));
    if (value.length > 2) {
      this.searchMovies(value);
      console.log(suggestions);
    }
}

suggestionSelected (value) {
    this.setState({
      input: value.props.children[0].props.children,
      suggestions: [],
    }, () => {});
}

renderSuggestions () {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
        return null;
    }
    return (
        <div className={styles.list}>
          {suggestions.map((item)=> <li onClick={() => this.suggestionSelected(item)} >{item}</li> )}
        </div>
    )
}

render () {
    const { input } = this.state;
    return (
      <div className={styles.autocomplete}>
        <input placeholder="Enter a movie name" value={input} onChange={this.onTextChanged} type="text" label="Enter Something"/>
        {this.renderSuggestions()}
      </div>
    )
  }
}