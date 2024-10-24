<template>
	<Loader v-if="isLoadingStore.isLoading" /> 

	<section v-if="!isLoadingStore.isLoading" :class="{'layout': authStore.isAuth}">
		<Sidebar v-if="authStore.isAuth" />

		<div>
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { account } from '@/utils/appwrite';
import Loader from '~/components/layout/Loader.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useIsLoadingStore, userAuthStore } from '~/store/auth.store';

const isLoadingStore = useIsLoadingStore();
const router = useRouter();
const authStore = userAuthStore();

console.log('Loaded');

onMounted(async () => {
	try {
		const user = await account.get();

		if (user) authStore.set(user);
	} catch (error) {
		router.push('/login');
	} finally {
		isLoadingStore.set(false);
	}
});
</script>

<style lang="scss" scoped>
.layout {
	display: grid;
	grid-template-columns: 1fr 6fr;
	min-height: 100vh;

	&::-webkit-scrollbar {
		width: .8rem; /* в основном для вертикальных полос прокрутки */
		padding-right: 1rem;
	}

	&::-webkit-scrollbar-thumb { /* плашка-бегунок */
		border-radius: 1rem;
		background: $black;
	}

	&::-webkit-scrollbar-track { /* фон */
		border: 3px solid $gray-600;
		background: $sidebar;
	}
}
</style>