<template>
  <div>
    <div
      v-if="loading"
      :class="
        animeInfo.length === 0
          ? 'spinner-center'
          : 'd-flex justify-content-center m-5'
      "
    >
      <div class="spinner-border" role="status">
        <span class="sr-only" />
      </div>
    </div>
    <template v-else>
      <img
        :src="animeInfo.bannerImage"
        alt="anime banner"
        class="image-banner"
      />
      <div class="anime-container">
        <h1 class="text-white">{{ animeInfo.title.romaji }}</h1>

        <b-badge
          v-for="(genre, idx) in animeInfo.genres"
          :key="idx"
          variant="light"
          class="mx-1"
        >
          {{ genre }}
        </b-badge>

        <div class="d-flex align-items-center my-2 mx-2">
          <b-icon-eye-fill variant="light" />
          <div class="text-white ml-1">
            {{ animeInfo.popularity.toLocaleString() }}
          </div>
          <b-icon-hand-thumbs-up-fill class="ml-3" variant="light" />
          <div class="text-white ml-1">
            {{ animeInfo.averageScore }}
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm ml-3"
            @click="bookmarkAnime"
          >
            <b-icon-bookmark-fill
              class="ml-3"
              variant="light"
              v-if="isBookmarked"
            />
            <b-icon-bookmark class="ml-3" v-else />
            Bookmark
          </button>
        </div>

        <div class="mt-5 pt-5">
          <h3>Description</h3>
          <button
            type="button"
            class="btn btn-primary btn-sm ml-3"
            @click="$router.push('/bookmark')"
          >
            GO TO BOOKMARK
          </button>
          <p>{{ animeInfo.description }}</p>
        </div>
      </div>
      <div>{{ JSON.stringify(animeInfo) }}</div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AnimeDetails',
  data() {
    return {
      loading: true,
      animeInfo: {},
    }
  },
  computed: {
    ...mapState('anime', ['bookmarkedAnime']),
    isBookmarked() {
      return this.bookmarkedAnime?.some(
        (anime) => anime.id === this.animeInfo.id
      )
    },
  },
  mounted() {
    this.fetchNextAnime()
  },
  methods: {
    ...mapActions('anime', ['addBookmarkAnime', 'deleteBookmarkAnime']),
    async fetchNextAnime() {
      const res = await this.$fetchAnimeList({ id: this.$route.params.id })

      if (res?.media) this.animeInfo = res.media[0]

      this.loading = false
    },
    bookmarkAnime() {
      if (this.isBookmarked) this.deleteBookmarkAnime(this.animeInfo)
      else this.addBookmarkAnime(this.animeInfo)
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

.anime-container {
  padding: 15vw 5vw 5vw 5vw;
}

.image-banner {
  position: absolute;
  z-index: -99;
  height: 25vw;
  width: 100%;
  object-fit: cover;
}
</style>
