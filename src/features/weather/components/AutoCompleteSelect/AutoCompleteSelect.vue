<template>
  <q-form style="width: 500px" class="row">
    <q-card-section>
      <q-select
        filled
        bg-color="white"
        label="Search a city"
        v-model="city"
        use-input
        hide-selected
        fill-input
        clearable
        input-debounce="0"
        :loading="loading"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-card-actions>
      <q-toggle v-model="toggle" :label="units" :disable="!city" style="color: white" />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import citiesFile from '../../../../assets/city.list.json'
import type { City } from '@/types'
import { Units } from '@/features/weather/layouts/WeatherLayout.vue'

const citiesString = JSON.stringify(citiesFile)
const citiesArray: City[] = JSON.parse(citiesString)

const stringOptions: string[] = citiesArray.map((city) => {
  return city.name
})

export default defineComponent({
  name: 'AutoCompleteSelect',
  data() {
    return {
      city: '',
      units: Units.Metric,
      toggle: false,
      options: stringOptions
    }
  },
  props: {
    loading: Boolean
  },
  watch: {
    city(value: City) {
      if (value) {
        this.$emit('cityChanged', this.city)
      }
    },
    toggle(value: boolean) {
      this.units = value ? Units.Imperial : Units.Metric
      this.$emit('toggleUnits', this.units)
    }
  },
  methods: {
    filterFn(val: string, update: Function) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
})
</script>
