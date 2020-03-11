import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuthStore } from "components/authentication/AuthStore"
import useAuthorization from "hooks/useAuthorization"

const useStyles = makeStyles(() => ({
  grid: {
    alignItems: "center",
  },
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    paddingLeft: "9px",
    width: "100%",
    display: "inline-block",
  },
  label: {
    display: "inline",
    padding: "0.2em 0.6em 0.3em",
    fontSize: "75%",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
    backgroundColor: "#337ab7",
    "&:hover": {
      backgroundColor: "#337ab7",
    },
    "&:focus": {
      backgroundColor: "#337ab7",
    },
  },
  editButton: {
    color: "#337ab7",
    fontSize: "1rem",
    "&:hover": {
      color: "#337ab7",
      backgroundColor: "transparent",
    },
  },
  textInfo: {
    color: "#31708f",
    "&:hover": {
      color: "#245269",
    },
    "&:focus": {
      color: "#245269",
    },
  },
}))

const error =
  "Your login token has expired. Please log out and then log back in to regain full user access."

type Props = {
  data: {
    id: string
    first_name: string
    last_name: string
    updated_at: string
    roles: Array<{
      role: string
    }>
  }
  handleClick: any // fix this
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageViewToolbar = ({ handleClick, data }: Props) => {
  const classes = useStyles()
  const [{ isAuthenticated }] = useAuthStore()
  const { canEditPages, verifiedToken } = useAuthorization()

  const fullName = `${data.first_name} ${data.last_name}`
  const role = `${data.roles[0].role}`
  const uppercaseRole = role.charAt(0).toUpperCase() + role.substring(1)

  return (
    <>
      {isAuthenticated && canEditPages && verifiedToken && (
        <div>
          {canEditPages && !verifiedToken && (
            <ErrorNotification error={error} />
          )}
          <br />
          {canEditPages && (
            <div className={classes.toolbar}>
              <Grid container alignItems="center">
                <Grid item>
                  <span className={classes.textInfo}>
                    <strong>
                      <FontAwesomeIcon
                        className={classes.editButton}
                        icon="user"
                      />
                      &nbsp; {fullName}
                    </strong>
                    &nbsp; edited {timeSince(data.updated_at)} ago
                  </span>
                </Grid>
                <Grid item className={classes.content}>
                  <span className={classes.label}>{uppercaseRole}</span> &nbsp;
                  {verifiedToken && (
                    <Tooltip title="Edit Page" placement="bottom">
                      <IconButton
                        className={classes.editButton}
                        onClick={handleClick}>
                        <FontAwesomeIcon icon="pencil-alt" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default InfoPageViewToolbar
