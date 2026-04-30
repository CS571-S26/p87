import { useState, useRef, useCallback, useEffect } from "react";

const API_KEY = "AIzaSyC_1SspsHvNOJwF2cqG3oqLquWnqSOzeg0";
const CHANNEL_ID = "UCado2vwS6mPQZc5-iZH0SLg";
const MAX_PLAYLISTS = 20;

const styles = `
  .ypp-root {
    --surface: #BEBEBE;
    --border: #2e2e2e;
    --text: #0f0f0f;
    --muted: #666;
    --accent: #3f3f3f;
    --accent-dim: rgba(232,255,71,0.12);
    --accent-text: #0f0f0f;

    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
  }

  .ypp-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .ypp-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 16px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .ypp-left { display: flex; flex-direction: column; gap: 12px; }
  .ypp-right { display: flex; flex-direction: column; gap: 12px; }

  /* Player */
  .ypp-player-wrap {
    width: 100%;
    aspect-ratio: 16/9;
    background: #000;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .ypp-player-wrap iframe { width: 100%; height: 100%; border: none; display: block; }
  .ypp-player-placeholder {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; color: var(--muted);

  }
  .ypp-play-icon {
    width: 48px; height: 48px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
  }

  /* Now playing */
  .ypp-now-playing {
    border: 1px solid var(--border);
    padding: 10px 14px;
    font-size: 12px;
    color: var(--muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ypp-now-playing span { color: var(--accent); }

  /* Card */
  .ypp-card {
    border: 1px solid var(--border);
    padding: 14px;
  }
  .ypp-card-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .ypp-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 12px;
    padding: 8px 14px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .ypp-btn:hover { background: var(--surface); border-color: var(--accent); color: var(--accent); }
  .ypp-btn:active { transform: scale(0.98); }
  .ypp-btn.sm { font-size: 11px; padding: 5px 9px; }
  .ypp-btn.danger:hover { border-color: #ff5555; color: #ff5555; }
  .ypp-btn:disabled { opacity: 0.3; pointer-events: none; }

  /* Playlists */
  .ypp-playlist-list { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; }
  .ypp-playlist-item { border: 1px solid var(--border); }
  .ypp-playlist-header {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px; cursor: pointer;
    transition: background 0.12s;
  }
  .ypp-playlist-header:hover { background: var(--surface); }
  .ypp-playlist-thumb {
    width: 52px; height: 32px;
    object-fit: cover; background: var(--bg);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }
  .ypp-playlist-info { flex: 1; min-width: 0; }
  .ypp-playlist-name { font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ypp-playlist-meta { font-size: 11px; color: var(--muted);}
  .ypp-chevron { color: var(--muted); font-size: 10px; transition: transform 0.2s; flex-shrink: 0; }
  .ypp-chevron.open { transform: rotate(90deg); }

  .ypp-video-list { border-top: 1px solid var(--border); background: var(--bg); }
  .ypp-video-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s;
  }
  .ypp-video-item:last-child { border-bottom: none; }
  .ypp-video-thumb { width: 52px; height: 32px; object-fit: cover; border: 1px solid var(--border); flex-shrink: 0; }
  .ypp-video-name { flex: 1; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text); }
  .ypp-video-actions { display: flex; gap: 4px; }

  /* Queue */
  .ypp-queue-list { display: flex; flex-direction: column; gap: 3px; max-height: 200px; overflow-y: auto; margin-bottom: 10px; }
  .ypp-queue-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;
    font-size: 12px;
  }
  .ypp-queue-item:hover { background: var(--surface); }
  .ypp-queue-item.active {
    background: var(--accent-dim);
    border-color: var(--accent);
    color: var(--accent);
  }
  .ypp-queue-item.active .ypp-queue-num { color: var(--accent); }
  .ypp-queue-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ypp-queue-remove { color: var(--muted); font-size: 14px; line-height: 1; padding: 0 2px; cursor: pointer; }
  .ypp-queue-remove:hover { color: #ff5555; }
  .ypp-queue-empty { font-size: 12px; color: var(--muted); }
  .ypp-queue-controls { display: flex; gap: 6px; }
  .ypp-queue-controls .ypp-btn { flex: 1; text-align: center; }

  .ypp-status-bar {
    font-size: 11px;
    color: var(--muted);
    padding: 6px 0 2px;
    min-height: 20px;
  }
  .ypp-status-bar.error { color: #ff5555; }
`;

