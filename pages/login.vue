<template>
	<div class="Login-page page">
		<div class="login_block">
			<h1 class="page_title">Login</h1>

			<div class="form">
				<input type="text" placeholder="Name" class="form_input" v-model="nameRef">
				<input type="email" placeholder="Email" class="form_input" v-model="emailRef">
				<input type="password" placeholder="Password" class="form_input" v-model="passwordRef">

				<div class="btns_wrapper">
					<button class="form_btn" @click="login">Login</button>
					<button class="form_btn" @click="register">Register</button>
				</div>
			</div>
		</div>
	</div>
</template>
 
<script setup lang="ts">
	import {  ID, account } from '@/utils/appwrite';
	import { useIsLoadingStore, userAuthStore } from '~/store/auth.store';

	useHead({
		title: 'Login | CRM System',
	})

	const nameRef = ref('');
	const emailRef = ref('');
	const passwordRef = ref('');

	const isLoadingStore = useIsLoadingStore();
	const router = useRouter();
	const authStore = userAuthStore();

	const login = async () => {
		isLoadingStore.set(true);

		await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

		const response = await account.get();

		// console.log('response => ', response, '\naccount => ', account);

		if (response) {
			authStore.set({
				name: response.name,
				email: response.email,
				status: response.status
			});
		}

		nameRef.value = '';
		emailRef.value = '';
		passwordRef.value = '';

		await router.push('/');
		isLoadingStore.set(false);
	}  

	const register = async () => {
		await account.create(ID.unique(), emailRef.value, passwordRef.value, nameRef.value);
		await login();
	}
</script>

<style lang="scss">
.Login-page {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	.login_block {
		display: flex;
		flex-direction: column;
		width: 25%;
		min-width: 25rem;
		padding: 2rem 3rem;
		background-color: $sidebar;
		box-shadow: 0 0 18px 0 $sidebar;
		border-radius: 2rem;
	}

	.page_title {
		margin-bottom: 3rem;
		text-align: center;
		color: $text-color;
		user-select: none;
	}

	.form {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;

		&_input {
			display: flex;
			align-items: center;
			height: 4rem;
			border-radius: 1rem;
			padding: 0 1rem;
			border: 1px solid $black-100;
			background-color: transparent;
			font-size: 1.6rem;
			line-height: 1;
			color: $gray-500;

			&::placeholder {
				color: $gray-400;
			}
		}

		&_btn {
			flex-basis: 0;
		}
	}

	.btns_wrapper {
		display: flex;
		align-self: center;
		column-gap: 2rem;
		width: 100%;
	}
}
</style>