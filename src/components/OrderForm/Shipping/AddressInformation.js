// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "../TextField"
import countryList from "../countryList"
import useStyles from "../formStyles"

type Props = {
  /** Function to manually set Formik field values */
  setFieldValue: Function,
  /** Values from Formik */
  values: Object,
}

/**
 * AddressInformation contains text fields for entering a user address.
 */

const AddressInformation = ({ values, setFieldValue }: Props) => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={12} md={3}>
        <span className={classes.requiredText}>*</span> Address:
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField type="text" name="address1" />
      </Grid>
      <Grid item xs={12} md={3}>
        Address:
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField type="text" name="address2" />
      </Grid>
      <Grid item xs={12} md={3}>
        <span className={classes.requiredText}>*</span> City:
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField type="text" name="city" />
      </Grid>
      <Grid item xs={12} md={3}>
        State/Province:
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField type="text" name="state" />
      </Grid>
      <Grid item xs={12} md={3}>
        <span className={classes.requiredText}>*</span> Zip Code:
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField type="text" name="zip" />
      </Grid>
      <Grid item xs={12} md={3}>
        <span className={classes.requiredText}>*</span> Country:
      </Grid>
      <Grid item xs={12} md={8} className={classes.selectBox}>
        <Select
          name="country"
          label="Country"
          fullWidth
          value={values.country}
          onChange={e => setFieldValue("country", e.target.value)}
          input={
            <OutlinedInput
              name="country"
              id="country"
              fullWidth
              labelWidth={0}
            />
          }>
          {countryList &&
            countryList.map(item => (
              <MenuItem key={countryList.indexOf(item)} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </>
  )
}

export default AddressInformation
