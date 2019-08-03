import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "react-apollo/test-utils"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import configureMockStore from "redux-mock-store"
import wait from "waait"
import Grid from "@material-ui/core/Grid"
import StrainDetailsContainer, { GET_STRAIN } from "./StrainDetailsContainer"
import StockDetailsHeader from "../StockDetailsHeader"
import StrainDetailsList from "./StrainCatalogTable"
import StockDetailsLoader from "../StockDetailsLoader"
import GraphQLErrorPage from "components/GraphQLErrorPage"
import { Query } from "react-apollo"

const mockStore = configureMockStore()
const store = mockStore({})

/**
 * Need to figure out why there is a "no more mocked responses for the query" error on receiving data
 * https://github.com/apollographql/react-apollo/issues/617
 */

describe("Stocks/Strains/StrainDetailsContainer", () => {
  console.error = jest.fn()
  const props = {
    match: {
      params: {
        id: "DBP385",
      },
    },
    classes: {},
  }
  describe("initial render", () => {
    const mocks = [
      {
        request: {
          query: GET_STRAIN,
          variables: { id: props.match.params.id },
        },
        result: {
          data: {
            strain: {},
          },
        },
      },
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <BrowserRouter>
            <StrainDetailsContainer {...props} />
          </BrowserRouter>
        </Provider>
      </MockedProvider>,
    )
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Query)).toHaveLength(1)
    })
    it("renders Loading component first", () => {
      expect(wrapper.find(StockDetailsLoader)).toHaveLength(1)
    })
    xit("renders expected components after receiving data", async () => {
      await wait()
      wrapper.update()
      expect(wrapper.find(Grid)).toHaveLength(3)
      expect(wrapper.find(StockDetailsHeader)).toHaveLength(1)
      expect(wrapper.find(StrainDetailsList)).toHaveLength(1)
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
              extensions: [{ code: "NotFound" }],
            },
          ],
        },
      },
    ]
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <StrainDetailsContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      </Provider>,
    )
    it("handles errors as expected", async () => {
      await wait()
      wrapper.update()
      expect(wrapper.find(GraphQLErrorPage)).toHaveLength(1)
    })
  })
})