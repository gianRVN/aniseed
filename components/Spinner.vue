<template>
  <div
    v-if="loading"
    :class="isCentered ? 'spinner-center' : 'd-flex justify-content-center m-5'"
  >
    <div v-if="paginationLoading" class="spinner-border" role="status">
      <span class="sr-only" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    paginationLoading: {
      type: Boolean,
      default: false,
    },
    isCentered: {
      type: Boolean,
      default: false,
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
