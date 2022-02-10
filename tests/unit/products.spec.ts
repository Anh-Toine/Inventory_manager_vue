import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Products from '@/components/ProductsComponent.vue'
import HelloWorld from '@/components/HelloWorld.vue'

describe("HelloWorld.vue", () => {
     it("renders props.msg when passed", () => {
       const msg = "new message";
       const wrapper = shallowMount(HelloWorld, {
         props: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});

describe('ProductsComponent.vue', () => {
  it('Products should be displayed properly', () => {
    const wrapper = shallowMount(Products)
    const productsid = wrapper.find('#productPage')
    expect(productsid.element.id).to.contain('productPage')
  })
})
