import React from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Feed from './components/Feed/Feed';
import Explore from './components/Explore/Explore';

import useFetch from './hooks/useFetch'

import {PageResponse, ButtonData, UserData, HeaderData, TweetData, TrendData, TrendingListData, FollowData} from './types/Models'


function App() {
  const apiData: PageResponse | null = useFetch("https://sandbox.nextleap.app/page/fetch");
  
  if(!apiData) {
    return <p>Loading</p>
  }

  console.log(apiData);
  const buttonData: ButtonData[] = apiData!.sideNavigationButtons;
  const userData: UserData = apiData!.loggedInUser;
  const tweetButton: ButtonData = apiData!.tweetButton;
  const headerData: HeaderData = apiData!.headerData;
  const tweetThreads: TweetData[][] = apiData!.tweetThreads;
  const trendingListData: TrendingListData = apiData!.trendingData;
  const followData: FollowData = apiData!.followData;

  return (
    <div className="App">
      <div className='filler'></div>
      <Navbar buttonData={buttonData} userData={userData} tweetButton={tweetButton}/>
      <Feed headerData={headerData} tweetThreads={tweetThreads} userData={userData} tweetButton={tweetButton}/>
      <Explore trendingListData={trendingListData} followData={followData}/>
      <div className='filler'></div>
    </div>
  );
}


export default App;
