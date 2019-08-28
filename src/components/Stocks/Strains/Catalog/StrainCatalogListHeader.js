// @flow
import React from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Checkbox from "@material-ui/core/Checkbox"
import Hidden from "@material-ui/core/Hidden"
import AddToCartButton from "components/Stocks/CatalogTableItems/AddToCartButton"
import { addToCart } from "actions/cart"

const useStyles = makeStyles({
  listHeaders: {
    borderBottom: "1px solid #888",
    backgroundColor: "#f6f9fc",
    color: "#525f7f",
    fontWeight: 600,
  },
  list: {
    padding: 0,
  },
})

type Props = {
  checkedItems: Array<{
    id: string,
    label: string,
  }>,
  setCheckedItems: Function,
  addToCart: Function,
  handleCheckAllChange: Function,
}

/**
 * StrainCatalogListHeader contains the list of headers (i.e.
 * descriptor, summary, etc) at the top of the catalog page.
 */

const StrainCatalogListHeader = ({
  checkedItems,
  setCheckedItems,
  addToCart,
  handleCheckAllChange,
  dialogOpen,
  setDialogOpen,
}: Props) => {
  const classes = useStyles()
  const checkedItemsLength = checkedItems.length

  return (
    <List className={classes.list}>
      <ListItem className={classes.listHeaders}>
        <Grid container spacing={0} alignItems="center">
          <Hidden smDown>
            <Grid item md={1}>
              {checkedItemsLength > 0 && (
                <Checkbox
                  indeterminate={checkedItemsLength > 0 ? true : false}
                  color="default"
                  value="selectAll"
                  onChange={handleCheckAllChange}
                  inputProps={{
                    "aria-label": "checkbox select all",
                  }}
                />
              )}
            </Grid>
          </Hidden>
          {checkedItemsLength > 0 ? (
            <AddToCartButton
              data={checkedItems}
              setCheckedItems={setCheckedItems}
            />
          ) : (
            <>
              <Grid item xs={12} md={3}>
                Strain Descriptor
              </Grid>
              <Hidden smDown>
                <Grid item md={6}>
                  Strain Summary
                </Grid>
              </Hidden>
              <Hidden lgDown>
                <Grid item xl={1}>
                  Strain ID
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item xs={4} md={1}></Grid>
              </Hidden>
            </>
          )}
        </Grid>
      </ListItem>
    </List>
  )
}

export default connect<*, *, *, *, *, *>(
  null,
  { addToCart },
)(StrainCatalogListHeader)
