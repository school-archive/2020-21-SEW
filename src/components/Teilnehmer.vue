<template>
  <div class="md-layout">
    <p id="name"><b>{{ name }}</b></p>
    <p id="placement-text"><b v-if="placement!==false">{{ placement }}. Platz</b></p>
    <div v-for="i in placeCount">
      <md-radio v-model="placement" :value="i" @change="updateAllPlacements" :disabled="lockedPlacements[i - 1]">{{ i }}</md-radio>
    </div>
  </div>
</template>

<script>
import eb from './eventbus';
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
  mounted() {
    eb.$on('reset-participants', () => {
      for (let i = 0; i < this.placeCount; i++) {
        this.$set(this.lockedPlacements, i, false);
      }
    });

    eb.$on('all-send-locked', () => {
      eb.$emit('lock-place', this.placement - 1);
    })

    eb.$on('lock-place', placement => {
      this.$set(this.lockedPlacements, placement, true);
    })
  },
  methods: {
    updateAllPlacements() {
      eb.$emit('reset-participants', false);
      eb.$emit('all-send-locked', false);
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