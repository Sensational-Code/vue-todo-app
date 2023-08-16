
<template>
	<div class="task-list">

		<h2 class="task-list__title">{{ titleText }}</h2>
		<span class="task-list--subtext">{{ tasksCompletedText }}</span>

		<!-- Task input -->
		<div class="task-list__header">
			<input class="task-list__input" v-model="newTaskText" @keydown.enter="handleAddTask">
			<button class="task-list__button" @click="handleAddTask">+</button>
		</div>

		<!-- Tasks -->
		<div class="task-list__tasks">
			<div v-for="task in tasks" class="task-list__item" :class="{ 'task-list__item--completed': task.completed }" :key="task.id">
				<span @click="handleCompleteTask(task)">{{ task.text }}</span>
			</div>
		</div>

	</div>
</template>

<script>

	import moment from 'moment';

	export default {
		emits: ['add-task', 'complete-task', 'delete-task'],

		props: {
			tasks: Array,
			date: String
		},

		data() {
			return {
				newTaskText: ''
			}
		},

		computed: {
			titleText() {
				let listDate = moment(this.date);

				if (listDate.isSame(moment(), 'day')) {
					return 'Today\'s Tasks';
				}

				let tomorrow = moment().add(1, 'days');
				if (listDate.isSame(tomorrow, 'day')) {
					return 'Tomorrow\'s Tasks';
				}

				let yesterday = moment().subtract(1, 'days');
				if (listDate.isSame(yesterday, 'day')) {
					return 'Yesterday\'s Tasks';
				}

				return `${moment(this.date).format('MMMM Do')} Tasks`;
			},

			tasksCompletedText() {
				let amountCompleted = this.tasks.reduce((amountCompleted, task) => {
					return task.completed ? amountCompleted += 1 : amountCompleted;
				}, 0);

				return `${amountCompleted} of ${this.tasks.length} tasks completed`;
			}
		},

		methods: {
			handleAddTask() {
				if (this.newTaskText === '') return;

				this.$emit('add-task', this.newTaskText);
				this.newTaskText = '';
			},

			handleCompleteTask(task) {
				this.$emit('complete-task', task);
			},

			handleDeleteTask(task) {
				this.$emit('delete-task', task);
			}
		}
	}

</script>

<style scoped>

	.task-list {
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.task-list__title {
		font-size: 30px;
	}

	.task-list--subtext {
		color: rgb(84, 127, 255);
	}

	.task-list__header {
		display: flex;
		padding-bottom: 0.5rem;
	}

	.task-list__input {
		height: 40px;
		width: 400px;
		font-size: 0.9rem;
		color: rgb(73, 80, 87);
		border: 1px solid rgb(193, 204, 211);
		border-radius: 0.3rem;
	}

	.task-list__button {
		width: 40px;
		height: 40px;
		margin-left: 10px;
		font-size: 1.6rem;
		color: white;
		outline: none;
		border: none;
		border-radius: 0.3rem;
		background-color: rgb(84, 127, 255);
	}

	.task-list__tasks {
		overflow: scroll;
	}

	.task-list__item {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 18px;
		padding-top: 24px;
		padding-bottom: 24px;
	}

	.task-list__item:not(:last-child) {
		border-bottom: 1px solid rgb(218, 218, 218);
	}

	.task-list__item--completed {
		text-decoration: line-through;
	}

</style>
