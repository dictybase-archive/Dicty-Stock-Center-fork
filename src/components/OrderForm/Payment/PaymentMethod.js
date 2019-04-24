// @flow
import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import TextField from "../TextField"
import styles from "../formStyles"

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Function for handling radio button selection */
  handleChange: Function,
}

/**
 * PaymentMethod contains radio buttons and a text field for listing payment method information.
 */

const PaymentMethod = (props: Props) => {
  const [purchaseOrderNum, setPurchaseOrderNum] = useState(false)
  const { classes, handleChange, setFieldValue } = props

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.innerForm}>
      <Grid item xs={3}>
        <span className={classes.requiredText}>*</span> Payment Method:
      </Grid>
      <Grid item xs={8}>
        <RadioGroup
          aria-label="Payment Method"
          name="paymentMethod"
          onChange={handleChange}
          row>
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit Card"
            onChange={() => {
              setPurchaseOrderNum(false)
              setFieldValue("purchaseOrderNum", "N/A - credit card")
            }}
          />
          <FormControlLabel
            value="wire"
            control={<Radio />}
            label="Wire transfer"
            onChange={() => {
              setPurchaseOrderNum(false)
              setFieldValue("purchaseOrderNum", "N/A - wire transfer")
            }}
          />
          <FormControlLabel
            value="purchaseOrder"
            control={<Radio />}
            label="Purchase Order (PO)"
            onChange={() => setPurchaseOrderNum(true)}
          />
        </RadioGroup>
        {purchaseOrderNum && (
          <TextField
            type="text"
            name="purchaseOrderNum"
            placeholder="PO Number"
          />
        )}
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PaymentMethod)
