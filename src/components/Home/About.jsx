// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import AboutInlineEditor from "../editor/AboutInlineEditor"
import { fetchInfoPage } from "actions/page"
import { Flex, Box } from "rebass"

type Props = {
  /** the Auth object taken from the current state */
  auth: Object,
  /** Action creator that fetches data from API */
  fetchInfoPage: Function,
  /** the Page object taken from the current state */
  page: Object,
  /** Checks if data is currently being fetched */
  isFetching: boolean
}

/**
 * Fetches and displays the About page content
 */

class About extends Component<Props> {
  // set defaultprops to prevent console warnings
  static defaultProps = {
    page: {
      data: {
        attributes: {}
      }
    }
  }
  componentDidMount() {
    this.props.fetchInfoPage("dsc-about")
  }
  render() {
    const { isFetching, page } = this.props

    if (!isFetching && page.data.attributes.content) {
      return <AboutInlineEditor auth={this.props.auth} page={this.props.page} />
    }
    return (
      <Flex justify="center">
        <Box w={"95%"}>
          <Skeleton count={5} />
          <br />
          <br />
          <Skeleton count={5} />
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  const slugName = "dsc-about"
  return {
    auth: state.auth,
    isFetching: state.page.isFetching,
    page: state.page[slugName]
  }
}

export default connect(mapStateToProps, { fetchInfoPage })(About)
