import React, { Component, PropTypes } from 'react'
import ToolItem from 'components/ToolItem'


export default class BlockToolbar extends Component {
    displayName = 'toolbar with block controls'
    static propTypes = {
        editorState: PropTypes.object.isRequired,
        clickFn: PropTypes.func.isRequired,
        toolSpec: PropTypes.array.isRequired
    }
    onMouseDown = (e) => {
        e.preventDefault()
    }
    render() {
        const { toolSpec, editorState, clickFn } = this.props
        const selection = editorState.getSelection()
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        return (
          <div
            className="btn-group"
            role="group"
            onMouseDown={ this.onMouseDown } >
                { toolSpec.map((type) =>
                  <ToolItem
                    key={ toolSpec.indexOf(type) }
                    type={ type }
                    clickFn={ clickFn }
                    active={ blockType === type.style }
                  />
                ) }
          </div>
        )
    }
}
