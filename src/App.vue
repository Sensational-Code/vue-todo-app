
<template>
  <div class="task-app">
  	<Timeline :taskLists="taskLists" :selectedListId="currentTaskListId" @selected-list="handleSelectedList" />
  	<TaskList v-if="currentTaskList" :tasks="currentTaskList" @add-task="handleAddTask" @delete-task="handleDeleteTask" />
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
				return this.taskLists.find(taskList => taskList.id === this.currentTaskListId)?.tasks;
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

			async handleDeleteTask(task) {
				this.taskLists = await api.deleteTask(task.id);
			} 
		}
	}

</script>

<style scoped>

	.task-app {
		display: flex;
		border: 1px solid gray;
	}

</style>
