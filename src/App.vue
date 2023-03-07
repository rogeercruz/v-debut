<template>
  <q-layout class="$dark">
    <div class="flex flex-center q-pa-md">
      <img
        width="350"
        src="https://media.cdn.adultswim.com/uploads/20210428/21428161947-rick-and-morty-logo-png.png"
      />
    </div>
    <q-container class="q-pa-md">
      <div class="q-pa-md q-pb-lg">
        <RouterView />
      </div>
    </q-container>
    <q-footer class="text-white">
      <q-toolbar>
        <q-toolbar-title class="flex flex-center">
          <span class="theme-selector" role="button" @click="toggleDarkMode">{{ getEmoji() }}</span>
          <span>A simple debut in Vue.js | by rcruz</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { useQuasar } from 'quasar'
export default {
  setup() {
    const $q = useQuasar()
    const startDarkMode = () => {
      const storedMode = localStorage.getItem('darkMode')
      if (storedMode !== null) {
        return storedMode === 'true'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const darkMode = startDarkMode()

    if (darkMode) {
      $q.dark.set(darkMode)
    }

    const toggleDarkMode = () => {
      localStorage.setItem('darkMode', JSON.stringify(!$q.dark.isActive))
      $q.dark.toggle()
    }

    const getEmoji = () => {
      return $q.dark.isActive ? '🌚' : '🌞'
    }

    return {
      RouterView,
      toggleDarkMode,
      getEmoji,
    }
  },
}
</script>

<style>
html {
  background-color: #fff;
}

span {
  font-size: 0.9rem;
}

p {
  margin: 0;
  font-size: 1rem;
  margin-left: 0.9rem;
}

.theme-selector {
  cursor: pointer;
  font-size: 2rem;
  margin-right: 1rem;
}
</style>
