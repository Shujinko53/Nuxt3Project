<template>
    <div class="Home-page page">
        <h1 class="page_title">Crm System</h1>

        <Card />
    </div>
</template>

<script setup lang="ts">
import Card from '~/components/board/Card.vue';

useSeoMeta({
    title: 'Home | CRM System',
})

</script>

<style lang="scss" scoped>
.Home-page {
    position: relative;

    .page_title {
        margin-bottom: 4rem;
        color: $text-color;
    }
}
</style>