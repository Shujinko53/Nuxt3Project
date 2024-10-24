<template>
	<div class="menu_list">
		<NuxtLink
			v-for="link in MENU_DATA"
			:key="link.name"
			:to="link.url"
			class="menu_link"
		>
			<NuxtIcon :name="link.icon" class="menu_link-icon" filled />

			{{  link.name  }}
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
	import { MENU_DATA } from './menu.data';


</script>

<style lang="scss">
.menu {
	&_list {
		display: flex;
		flex-direction: column;
		row-gap: 1.6rem;
	}

	&_link {
		display: flex;
		align-items: center;
		padding: .2rem 1rem;
		column-gap: 1.4rem;
		border-radius: 1rem;
		font-size: 1.8rem;
		letter-spacing: .02em;
		color: $text-color;
		transition:
			background-color .3s ease,
			box-shadow .3s ease,
			opacity .1s ease-in-out;

		&:hover {
			background-color: rgba($gray-100, .2);
			box-shadow: 0 0 7px 0 $bg-color;
		}

		&:active {
			opacity: .6;
		}

		&-icon {
			font-size: 1.8rem;
		}
	}
}
</style>