import React from 'react'

class ManagerView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    render() {
        return (
          <>
          <div>
          <button onClick={ () => this.props.disableManagerMode }> disable manager </button>
          </div>
          </>
        )
      }
    }
    
    export default ManagerView;
    