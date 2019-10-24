// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import useStyles from "../formStyles"

/**
 * PaymentInfoBox contains general information about making a payment.
 */

const PaymentInfoBox = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.panelBlue}>
        <p>
          <strong>Credit Card: </strong>
          Secure payment when billed. Incurs a{" "}
          <strong>3.5% service fee.</strong>
        </p>
        <p>
          <strong>Wire Transfer: </strong>
          Northwestern bank information will be emailed
        </p>
        <p>
          <strong>PO: </strong>
          Add PO number if available or send ASAP to&nbsp;
          <a
            href="mailto:dictystocks@northwestern.edu"
            target="_top"
            className={classes.link}>
            dictystocks@northwestern.edu
          </a>
        </p>
        <p>
          For full payment information please click&nbsp;
          <a
            className={classes.link}
            href="/information/payment"
            target="_blank"
            rel="noopener noreferrer">
            here.
          </a>
        </p>
      </Grid>
    </Grid>
  )
}

export default PaymentInfoBox
