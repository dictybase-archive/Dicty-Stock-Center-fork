import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"
import ShippingMethodRadioGroup from "./ShippingMethodRadioGroup"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

describe("OrderForm/Shipping/ShippingMethodRadioGroup", () => {
  const handleChangeSpy = sinon.spy()
  const setFieldValueSpy = sinon.spy()
  const setShipAccountNumSpy = sinon.spy()
  const setPrepaidNoticeSpy = sinon.spy()
  const props = {
    handleChange: handleChangeSpy,
    setFieldValue: setFieldValueSpy,
    setShipAccountNum: setShipAccountNumSpy,
    setPrepaidNotice: setPrepaidNoticeSpy,
  }
  const wrapper = shallow(<ShippingMethodRadioGroup {...props} />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(RadioGroup)).toHaveLength(1)
      expect(wrapper.find(FormControlLabel)).toHaveLength(4)
    })
  })
  describe("radio button interactions", () => {
    it("sets field value when clicking prepaid shipping label", () => {
      // click prepaid label button
      const label = wrapper.find(FormControlLabel).last()
      label.simulate("change")
      expect(setFieldValueSpy.calledOnce).toBe(true)
    })
    it("does not set field value when clicking others", () => {
      // reset spy
      setFieldValueSpy.resetHistory()
      // click fedex button
      const fedex = wrapper.find(FormControlLabel).first()
      fedex.simulate("change")
      expect(setFieldValueSpy.notCalled).toBe(true)
      // click UPS button
      const ups = wrapper.find(FormControlLabel).at(1)
      ups.simulate("change")
      expect(setFieldValueSpy.notCalled).toBe(true)
      // click DHL button
      const dhl = wrapper.find(FormControlLabel).at(2)
      dhl.simulate("change")
      expect(setFieldValueSpy.notCalled).toBe(true)
    })
  })
})