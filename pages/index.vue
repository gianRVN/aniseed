<template>
  <div>
    <div class="container m-5">
      <b-dropdown text="Genres" variant="light">
        <b-form-checkbox-group v-model="selectedGenre" class="dropdown-genre">
          <b-form-checkbox
            v-for="(genre, idx) in animeGenres"
            :key="idx"
            class="m-2"
            :value="genre"
          >
            {{ genre }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-dropdown>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <card
        v-for="(anime, idx) in lists"
        :id="anime.id"
        :key="idx"
        :title="anime.title.romaji"
        :image="anime.coverImage.medium"
        :genres="anime.genres"
        class="mx-2 my-2"
      />
    </div>
    <div
      v-show="loading"
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
export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      lists: [],
      animeGenres: [],
      pagination: {},
      selectedGenre: [],
    }
  },
  watch: {
    selectedGenre() {
      this.lists = []
      this.fetchNextAnime()
    },
  },
  mounted() {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 1 && !this.loading

      if (bottomOfWindow && this.pagination.hasNextPage) {
        setTimeout(() => {
          this.fetchNextAnime(
            this.prepareParams(this.pagination.currentPage + 1)
          )
        }, 200)
      }
    }
    this.fetchNextAnime()
    this.fetchAnimeGenre()
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
    async fetchAnimeGenre() {
      const res = await this.$fetchAnimeGenre()
      this.animeGenres = res
    },
    prepareParams(page = 1) {
      return {
        page,
        genre_in: this.selectedGenre,
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

.dropdown-genre {
  max-height: 280px;
  overflow-y: auto;
}
</style>
