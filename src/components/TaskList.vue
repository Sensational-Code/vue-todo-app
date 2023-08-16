
<template>
	<div class="task-list">

		<h2 class="task-list__title">Today's Tasks</h2>
		<span class="task-list--subtext">{{ tasksCompletedText }}</span>

		<!-- Task input -->
		<div class="task-list__header">
			<input class="task-list__input" v-model="newTaskText" @keydown.enter="handleAddTask">
			<button class="task-list__button" @click="handleAddTask">+</button>
		</div>

		<!-- Tasks -->
		<div class="task-list__tasks">
			<div v-for="task in tasks" class="task-list__item" :key="task.id">
				<span @click="handleDeleteTask(task)">{{ task.text }}</span>
			</div>
		</div>

	</div>
</template>

<script>

	export default {
		emits: ['add-task', 'delete-task'],

		props: {
			tasks: Object
		},

		data() {
			return {
				newTaskText: ''
			}
		},

		computed: {
			tasksCompletedText() {
				let amountCompleted = this.tasks.reduce((amountCompleted, task) => {
					return task.completed ? amountCompleted += 1 : amountCompleted;
				}, 0);

				return `${amountCompleted} of ${this.tasks.length-1} tasks completed`
			}
		},

		methods: {
			handleAddTask() {
				this.$emit('add-task', this.newTaskText);
				this.newTaskText = '';
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

</style>
