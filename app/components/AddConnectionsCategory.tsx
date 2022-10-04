import React from "react"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"

export const CATEGORIES = [
  "All Categories",
  "Position",
  "Education",
  "Membership",
  "Family",
  "Donation",
  "Transaction",
  "Lobbying",
  "Social",
  "Professional",
  "Ownership",
  "Hierarchy",
  "Generic",
]

interface AddConnectionsCategoryProps {
  categoryId: string | number
  onChange: (arg0: any) => void
  variant: "filled" | "outlined" | "standard"
}

export default function AddConnectionsCategory({
  categoryId,
  onChange,
  variant,
}: AddConnectionsCategoryProps) {
  return (
    <Select
      className="add-connections-category"
      MenuProps={{ transitionDuration: 0 }}
      onChange={onChange}
      value={categoryId.toString()}
      fullWidth={true}
      variant={variant}
      title="Select a relationship category"
    >
      {CATEGORIES.map((name, id) => (
        <MenuItem value={id} key={id} dense={true}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
