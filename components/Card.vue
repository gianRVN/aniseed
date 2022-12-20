<template>
  <div class="card" style="width: 12vw" @click="goToCardDetail">
    <img class="card-img-top" :src="image" alt="Card image cap" />
    <h6 class="mt-2">{{ title }}</h6>
    <p>
      <small>{{ genres.join(', ') }}</small>
    </p>
  </div>
</template>

<script lang="ts">
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
.card-img-top {
  width: 100%;
  height: 17vw;
  object-fit: cover;
}
</style>
