<template>
  <canvas ref="canv" :width="size" :height="size"></canvas>
</template>

<script>
export default {
name: "Wasserwaage",
  props: {
    size: Number,
  },
  data() {
  return {
    ctx: undefined,
  }
  },
  mounted() {
    this.ctx = this.$refs.canv.getContext("2d");
    this.draw_canvas(0, 0);
    let vm = this;
    window.ondeviceorientation = function (ev) {
      vm.draw_canvas(ev.gamma * -1, ev.beta * -1);
    };
  },
  methods: {
    draw_canvas(raw_x, raw_y) {
      let x = (raw_x) / 180 * this.size, y = (raw_y) / 180 * this.size;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.size, this.size);
      this.draw_circle(ctx, this.size / 2, this.size / 2, this.size / 2, "lightgreen");

      const bubble_radius = this.size / 7;
      const size = this.size;
      // calc r and angle

      const polar_x = x, polar_y = y;

      const r = Math.sqrt(Math.pow(polar_x, 2) + Math.pow(y, 2));
      const angle = Math.atan((polar_y) / (polar_x + (polar_x === 0) * .00001)) + (raw_x < 0) * Math.PI;
      const true_polar_x = Math.min(r, this.size / 2 - bubble_radius) * Math.cos(angle);
      const true_polar_y = Math.min(r, this.size / 2 - bubble_radius) * Math.sin(angle);

      const true_x = true_polar_x + size / 2, true_y = true_polar_y + size / 2;

      this.draw_circle(ctx, true_x, true_y, bubble_radius, "white");
      this.draw_circle(ctx, size / 2, size / 2, bubble_radius * 4 / 3, "transparent", "red");
      console.log(`r: ${r}, angle: ${angle*180/Math.PI}`);
      console.log(`x: ${x}, y: ${y}`)
      console.log(`true_x: ${true_x}, true_y: ${true_y}`)
    },
    draw_circle(ctx, x, y, size, color, stroke="transparent") {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.stroke();
      ctx.closePath();
    },
  }
}
</script>

<style scoped>

</style>