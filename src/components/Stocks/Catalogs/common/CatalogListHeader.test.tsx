import React from "react"
import { mount } from "enzyme"
import CatalogListHeader from "./CatalogListHeader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import {
  CatalogProvider,
  CatalogContext,
  catalogReducer,
} from "components/Stocks/Catalogs/common/CatalogContext"
import { CartProvider } from "components/ShoppingCart/CartStore"
import StrainCatalogListHeader from "components/Stocks/Catalogs/Strains/StrainCatalogListHeader"
import PlasmidCatalogListHeader from "components/Stocks/Catalogs/Plasmids/PlasmidCatalogListHeader"
import CatalogListHeaderButtons from "./CatalogListHeaderButtons"

describe("Stocks/Catalogs/common/CatalogListHeader", () => {
  describe("initial render for strain", () => {
    const props = {
      stockType: "strain",
    }
    const wrapper = mount(
      <CartProvider>
        <CatalogProvider>
          <CatalogListHeader {...props} />
        </CatalogProvider>
      </CartProvider>,
    )
    it("always renders initial components", () => {
      expect(wrapper.find(List)).toHaveLength(1)
      expect(wrapper.find(ListItem)).toHaveLength(1)
      expect(wrapper.find(StrainCatalogListHeader)).toHaveLength(1)
      expect(wrapper.find(PlasmidCatalogListHeader)).toHaveLength(0)
    })
  })
  describe("initial render for plasmids", () => {
    const props = {
      stockType: "plasmid",
    }
    const wrapper = mount(
      <CartProvider>
        <CatalogProvider>
          <CatalogListHeader {...props} />
        </CatalogProvider>
      </CartProvider>,
    )
    it("always renders initial components", () => {
      expect(wrapper.find(List)).toHaveLength(1)
      expect(wrapper.find(ListItem)).toHaveLength(1)
      expect(wrapper.find(PlasmidCatalogListHeader)).toHaveLength(1)
      expect(wrapper.find(StrainCatalogListHeader)).toHaveLength(0)
    })
  })
  describe("initial render with checked items", () => {
    const MockedComponent = () => {
      const [state, dispatch] = React.useReducer(catalogReducer, {
        checkedItems: [
          {
            id: "DBS123456",
            name: "testarooni",
            summary: "test1212",
          },
        ],
      })

      return (
        <CartProvider>
          <CatalogContext.Provider value={[state, dispatch]}>
            <CatalogListHeader stockType="plasmid" />
          </CatalogContext.Provider>
        </CartProvider>
      )
    }
    const wrapper = mount(<MockedComponent />)
    it("always renders initial components", () => {
      expect(wrapper.find(List)).toHaveLength(1)
      expect(wrapper.find(ListItem)).toHaveLength(1)
      expect(wrapper.find(PlasmidCatalogListHeader)).toHaveLength(0)
      expect(wrapper.find(StrainCatalogListHeader)).toHaveLength(0)
      expect(wrapper.find(CatalogListHeaderButtons)).toHaveLength(1)
    })
  })
})