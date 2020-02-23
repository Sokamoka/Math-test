<template>
  <div class="scene">
    <div v-if="!userSelect" class="highscore">(
      <a href="#" @click="changePlayer">{{ currentUser.name }}</a>
      ) High Score: {{ highScore }}
    </div>
    <transition name="fade" mode="out-in">
      <users v-if="userSelect" key="users" @set="onSetUsers" @select="onSelectUser"></users>
      <game-start v-if="!isRuning && !userSelect" key="start" @start="onStart">START</game-start>
      <div v-if="isRuning && !showFinalResult" key="operation">
        <operation :resolve="resolve" :index="index+1" class="box"></operation>
      </div>
      <div v-if="showFinalResult" key="finalresult">
        <div class="box">
          <div class="finalScore">
            <span v-if="newHighScore">New High</span>
            Score: {{ finalScore }}
          </div>
          <ul>
            <li
              v-for="(result, index) in finalResult"
              :key="index"
              :class="{ 'is-invalid': !result.valid }"
            >
              {{ index+1 }}.
              <div>
                <span>{{ result.a }} {{ result.operator }} {{ result.b }} = {{ result.result }}</span>
                <template v-if="!result.valid">&nbsp;&nbsp;({{ result.validResult }})</template>
              </div>
              <span>{{ result.formatedTime }}</span>
            </li>
          </ul>
        </div>
        <button class="button" @click="onRestart">RESTART</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Operation from './Operation.vue';
import Users from './Users.vue';
import GameStart from './GameStart.vue';
import { createDeferred } from './promise.js';

export default {
  name: 'Game',

  components: {
    Operation,
    Users,
    GameStart,
  },

  data() {
    return {
      resolve: null,
      index: 0,
      finalResult: [],
      showFinalResult: false,
      isRuning: false,
      scores: [],
      userSelect: true,
      selectedIndex: 0,
      users: [],
      newHighScore: false,
    };
  },

  computed: {
    finalScore() {
      const reducer = (accumulator, currentValue) => accumulator + currentValue.score;
      return this.finalResult.reduce(reducer, 0);
    },

    highScore() {
      return Math.max(0, ...this.scores);
    },

    currentUser() {
      return this.users[this.selectedIndex];
    },
  },

  mounted() {
    // this.getHighScoreStorage();
    this.operation();
  },

  methods: {
    async operation() {
      for (let i = 0; i < 10; i++) {
        this.index = i;
        const { promise, resolve } = createDeferred();
        this.resolve = resolve;
        const result = await promise;
        // console.log({ result });
        this.finalResult.push(result);
      }
      this.newHighScore = this.finalScore > this.highScore;
      this.scores.push(this.finalScore);
      this.showFinalResult = true;
      this.setHighScoreStorage(this.highScore);
    },

    onStart() {
      this.isRuning = true;
    },

    onRestart() {
      this.showFinalResult = false;
      this.isRuning = false;
      this.finalResult = [];
      this.operation();
    },

    getHighScoreStorage() {
      // const hs = localStorage.getItem("soka-operation");
      // this.scores.push(hs);
    },

    setHighScoreStorage(value) {
      // localStorage.setItem("soka-operation", value);
      const users = [...this.users];
      users[this.selectedIndex].highScore = value;
      localStorage.setItem('operation-game', JSON.stringify(users));
    },

    onSetUsers(users) {
      this.users = users;
    },

    onSelectUser(index) {
      this.selectedIndex = index;
      this.userSelect = false;
      this.scores.push(this.currentUser.highScore);
    },

    changePlayer() {
      this.scores = [];
      this.userSelect = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  margin: 10px;
  color: #43a047;
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
  border-bottom: 1px dashed #e1e1e1;
}

.is-invalid {
  color: #ff1744;
}

.scene {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box {
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 9px 15px 0px rgba(0, 0, 0, 0.2);
}

.operation {
  font-size: 48px;
  font-weight: bold;
}

.highscore {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 25px;
  font-weight: 700;
  color: #000;
  a {
    color: #000;
  }
}
.finalScore {
  font-size: 25px;
  font-weight: 700;
  color: #000;
}
</style>
