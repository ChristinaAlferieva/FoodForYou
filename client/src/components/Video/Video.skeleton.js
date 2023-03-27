import React from 'react';

const VideoSkeleton = ({ error }) => (
  <div className="skeletonVideo">
    {error ?
      ""
      :
      <div className="videoLoading">
        <h4>Camera is Loading</h4>
      </div>
      }
  </div>
);

export default VideoSkeleton;
