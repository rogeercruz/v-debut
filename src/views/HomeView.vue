<template>
  <main>
    <InputSearch @update="query.name = $event" :value="query.name" />

    <div class="flex justify-center" v-if="loading">
      <q-spinner-dots color="primary" size="50" />
    </div>

    <div class="flex justify-center" v-if="characters.length === 0 && !loading">
      <img
        src="https://media.cdn.adultswim.com/uploads/20210914/219141616186-1910281358343-RAM.jpg"
      />
      <p class="q-pa-lg">No results found!</p>
    </div>

    <div class="min-h-screen custom-container">
      <Card
        v-if="!loading"
        v-for="character in characters"
        :id="character.id"
        :key="character.id"
        :name="character.name"
        :status="character.status"
        :img="character.image"
      />
    </div>

    <div class="q-pa-lg flex flex-center" v-if="characters && pages > 1">
      <q-pagination
        v-model="query.page"
        :color="$q.dark.isActive ? '#d3d3d3' : 'black'"
        :max="pages"
        :max-pages="4"
        :boundary-numbers="false"
        :active-color="$q.dark.isActive ? 'primary' : 'black'"
        style="overflow-x: auto; white-space: nowrap"
      />
    </div>
  </main>
</template>

<script lang="ts">
import InputSearch from '../components/InputSearch.vue'
import Card from '@/components/Card.vue'
import { reactive, computed, watch } from 'vue'
import { getCharacters } from '@/api'

export default {
  name: 'HomeView',

  components: {
    InputSearch,
    Card,
  },

  setup() {
    const query = reactive({
      page: 1,
      name: '',
      status: null,
    })

    watch(
      () => query.name,
      newValue => {
        query.page = 1
      },
    )

    const { result, loading } = getCharacters(query)

    const characters = computed(() => {
      return result.value?.characters?.results ?? []
    })

    const pages = computed(() => {
      return result.value?.characters?.info.pages ?? null
    })

    watch(
      () => query.page,
      () => {
        const body = document.body
        body.classList.add('scroll-to-top')
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        setTimeout(() => {
          body.classList.remove('scroll-to-top')
        }, 800) 
      },
    )

    return {
      query,
      characters,
      loading,
      pages,
    }
  },
}
</script>

<style>
.custom-container {
  min-height: 60vh;
}

.scroll-to-top {
  scroll-behavior: smooth;
  animation: all 0.8s ease-in-out;
}
</style>
