import { mount } from '@vue/test-utils'
import Spinner from '@/components/Spinner'

let wrapper

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(Spinner, {
      propsData: {
        loading: true,
        paginationLoading: true,
      },
    })
  })

  test('element', () => {
    expect(wrapper.find('.spinner-border')).toBeTruthy()
  })
})
