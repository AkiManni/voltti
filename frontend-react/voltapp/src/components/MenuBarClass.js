import React from 'react'

class MenuBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        return (
          <>
            {menuBarContainer}
          </>
        )
      }
    }
    
    export default MenuBar;