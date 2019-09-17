// @flow
import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"
import StockDetailsHeader from "components/Stocks/DetailsPageItems/StockDetailsHeader"
import StockDetailsLoader from "components/Stocks/DetailsPageItems/StockDetailsLoader"
import CatalogErrorMessage from "components/Stocks/CatalogPageItems/CatalogErrorMessage"
import StrainCatalogList from "./StrainCatalogList"
import StrainCatalogAppBar from "./StrainCatalogAppBar"
import { useStrainCatalogState } from "./StrainCatalogContext"

export const GET_STRAIN_LIST = gql`
  query StrainList($cursor: Int!) {
    listStrains(input: { cursor: $cursor, limit: 10 }) {
      nextCursor
      strains {
        id
        label
        summary
        in_stock
      }
    }
  }
`

const useStyles = makeStyles({
  layout: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    "& a": {
      textDecoration: "none",
    },
  },
})

/**
 * StrainCatalogContainer is the main component for the strain catalog page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const StrainCatalogContainer = () => {
  const { query, variables } = useStrainCatalogState()
  const classes = useStyles()

  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <StockDetailsLoader />

        return (
          <Grid container className={classes.layout}>
            <Grid item xs={12}>
              <StockDetailsHeader title="Strain Catalog" />
            </Grid>
            <Grid item xs={12}>
              <StrainCatalogAppBar />
            </Grid>
            <Grid item xs={12}>
              {error ? (
                <CatalogErrorMessage error={error} />
              ) : (
                <StrainCatalogList
                  data={data.listStrains.strains}
                  fetchMore={fetchMore}
                  cursor={data.listStrains.nextCursor}
                  filter={variables.filter}
                />
              )}
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default StrainCatalogContainer
