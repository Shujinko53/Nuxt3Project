<template>
    <div class="Card">
        <h3 class="Card_title">Заголовок</h3>
        <p class="Card_price">12 000 000 руб.</p>
        <p class="Card_company">Компания</p>
        <p class="Card_date">
            {{
                new Date().toLocaleDateString(
                    'ru-RU',
                    { day: 'numeric', month: 'long', year: 'numeric'}
                )
            }}
        </p>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.Card {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem 1rem 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 8px 0 $sidebar;
    border: 2px solid transparent;
    background-color: $sidebar;
    transition:
        border-color .3s ease,
        opacity .1s ease-in-out,
        transform .1s ease-in-out;
    user-select: none;
    cursor: pointer;

    &:hover {
        border-color: rgba($light-green, .1);
    }

    &:active {
        opacity: .6;
        transform: scale(.99);
    }

    &_title {
        margin-bottom: .4rem;
        font-size: 2rem;
        font-weight: 700;
        color: $text-color;
    }

    &_price {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: $gray-700;
    }

    &_company {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        color: $gray-100;
    }

    &_date {
        font-size: 1.2rem;
        font-weight: 300;
        font-style: italic;
        color: $gray-400;
    }
}
</style>