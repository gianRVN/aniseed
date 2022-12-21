import { fetchAnimeList } from '@/services/mutation/animeMutation'
import { fetchAnimeGenre } from '@/services/mutation/genreMutation'

export default (_, inject) => {
  inject('fetchAnimeList', fetchAnimeList)
  inject('fetchAnimeGenre', fetchAnimeGenre)
}
