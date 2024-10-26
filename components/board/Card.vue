<template>
	<div class="Card">
		<h3 class="Card_title" v-html="cardData.name"></h3>

		<p v-if="cardData.price" class="Card_price">
			{{ convertCurrency(cardData.price) }}
		</p>

		<p v-if="cardData.companyName" class="Card_company" v-html="cardData.companyName"></p>

		<p v-if="cardData.$createdAt" class="Card_date">
			{{
				new Date(cardData.$createdAt).toLocaleDateString(
					'ru-RU',
					{ day: 'numeric', month: 'long', year: 'numeric'}
				)
			}}
		</p>
	</div>
</template>

<script setup lang="ts">
import type { ICard } from '../kanban/kanban.types';

defineProps<{ cardData: ICard }>();
</script>

<style lang="scss">
.Card {
	display: flex;
	flex-direction: column;
	padding: 1.2rem 2rem 1rem 1.2rem;
	border-radius: 1rem;
	box-shadow: 0 0 4px 0 $sidebar;
	border: 2px solid transparent;
	background-color: $sidebar;
	font-family: $second-font;
	transition:
		border-color .3s ease,
		opacity .1s ease-in-out,
		transform .1s ease-in-out;
	user-select: none;
	animation: appearance .3s ease-in-out;
	cursor: pointer;

	&:hover {
		border-color: rgba($light-green, .1);
	}

	&:active {
		opacity: .6;
		transform: scale(.99);
	}

	&_title {
		margin-bottom: .8rem;
		font-size: 1.8rem;
		font-weight: 700;
		color: $text-color;
	}

	&_price {
		margin-bottom: 1.6rem;
		font-size: 1.6rem;
		color: $gray-700;
	}

	&_company {
		margin-bottom: 1.6rem;
		font-size: 1.4rem;
		color: $gray-100;
	}

	&_date {
		font-size: 1.2rem;
		font-family: $base-font;
		font-weight: 300;
		font-style: italic;
		letter-spacing: .02em;
		color: rgba($text-color, .5);
	}

	@keyframes appearance {
		0% {
			opacity: .4;
			transform: translateY(-3rem) scale(.6);
		}

		90% {
			border-color: rgba($light-green, .3);
		}

		100% {
			border-color: transparent;
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
}
</style>