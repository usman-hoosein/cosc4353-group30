import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => (
  <div>
    <h1>404 - Not Found!</h1>
    <h2>props.message</h2>
    <Link to={props.uri}>Go to {props.pages}</Link>
  </div>
);

export default NotFound;