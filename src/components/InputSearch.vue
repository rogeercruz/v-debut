<template>
  <div class="container">
    <q-input
      v-model="search"
      label="Search by character name"
      type="search"
      @update:model-value="(val:any) => onChange(val)"
      outlined
    >
    </q-input>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'

interface IInputSearch {
  value: string | null
}

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null as string | null,
    },
  },

  setup(props: IInputSearch, { emit }) {
    const search = ref(props.value || '')
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const onChange = (val: string) => {
      search.value = val

      if (val.length === 0) {
        emit('update', search.value)
        return
      }

      if (val.length < 3 || val.trim() === props.value) {
        return
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        emit('update', search.value)
      }, 500)
    }

    return {
      search,
      onChange,
    }
  },
})
</script>
<style scoped>
.container {
  padding: 0;
  margin-bottom: 30px;
}
</style>
