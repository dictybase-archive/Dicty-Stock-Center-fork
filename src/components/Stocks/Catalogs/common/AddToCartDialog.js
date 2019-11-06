// @flow
import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitleDisplay from "components/common/DialogTitleDisplay"
import AddToCartDialogContent from "./AddToCartDialogContent"
import AddToCartDialogActions from "./AddToCartDialogActions"

type Props = {
  /** Strain data */
  data: Array<{
    /** Strain ID number */
    id: string,
    /** Strain label (name) */
    label: string,
    /** Strain summary */
    summary: string,
  }>,
  /** Function to set hovering of list item */
  setHover: Function,
  /** Function to add to checked items array */
  setCheckedItems: Function,
  /** Boolean for whether item added dialog is open */
  dialogOpen: boolean,
  /** Function that toggles whether dialog is open */
  setDialogOpen: Function,
}

/**
 * AddToCartDialog is the dialog box that appears when an item
 * is added to the cart.
 */

export const AddToCartDialog = ({
  data,
  dialogOpen,
  setDialogOpen,
  setHover,
  setCheckedItems,
}: Props) => {
  const handleClose = () => {
    setDialogOpen(false)
    setHover ? setHover(false) : setCheckedItems([])
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      aria-labelledby="cart-dialog-title"
      open={dialogOpen}>
      <DialogTitleDisplay title="Added to Cart" handleClose={handleClose} />
      <AddToCartDialogContent data={data} />
      <AddToCartDialogActions
        setDialogOpen={setDialogOpen}
        setHover={setHover}
        setCheckedItems={setCheckedItems}
      />
    </Dialog>
  )
}

export default AddToCartDialog
