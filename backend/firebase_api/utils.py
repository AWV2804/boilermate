from .views import fetch_duration_from_youtube

def get_video_duration(video_id):
    video_duration_seconds = fetch_duration_from_youtube(video_id)
    return video_duration_seconds