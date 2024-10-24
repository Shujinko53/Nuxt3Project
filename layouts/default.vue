<template>
	<section class="layout">
		<Sidebar />

		<div>
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
import Sidebar from '~/components/layout/Sidebar.vue';

	console.log('Loaded');
</script>

<style lang="scss" scoped>
.layout {
	display: grid;
	grid-template-columns: 1fr 6fr;
	min-height: 100vh;
}
</style>