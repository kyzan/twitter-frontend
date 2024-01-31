import React from "react";
import './Explore.css';
import { FollowData, TrendData, TrendingListData, UserData } from "../../types/Models";
import { formatNumber } from "../Feed/Feed";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

interface ExploreProps {
    trendingListData: TrendingListData;
    followData: FollowData;
}

interface TrendingProps {
    trendingListData: TrendingListData;
}

interface TrendingItemProps {
    trendingItem: TrendData
}

interface FollowProps {
    followData: FollowData
}

interface FollowUserProps {
    userData: UserData;
}

const Explore: React.FC<ExploreProps> = ({trendingListData, followData}) => {
    return (
        <div className="explore">
            <SearchBar /> 
            <Trending trendingListData={trendingListData} />
            <Follow followData={followData} />
        </div>
    )
}

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className="search-input" type="text" placeholder="Search Twitter"></input>
        </div>
       
    )
}

const Trending: React.FC<TrendingProps> = ({trendingListData}) => {
    return (
        <div className="trending-list">
            <h5>{trendingListData.title}</h5>
            {trendingListData.trends.map(trendingItem => (
                <TrendingItem trendingItem={trendingItem} />
            ))}
            <h6>Show more</h6>
        </div>
    )
}

const TrendingItem: React.FC<TrendingItemProps> = ({trendingItem}) => {
    return (
        <div className="trending-item">
            {trendingItem.country? (
                <div className="trending-country user-id">
                    <p>Trending in {trendingItem.country}</p>
                </div>
            ): (
                <></>
            )}
            {trendingItem.category? (
                <div className="trending-category user-id">
                    <p>{trendingItem.category} &#x2022; Trending</p>
                </div>
            ): (
                <></>
            )}
            <div className="trending-content">
                <p>{trendingItem.text}</p>
            </div>
            {trendingItem.tweets? (
                <div className="trending-tweets user-id">
                    <p>{formatNumber(trendingItem.tweets)} Tweets</p>
                </div>
            ): (
                <></>
            )}
            {trendingItem.hashTags? (
                <div className="trending-hashtag user-id">
                    <p>Trending with {trendingItem.hashTags.map(hashTag => (<span className="blue-text">{hashTag} </span>))}</p>
                </div>
            ): (
                <></>
            )}
        </div>
    )
}

const Follow: React.FC<FollowProps> = ({followData}) => {
    return (
        <div className="follow-list">
            <h5>{followData.title}</h5>
            {followData.usersToFollow.map(userData => (
                <FollowUser userData={userData} />
            ))}
            <h6>Show more</h6>
        </div>
    )
}

const FollowUser: React.FC<FollowUserProps> = ({userData}) => {
    return (
        <div className="follow-card">
            <ProfilePicture userData={userData} />
            <div className="follow-text">
                <div className="with-tick">
                <p className="id-child">{userData.userName}</p>
                <img className="id-child" width="15" height="15" src="https://img.icons8.com/color/48/instagram-verification-badge.png" alt="instagram-verification-badge"/>
                </div>
                <p className="id-child user-id">{userData.userId}</p>
            </div>
            <button className="follow-btn">Follow</button>
        </div>
    )
}


export default Explore;