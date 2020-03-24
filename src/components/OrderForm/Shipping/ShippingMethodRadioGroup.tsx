import React from "react"
import { useFormikContext } from "formik"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const carriers = [
  {
    value: "fedex",
    label: "FedEx",
  },
  {
    value: "ups",
    label: "UPS",
  },
  {
    value: "dhl",
    label: "DHL",
  },
]

type Props = {
  setShipAccountNum: Function
  setPrepaidNotice: Function
}

/**
 * ShippingMethodRadioGroup contains the radio buttons for listing courier information.
 */

const ShippingMethodRadioGroup = ({
  setShipAccountNum,
  setPrepaidNotice,
}: Props) => {
  const { setFieldValue, handleChange } = useFormikContext<any>()

  const handleShipAccountChange = () => {
    setShipAccountNum(true)
    setPrepaidNotice(false)
    setFieldValue("shippingAccountNumber", "")
  }

  const handlePrepaidLabelChange = () => {
    setShipAccountNum(false)
    setPrepaidNotice(true)
    setFieldValue("shippingAccountNumber", "sending prepaid shipping label")
  }

  return (
    <RadioGroup
      aria-label="Shipping Account"
      name="shippingAccount"
      onChange={handleChange}
      row>
      {carriers.map(item => (
        <FormControlLabel
          key={item.value}
          value={item.value}
          control={<Radio />}
          label={item.label}
          onChange={handleShipAccountChange}
        />
      ))}
      <FormControlLabel
        value="prepaid"
        control={<Radio />}
        label="Send prepaid shipping label"
        onChange={handlePrepaidLabelChange}
      />
    </RadioGroup>
  )
}

export default ShippingMethodRadioGroup
