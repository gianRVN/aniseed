<template>
  <div>
    <div class="d-flex flex-wrap justify-content-center">
      <!-- TODO: Integrate with cards component-->
    </div>
    <div
      :class="
        lists.length === 0
          ? 'spinner-center'
          : 'd-flex justify-content-center m-5'
      "
      v-show="loading"
    >
      <div class="spinner-border" role="status">
        <span class="sr-only" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  async mounted() {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 1 && !this.loading

      if (bottomOfWindow) {
        setTimeout(() => {
          this.fetchNextAnime(
            this.prepareParams(this.pagination.currentPage + 1)
          )
        }, 200)
      }
    }
    this.fetchNextAnime()
  },
  data() {
    return {
      loading: false,
      lists: [],
      pagination: {},
    }
  },
  methods: {
    async fetchNextAnime(params) {
      this.loading = true
      const res = await this.$fetchAnimeList(params)
      if (res?.media) {
        res.media.forEach((data) => {
          this.lists = [...this.lists, data]
        })
        this.pagination = res.pageInfo
      }
      this.loading = false
    },
    prepareParams(page = 1, perPage = 25, genre) {
      return {
        page,
        perPage,
        genre,
      }
    },
  },
}
</script>

<style scoped>
.spinner-center {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
