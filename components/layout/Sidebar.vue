<template>
	<aside class="aside">
		<NuxtLink to="/" class="logo">
			<!-- <NuxtImg src="" alt="Logo" /> -->
			 Icon logo
		</NuxtLink>

		<button class="LogoutBtn">
			<NuxtIcon name="logout" filled />
		</button>
	</aside>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
	.aside {
		position: relative;
		display: flex; 
		flex-direction: column;
		padding: 8rem 4rem;
		background-color: $sidebar;

		.logo {
			margin: 0 auto;
			font-size: 2rem;
			font-family: 'Lato', sans-serif;
			color: $text-color;
		}

		.LogoutBtn {
			position: absolute;
			top: 2rem;
			right: 2rem;
			color: $white;
			transition: color .3s;

			.nuxt-icon {
				font-size: 2rem;
			}

			&:hover {
				color: $rose;
			}
		}
	}
</style>