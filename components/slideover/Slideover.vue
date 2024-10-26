<template>
	<div class="Slideover">
		<div class="Slideover_overlay" @click="store.toggle()"></div>

		<Transition name="slideRight">
			<div v-if="isLocalOpen" class="Slideover_card">
				<div class="Slideover_card-top">
					<SlideoverTop />
				</div>

				<SlideoverComments />
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
	import { useDealSlideStore } from '~/store/deal-slide.store';

	const store = useDealSlideStore();

	const isLocalOpen = computed({
		get: () => store.isOpen,
		set: value => {
			store.isOpen = value;
		}
	})
</script>

<style lang="scss">
.Slideover {
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba($black-100, .2);

	&_overlay {
		width: 100%;
		height: 100%;
	}

	&_card {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		width: 20%;
		height: 100%;
		background-color: $bg-color;

		&-top {
			padding: 1.6rem;
			border-bottom: 1px solid rgba($gray-700, .2);
		}
	}
}
</style>