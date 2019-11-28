import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({commit}) {
    console.log(1)
    let todoUrl = `https://jsonplaceholder.typicode.com/todos`
    const response =  await axios.get(todoUrl)
    commit('TODOS', response.data)
  }
};

const mutations = {
  TODOS: (state, todos) => (state.todos = todos)
};

export default {
  state,
  getters,
  actions,
  mutations
};