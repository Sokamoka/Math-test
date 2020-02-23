<template>
  <div class="operation">
    <h3>
      <transition name="slide" mode="out-in">
        <span :key="index">{{ index }}.</span>
      </transition>
    </h3>
    {{ numberA }} {{ currentOperator }} {{ numberB }} =
    <input
      class="input"
      type="number"
      ref="input"
      min="0"
      max="18"
      v-model="result"
      @keydown.enter="onEnter"
    />
  </div>
</template>
<script>
import { formatDistanceStrict, differenceInMilliseconds } from "date-fns";

const operatorFunctions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
};

export default {
  name: "Operation",

  props: {
    resolve: {
      type: Function,
      default: () => ({})
    },

    index: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      numberA: 0,
      numberB: 0,
      result: "",
      startTime: null,
      operators: ["+", "-", "*"],
      currentOperator: ""
    };
  },

  mounted() {
    this.$refs.input.focus();
  },

  watch: {
    index: {
      handler() {
        this.generateNumbers();
      },
      immediate: true
    }
  },

  methods: {
    generateNumbers() {
      this.numberA = this.random();
      this.numberB = this.random();
      this.currentOperator = this.operators[this.random(2)];
      this.startTime = new Date();
    },
    onEnter() {
      const validate = parseInt(this.result, 10);
      if (isNaN(validate)) return;
      const endTime = new Date();
      const time = differenceInMilliseconds(endTime, this.startTime);
      const formatedTime = formatDistanceStrict(endTime, this.startTime);
      const score = Math.max(0, 10000 - time);
      const valid = this.checkResult(this.result);
      const validResult = operatorFunctions[this.currentOperator](
        this.numberA,
        this.numberB
      );
      // console.log(score);
      this.resolve({
        a: this.numberA,
        b: this.numberB,
        result: Number(this.result),
        valid,
        time,
        formatedTime,
        score: valid ? score : 0,
        operator: this.currentOperator,
        validResult
      });
      this.result = "";
    },

    checkResult(userResult) {
      // return this.numberA + this.numberB === Number(userResult);
      return (
        operatorFunctions[this.currentOperator](this.numberA, this.numberB) ===
        Number(userResult)
      );
    },

    random(max = 9) {
      return Math.floor(Math.random() * (max + 1));
    }
  }
};
</script>
<style lang="scss">
h3 {
  display: flex;
  justify-content: center;
  background-color: #b721ff;
  color: #fff;
  border-radius: 20px;
  margin-top: 0;
  position: relative;
  height: 77px;
  overflow: hidden;
}
</style>
