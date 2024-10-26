<template>
	<div class="Top">
		<h3 class="Top_title">О сделке</h3>

		<Label label-text="Наименование">
			<span>{{ store.card?.name }}</span>
		</Label>

		<Label label-text="Сумма">
			<span>{{ convertCurrency(store.card?.price || 0) }}</span>
		</Label>

		<Label label-text="Статус">
			<span class="label_status">{{ store.card?.status }}</span>
		</Label>

		<Label label-text="Клиент">
			<span>{{ store.card?.companyName }}</span>
		</Label>

		<Label v-if="store.card?.$createdAt" label-text="Дата создания">
			<span>
				{{ 
					new Date(store.card?.$createdAt).toLocaleDateString(
					'ru-RU',
					{ day: 'numeric', month: 'long', year: 'numeric'})
				}}
			</span>
		</Label>
	</div>
</template>

<script lang="ts" setup>
import { useDealSlideStore } from '~/store/deal-slide.store';
import Label from './Label.vue';

const store = useDealSlideStore();
</script>

<style lang="scss">
.Top {
	display: flex;
	flex-direction: column;
	row-gap: 1.4rem;
	padding: 1.2rem 1.4rem;
	background-color: #081020;
	font-family: $second-font;

	&_title {
		margin-bottom: .8rem;
		font-size: 2.2rem;
	}

	.label_status {
		border-radius: .6rem;
		border: 1px solid rgba($gray-500, .2);
		padding: .4rem .8rem;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		font-family: $base-font;
	}
}
</style>