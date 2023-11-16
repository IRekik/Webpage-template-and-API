from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import Task
from app import db

main_bp = Blueprint('main', __name__)

# 1. Create endpoint to create a new task
@main_bp.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json

    # Convert the deadline string to a datetime object
    deadline = datetime.strptime(data['deadline'], '%Y-%m-%d')

    new_task = Task(
        title=data['title'],
        description=data['description'],
        deadline=deadline
    )
    
    # Add the new task to the database
    db.session.add(new_task)
    db.session.commit()

    return jsonify({'message': 'Task created successfully', 'task_id': new_task.id}), 201

# 3. Create endpoint to retrieve all tasks and sort by deadline
@main_bp.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.deadline).all()
    task_list = [{'id': task.id, 'title': task.title, 'description': task.description, 'deadline': task.deadline} for task in tasks]

    return jsonify({'tasks': task_list})

# 4. Implement endpoint to edit task details by ID
@main_bp.route('/api/tasks/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    data = request.json
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)

    # Convert the deadline to a datetime object
    deadline_str = data.get('deadline', str(task.deadline))
    task.deadline = datetime.strptime(deadline_str, '%Y-%m-%d')

    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

# 5. Implement endpoint to delete task by ID
@main_bp.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'}), 200