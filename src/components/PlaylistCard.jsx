const PlaylistCard = ({ playlist }) => {
  const { title, thumbnails } = playlist.snippet;
  const { itemCount } = playlist.contentDetails;

  return (
    <div className="playlist-card">
      <div className="thumbnail-wrapper">
        <img src={thumbnails.high?.url || thumbnails.medium?.url} alt={title} />
        <span className="video-count">{itemCount} Videos</span>
      </div>
      <div className="playlist-info">
        <h3>{title}</h3>
        <button className="view-btn">View Playlist</button>
      </div>
    </div>
  );
};