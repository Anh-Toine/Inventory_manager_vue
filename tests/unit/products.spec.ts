import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import 'tests/unit/localStorage.js'
import Products from '@/components/ProductsComponent.vue'

describe('ProductsComponent.vue', () => {
  it('Products should be displayed properly', () => {
    const wrapper = shallowMount(Products)
    const productsid = wrapper.find('#productPage')
    expect(productsid.element.id).to.contain('productPage')
  })
})
