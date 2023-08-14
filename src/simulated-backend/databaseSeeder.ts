
import moment from 'moment';
import { DBTaskList, DBTask } from './database';

export default function DBSeeder(tables: any) {
	let yesterday = moment().subtract(1, 'days');

	for (let i = 0; i < 3; ++i) {
		let taskList = new DBTaskList({ date: yesterday.clone().add(i, 'days').format() });
		tables.taskLists.push(taskList);

		for (let j = 0; j < 4; ++j) {
			let task = new DBTask({ taskListId: taskList.id, text: `Task item ${i+1}-${j+1}`, completed: false });
			tables.tasks.push(task);
		}
	}
}
