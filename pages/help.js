import React from "react";
import YoutubeEmbedVideo from "youtube-embed-video";

export default function() {
  return (
    <>
      <h1>HELP</h1>
      <p>more coming but for now here is a video</p>
      <p>please report all issues to the slack channel or basecamp pings</p>
      <YoutubeEmbedVideo
        size={"largest"}
        videoId="O9a9x3pWVO0"
        suggestions={false}
      />
    </>
  );
}
