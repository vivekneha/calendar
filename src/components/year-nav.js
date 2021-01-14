import React, { useState, useEffect } from 'react';

const years = Array(2101).fill().map((_, idx) => idx);

const YearNav = ( props ) => {
	const { year, setYear } = props;
	const [ showDetail, setShowDetail ] = useState(false);
	const [ selectedYear, setSelectedYear ] = useState( year );

	useEffect( () => {
		setSelectedYear( year );
	}, [ year ])

	const onYearChange = ( year ) => {
		setYear( year );						
		setShowDetail( false )
	}

	const getYearsSelect = ( showDetail ) => {		
		if( showDetail ) {
			
			return (
				<select
					style={{margin: '10px'}}
					name="year" value={ selectedYear } 
					onChange={ e => {
						onYearChange( e.target.value );
					}}>
					{ years.map( yr => <option key={ yr } value={ yr }> { yr } </option>) }
				</select>				
			)
		} else {
			return (
				<span 
					style={{margin: '10px'}}
					onDoubleClick={
					e => {
						console.log("Yeay clicked");
						setShowDetail( true );
				}}> 
					{ selectedYear } 
				</span>
			);
		}
	}
	return (
		getYearsSelect( showDetail )
	);
}

export default YearNav;