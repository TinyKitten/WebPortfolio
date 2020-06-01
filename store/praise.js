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
    const firestore = firebase.firestore()
    const countRef = await firestore
      .collection('public')
      .doc('praise')
      .get()
    commit('setCount', { amount: countRef.data().count })
  },
  incrementCountAsync: async ({ commit, dispatch }) => {
    const firestore = firebase.firestore()
    await firestore
      .collection('public')
      .doc('praise')
      .update('count', firebase.firestore.FieldValue.increment(1))
    dispatch('fetchCount')
  }
}
