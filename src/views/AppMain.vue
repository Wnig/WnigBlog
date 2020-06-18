<template>
  <section class="app-main">
    <transition name="fade"
                mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"
                     :key="$route.fullpath" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
