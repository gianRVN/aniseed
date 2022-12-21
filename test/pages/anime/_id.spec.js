import { mount, createLocalVue } from '@vue/test-utils'
import { Store } from 'vuex'
import {
  BootstrapVue,
  BIconBookmarkFill,
  BIconHandThumbsUpFill,
  BIconEyeFill,
} from 'bootstrap-vue'
import Pages from '@/pages/anime/_id'
import Card from '@/components/Card'
import Spinner from '@/components/Spinner'

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

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
    description: 'a',
    format: 'TV',
    episodes: 25,
    duration: 24,
    popularity: 100,
    averageScore: 90,
  },
]

const store = new Store({
  modules: {
    anime: {
      namespaced: true,
      state: () => ({
        bookmarkedAnime: mockAnime,
      }),
      actions: {
        deleteBookmarkAnime: jest.fn(),
      },
    },
  },
})

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(Pages, {
      stubs: {
        Spinner,
        Card,
        BIconBookmarkFill,
        BIconHandThumbsUpFill,
        BIconEyeFill,
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
        $fetchAnimeList: jest.fn().mockReturnValue({ media: mockAnime }),
        $route: {
          params: {
            id: 1,
          },
        },
      },
      store,
    })
  })

  test('element', () => {
    expect(wrapper.findComponent(Card)).toBeTruthy()
  })
})
