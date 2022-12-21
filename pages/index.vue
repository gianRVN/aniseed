<template>
  <div class="index container">
    <div class="m-3">
      <div class="filter d-flex justify-content-between">
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
        <b-form-input
          id="search-anime"
          class="w-25"
          type="search"
          placeholder="search anime..."
          @input="handleChangeSearch"
        />
      </div>
      <div v-if="selectedGenre.length > 0" class="my-2">
        <b-icon-tags-fill variant="secondary" />
        <b-badge
          v-for="(genre, idx) in selectedGenre"
          :key="idx"
          type="button"
          pill
          variant="warning"
          class="mx-1"
          @click="removeGenre(genre)"
        >
          {{ genre }} X
        </b-badge>
      </div>
      <hr />
    </div>
    <div class="anime-cards d-flex flex-wrap justify-content-center">
      <card
        v-for="(anime, idx) in lists"
        :id="anime.id"
        :key="idx"
        :title="anime.title.romaji"
        :image="anime.coverImage.medium"
        :genres="anime.genres"
        :episodes="anime.episodes"
        :duration="anime.duration"
        class="mx-1 my-3"
      />
    </div>
    <spinner
      :loading="loading"
      :pagination-loading="pagination.hasNextPage"
      :is-centered="lists.length === 0"
    />
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
      pagination: {
        currentPage: 1,
        hasNextPage: true,
      },
      selectedGenre: [],
      search: '',
    }
  },
  computed: {
    prepareParams() {
      const params = {
        page: this.pagination.currentPage,
      }

      if (this.selectedGenre.length !== 0) params.genre_in = this.selectedGenre
      if (this.search) params.search = this.search

      return params
    },
  },
  watch: {
    selectedGenre() {
      this.resetState()
      this.fetchNextAnime()
    },
    search() {
      this.resetState()
      this.fetchNextAnime()
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
      this.loading = true
      const res = await this.$fetchAnimeList(this.prepareParams)
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
      this.animeGenres = [...res]
    },
    removeGenre(val) {
      this.selectedGenre = this.selectedGenre.filter((genre) => genre !== val)
    },
    handleChangeSearch(val) {
      this.search = val
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
