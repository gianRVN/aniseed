import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BDropdown, BFormInput } from 'bootstrap-vue'
import Index from '@/pages/index'
import Card from '@/components/Card'
import Spinner from '@/components/Spinner'

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)

const mockRouter = {
  push: jest.fn(),
}

const mockAnime = [
  {
    id: 1,
    title: {
      romaji: 'Shingeki no Kyojin',
    },
    coverImage: {
      medium:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16498-C6FPmWm59CyP.jpg',
    },
    format: 'TV',
    episodes: 25,
    duration: 24,
  },
]

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(Index, {
      stubs: {
        Spinner,
      },
      localVue,
      propsData: {
        id: 1,
        title: 'title',
        image: 'image',
        genres: ['genre'],
        episodes: 1,
        duration: 1,
        action: 'action',
      },
      mocks: {
        $router: mockRouter,
        $fetchAnimeList: jest.fn().mockReturnValue(mockAnime),
        $fetchAnimeGenre: jest.fn().mockReturnValue(['Romance']),
      },
    })
  })

  test('element', () => {
    expect(wrapper.findComponent(BDropdown)).toBeTruthy()
    expect(wrapper.findComponent(BFormInput)).toBeTruthy()
    expect(wrapper.findComponent(Card)).toBeTruthy()
  })
})
