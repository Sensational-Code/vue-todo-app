
import { DB, DBTask } from '@/simulated-backend/database';
import type { ResponseTaskListInterface } from '@/simulated-backend/responseBuilder';
import { ResponseTaskListsBuilder } from '@/simulated-backend/responseBuilder';

export default {
	/**
	 * Get all task lists
	 */
	getTaskLists(): ResponseTaskListsInterface[] {
		return ResponseTaskListsBuilder();
	},

	/**
	 * Create a task in a specific task list
	 * @param {number} { taskListId } - The task list to create the task in
	 * @param {string} { text } - The text of the task list
	 */
	createTask({ taskListId, text }: { taskListId: number, text: string }) {
		let task = new DBTask({ taskListId, text, completed: false });
		DB.tables.tasks.push(task);
		DB.save();

		return ResponseTaskListsBuilder();
	},

	/**
	 * Edit a task's properties by its id
	 * @param {number} { id } - The id of the task to edit
	 * @param {string} { text } - The edited text of the task
	 * @param {boolean} { completed } - The completion status of the task
	 */
	editTask({ id, text, completed }: { id: number, text: string, completed: boolean }) {
		let task = DB.tables.tasks.find(task => task.id === id);
		if (task) {
			task.text = text || task.text;
			task.completed = completed || task.completed;
			DB.save();
		}

		return ResponseTaskListsBuilder();
	},

	/**
	 * Delete a task by its id
	 * @param {number} id - The id of the task to delete
	 */
	deleteTask(id: number) {
		let index = DB.tables.tasks.findIndex(task => task.id === id);
		DB.tables.tasks.splice(index, 1);
		DB.save();

		return ResponseTaskListsBuilder();
	},

	/** 
	 * Move tasks from one task list to another
	 * @param {number} { toTaskListId } - The id of the task list to move the tasks to
	 * @param {number[]} { tasks } - An array of task id's to move
	 */
	moveTasks({ toTaskListId, taskIds }:  { toTaskListId: number, taskIds: number[] }) {
		DB.tables.tasks.forEach(task => {
			taskIds.forEach(taskId => {
				if (taskId === task.id) {
					task.taskListId = toTaskListId;
				}
			});
		});
		DB.save();

		return ResponseTaskListsBuilder();
	}
}
