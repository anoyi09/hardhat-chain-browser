<template>
    <div class="wrapper">
        <nav class="title-nav">
            <RouterLink v-for="im in routeLinks" :to="im.path" :key="im.name">
                <span class="link-span" :class="{ active: isActive(im) }">{{ im.name }}</span>
            </RouterLink>
        </nav>
        <RouterView></RouterView>
    </div>
</template>
<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from 'vue-router'
const routeLinks = [
    { name: 'Accounts', path: '/' },
    { name: 'Blocks', path: '/Blocks' },
    { name: 'Transactions', path: '/Transactions' },
    { name: 'Contracts', path: '/Contracts' },
    { name: 'Events', path: '/Events' },
    { name: 'Logs', path: '/Logs' },
]
const route = useRoute()
console.log(route)
const isActive = (im: any) => {
    // console.log(im.path, route.path)
    return im.path === route.path
}
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;

    .title-nav {
        display: flex;
        justify-content: center;

        .link-span {
            margin: 0 10px;
        }

        .active {
            color: blue;
        }
    }
}
</style>