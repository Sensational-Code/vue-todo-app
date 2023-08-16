
<template>
	<div class="timeline">

		<!-- Select task list by date -->
		<div
			v-for="list in taskLists"
			:key="list.id" 
			class="timeline__date"
			:class="{ 'timeline__date--selected': selectedListId === list.id }"
			@click="$emit('selected-list', list.id)"
		>
			<div>{{ getMonth(list.date) }}</div>
			<div>{{ getDate(list.date) }}</div>
		</div>

	</div>
</template>

<script>

	import moment from 'moment';

	export default {
		emits: ['selected-list'],

		props: {
			taskLists: Array,
			selectedListId: Number
		},

		methods: {
			getMonth(date) {
				return moment(date).format('MMM');
			},

			getDate(date) {
				return moment(date).format('DD');
			}
		}
	}

</script>

<style scoped>

	.timeline {
		padding: 1rem;
	}

	.timeline__date {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 16px;
		width: 64px;
		height: 64px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
		border: 1px solid rgb(218, 218, 218);
		border-radius: 15px;
		margin-bottom: 10px;
	}

	.timeline__date--selected {
		border: 1px solid #99EF2C;
	}

</style>
