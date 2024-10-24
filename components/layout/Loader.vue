<template>
    <div class="Loader">
        <NuxtImg src="loader.svg" alt="Loader icon" class="Loader_icon" />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.Loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: $sidebar;
    color: $white;
    user-select: none;

    &_icon {
        width: 7rem;
        height: 7rem;
    }
}
</style>