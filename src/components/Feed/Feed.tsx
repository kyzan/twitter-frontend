import React, { useEffect, useState } from "react";
import './Feed.css';
import { ButtonData, HeaderData, TweetData, UserData } from "../../types/Models";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { TweetButton } from "../Navbar/Navbar";

interface FeedProps {
    headerData: HeaderData;
    userData: UserData;
    tweetThreads: TweetData[][];
    tweetButton: ButtonData;
}

interface HeaderProps {
    headerData: HeaderData;
}

interface TweetListProps {
    tweetListData: TweetData[][];
}

interface TweetProps {
    tweetData: TweetData[];
}

interface TweetPostProps {
    userData: UserData;
    tweetButton: ButtonData;
    prependTweet: Function;
}

interface SingleTweetProps {
    singleTweet: TweetData;
    isLast?: boolean;
}

const Feed: React.FC<FeedProps> = ({headerData, tweetThreads, userData, tweetButton}) => {

    const [tweets, setTweets] = useState<TweetData[][]>(tweetThreads);

    useEffect(() => {
        setTweets(tweetThreads);
    }, [tweetThreads])

    const prependTweet = (newTweet: TweetData[]) =>{
        setTweets((oldTweets) => {
            const newThreads = [newTweet, ...oldTweets]
            const jsonData: string | null = localStorage.getItem("api_data");
            const apiData = JSON.parse(jsonData!);
            apiData.tweetThreads = newThreads;
            localStorage.setItem("api_data", JSON.stringify(apiData)); 
            return newThreads;
        })
    }

    return(
        <div className="feed">
            <Header headerData={headerData}/>
            <TweetPost userData={userData} tweetButton={tweetButton} prependTweet={prependTweet}/>
            <TweetList tweetListData={tweets} />
        </div>
    )
}

const Header: React.FC<HeaderProps> = ({headerData}) => {
    const [border, setBorder] = useState("left");
    return (
        <div className="header">
        <h3 className="home-text">{headerData.title.text}</h3>
        <div className="header-btns">
            <div className={`${border === 'left'? 'for-you': 'for-you-no-border'}`} onClick={e => setBorder("left")}>
                <h5>{headerData.navigationTabs![0].buttonText}</h5>
            </div>
            <div className={`${border === 'right'? 'following': 'following-no-border'}`} onClick={e => setBorder("right")}>
                <h5>{headerData.navigationTabs![1].buttonText}</h5>
            </div>
        </div>
        </div>
    )
}

const TweetList: React.FC<TweetListProps> = ({tweetListData}) => {
    return (
        <div className="tweet-list">
            {tweetListData.map(tweetData => (
                <Tweet tweetData={tweetData} />
            ))}
        </div>
    )
}

const TweetPost: React.FC<TweetPostProps> = ({userData, tweetButton, prependTweet}) => {
    const [text, setText] = useState("");

    const createTweet = (text: string): TweetData[] => {
        const newTweet: TweetData = {
            user: userData,
            tweetTime: new Date().getTime(),
            textArea: text,
            replies: 0,
            reTweets: 0,
            likes: 0,
            views: 0    
        }

        return [newTweet];
    }

    return (
        <div className="post">
        <div className="tweet-post">
            <ProfilePicture userData={userData} />
            <textarea placeholder="What's happening?" value={text} onChange={e => (
                setText(e.target.value)
            )}>

            </textarea>
        </div>
        <button className="tweet-btn" onClick={e => {
            prependTweet(createTweet(text));
            setText("")
        }}>{tweetButton.buttonText}</button>
        </div>
    )
}

const Tweet: React.FC<TweetProps> = ({tweetData}) => {
    return (
        <div className="threaded-tweet">
            <SingleTweet singleTweet={tweetData[0]} />
            {tweetData.length > 1? (<SingleTweet singleTweet={tweetData[1]} isLast={true}/>): (<></>)}
        </div>
    )
}

const formatTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatNumber(num: number): string {
    if (Math.abs(num) < 1000) {
      return num.toString();
    }
  
    const abbreviations = ['', 'k', 'M', 'B', 'T'];
  
    // Determine the abbreviation index based on the number length
    const index = Math.floor(Math.log10(Math.abs(num)) / 3);
  
    // Calculate the abbreviated number
    const abbreviatedNum = Math.floor(num / Math.pow(10, index * 3));
  
    // Add the abbreviation
    const result = `${abbreviatedNum}${abbreviations[index]}`;
  
    return result;
  }

const SingleTweet: React.FC<SingleTweetProps> = ({singleTweet, isLast=false}) => {
    const [likeIcon, setLikeIcon] = useState("");
    const [likes, setLikes] = useState(0);
    
    useEffect(() => {
        setLikeIcon("far");
        setLikes(singleTweet.likes);
    }, [singleTweet]); 

    const likeTweet = () => {
        if(likeIcon === "far") {
            setLikeIcon("fa-solid");
            setLikes(likes => likes+1);
        } else {
            setLikeIcon("far");
            setLikes(likes => likes-1);
        }
    }

    return (
        <div className="single-tweet">
            <div className="tweeter-info">
                <div className="tweeter-pic">
                <ProfilePicture userData={singleTweet.user}/>
                </div>
                <div className="tweet-body">
                <div className="tweeter-id">
                <p className="id-child">{singleTweet.user.userName}</p>
                {singleTweet.user.blueTick?(
                    <img className="id-child" width="15" height="15" src="https://img.icons8.com/color/48/instagram-verification-badge.png" alt="instagram-verification-badge"/>
                ) :
                (
                    <></>
                )}               
                <p className="id-child user-id">{singleTweet.user.userId}</p>
                <p className="id-child user-id">&#x2022;</p>
                <p className="id-child user-id">{formatTimestampToDate(singleTweet.tweetTime)}</p>
                </div>
                {isLast ? (
                    <p className="tweet-content id-child user-id">Replying to <span className="blue-text">{singleTweet.user.userName}</span></p>
                ): (
                    <></>
                )}
                <p className="tweet-content id-child">{singleTweet.textArea}</p>
                <div className="user-actions">
                    <div className="action-buttons">
                        <i className="fa-regular fa-comment action"></i>
                        <p className="id-child action">{formatNumber(singleTweet.replies)}</p>
                        <i className="fa-solid fa-retweet action"></i>
                        <p className="id-child action">{formatNumber(singleTweet.reTweets)}</p>
                        <div className="like-tweet"><i className={`${likeIcon} fa-heart action`} onClick={likeTweet}></i></div>
                        <p className="id-child action">{formatNumber(likes)}</p>
                        <i className="fa-solid fa-chart-simple action"></i>
                        <p className="id-child action">{formatNumber(singleTweet.views)}</p>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Feed;

export {formatNumber};