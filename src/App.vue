
<template>
	<div class="task-app">
		<div class="task-app__inner">
			<Timeline :taskLists="taskLists" :selectedListId="currentTaskListId" @selected-list="handleSelectedList" />
			<TaskList
				v-if="currentTaskList"
				:tasks="currentTaskList.tasks"
				:date="currentTaskList.date"
				@add-task="handleAddTask"
				@complete-task="handleCompleteTask"
				@delete-task="handleDeleteTask"
			/>
		</div>
	</div>
</template>

<script>

	import Timeline from '@/components/Timeline.vue';
	import TaskList from '@/components/TaskList.vue';
	import api from './api/index';

	export default {
		components: {
			Timeline,
			TaskList
		},

		data() {
			return {
				currentTaskListId: null,
				taskLists: []
			}
		},

		computed: {
			currentTaskList() {
				return this.taskLists.find(taskList => taskList.id === this.currentTaskListId);
			}
		},

		async beforeMount() {
			this.taskLists = await api.getTaskLists();

			// The default current task list should be the one with todays date, just use the second in the list temporarily
			// TODO: Fill in all the task lists from tomorrows date to the last list's date
			// TODO: Make sure if the current date becomes tomorrow to change current list to tomorrow's and add a new tomorrow list
			this.currentTaskListId = this.taskLists[1].id;
		},

		methods: {
			handleSelectedList(listId) {
				this.currentTaskListId = listId;
			},

			async handleAddTask(text) {
				this.taskLists = await api.createTask({ taskListId: this.currentTaskListId, text });
			},

			async handleCompleteTask(task) {
				this.taskLists = await api.editTask({ id: task.id, completed: !task.completed });
			},

			async handleDeleteTask(task) {
				this.taskLists = await api.deleteTask(task.id);
			} 
		}
	}

</script>

<style scoped>

	.task-app {
		display: flex;
		margin: auto;
		max-width: 768px;
		height: 80vh;
		background-color: rgb(255, 255, 255);
		border-radius: 20px;
		box-shadow: 0 23px 20px -20px rgba(115,162,208,0.1), 0 0 15px rgba(115,162,208,0.06);
	}

	.task-app__inner {
		padding: 20px;
		display: flex;
	}

</style>
