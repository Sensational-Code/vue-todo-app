
import type { DBTaskListInterface, DBTaskInterface } from './database';
import { DB } from './database';
const tables = DB.tables;

export interface ResponseTaskListInterface extends DBTaskListInterface {
	tasks: ResponseTaskInterface[];
}

export interface ResponseTaskInterface extends DBTaskInterface {}

export function ResponseTaskListsBuilder(): ResponseTaskListInterface[] {
	// Build the initial array of ResponseTaskLists
	let responseTaskLists : ResponseTaskListInterface[] = [];
	tables.taskLists.forEach(taskList => {
		const responseTaskList: ResponseTaskListInterface = { ...taskList, tasks: [] };
		responseTaskLists.push(responseTaskList);
	});

	// Go through each Task and assign it to a ResponseTaskList
	tables.tasks.forEach(task => {
		responseTaskLists.every(taskList => {
			if (taskList.id === task.taskListId) {
				taskList.tasks.push({ ...task });
				return false;
			}

			return true;
		});
	});

	return responseTaskLists;
}
