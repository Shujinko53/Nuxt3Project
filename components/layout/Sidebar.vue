<template>
	<aside class="aside">
		<!-- <NuxtLink to="/" class="logo">
			<NuxtImg src="" alt="Logo" />
			 Icon logo
		</NuxtLink> -->

		<button class="LogoutBtn" @click="logout">
			<NuxtIcon name="logout" filled />
		</button>

		<LayoutMenu />
	</aside>
</template>

<script lang="ts" setup>
	import { account } from '@/utils/appwrite';
	import { useIsLoadingStore, userAuthStore } from '~/store/auth.store';

	const isLoadingStore = useIsLoadingStore();
	const router = useRouter();
	const authStore = userAuthStore();

	const logout = async () => {``
		isLoadingStore.set(true);
		await account.deleteSession('current');
		authStore.clear();
		await router.push('/login');
		isLoadingStore.set(false);
	}
</script>

<style lang="scss">
	.aside {
		position: relative;
		display: flex; 
		flex-direction: column;
		padding: 10rem 2rem 4rem;
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