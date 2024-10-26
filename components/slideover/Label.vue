<template>
	<div class="Label">
		<label v-if="labelText" class="Label_name">
			{{ labelText }}
		</label>

		<div class="Label_info">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	labelText: {
		type: String,
		default: '',
	},
})
</script>

<style lang="scss">
.Label {
	display: flex;
	flex-direction: column;
	row-gap: .4rem;

	&_name {
		font-size: 1.2rem;
		color: rgba($text-color, .7);
	}

	&_info {
		font-size: 1.6rem;
	}
}
</style>