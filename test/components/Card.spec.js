import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BButton } from 'bootstrap-vue'
import Card from '@/components/Card'

let wrapper
const localVue = createLocalVue()
localVue.use(BootstrapVue)

const mockRouter = {
  push: jest.fn(),
}

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(Card, {
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
    })
  })

  test('element', () => {
    expect(wrapper.find('.card-title').text()).toContain('title')
    expect(wrapper.find('.card-description').text()).toContain(
      '1episodes | 1minutes'
    )
    expect(wrapper.findComponent('b-button')).toBeTruthy()
  })

  test('interaction', async () => {
    const button = wrapper.findComponent(BButton)
    const card = wrapper.find('.card')

    await card.trigger('click')
    await button.trigger('click')

    expect(wrapper.emitted().action).toBeTruthy()
    expect(mockRouter.push).toHaveBeenCalledTimes(2)
  })
})
