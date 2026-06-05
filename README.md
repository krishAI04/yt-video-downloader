# YouTube Public Video Downloader

A basic mobile-friendly one-page website for downloading publicly viewable YouTube videos where downloading is allowed by the creator or rights holder.

This app does not bypass login, cookies, Premium, members-only, private, age-restricted, or DRM-protected content.

## Requirements

Install these on the server:

- Node.js 18+
- Python 3.9+
- FFmpeg available on PATH
- yt-dlp available on PATH, or installed with the included Python virtual environment

## Setup

```bash
npm install
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

If you install `yt-dlp` inside `.venv`, start the server from the same terminal after activation so `yt-dlp` is available on PATH.

## Run locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Formats

- `video-audio`: MP4 video with voice/audio. This is the normal option if you want a complete video.
- `video-only`: MP4 video stream without voice/audio.
- `audio`: MP3 voice/audio only.

## API

`POST /api/download`

Request:

```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "type": "video-audio"
}
```

`type` can be `video-audio`, `video-only`, or `audio`.

Success response:

```json
{
  "success": true,
  "downloadUrl": "/downloads/filename.ext"
}
```

## Deployment Notes

- Install FFmpeg and yt-dlp on the server.
- Keep the `/downloads` folder writable by the Node.js process.
- Temporary files are deleted automatically after the configured age in `server.js`.
- For production, put this behind HTTPS and a reverse proxy.
- Be sure your use complies with YouTube's terms and applicable copyright law.
