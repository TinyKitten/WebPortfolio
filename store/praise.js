import firebase from '../vendor/firebase'

export const state = () => ({
  count: 0
})

export const getters = {
  count: state => state.count
}

export const mutations = {
  setCount: (state, payload) => (state.count = payload.amount),
  incrementCount: state => state.count++
}

export const actions = {
  fetchCount: async ({ commit }) => {
    await firebase.auth().signInAnonymously()
    const firestore = firebase.firestore()
    const countRef = await firestore
      .collection('public')
      .doc('praise')
      .get()
    const count = countRef.data() ? countRef.data().count : 0
    commit('setCount', { amount: count })
  },
  incrementCountAsync: async ({ commit, dispatch }) => {
    await firebase.auth().signInAnonymously()
    const firestore = firebase.firestore()
    const countRef = await firestore
      .collection('public')
      .doc('praise')
      .get()
    const count = countRef.data() ? countRef.data().count : 0
    firestore
      .collection('public')
      .doc('praise')
      .set({ count: count + 1 })
    dispatch('fetchCount')
  }
}
