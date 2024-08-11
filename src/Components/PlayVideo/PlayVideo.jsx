/* eslint-disable react-hooks/exhaustive-deps */
import "./PlayVideo.css";
import share from "../../assets/share.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import save from "../../assets/save.png";
import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const { videoId } = useParams();

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

    await fetch(channelData_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]);

  return (
    <>
      <div className="play-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>

        <div className="play-video-info">
          <p>
            {apiData ? value_converter(apiData.statistics.viewCount) : "0k"}{" "}
            views &bull;{" "}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
          </p>
          <div>
            <span>
              <img src={like} alt="like" />
              {apiData ? value_converter(apiData.statistics.likeCount) : "0"}
            </span>
            <span>
              <img src={dislike} alt="dislike" />
            </span>
            <span>
              <img src={share} alt="share" />
              Share
            </span>
            <span>
              <img src={save} alt="save" />
              Save
            </span>
          </div>
        </div>
        <hr />

        <div className="publisher">
          <img
            src={channelData ? channelData.snippet.thumbnails.default.url : ""}
            alt="publisher"
          />
          <div>
            <p>
              {channelData ? channelData.snippet.channelTitle : "Channel Name"}
            </p>
            <span>
              {channelData
                ? value_converter(channelData.statistics.subscriberCount)
                : "0"}
            </span>
          </div>
          <button>Subscribe</button>
        </div>

        <div className="vid-description">
          <p>
            {apiData
              ? apiData.snippet.description.slice(0, 250)
              : "Video description here"}
          </p>
        </div>
        <hr />

        <h4>
          {apiData
            ? `${value_converter(apiData.statistics.commentCount)} Comments`
            : "Comments"}
        </h4>
        <div className="comments">
          {commentData &&
            commentData.map((item) => {
              const { topLevelComment } = item.snippet;
              return (
                <div key={item.id} className="comment">
                  <img
                    src={topLevelComment.snippet.authorProfileImageUrl}
                    alt="user profile"
                  />
                  <div>
                    <h3>
                      {topLevelComment.snippet.authorDisplayName}{" "}
                      <span>
                        {moment(topLevelComment.snippet.publishedAt).fromNow()}
                      </span>
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: topLevelComment.snippet.textDisplay,
                      }}
                    ></p>
                    <div className="comment-action">
                      <img src={like} alt="like" />
                      <span>{topLevelComment.snippet.likeCount}</span>
                      <img src={dislike} alt="dislike" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PlayVideo;
