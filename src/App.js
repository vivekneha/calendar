import React, { useState } from 'react';

import './index.css';
import Note from './components/note';
import Calendar from './components/calendar';
import YearNav from './components/year-nav';

import MonthNav from './components/month-nav';

import moment from 'moment';

const years = Array(2101).fill().map((_, idx) => idx);

const App = () => {
	const [ month, setMonth ] = useState( moment().month());
	const [ year, setYear ] = useState( moment().year() );
	const [ selectedDay, setSelectedDay ] = useState( moment().format('DD-MM-YYYY') )
	const [ daysInMonth, setDaysInMonth ] = useState( moment().daysInMonth() );
	const [ text, setNote ] = useState("");

	const [state, setState] = React.useState(new Map())

	const add = (key, value) => {
		setState(prev => new Map([...prev, [key, value]]))
	}

	const updateDateAndNote = ( date ) => {
		setDaysInMonth(date.daysInMonth());
		let formatedDate = date.format('DD-MM-YYYY');
		setSelectedDay( formatedDate )
		let selectedNote = state.get( formatedDate );
		setNote( selectedNote ? selectedNote : "" )
	}


	// <select name="year" value={year} 
	// 				onChange={ e => {
	// 					setYear( e.target.value );
	// 					let date = moment().set({'year': e.target.value, 'month': month, 'date': 1 });
	// 					updateDateAndNote( date );
	// 				}}>
	// 				{ years.map( year => <option key={year} value={ year }> { year } </option>) }
	// 			</select>

	// <select name="month" 
	// 				onChange={ e => {
	// 					setMonth( e.target.selectedIndex );
	// 					let date = moment().set({'year': year, 'month': e.target.selectedIndex, 'date': 1});
	// 					updateDateAndNote( date );						
	// 				}}>
	// 				{ moment.months().map( month => <option key={month} value={month} > { month } </option>) }
	// 			</select>	
	
	return (
		<div>
			<div style={{width:"99%"}}>
				<Note 
					note={text}
					onNoteInputChange={ data => {
						console.log(" selectedDay ", selectedDay)
						add(selectedDay, data);
						setNote( data )
					}}
				/>
			</div>
			<div style={{ width: '99%'}}>
				
				<MonthNav month={ month }
					setMonth={
						(newMonth) => {
							console.log(" newMonthr ", newMonth);
							setMonth( newMonth );
							let date = moment().set({'year': year, 'month': newMonth, 'date': 1});
							updateDateAndNote( date );		
						}
				}/>			
				<YearNav year={ year }
					setYear={
						(newYear) => {
							console.log(" newYear ", newYear);
							setYear(newYear);
							let date = moment().set({'year': newYear, 'month': month, 'date': 1 });
							updateDateAndNote( date );
						}
				}/>
				<Calendar 
					selectedDay={selectedDay} 
					daysInMonth={daysInMonth}
					onDayClick={ ( date ) => {
						setSelectedDay( date );		
						console.log(" selectedDay ", date)				
						let selectedNote = state.get( date );
						setNote( selectedNote ? selectedNote : "" )
					}}
				/>
			</div>
			
			
		</div>
	);
}

export default App;
