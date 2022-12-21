import { genreQuery } from '@/services/query/genreQuery'
import { BASE_URL, BASE_FETCH_OPTION } from '@/constants'

export const fetchAnimeGenre = async () => {
  try {
    const response = await fetch(BASE_URL, {
      ...BASE_FETCH_OPTION,
      body: JSON.stringify({
        query: genreQuery,
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
