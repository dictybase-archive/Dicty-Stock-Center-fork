import React from "react"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

/**
 * BrowserWarningContent displays the content of the browser warning
 * dialog message.
 */

const BrowserWarningContent = () => (
  <DialogContent>
    <DialogContentText id="browser-warning-description">
      <p>Dicty Stock Center may not work as expected on your browser.</p>
      <p>
        Please consider upgrading to a more modern browser such as{" "}
        <a
          href="https://www.mozilla.org/en-US/firefox/new/"
          target="_blank"
          rel="noopener noreferrer">
          Mozilla Firefox
        </a>{" "}
        or{" "}
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer">
          Google Chrome
        </a>
        .
      </p>
    </DialogContentText>
  </DialogContent>
)

export default BrowserWarningContent
