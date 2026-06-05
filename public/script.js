const form = document.querySelector('#download-form');
const urlInput = document.querySelector('#youtube-url');
const typeInput = document.querySelector('#format-type');
const button = document.querySelector('#download-button');
const statusBox = document.querySelector('#status');
const downloadLink = document.querySelector('#download-link');

function setStatus(message, kind = '') {
  statusBox.textContent = message;
  statusBox.className = `status ${kind}`.trim();
}

function isAllowedUrl(value) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    return parsed.protocol === 'https:' && (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be');
  } catch {
    return false;
  }
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Processing...' : 'Download';
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const url = urlInput.value.trim();
  const type = typeInput.value;

  downloadLink.hidden = true;
  downloadLink.removeAttribute('href');

  if (!url) {
    setStatus('Please paste a YouTube URL.', 'error');
    urlInput.focus();
    return;
  }

  if (!isAllowedUrl(url)) {
    setStatus('Only HTTPS youtube.com and youtu.be links are allowed.', 'error');
    urlInput.focus();
    return;
  }

  setLoading(true);
  setStatus('Processing your file. This can take a little while for longer videos.');

  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Download failed. Please try another allowed public video.');
    }

    downloadLink.href = data.downloadUrl;
    downloadLink.hidden = false;
    setStatus('Your file is ready.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  } finally {
    setLoading(false);
  }
});
