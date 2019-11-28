import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({commit}) {
    let url = `https://jsonplaceholder.typicode.com/todos`
    const response =  await axios.get(url)
    commit('GETTODOS', response.data)
  },
  async addTodo ({commit}, title) {
    let url = `https://jsonplaceholder.typicode.com/todos`
    const response = await axios.post(url, { title, completed: false })
    commit('NEWTODOS', response.data)
  },
  async deleteTodo ({commit}, id) {
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`
    await axios.delete(url)
     // 這是因為目前使用假的API, 並不會真的刪資料，故這樣做
    commit('REMOVETODO', id)
  },
  async filterTodos ({commit}, e) {
    // Get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
    let url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    const response =  await axios.get(url)
    commit('GETTODOS', response.data)
  },
  async updateTodo ({commit}, updTodo) {
    let url = `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`
    const response =  await axios.put(url, updTodo)
    commit('UPDATETODO', response.data)
  }
};

const mutations = {
  GETTODOS: (state, todos) => (state.todos = todos),
  NEWTODOS: (state, todo) => (state.todos.unshift(todo)),
  REMOVETODO: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  UPDATETODO: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    // 有值存在時
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};