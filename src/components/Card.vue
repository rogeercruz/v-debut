<template>
  <q-card
    class="my-card"
    :flat="true"
    :bordered="true"
    :style="{ background: $q.dark.isActive ? '#202123' : 'white' }"
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="img" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ name }}</q-item-label>
        <q-item-label caption>
          <Badge :status="status" />
        </q-item-label>
      </q-item-section>

      <q-btn flat :to="`/about/${id}`" tag="a">Details</q-btn>
    </q-item>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DefineComponent } from 'vue'
import Badge from './Badge.vue'

export default defineComponent({
  name: 'Card',

  components: {
    Badge,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validator: (value: string) => ['Alive', 'Dead', 'Unknown'].includes(value),
    },
    img: {
      type: String,
      required: true,
    },
  },
}) as DefineComponent<{
  name: string
  status: 'Alive' | 'Dead' | 'Unknown'
  img: string
}>
</script>

<style scoped>
.my-card {
  margin-bottom: 10px;
}

.details {
  height: fit-content;
  width: fit-content;
}
</style>
