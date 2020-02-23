<template>
  <div>
    <transition name="fade" mode="out-in">
      <h2 v-if="visible">
        <transition name="scale" mode="out-in">
          <span :key="time">{{ time }}</span>
        </transition>
      </h2>
      <button v-else class="button" @click="onStart">START</button>
    </transition>
  </div>
</template>
<script>
const startTime = 5;
export default {
  data() {
    return {
      time: startTime,
      visible: false,
    };
  },

  methods: {
    onStart() {
      this.visible = true;
      let time = startTime;
      const timerId = setInterval(() => {
        time--;
        this.time = time;
        if (time <= 0) {
          clearInterval(timerId);
          this.$emit('start');
        }
      }, 1000);
    },
  },
};
</script>
<style>
h2 {
  position: relative;
  overflow: hidden;
  font-size: 130px;
  background-color: #B721FF;
  color: #fff;
  height: 165px;
  text-align: center;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  width: 170px;
  box-shadow: 0px 9px 15px 0px rgba(0, 0, 0, 0.2);
}
</style>
