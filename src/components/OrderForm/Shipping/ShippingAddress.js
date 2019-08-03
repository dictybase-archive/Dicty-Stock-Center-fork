// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import PersonalInformation from "./PersonalInformation"
import OrganizationInformation from "./OrganizationInformation"
import AddressInformation from "./AddressInformation"
import ContactInformation from "./ContactInformation"
import styles from "../formStyles"

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/**
 * ShippingAddress is a grid container that contains all of the main shipping address components.
 */

const ShippingAddress = (props: Props) => {
  const { classes } = props

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.innerForm}>
      <PersonalInformation {...props} />
      <OrganizationInformation {...props} />
      <AddressInformation {...props} />
      <ContactInformation {...props} />
    </Grid>
  )
}

export default withStyles(styles)(ShippingAddress)