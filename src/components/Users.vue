<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <a href="#" @click="onSelectUser(index)">{{ user.name }} - {{ user.highScore }}</a>
      </li>
    </ul>
    <div class="add-container">
      <a href="#" v-if="addNewPlayer" @click="isInputActive">+ Add new Player</a>
      <input v-else type="text" ref="input" v-model="name" @keyup.enter="onSetNewUser">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Users',

  data() {
    return {
      name: '',
      users: [],
      selectedIndex: null,
      addNewPlayer: true,
    };
  },

  computed: {
    length() {
      return this.users.length;
    },
  },

  mounted() {
    this.getSavedUsers();
  },

  methods: {
    getSavedUsers() {
      const usersStorageItem = localStorage.getItem('operation-game');
      // console.log(JSON.parse(usersStorageItem));
      const users = JSON.parse(usersStorageItem) || {};
      this.users = Object.values(users);
      this.$emit('set', this.users);
    },

    setUser(value) {
      localStorage.setItem('operation-game', JSON.stringify(value));
    },

    onSelectUser(index) {
      this.$emit('select', index);
    },

    onSetNewUser() {
      const newUser = {
        name: this.name,
        highScore: 0,
      };
      const users = [...this.users];
      users[this.length] = newUser;
      // console.log({ users });
      this.setUser(users);
      this.users.push(newUser);
      this.addNewPlayer = true;
      this.name = '';
    },

    async isInputActive() {
      this.addNewPlayer = false;
      await this.$nextTick();
      this.$refs.input.focus();
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.add-container,
li {
  padding: 10px 20px;
  font-size: 22px;
  color: #fff;
  font-weight: 700;
  border-radius: 200px;
  background-color: #B721FF;

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}

.add-container {
  display: inline-block;

  input {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>
