export const animeQuery = `
query ($id: Int, $page: Int, $perPage: Int, $genre_in: [String], $search: String, $sort:[MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, genre_in: $genre_in, sort: $sort, search: $search) {
      id
      title {
        romaji
      }
      coverImage {
        medium
      }
      bannerImage
      # description
      startDate {
        year
        month
        day
      }
      format
      episodes
      duration
      chapters
      volumes
      genres
      popularity
      averageScore
    }
  }
}`
