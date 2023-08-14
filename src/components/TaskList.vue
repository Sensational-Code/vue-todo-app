
<template>
	<div class="task-list">

		<!-- Task input -->
		<div class="task-list__header">
			<input v-model="newTaskText" @keydown.enter="handleAddTask">
			<button @click="handleAddTask">Add</button>
		</div>

		<!-- Tasks -->
		<div v-for="task in tasks" :key="task.id">
			<span @click="handleDeleteTask(task)">{{ task.text }}</span>
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
	}

	.task-list__header {
		padding-bottom: 0.5rem;
	}

</style>
