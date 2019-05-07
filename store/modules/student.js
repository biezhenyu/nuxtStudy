
const state = () => ({
  student: {
    name: 'bzy'
  }
})

const mutations = {
  setStudent (state, val) {
    state.student = val
  }
}
const actions = {

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
