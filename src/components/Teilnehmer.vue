<template>
  <div class="md-layout">
    <p id="name"><b>{{ name }}</b></p>
    <p id="placement-text"><b v-if="placement!==false">{{ placement }}. Platz</b></p>
    <div v-for="i in placeCount">
      <md-radio v-model="placement" :value="i" @change="$emit('select-placement')" :disabled="lockedPlacements[i - 1]">{{ i }}</md-radio>
    </div>
  </div>
</template>

<script>
export default {
name: "Teilnehmer",
  props: {
    name: String,
    placeCount: Number
  },
  data: () => ({
    placement: false,
    lockedPlacements: [false, false, false, false, false]
  }),
  methods: {
    lockPlacements(lockedPlacements) {
      for (let i = 0; i < lockedPlacements.length; i++) {
        this.$set(this.lockedPlacements, i, (this.placement === false || i + 1 !== this.placement) && lockedPlacements[i]);
      }
    }
  }
}
</script>

<style scoped>
  #name {
    min-width: 200px;
  }

  #placement-text {
    min-width: 100px;
  }
</style>