export default function YouTubePlaylistPlayer() {
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [status, setStatus] = useState({ msg: "Loading playlists…", error: false });
  const [loadingVideos, setLoadingVideos] = useState(null);
  const playerRef = useRef(null);

  // ── Auto-fetch on mount ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${MAX_PLAYLISTS}&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.error) { setStatus({ msg: "API error: " + data.error.message, error: true }); return; }
        const items = (data.items || []).map(item => ({
          id: item.id,
          title: item.snippet.title,
          count: item.contentDetails.itemCount,
          thumb: item.snippet.thumbnails?.default?.url || "",
        }));
        setPlaylists(items);
        setStatus({ msg: `${items.length} playlist${items.length !== 1 ? "s" : ""} loaded.`, error: false });
      } catch {
        setStatus({ msg: "Failed to load playlists.", error: true });
      }
    })();
  }, []);

  // ── Fetch videos for a playlist ──────────────────────────────
  const fetchVideos = useCallback(async (playlistId) => {
    if (videos[playlistId]) return;
    setLoadingVideos(playlistId);
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const items = (data.items || []).map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails?.default?.url || "",
      }));
      setVideos(prev => ({ ...prev, [playlistId]: items }));
    } catch {
      setVideos(prev => ({ ...prev, [playlistId]: [] }));
    } finally {
      setLoadingVideos(null);
    }
  }, [videos]);

  // ── Toggle playlist expansion ────────────────────────────────
  const togglePlaylist = useCallback(async (id) => {
    setExpandedId(prev => (prev === id ? null : id));
    await fetchVideos(id);
  }, [fetchVideos]);

  // ── Queue helpers ────────────────────────────────────────────
  const addVideoToQueue = useCallback((video) => {
    setQueue(prev => {
      const next = [...prev, video];
      if (currentIdx === -1) setCurrentIdx(0);
      return next;
    });
  }, [currentIdx]);

  const addPlaylistToQueue = useCallback(async (e, playlistId) => {
    e.stopPropagation();
    await fetchVideos(playlistId);
    setQueue(prev => {
      const vids = videos[playlistId] || [];
      const next = [...prev, ...vids];
      if (currentIdx === -1 && next.length > 0) setCurrentIdx(0);
      return next;
    });
  }, [fetchVideos, videos, currentIdx]);

  const playNow = useCallback((video) => {
    setQueue([video]);
    setCurrentIdx(0);
  }, []);

  const jumpTo = (idx) => setCurrentIdx(idx);

  const removeFromQueue = (idx) => {
    setQueue(prev => { const next = [...prev]; next.splice(idx, 1); return next; });
    setCurrentIdx(prev => (prev >= queue.length - 1 ? Math.max(0, prev - 1) : prev));
  };

  const clearQueue = () => { setQueue([]); setCurrentIdx(-1); };
  const prev = () => setCurrentIdx(i => Math.max(0, i - 1));
  const next = () => setCurrentIdx(i => Math.min(queue.length - 1, i + 1));

  const currentVideo = currentIdx >= 0 ? queue[currentIdx] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="ypp-root">
        <div className="ypp-layout">

          {/* ── LEFT: Player + Queue ── */}
          <div className="ypp-left">
            <div className="ypp-player-wrap" ref={playerRef}>
              {currentVideo ? (
                <iframe
                  key={currentVideo.id}
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={currentVideo.title}
                />
              ) : (
                <div className="ypp-player-placeholder">
                  <div className="ypp-play-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  select a video to play
                </div>
              )}
            </div>

            <div className="ypp-now-playing">
              {currentVideo ? <><span>▶</span> {currentVideo.title}</> : "— nothing playing —"}
            </div>

            <div className="ypp-card" style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div className="ypp-card-label" style={{ marginBottom: 0 }}>Queue</div>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>
                  {queue.length} video{queue.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="ypp-queue-list">
                {queue.length === 0
                  ? <div className="ypp-queue-empty">no videos queued — add from playlists →</div>
                  : queue.map((v, i) => (
                    <div
                      key={i}
                      className={`ypp-queue-item${i === currentIdx ? " active" : ""}`}
                      onClick={() => jumpTo(i)}
                    >
                      <span className="ypp-queue-num">{i + 1}</span>
                      <span className="ypp-queue-name">{v.title}</span>
                      <span className="ypp-queue-remove" onClick={e => { e.stopPropagation(); removeFromQueue(i); }}>×</span>
                    </div>
                  ))
                }
              </div>
              <div className="ypp-queue-controls">
                <button className="ypp-btn sm" onClick={prev} disabled={currentIdx <= 0}>◀ prev</button>
                <button className="ypp-btn sm" onClick={next} disabled={currentIdx >= queue.length - 1}>next ▶</button>
                <button className="ypp-btn sm danger" onClick={clearQueue}>clear</button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Playlists ── */}
          <div className="ypp-right">
            <div className="ypp-card" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="ypp-card-label">Playlists</div>
              <div className="ypp-playlist-list">
                {playlists.length === 0
                  ? <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {status.error ? status.msg : "loading…"}
                    </div>
                  : playlists.map(pl => (
                    <div className="ypp-playlist-item" key={pl.id}>
                      <div className="ypp-playlist-header" onClick={() => togglePlaylist(pl.id)}>
                        {pl.thumb
                          ? <img className="ypp-playlist-thumb" src={pl.thumb} alt="" />
                          : <div className="ypp-playlist-thumb" />}
                        <div className="ypp-playlist-info">
                          <div className="ypp-playlist-name">{pl.title}</div>
                          <div className="ypp-playlist-meta">{pl.count} videos</div>
                        </div>
                        <button
                          className="ypp-btn sm"
                          style={{ marginRight: 6 }}
                          onClick={e => addPlaylistToQueue(e, pl.id)}
                          title="Add all to queue"
                        >
                          +Q
                        </button>
                        <span className={`ypp-chevron${expandedId === pl.id ? " open" : ""}`}>▶</span>
                      </div>

                      {expandedId === pl.id && (
                        <div className="ypp-video-list">
                          {loadingVideos === pl.id
                            ? <div style={{ padding: "8px 10px", fontSize: 11, color: "var(--muted)"}}>loading…</div>
                            : (videos[pl.id] || []).length === 0
                              ? <div style={{ padding: "8px 10px", fontSize: 11, color: "var(--muted)" }}>no videos found</div>
                              : (videos[pl.id] || []).map(v => (
                                <div className="ypp-video-item" key={v.id}>
                                  {v.thumb
                                    ? <img className="ypp-video-thumb" src={v.thumb} alt="" />
                                    : <div className="ypp-video-thumb" />}
                                  <span className="ypp-video-name">{v.title}</span>
                                  <div className="ypp-video-actions">
                                    <button className="ypp-btn sm" onClick={() => playNow(v)} title="Play now">▶</button>
                                    <button className="ypp-btn sm" onClick={() => addVideoToQueue(v)} title="Add to queue">+Q</button>
                                  </div>
                                </div>
                              ))
                          }
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
              <div className={`ypp-status-bar${status.error ? " error" : ""}`}>{status.msg}</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
