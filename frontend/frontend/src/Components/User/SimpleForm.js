import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../services/index";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class SimpleForm extends Component {
  render() {
    return (
      <div>


 
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
    );
  }
       
}

export default SimpleForm;