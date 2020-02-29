import { map as _map } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadOnce: false,
      contentdata:[]
    };
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
componentWillReceiveProps(nextProps) {
  console.log('nextProps', nextProps.posts);
    if (nextProps.posts !== this.props.posts) {
      const { posts } = nextProps.posts;
      console.log('posts', nextProps.posts);
         const contentdata = [];
          const content = [];
    if(nextProps.posts.length > 0){
      nextProps.posts.forEach(function(item, index) {
          content.push(item.data);
        });
         console.log('content', content);
    contentdata = content.sort((a, b) =>
      a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    );
      console.log('contentdata', contentdata);
    this.setState({ contentdata  });
    }
   
    }
  }
  renderPosts() {
  
    return _map(this.state.contentdata, post =>
      <li key={post.id} className="list-group-item">
        <Link to={`/posts/${post.id}`}>
          {post.name}
        </Link>
      </li>
    );
  }

  render() {
    const { posts } = this.props;
     const { contentdata } = this.state;
      console.log('post', posts);
    return (
      <div>
        <div className="text-xs-right">
          
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {contentdata.length >  0 && this.renderPosts()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
