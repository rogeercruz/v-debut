<template>
  <q-badge :color="getColor(props.status)" class="q-pa-sm">
    <span class="emoji">{{ getEmoji(props.status) }}</span>
    {{ props.status }}
  </q-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    status: {
      type: String as PropType<'Alive' | 'Dead' | 'Unknown'>,
      required: true,
      validator: value => ['Alive', 'Dead', 'Unknown'].includes(value as string),
    },
  },
  setup(props) {
    const colorMap: Record<string, string> = {
      Alive: 'green',
      Dead: 'red',
      unknown: 'black',
    }

    const getColor = (status: string) => colorMap[status]

    const emojiMap: Record<string, string> = {
      Alive: '😎',
      Dead: '💀',
      unknown: '🤔',
    }

    const getEmoji = (status: string) => {
      return emojiMap[status] || '🤔'
    }

    return {
      props,
      getColor,
      getEmoji,
    }
  },
})
</script>

<style scoped>
.emoji {
  padding-right: 8px;
}
</style>
