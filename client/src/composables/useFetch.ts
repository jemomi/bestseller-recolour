import {ref, watchEffect, toValue, type MaybeRefOrGetter} from 'vue'

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const pending = ref(true)
  const data = ref<T | null>(null)
  const error = ref(null)

  const fetchData = () => {
    pending.value = true
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
      .finally(() => {
        pending.value = false
      })
  }

  watchEffect(() => {
    fetchData()
  })

  return { pending, data, error }
}
