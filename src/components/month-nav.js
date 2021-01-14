import React, { useState, useEffect } from 'react';
import moment from 'moment';

const MONTHS = moment.months(); ;

const MonthNav = ( props ) => {
	const { month, setMonth } = props;
	const [ monthPopup, showMonthPopup ] = useState(false);
	const [ selectedMonth, setSelectedMonth ] = useState( month );

	const onToggleDropdown = ( index ) => {
		setMonth( index );		
		showMonthPopup( false )
	}

	useEffect( () => {
		setSelectedMonth( month );
	}, [ month ])

	const getMonthsSelect = ( monthPopup ) => {
		if( monthPopup ) {
			return (
				<select
					style={{margin: '10px'}}
					name="year" selectedIndex={ selectedMonth } 
					onChange={ e => {
						onToggleDropdown(e.target.selectedIndex);
						
					}}>
					{ moment.months().map( month => <option key={ month } value={ month } > { month } </option>) }
				</select>
				
			)
		} else {
			return (
				<span 
					style={{margin: '10px'}}
					onClick={
					e => {
						console.log("Yeay clicked");
						showMonthPopup( true );
				}}> 
					{ MONTHS[selectedMonth] }
				</span>
			);
		}
	}
	return (
		getMonthsSelect( monthPopup )
	);
}

export default MonthNav;