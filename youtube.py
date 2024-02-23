import requests

api_key = 'AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU'
query = f'A Guide on how to do convolution in signals and systems'
url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&q={query}&part=snippet&maxResults=20&type=video'
response = requests.get(url)
data = response.json()
items = data.get('items', [])
videos = []
for item in items:
    video_id = item.get('id', {}).get('videoId')
    if not video_id:
        continue
    videos.append({
        'title': item['snippet']['title'],
        'videoId': video_id,
        'url': f"https://www.youtube.com/watch?v={video_id}"
    })
# videos = [{'title': item['snippet']['title'], 'videoId': item['id']['videoId'], 'url': f'https://www.youtube.com/watch?v={item["id"]["videoId"]}'} for item in data['items']]
print(videos)

