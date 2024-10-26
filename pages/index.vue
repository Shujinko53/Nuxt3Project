<template>
	<div class="Home-page page">
		<h1 class="page_title">Crm System</h1>

		<div v-if="isLoading" class="loading_status">Loading...</div>

		<div v-else class="content">
			<ul class="columns_list">
				<li
					v-for="(column, idx) in data"
					:key="column.id"
					class="columns_list-item"
					@dragover="handleDragOver"
					@drop="() => handleDrop(column)"
				>
					<div
						class="columns_list-head"
						:style="generateGradient(idx, data?.length)"
						v-html="column.name"
					></div>

					<CreateDeal :refetch="refetch" :status="column.id" />

					<ul v-if="column.items.length" class="cards_list">
						<li
							v-for="card in column.items"
							:key="card.id"
							class="cards_list-item"
							@dragstart="() => handleDragStart(card, column)"
						>
							<Card :card-data="card" @click.native="store.set(card)" />
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<Transition name="fade">
			<Slideover v-if="store.isOpen" />
		</Transition>
	</div>
</template>

<script setup lang="ts">
	import { useMutation } from '@tanstack/vue-query';
	import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
	import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
	import { EnumStatus } from '~/types/deals.types';
	import type { ICard, IColumn } from '~/components/kanban/kanban.types';
	import Card from '~/components/board/Card.vue';
	import CreateDeal from '~/components/kanban/CreateDeal.vue';
	import { generateGradient } from '~/components/kanban/generate-gradient';
	import Slideover from '~/components/slideover/Slideover.vue';
	import { useDealSlideStore } from '~/store/deal-slide.store';

	useSeoMeta({
		title: 'Home | CRM System',
	})

	type TypeMutationVariables = {
		docId: string,
		status?: EnumStatus
	}

	const dragCardRef = ref<ICard | null>(null);
	const sourceColumnRef = ref<IColumn | null>(null);
	const { data, isLoading, refetch } = useKanbanQuery();
	const store = useDealSlideStore();

	const { mutate } = useMutation({
		mutationKey: ['move_card'],
		mutationFn: ({ docId, status }: TypeMutationVariables) => 
		DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
			status,  
		}),
		onSuccess: () => {
			refetch();
		}
	})

	function handleDragStart(card: ICard, column:  IColumn) {
		dragCardRef.value = card;
		sourceColumnRef.value = column;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(targetColumn: IColumn) {
		if (dragCardRef.value && sourceColumnRef.value) {
			mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
		}
	}
</script>

<style lang="scss" scoped>
.Home-page {
	position: relative;
	display: flex;
	flex-direction: column;

	.page_title {
		margin-bottom: 4rem;
		color: $text-color;
	}

	.loading_status {
		font-size: 2.2rem;
		font-weight: 700;
	}

	.content {
		display: flex;
		flex-direction: column;
		row-gap: 4rem;
		user-select: none;
		flex-grow: 1;
		
		.columns_list {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			column-gap: 5rem;
			flex-grow: 1;

			&-head {
				text-wrap: nowrap;
				margin-bottom: 1rem;
				padding: 1rem 2rem;
				border-radius: .6rem;
				background-color: rgba($gray-900, .2);
				text-align: center;
				font-size: 1.8rem;
				font-family: $second-font;
				line-height: 1;
				color: $text-color;
			}

			&-item {
				display: flex;
				flex-direction: column;
				
				.cards_list {
					display: flex;
					flex-direction: column;
					row-gap: 2rem;
				}
			}
		}
	}
}
</style>