// @flow
import React, { useState, forwardRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import { withStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addToCart } from "actions/cart"

const styles = theme => ({
  container: {
    textAlign: "center",
    backgroundColor: "#0059b3",
    padding: "5px",
  },
  button: {
    margin: theme.spacing(2),
  },
  disabledBtn: {
    backgroundColor: "#c3ccdb",
    margin: theme.spacing(2),
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Action for adding an item to the cart */
  addToCart: Function,
  /** Type of item to add to cart */
  type: String,
  /** ID of the given item */
  id: String,
  /** Name of the given item */
  name: string,
  /** Availability of given item */
  inStock: Boolean,
}

// Creating CustomLink is necessary to prevent unexpected unmounting.
// https://material-ui.com/guides/composition/#component-property
const CustomLink = forwardRef((props, ref) => (
  <Link to="/order/checkout" {...props} ref={ref} />
))

/**
 * ShoppingButtons provides the buttons at the bottom of a stock details page.
 */

export const ShoppingButtons = (props: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { classes, type, id, name, addToCart, inStock } = props
  const cartItem = {
    type: type,
    id: id,
    name: name,
  }

  return (
    <div className={classes.container}>
      {inStock ? (
        <Button
          variant="contained"
          color="default"
          size="small"
          className={classes.button}
          onClick={() => {
            addToCart(cartItem)
            setSnackbarOpen(true)
          }}>
          <FontAwesomeIcon icon="share" /> &nbsp;Add to Cart
        </Button>
      ) : (
        <Button size="small" className={classes.disabledBtn} disabled>
          Not available
        </Button>
      )}
      <Button
        component={CustomLink}
        variant="contained"
        color="default"
        size="small"
        className={classes.button}>
        <FontAwesomeIcon icon="shopping-cart" /> &nbsp;Checkout
      </Button>
      <Snackbar
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        ContentProps={{
          "aria-describedby": "cart-id",
        }}
        message={
          <span id="cart-id">
            <FontAwesomeIcon icon="check-circle" /> &nbsp; Item {id} added to
            cart
          </span>
        }
      />
    </div>
  )
}

export default connect(
  null,
  { addToCart },
)(withStyles(styles)(ShoppingButtons))