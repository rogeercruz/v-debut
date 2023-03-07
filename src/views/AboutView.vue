<template>
  <div class="flex justify-center" v-if="loading">
    <q-spinner-dots color="primary" size="50" />
  </div>

  <q-btn v-if="!loading" to="/" round color="black" icon="home" class="q-mt-lg q-mb-lg" />

  <q-card
    class="q-mb-lg"
    :style="{ background: $q.dark.isActive ? '#202123' : 'white' }"
    flat
    bordered
    v-if="!loading"
  >
    <q-card-section horizontal space class="row items-center">
      <q-card-section class="col">
        <div class="text-overline">Species: {{ character.species }}</div>
        <h2 class="text-h2 q-mt-sm q-mb-xs">{{ character.name }}</h2>
        <p class="text-h2 q-mt-xs">{{ getEmoji(character.gender) }}</p>
      </q-card-section>
      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" :src="character.image" />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <span>From: </span>
      <span class="q-ml-sm"> {{ character.origin?.name }}</span>
    </q-card-actions>
  </q-card>

  <h2 class="text-h5 q-mt-lg q-mb-md" v-if="!loading">Episodes</h2>

  <q-list bordered class="q-mb-lg">
    <q-item v-ripple v-for="episode in character.episode">
      <q-item-section>{{ episode.name }}</q-item-section>
      <q-item-section avatar>
        <span>{{ episode.episode }}</span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { getCharacter } from '@/api'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const id = computed(() => route.params.id)
    const { result, loading } = getCharacter(id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    const character = computed(() => {
      return result?.value?.character ?? {}
    })

    const emojiMap: Record<string, string> = {
      Male: '♂',
      Female: '♀',
    }

    const getEmoji = (status: string) => {
      return emojiMap[status] || '🤔'
    }

    return {
      id,
      character,
      loading,
      getEmoji,
    }
  },
}
</script>
