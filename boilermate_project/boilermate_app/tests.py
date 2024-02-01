import unittest
from django.test import TestCase
from boilermate_app.models import Classes

class ClassTestCase(TestCase):
        
    def test_the_test_case(self):
        fake_class_name = "FakeName"
        fake_topics = "FakeTopics"
        class_instance = Classes.objects.create(name=fake_class_name, topics=fake_topics)
        retrieved_instance = Classes.objects.get(pk=class_instance.pk)
        self.assertEqual(retrieved_instance.name, fake_class_name)
        self.assertEqual(retrieved_instance.topics, fake_topics)
        
if __name__ == '__main__':
    unittest.main()