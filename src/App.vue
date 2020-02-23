<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game';

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0 25px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.button {
  font-size: 30px;
  font-weight: 700;
  padding: 15px 25px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 9px 15px 0px rgba(0, 0, 0, 0.2);
}

.input {
  font-size: 48px;
  font-weight: 700;
  background-color: #e1e1e1;
  border: none;
  max-width: 100px;
  outline: none;
  text-align: center;
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s;
}
.scale-enter, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(.5);
}

.slide-enter-active,
.slide-leave-active {
  position: absolute;
  transition: all 150ms linear;
}

.slide-enter {
  transform: translateY(100%);
}

.slide-enter-to {
  transform: translateY(0);
}

.slide-leave {
  transform: translateY(0);
}

.slide-leave-to {
  transform: translateY(-100%);
}
</style>
