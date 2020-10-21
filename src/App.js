import React, { Component } from 'react';
import { Spinner } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Hello from './components/Hello';
import PostsList from './components/PostsList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Blog Posts',
      postList: [],
      isLoading: true,
      isError: false,
      noResults: false,
      searchKeyword: ''
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    // Make API Call to get the initial list of post
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
      return response.json();
    }).then((data)=> {
      return this.setState({ postList: data, isLoading: false, isError: false });
    }).catch((err)=> {
      console.log(err);
      return this.setState({ postList: err, isLoading: false, isError: true });
    });
  }

  // Search and Find a single Post
  getPost() {
    document.getElementsByClassName('post-content')[0].style.visibility = 'visible';
    console.log('Check Post list', this.state.postList);
    var orginalPostList = this.state.postList;
    const { searchKeyword } = this.state;
    console.log('The Search Keyword is',searchKeyword);

    // Search
    const search = (nameKey, postList) => { 
      for (var i=0; i < postList.length; i++) {
          var currentTitle = postList[i].title;
          if (currentTitle.includes(nameKey)) {
              searchResults.push(postList[i]);
          }
      }
    }

    var searchResults = [];
    search(searchKeyword, orginalPostList);
    if(searchResults.length) {
      console.log('Results');
      console.log(searchResults);
      return this.setState({ postList: searchResults, isLoading: false, isError: false, noResults: false });
    } else {
      console.log('No Result found');
      //document.getElementsByClassName('post-content')[0].style.visibility = 'hidden';
      return this.setState({ postList: []});
    }
  }

  handleInputChange = (event) => {
    const inputtedValue = event.currentTarget.value;
    this.setState({
      searchKeyword: inputtedValue
    });
  }

  render() {
    const {postList , isLoading, isError, noResults} = this.state;
    // const postListToRender = postList;

    if(isLoading){
      return <div className='text-center' style={{ width: '80%', margin: '0px auto', height: '100vh' }}>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    } else {
      if(isError){
        return (
          <div>
            <p>An Error has occured. Please try again</p>
          </div>
        );
      }
      else if(noResults) {
        return (<div>
          <p>No Results Found...</p>
        </div>);
      } else {
        return (
        <div className="container">
          <div className="page-title">
            <Hello name={this.state.name} />
          </div>
  
          <div className="filter-post text-center">
            <input type="text" id="search-post" onChange={this.handleInputChange.bind(this)}/>
            <button onClick={this.getPost.bind(this)}>Search Post</button>
          </div>
  
          <div className="post-content">
            <PostsList postList={postList} />
          </div>
        </div>
      );
      }
    }
  }
}

export default App;
