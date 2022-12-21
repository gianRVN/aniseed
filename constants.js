export const BASE_URL = 'https://graphql.anilist.co'
export const PER_PAGE = 25
export const BASE_VARIABLES = {
  page: 1,
  perPage: PER_PAGE,
}
export const BASE_FETCH_OPTION = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
