<template>
  <v-app id="app" dark>
    <core-drawer />
    <v-content>
      <transition mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  export default {
  }
</script>

<style>
</style>
