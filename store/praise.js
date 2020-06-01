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
    const countDoc = await firestore
      .collection('public')
      .doc('praise')
      .get()
    commit('setCount', { amount: countDoc.data().count })
  },
  incrementCountAsync: async ({ commit, dispatch }) => {
    const firestore = firebase.firestore()
    const countRef = firestore.collection('public').doc('praise')
    await countRef.update('count', firebase.firestore.FieldValue.increment(1))
    const countDoc = await countRef.get()
    commit('setCount', { amount: countDoc.data().count })
  }
}
