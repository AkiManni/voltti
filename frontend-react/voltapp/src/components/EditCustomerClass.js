import React, {Component} from 'react'


class EditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            editedFirstName: "",
            editedSurName: "",
            editedAddress: "",
            editedPostNumber:""
        }
      }


    render() {

    
    return (
        <div>
            
        </div>
    );
}
}

export default EditCustomer;