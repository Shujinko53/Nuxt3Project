<template>
	<div class="Comments">
		<input
			type="text"
			placeholder="Оставьте комментарий"
			class="Comments_input"
			v-model="commentRef"
			@keyup.enter="writeComment"
		>

		<ul v-if="card" class="Comments_items">
			<li
				v-for="comment in card?.comments"
				:key="comment.$id"
				class="Comments_item"
			>
				<NuxtIcon name="chat-message" class="Comments_item-icon" />

				<div class="Comments_item-wrapper">
					<span class="Comments_item-info">
						Комментарий

						{{
							new Date(comment.$createdAt)
							.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
						}}
					</span>

					<p class="Comments_item-text">
						{{ comment.text }}
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { IDeal } from '~/types/deals.types';
	import { useComments } from './useComments';
	import { useCreateComment } from './useCreateComment';

	const { data, refetch, isLoading } = useComments();
	const { commentRef, writeComment } = useCreateComment({ refetch });

	const card = data as unknown as IDeal;
</script>

<style lang="scss">
.Comments {
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	padding: 0 1.6rem 2rem;

	&_input {
		display: flex;
		height: 4rem;
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid $black-100;
		background-color: transparent;
		font-size: 1.4rem;
		font-family: $second-font;
		line-height: 1;
		color: $gray-500;

		&::placeholder {
			font-family: $second-font;
			color: $gray-400;
		}
	}

	&_items {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
	}

	&_item {
		display: flex;
		align-items: flex-start;
		column-gap: 1rem;
		color: 1.6rem;

		&-icon {
			svg {
				font-size: 2rem;
			}
		}

		&-wrapper {
			display: flex;
			flex-direction: column;
			row-gap: .8rem;
			flex-grow: 1;
			padding: .6rem;
			border-radius: 1rem;
			box-shadow: .2rem .2rem 1.2rem .4rem $bg-comments;
			background-color: $bg-comments;
			font-family: $second-font;
		}

		&-info {
			font-size: 1.2rem;
			color: rgba($text-color, .7);
		}

		&-text {
			font-size: 1.6rem;
		}
	}
}
</style>