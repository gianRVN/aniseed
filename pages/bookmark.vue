<template>
  <div>
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
        action="Delete"
        class="mx-2 my-3"
        @action="deleteBookmarkAnime(anime)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
  computed: {
    ...mapState('anime', ['bookmarkedAnime']),
  },
  watch: {
    selectedGenre() {
      this.resetState()
      this.fetchNextAnime()
    },
  },

  methods: {
    ...mapActions('anime', ['deleteBookmarkAnime']),
  },
}
</script>
