import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

const mapStateToProps = (state) => {
	return {
		user:state.user
	}
};

const MenuContain = connect(mapStateToProps)(Menu);

export default MenuContain;