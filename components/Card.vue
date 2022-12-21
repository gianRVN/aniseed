<template>
  <div class="card p-2" style="width: 14vw" @click="goToCardDetail">
    <img class="card-img-top" :src="image" alt="Card image cap" />
    <h6 class="card-title mt-2 mb-0">{{ title }}</h6>
    <small class="card-description">
      {{ episodes }}episodes | {{ duration }}minutes
    </small>
    <b-button
      v-if="action"
      size="sm"
      variant="danger"
      class="action-button"
      @click="$emit('action')"
      >{{ action }}</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    genres: {
      type: Array,
      default: () => [],
    },
    episodes: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    action: {
      type: String,
      default: '',
    },
  },
  methods: {
    goToCardDetail() {
      this.$router.push(`/anime/${this.id}`)
    },
  },
}
</script>

<style>
.card {
  border: none;
}

.card-img-top {
  width: 100%;
  height: 19vw;
  object-fit: cover;
}
</style>
