from pathlib import Path
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials

def getPath():
    return Path(r'/mnt/c/Users/mli00/Desktop/Purdue/ECE 49595O/Boilermate-b3fcd-firebase-adminsdk-rwh4i-30e3b04f5c.json') # subject to change

path = getPath()
cred = credentials.Certificate(path)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://boilermate-b3fcd-default-rtdb.firebaseio.com'
})

def save_to_firebase(department, class_name, topic):
        try:
            ref = db.reference('Classes')
            class_name = class_name.replace('/', '\u2215')
            topic.lower()
            updated_topic = ref.child(department).child(class_name).get()
            updated_topic = updated_topic.lower() if updated_topic else ''
            if updated_topic is None:
                ref.child(department).child(class_name).set(topic)
            else:
                topics_list = [t.strip() for t in updated_topic.split(',')]
                if topic not in topics_list:
                    topics_list.append(topic)
                    updated_topic = ', '.join(topics_list)
                    ref.child(department).child(class_name).set(updated_topic)
                    saved_data = ref.child(department).child(class_name).get()
                    print(saved_data)
                    print(updated_topic)
                    if saved_data == updated_topic:
                        return True, 'Topic saved successfully'
                    else:
                        return False, 'Failed to save topic'
                else:
                    return True, 'Topic already in firebase db'
        except Exception as e:
            return False, str(e)
        
if __name__ == "__main__":
    topic = "test6"
    class_name = "ECE 30100 - Signals and Systems"
    department = "ECE"
    success = save_to_firebase(department, class_name, topic)
    print(success)
    