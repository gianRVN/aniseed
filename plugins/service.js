const BASE_URL = 'https://graphql.anilist.co'
const PER_PAGE = 25

let query = `
  query ($id: Int, $page: Int, $perPage: Int, $genre: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, genre: $genre) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        description
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
  }
  `

export default (_, inject) => {
  const defaultVariables = {
    page: 1,
    perPage: PER_PAGE,
  }

  const fetchData = async (variables) => {
    try {
      console.log(variables, 'chek')

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { ...defaultVariables, ...variables },
        }),
      })

      const {
        data: { Page },
      } = await response.json()

      return Page
    } catch (err) {
      console.log(err)
    }
  }

  inject('fetchAnimeList', fetchData)
}
