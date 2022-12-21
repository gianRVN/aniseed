import { mount, createLocalVue } from '@vue/test-utils'
import { Store } from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'
import Bookmark from '@/pages/bookmark'
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
    format: 'TV',
    episodes: 25,
    duration: 24,
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
    wrapper = mount(Bookmark, {
      stubs: {
        Spinner,
        Card,
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
      },
      store,
    })
  })

  test('element', () => {
    expect(wrapper.findComponent(Card)).toBeTruthy()
  })
})
