<template>
  <div>
    <div v-if="loading" class="spinner-center">
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
      <div class="anime-container row">
        <div class="col-4">
          <b-card>
            <h1>{{ animeInfo.title.romaji }}</h1>
            <b-badge
              v-for="(genre, idx) in animeInfo.genres"
              :key="idx"
              variant="light"
              class="mx-1"
            >
              {{ genre }}
            </b-badge>
            <div class="d-flex align-items-center my-2 mx-2">
              <b-icon-eye-fill variant="dark" />
              <div class="ml-1">
                {{ animeInfo.popularity.toLocaleString() }}
              </div>
              <b-icon-hand-thumbs-up-fill class="ml-3" variant="dark" />
              <div class="ml-1">
                {{ animeInfo.averageScore }}
              </div>
              <b-button
                size="sm"
                class="ml-3"
                variant="warning"
                @click="bookmarkAnime"
              >
                <b-icon-bookmark-fill variant="light" v-if="isBookmarked" />
                <b-icon-bookmark v-else />
                Bookmark</b-button
              >
            </div>
            <img
              class="card-img-top mt-3"
              :src="animeInfo.coverImage.medium"
              alt="Card image cap"
            />
          </b-card>
        </div>
        <div class="col-8">
          <div class="anime-description">
            <h3>Description</h3>
            <p v-html="animeInfo.description" />
          </div>
        </div>
      </div>
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

.card-img-top {
  width: 100%;
  height: 25vw;
  object-fit: cover;
}

.anime-description {
  margin-top: 12vw;
}
</style>
