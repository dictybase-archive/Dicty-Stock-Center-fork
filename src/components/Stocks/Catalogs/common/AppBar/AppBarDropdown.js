// @flow
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { useAppBarState } from "./AppBarContext"

const useStyles = makeStyles({
  select: {
    "&:focus": {
      backgroundColor: "#fff",
    },
  },
})

type Props = {
  dropdownItems: Array<{
    value: string,
    name: string,
  }>,
}

type AppBarState = {
  filter: string,
  setFilter: Function,
}

/**
 * AppBarDropdown is a reusable dropdown menu component for the catalog appbars.
 */

const AppBarDropdown = ({ dropdownItems }: Props) => {
  const { filter, setFilter }: AppBarState = useAppBarState()
  const classes = useStyles()

  const handleChange = event => {
    setFilter(event.target.value)
  }

  return (
    <FormControl>
      <Select
        native
        value={filter}
        onChange={handleChange}
        input={
          <Input
            disableUnderline
            name="catalog-search"
            id="search-filter"
            classes={{
              input: classes.select,
            }}
          />
        }>
        {dropdownItems.map(item => (
          <option value={item.value} key={item.value}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default AppBarDropdown