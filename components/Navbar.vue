<template>
  <div class="container">
    <b-nav small class="d-flex justify-content-between">
      <b-nav-item @click="$router.push('/')">
        <h3 class="nav-aniseed">AniSeed</h3>
      </b-nav-item>
      <b-nav-item>
        <b-button
          class="nav-bookmark"
          size="sm"
          variant="warning"
          @click="$router.push('/bookmark')"
        >
          Bookmark
        </b-button></b-nav-item
      >
    </b-nav>
  </div>
</template>
