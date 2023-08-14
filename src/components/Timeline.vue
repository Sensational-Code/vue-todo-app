
<template>
	<div class="timeline">

		<!-- Select task list by date -->
		<div
			v-for="list in taskLists"
			:key="list.id" 
			:class="{ 'timeline-selected': selectedListId === list.id }"
		>
			<div @click="$emit('selected-list', list.id)">
				{{ formatDate(list.date) }}
			</div>
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
			formatDate(date) {
				return moment(date).format('MMM DD');
			}
		}
	}

</script>

<style scoped>
	
	.timeline {
		padding: 1rem;
	}

	.timeline-selected {
		color: green;
	}

</style>
