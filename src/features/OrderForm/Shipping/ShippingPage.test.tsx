import React from "react"
import { mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import ShippingPage from "./ShippingPage"
import LeftColumn from "../LeftColumn"
import ShippingPageRightColumn from "./ShippingPageRightColumn"
import { Formik } from "formik"
import wait from "waait"

const mockValues = {
  firstName: "Art",
  lastName: "Vandelay",
  email: "art@vandelayindustries.com",
  organization: "Vandelay Industries",
  lab: "Steinbrenner",
  address1: "123 Main St",
  address2: "",
  city: "New York City",
  state: "NY",
  zip: "10001",
  country: "USA",
  phone: "123-456-7890",
  shippingAccount: "FedEx",
  shippingAccountNumber: "99999999",
  comments: "test comment",
  payerFirstName: "Art",
  payerLastName: "Vandelay",
  payerEmail: "art@vandelayindustries.com",
  payerOrganization: "Vandelay Industries",
  payerLab: "Steinbrenner",
  payerAddress1: "123 Main St",
  payerAddress2: "",
  payerCity: "New York City",
  payerState: "NY",
  payerZip: "10010",
  payerCountry: "USA",
  payerPhone: "123-456-7890",
  paymentMethod: "Credit card",
  purchaseOrderNum: "99999",
}

const mockSetFormData = jest.fn()
const mockNextStep = jest.fn()

jest.mock("formik", () => {
  const originalModule = jest.requireActual("formik")

  return {
    ...originalModule,
    useFormikContext: () => ({
      values: mockValues,
    }),
  }
})

describe("OrderForm/Shipping/ShippingPage", () => {
  const props = {
    formData: mockValues,
    setFormData: mockSetFormData,
    nextStep: mockNextStep,
  }
  const wrapper = mount(
    <BrowserRouter>
      <ShippingPage {...props} />
    </BrowserRouter>,
  )
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(Formik)).toHaveLength(1)
      expect(wrapper.find(LeftColumn)).toHaveLength(1)
      expect(wrapper.find(ShippingPageRightColumn)).toHaveLength(1)
    })
  })
  describe("form submission", () => {
    it("should call functions when submitted", async () => {
      const form = wrapper.find("form").at(0)
      form.simulate("submit", { preventDefault: () => {} })
      await wait(0)
      expect(mockNextStep).toHaveBeenCalledTimes(1)
      expect(mockSetFormData).toHaveBeenCalledTimes(1)
      expect(mockSetFormData).toHaveBeenCalledWith(mockValues)
    })
  })
})
