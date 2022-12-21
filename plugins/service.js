const BASE_URL = 'https://graphql.anilist.co'
const PER_PAGE = 25

const query = `
query ($id: Int, $page: Int, $perPage: Int, $genre_in: [String], $sort:[MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, genre_in: $genre_in, sort: $sort) {
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
}`

const defaultVariables = {
  page: 1,
  perPage: PER_PAGE,
}

const fetchAnimeList = async (variables) => {
  try {
    console.log(variables, 'check')
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
    console.log(err) // eslint-disable-line
  }
}

const fetchAnimeGenre = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
            GenreCollection
          }`,
      }),
    })

    const {
      data: { GenreCollection },
    } = await response.json()

    return GenreCollection
  } catch (err) {
    console.log(err) // eslint-disable-line
  }
}

export default (_, inject) => {
  inject('fetchAnimeList', fetchAnimeList)
  inject('fetchAnimeGenre', fetchAnimeGenre)
}
