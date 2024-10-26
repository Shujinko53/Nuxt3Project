<template>
	<div class="Customers-page page">
		<h1 class="page_title">Наши клиенты</h1>

		<div v-if="isLoading" class="loading_status">Loading...</div>

		<div v-else class="content-wrapper">
			<ul class="head_list">
				<li
					v-for="(column, index) in tableHeadColumns"
					:key="index"
					class="head_list-item"
					v-html="column.name"
				></li>
			</ul>

			<ul class="customers_list">
				<li
					v-for="customer in (customers?.documents as unknown as ICustomer[])"
					:key="customer.$id"
					class="customers_list-item"
				>
					<NuxtLink :to="`/customers/edit/${customer.$id}`">
						<NuxtImg
							:src="customer.avatar_url"
							:alt="customer.name"
							class="customers_list-item_img"
						/>
					</NuxtLink>

					<div class="customers_list-item_column">{{ customer.name }}</div>
					<div class="customers_list-item_column">{{ customer.email }}</div>
					<div class="customers_list-item_column">{{ customer.from_source }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useQuery } from '@tanstack/vue-query';
	import { COLLECTION_CUSTOMERS, DB_ID } from '~/app.constants';
	import type { ICustomer } from '~/types/deals.types';

	useSeoMeta({
		title: 'Customs | CRM System',
	})

	const { data : customers, isLoading } = useQuery({
		queryKey: ['customers'],
		queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
	})

	type typeTableColumns = {
		name: string, 
	}

	const tableHeadColumns: typeTableColumns[] = [
		{
			name: 'Изображение',
		},
		{
			name: 'Наименование',
		},
		{
			name: 'Email',
		},
		{
			name: 'Откуда пришёл',
		},
	]
</script>

<style lang="scss" scoped>
.Customers-page {
	position: relative;
	--grid-style: repeat(auto-fill, minmax(10rem, 20rem));
	--grid-gap: 2rem;

	.page_title {
		font-family: $second-font;
	}

	.loading_status {
		font-size: 2.2rem;
		font-weight: 700;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;

		.head_list {
			display: grid;
			grid-template-columns: var(--grid-style);
			column-gap: var(--grid-gap);
			padding: 1.2rem 0 1.2rem .8rem;
			font-family: $second-font;
			
			&-item {
				font-size: 1.5rem;
				color: $gray-700;
			}
		}

		.customers_list {
			display: flex;
			flex-direction: column;

			&-item {
				display: grid;
				column-gap: var(--grid-gap);
				align-items: center;
				grid-template-columns: var(--grid-style);
				padding: 1.2rem 0 1.2rem .8rem;
				border-top: 1px solid rgba($gray-500, .2);

				&_img {
					width: 5rem;
					height: 5rem;
					border-radius: 50%;
				}

				&_column {
					font-size: 1.6rem;
					font-family: $second-font;
				}
			}
		}
	}
}
</style>