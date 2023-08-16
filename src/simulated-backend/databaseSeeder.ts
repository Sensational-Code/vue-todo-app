
import moment from 'moment';
import { DBTaskList, DBTask } from './database';

export default function DBSeeder(tables: any) {
	let tomorrow = moment().add(1, 'days');

	for (let i = 0; i < 5; ++i) {
		let taskList = new DBTaskList({ date: tomorrow.clone().subtract(i, 'days').format() });
		tables.taskLists.push(taskList);

		for (let j = 0; j < 6; ++j) {
			let task = new DBTask({ taskListId: taskList.id, text: `Task item ${i+1}-${j+1}`, completed: false });
			tables.tasks.push(task);
		}
	}
}
