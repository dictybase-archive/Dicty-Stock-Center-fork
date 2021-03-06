import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { BrowserRouter } from "react-router-dom"
import wait from "waait"
import { StrainDetailsContainer } from "./StrainDetailsContainer"
import StrainDetailsLeftCard from "./StrainDetailsLeftCard"
import DetailsHeader from "features/Stocks/Details/common/DetailsHeader"
import DetailsLoader from "features/Stocks/Details/common/DetailsLoader"
import GraphQLErrorPage from "features/Errors/GraphQLErrorPage"
import { CartProvider } from "features/ShoppingCart/CartStore"
import { GET_STRAIN } from "common/graphql/queries"
import { strainWithPhenotype } from "./mockStrainData"

const mockID = "DBS0350966"

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useParams: () => ({
      id: mockID,
    }),
  }
})

describe("Stocks/Strains/StrainDetailsContainer", () => {
  describe("initial render", () => {
    const mocks = [
      {
        request: {
          query: GET_STRAIN,
          variables: { id: mockID },
        },
        result: {
          data: {
            strain: strainWithPhenotype,
          },
        },
      },
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartProvider>
          <BrowserRouter>
            <StrainDetailsContainer />
          </BrowserRouter>
        </CartProvider>
      </MockedProvider>,
    )
    it("renders loading component first", () => {
      expect(wrapper.find(DetailsLoader)).toHaveLength(1)
    })
    it("renders expected components after receiving data", async () => {
      await wait()
      wrapper.update()
      expect(wrapper.find(DetailsHeader)).toHaveLength(1)
      expect(wrapper.find(StrainDetailsLeftCard)).toHaveLength(1)
    })
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: GET_STRAIN,
          variables: {
            id: "DBS999999",
          },
        },
        result: {
          errors: [
            {
              message: "could not find strain with ID DBS999999",
              path: ["strain"],
              extensions: { code: "NotFound" },
              locations: undefined,
              nodes: undefined,
              source: undefined,
              positions: undefined,
              originalError: undefined,
              name: "",
            },
          ],
        },
      },
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartProvider>
          <BrowserRouter>
            <StrainDetailsContainer />
          </BrowserRouter>
        </CartProvider>
      </MockedProvider>,
    )
    it("handles errors as expected", async () => {
      await wait()
      wrapper.update()
      expect(wrapper.find(GraphQLErrorPage)).toHaveLength(1)
    })
  })
})
