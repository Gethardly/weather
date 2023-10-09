<template>
  <q-form class="row">
    <q-card-section>
      <q-select
          filled
          bg-color="white"
          v-model="city"
          :label="$t('searchCity')"
          use-input
          hide-selected
          fill-input
          clearable
          input-debounce="0"
          :loading="loading"
          :options="options"
          @filter="filterFn"
          @input="onCitySelected"
          style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results</q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-card-actions>
      <q-toggle v-model="toggle" :label="$t(units === 'Metric' ? 'metric' : 'imperial')" :disable="!city" style="color: white"/>
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
import type { CityName } from '@/types';

const cities = ['Bishkek', 'Moscow', 'Dubai', 'NY', 'Kant']

export default defineComponent({
  name: 'AutoCompleteSelect',
  data() {
    return {
      city: this.$props.selectedCity,
      units: 'Metric',
      toggle: false,
      options: cities,
      loading: false
    }
  },
  props: {
    selectedCity: String,
  },
  watch: {
    city(value) {
      if (value) {
        this.$emit('cityChanged', this.city)
      }
    },
    toggle(value: boolean) {
      this.units = value ? 'Imperial' : 'Metric'
      this.$emit('toggleUnits', this.units)
    }
  },
  methods: {
    async filterFn(val: string, update: Function) {
      this.loading = true; // Устанавливаем флаг загрузки
      update(async () => {
        const needle = val.toLowerCase()
        const response = await axios.get(`http://api.geonames.org/searchJSON`, {
          params: {
            name_startsWith: needle,
            maxRows: 100,
            username: 'tuxbary'
          }
        })
        this.options = response.data.geonames.map((item: CityName) => item.name)
        this.loading = false;
      })
    },
    onCitySelected() {
      this.loading = false;
    }
  }
})
</script>
