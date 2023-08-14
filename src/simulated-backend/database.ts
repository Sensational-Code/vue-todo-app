
import DBSeeder from './databaseSeeder';

export interface DBTaskListInterface {
	id: number,
	date: string,
}

export class DBTaskList implements DBTaskListInterface {
	public id: number;
	public date: string;

	constructor({ date } : { date: string }) {
		this.id = Math.random() * 100;
		this.date = date;
	}
}


export interface DBTaskInterface {
	id: number,
	taskListId: number;
	dateCreated?: string,
	dateCompleted?: string,
	completed: boolean,
	text: string
}

export class DBTask implements DBTaskInterface {
	public id: number;
	public taskListId: number;
	public dateCreated?: string;
	public dateCompleted?: string;
	public completed: boolean;
	public text: string;

	// @ts-ignore
	constructor({ taskListId, text, completed }) {
		this.id = Math.random() * 100;
		this.taskListId = taskListId;
		this.completed = false;
		this.text = text;
	}
}


interface TablesInterface {
	taskLists: DBTaskList[],
	tasks: DBTask[]
}

class Database {
	public tables: TablesInterface = {
		taskLists: [],
		tasks: []
	};

	public saveTables: boolean = false;

	constructor() {
		let savedTables: any = JSON.parse(localStorage.getItem('db_tables') || '');

		if (this.saveTables && savedTables) {
			this.tables = savedTables;
		} else {
			this.tables = {
				taskLists: [],
				tasks: []
			};

			DBSeeder(this.tables);
		}
	}

	public save() {
		if (this.saveTables) {
			localStorage.setItem('db_tables', JSON.stringify(this.tables));
		}
	}
}

export const DB = new Database();;
