import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;

  state={
    progress:0
  }
   setProgress = (progress)=>{
    this.setState({progress: progress})
   }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='general' headline="Top - Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/business" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='business' headline="Top - Business Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/entertainment" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='entertainment' headline="Top - Entertainment Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/health" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='health' headline="Top - Health Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/science" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='science' headline="Top - Science Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/sports" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='sports' headline="Top - Sports Headlines"/>} />
          </Routes>
          <Routes>
            <Route path="/technology" element={<News setProgress={this.setProgress } pageSize={this.pageSize} country='in' category='technology' headline="Top - Technology Headlines"/>} />
          </Routes>
        </Router>
    

      </div>
    )
  }
}
