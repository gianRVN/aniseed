import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BNavItem } from 'bootstrap-vue'
import Navbar from '@/components/Navbar'

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)

const mockRouter = {
  push: jest.fn(),
}

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(Navbar, {
      localVue,
      mocks: {
        $router: mockRouter,
      },
    })
  })

  test('element', () => {
    expect(wrapper.findAllComponents(BNavItem).at(0).text()).toContain(
      'AniSeed'
    )
    expect(wrapper.findAllComponents(BNavItem).at(1).text()).toContain(
      'Bookmark'
    )
  })

  test('interaction', async () => {
    const navAniSeed = wrapper.find('.nav-aniseed')
    const navBookmark = wrapper.find('.nav-bookmark')

    await navAniSeed.trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith('/')

    await navBookmark.trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith('/bookmark')
  })
})
