<template>
	<div class="CreateDeal">
		<button
			class="CreateDeal_btn"
			@click="isOpenForm = !isOpenForm"
		>
			<Transition name="fade">
				<NuxtIcon v-if="isOpenForm" name="arrow-up" class="CreateDeal_icon" />
				<NuxtIcon v-else name="plus-circled" class="CreateDeal_icon" />
			</Transition>
		</button>
	</div>

	<div v-if="isOpenForm" class="CreateDeal_form">
		<input
			v-bind="nameAttrs"
			v-model="name"
			type="text"
			placeholder="Наименование"
			class="CreateDeal_form_input"
		>

		<input
			v-bind="priceAttrs"
			v-model="price"
			type="number"
			placeholder="Сумма"
			class="CreateDeal_form_input"
		>

		<input
			v-bind="customerNameAttrs"
			v-model="customerName"
			type="text"
			placeholder="Компания"
			class="CreateDeal_form_input"
		>

		<input
			v-bind="customerEmailAttrs"
			v-model="customerEmail"
			type="text"
			placeholder="Email"
			class="CreateDeal_form_input"
		>

		<button
			:class="['form_btn', {'disabled': isPending}]"
			@click="onSubmit"
		>
			{{ isPending ? 'Загрузка...' : 'Добавить' }}
		</button>
	</div>
</template>

<script setup lang="ts">
	import { useMutation } from '@tanstack/vue-query';
	import { defineProps } from 'vue';
	import { ID } from 'appwrite';
	import { COLLECTION_DEALS, DB_ID,  } from '@/app.constants';
	import type { IDeal } from '@/types/deals.types';

	const props = defineProps({
		status: {
			type: String,
			default: '',
		},
		refetch: {
			type: Function,
		}
	})

	const isOpenForm = ref(false);

	interface IDealFormState extends Pick<IDeal, 'name' | 'price'>
	{
		customer: {
			email: string,
			name: string,
		},
		status: string,
	};

	const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
		initialValues: {
			status: props.status
		},
	});

	const [name, nameAttrs] = defineField('name');
	const [price, priceAttrs] = defineField('price');
	const [customerName, customerNameAttrs] = defineField('customer.name');
	const [customerEmail, customerEmailAttrs] = defineField('customer.email');

	const { mutate, isPending} = useMutation({
		mutationKey: ['create a new deal'],
		mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, ID.unique(), data),
		onSuccess() {
			props.refetch && props.refetch()
			handleReset()
		},
	});

	const onSubmit = handleSubmit(values => {
		mutate(values);
	});
</script>
 
<style lang="scss">
.CreateDeal {
	position: relative;
	display: flex;
	justify-content: center;
	margin-bottom: .4rem;

	&_btn {
		position: relative;
		color: rgba($text-color, .1);
		transition: color .3s ease;
		cursor: pointer;

		&:hover {
			color: $light-green;
		}
	}

	&_icon {
		left: 50%;
		font-size: 3rem;
		transform: translateX(-50%);
	}

	&_form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		margin-bottom: 2rem;
		animation: fromAppearance .4s ease-in-out;

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

		.form_btn {
			width: max-content;
			height: 4rem;
			padding: 0 2rem;
			flex-shrink: 0;
			font-family: $second-font;
			
			&.disabled {
				opacity: .4;
				pointer-events: none;
			}
		}
	}

	@keyframes fromAppearance {
		0% {
			border-color: rgba($light-green, 1);
			opacity: 0;
			transform: translateY(-3rem);
			pointer-events: none;
		}

		90% {
			border-color: rgba($light-green, 1);
		}

		100% {
			border-color: transparent;
			opacity: 1;
			transform: translateY(0);
			pointer-events: unset;
		}
	}
}
</style>