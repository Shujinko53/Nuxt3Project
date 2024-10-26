<template>
	<div class="Customer-page page">
		<h1 class="page_title">
			Редактирование {{ (data as unknown as ICustomerFormState)?.name }}
		</h1>

		<div class="Customer-page_form">
			<input
				v-bind="nameAttr"
				v-model="name"
				type="text"
				placeholder="Наименование"
				class="Customer-page_form-input"
			>

			<input
				v-bind="emailAttr"
				v-model="email"
				type="email"
				placeholder="Email"
				class="Customer-page_form-input"
			>

			<input
				v-bind="fromSourceAttr"
				v-model="fromSource"
				type="text"
				placeholder="Компания"
				class="Customer-page_form-input"
			>

			<div class="image-wrapper">
				<img
					v-if="values.avatar_url || isUploadImagePending"
					:src="values.avatar_url"
					alt="Customer picture"
					class="customer_image"
				/>

				<label :class="['upload_block-label', {'disabled': isUploadImagePending}]">
					<span>Логотип</span>

					<input
						type="file"
						:onchange="(e:InputFileEvent) => e?.target?.files?.length &&
						uploadImage(e.target.files[0])"
						:disabled="isUploadImagePending"
					>
				</label>
			</div>

			<button
				:class="['form_btn', {'disabled': isPending}]"
				@click="onSubmit"
			>
				{{ isPending ? 'Загрузка...' : 'Сохранить' }}
			</button>
		</div>
	</div>
</template>
 
<script setup lang="ts">
	import { ID } from 'appwrite';
	import { storage } from '@/utils/appwrite';
	import { useMutation, useQuery } from '@tanstack/vue-query';
	import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constants';
	import type { ICustomer } from '~/types/deals.types';

	useSeoMeta({
		title: `Редактирование компании`,
	})

	interface ICustomerFormState
	extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

	interface InputFileEvent extends Event {
		target: HTMLInputElement
	}

	const route = useRoute();
	const customerId = route.params.id as string;

	const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

	const { data, isSuccess } = useQuery({
		queryKey: ['get customer', customerId],
		queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
	})

	onMounted(() => {
		if (data.value) {
			const initialData = data.value as unknown as ICustomerFormState

			setValues({
				name: initialData.name,
				email: initialData.email,
				avatar_url: initialData.avatar_url,
				from_source: initialData.from_source || ''
			})
		}
	})

	watch(isSuccess, () => {
		const initialData = data.value as unknown as ICustomerFormState

		setValues({
			name: initialData.name,
			email: initialData.email,
			avatar_url: initialData.avatar_url,
			from_source: initialData.from_source || ''
		})
	})

	const [ name, nameAttr ] = defineField('name');
	const [ email, emailAttr ] = defineField('email');
	const [ fromSource, fromSourceAttr ] = defineField('from_source');

	const { mutate, isPending } = useMutation({
		mutationKey: ['get customer', customerId],
		mutationFn: (data: ICustomerFormState) => 
			DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
	});

	const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
		mutationKey: ['upload image'],
		mutationFn: (file: File) => storage.createFile(STORAGE_ID, ID.unique(), file),
		onSuccess(data) {
			const response = storage.getFileDownload(STORAGE_ID, data.$id)
			setFieldValue('avatar_url', response)
		},
	})
	

	const onSubmit = handleSubmit(values => {
		mutate(values)
	});
</script>

<style lang="scss">
.Customer-page {
	.page_title {
		font-family: $second-font;
	}

	&_form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		margin-bottom: 2rem;
		animation: formAppearance .4s ease-in-out;

		.image-wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.customer_image {
				width: 6rem;
				height: 6rem;
				border-radius: 50%;
			}

			.upload_block-label {
				display: flex;
				flex-direction: column;
				row-gap: .8rem;
				transition: opacity .2s ease;

				span {
					font-size: 1.4rem;
					font-family: $second-font;
				}

				&.disabled {
					opacity: .8;
					pointer-events: none;
				}
			}
		}

		&-input {
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
}
</style>