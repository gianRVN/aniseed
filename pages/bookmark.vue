<template>
  <div>
    <div>{{ JSON.stringify(bookmarkedAnime) }}a</div>
    <div class="d-flex flex-wrap justify-content-center">
      <card
        v-for="(anime, idx) in bookmarkedAnime"
        :id="anime.id"
        :key="idx"
        :title="anime.title.romaji"
        :image="anime.coverImage.medium"
        :genres="anime.genres"
        :format="anime.format"
        :episodes="anime.episodes"
        :duration="anime.duration"
        class="mx-2 my-3"
      />
    </div>
    <div
      v-if="loading && pagination.hasNextPage"
      :class="
        lists.length === 0
          ? 'spinner-center'
          : 'd-flex justify-content-center m-5'
      "
    >
      <div class="spinner-border" role="status">
        <span class="sr-only" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      loading: true,
      lists: [],
      animeGenres: [],
      pagination: {
        currentPage: 1,
        hasNextPage: true,
      },
      selectedGenre: [],
    }
  },
  watch: {
    selectedGenre() {
      this.resetState()
      this.fetchNextAnime()
    },
  },
  computed: {
    ...mapState('anime', ['bookmarkedAnime']),
    prepareParams() {
      const params = {
        page: this.pagination.currentPage,
      }

      if (this.selectedGenre.length !== 0) params.genre_in = this.selectedGenre

      return params
    },
  },
  mounted() {
    this.watchWindowScroll()
    this.fetchNextAnime()
    this.fetchAnimeGenre()
  },
  methods: {
    watchWindowScroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.offsetHeight - 1 && !this.loading

        if (bottomOfWindow && this.pagination?.hasNextPage) {
          setTimeout(() => {
            this.pagination.currentPage += 1
            this.fetchNextAnime()
          }, 200)
        }
      }
    },
    async fetchNextAnime() {
      const res = await this.$fetchAnimeList(this.prepareParams)
      if (res?.media) {
        console.log('ini kenapa')
        res.media.forEach((data) => {
          this.lists = [...this.lists, data]
        })
        this.pagination = res.pageInfo
      }
      this.loading = false
    },
    async fetchAnimeGenre() {
      const res = await this.$fetchAnimeGenre()
      this.animeGenres = [...res]
    },
    resetState() {
      this.lists = []
      this.pagination.currentPage = 1
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

.dropdown-genre {
  max-height: 280px;
  overflow-y: auto;
}
</style>
