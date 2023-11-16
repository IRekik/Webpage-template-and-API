import unittest
from app import create_app, db
from app.models import Task

class TestTaskAPI(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.app.config['TESTING'] = True
        self.app.config['WTF_CSRF_ENABLED'] = False 
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

        with self.app.app_context():
            db.create_all()

    def test_create_task(self):
        task_data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'deadline': '2023-12-31'
        }

        response = self.client.post('/api/tasks', json=task_data)
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn('message', data)
        self.assertIn('task_id', data)

    def test_get_tasks(self):
        response = self.client.get('/api/tasks')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertIn('tasks', data)
    
    def test_edit_task(self):
        self.test_create_task()
        task_id = 1
        edited_data = {
            "title": "Edited Task",
            "description": "Edited Description",
            "deadline": "2024-01-15"
        }
        response = self.client.put(f'/api/tasks/{task_id}', json=edited_data)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertIn('message', data)

    def test_delete_task(self):
        task_id = 1
        response = self.client.delete(f'/api/tasks/{task_id}')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertIn('message', data)

if __name__ == '__main__':
    unittest.main()