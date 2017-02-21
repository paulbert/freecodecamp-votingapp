import React, { Component } from 'react';
import $ from 'jquery';

require('bootstrap-social/bootstrap-social.css');
require('font-awesome/scss/font-awesome.scss');

const FBLogin = () => (
	<a href="/auth/facebook" className="btn btn-block btn-social btn-facebook"><span className="fa fa-facebook"></span>Login with Facebook</a>
)

export default FBLogin;