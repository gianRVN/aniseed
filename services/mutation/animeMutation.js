import { animeQuery } from '@/services/query/animeQuery'
import { BASE_URL, BASE_VARIABLES, BASE_FETCH_OPTION } from '@/constants'

export const fetchAnimeList = async (variables) => {
  try {
    console.log(variables, 'check')
    const response = await fetch(BASE_URL, {
      ...BASE_FETCH_OPTION,
      body: JSON.stringify({
        query: animeQuery,
        variables: { ...BASE_VARIABLES, ...variables },
      }),
    })

    const {
      data: { Page },
    } = await response.json()

    return Page
  } catch (err) {
    return { err } // eslint-disable-line
  }
}
