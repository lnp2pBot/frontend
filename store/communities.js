

export const state = () => ({

})

export const actions = {
  getCommunities() {
    this.$axios.$get('/communities', {
      body: JSON.stringify({
        id: 'id',
        title: 'title is here',
        body: 'body is here',
        userId: 1
      })
    })
      .then(data => console.log(data))
      .catch(console.error)
  }
}