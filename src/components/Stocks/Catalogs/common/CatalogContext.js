// @flow
import React, { createContext, useContext, useMemo, useReducer } from "react"
import { catalogTypes } from "constants/catalogs"

const CatalogContext: Object = createContext()

const initialState = {
  queryVariables: { cursor: 0, filter: "" },
  checkedItems: [],
}

const catalogReducer = (state: Object, action: Object) => {
  switch (action.type) {
    case catalogTypes.SET_QUERY_VARIABLES:
      return {
        ...state,
        queryVariables: action.payload,
      }
    case catalogTypes.SET_CHECKED_ITEMS:
      return {
        ...state,
        checkedItems: action.payload,
      }
    default:
      return state
  }
}

/**
 * CatalogProvider contains "global" state used for the stock catalog
 * pages. This removes the need for prop drilling through multiple
 * components.
 */

const CatalogProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

const useCatalogStore = () => {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error("useCatalogStore must be used within a CatalogProvider")
  }
  return context
}

export { CatalogContext, catalogReducer, CatalogProvider, useCatalogStore }
