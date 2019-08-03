import React from "react"
import { shallow } from "enzyme"
import StrainDetailsList from "./StrainDetailsList"
import ItemDisplay from "../ItemDisplay"
import LeftDisplay from "../LeftDisplay"
import RightDisplay from "../RightDisplay"
import Grid from "@material-ui/core/Grid"
import { data } from "./mockStrainData"

describe("Stocks/Strains/StrainDetailsList", () => {
  const wrapper = shallow(<StrainDetailsList data={data} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(2)
      expect(wrapper.dive().find(ItemDisplay)).toHaveLength(8)
      expect(wrapper.dive().find(LeftDisplay)).toHaveLength(15)
      expect(wrapper.dive().find(RightDisplay)).toHaveLength(17)
    })
  })
})