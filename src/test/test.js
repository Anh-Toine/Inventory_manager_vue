const chai = require('chai')
// let assert = require('assert');
const expect = chai.expect
const assert = chai.assert
const orderspage = require('../views/Orders.vue')
describe('Orders are visible', () => {
  it('Check to see if the orders are visible ', function(){
    const wrapper = shallowMount(orderspage)
    expect(wrapper.contains('#orderPage')).toBe(true)
  })
});
