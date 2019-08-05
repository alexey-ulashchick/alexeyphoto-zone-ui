import React from 'react';
import './App.css';
import { HomePage } from './pages/home/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import { RecentPosts } from './pages/RecentPosts/RecentPosts';

// const testData: List<ImageModel> = List([
//   new ImageModel('1', 'https://alexeyphoto.zone/assets/images/1-20180905-122358/768.jpg'),
//   new ImageModel('2', 'https://alexeyphoto.zone/assets/images/2-20180907-041126/768.jpg'),
//   new ImageModel('2', 'https://alexeyphoto.zone/assets/images/3-20180524-192817/768.jpg')
// ]);

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage}/>
        <Route path="/recent" component={RecentPosts}/>
      </BrowserRouter>
  );
};

export default App;
