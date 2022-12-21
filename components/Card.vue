<template>
  <div class="card p-2" style="width: 14vw" @click="goToCardDetail">
    <img class="card-img-top" :src="image" alt="Card image cap" />
    <h6 class="mt-2 mb-0">{{ title }}</h6>
    <small> {{ episodes }}episode | {{ duration }}minutes </small>
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
