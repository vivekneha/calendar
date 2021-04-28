import React from 'react';
import moment from 'moment';

const liStyle = {float: "left", display: "inline-block", width: "13.6%", textAlign: "center", marginBottom: "5px", fontSize: "12px"};

const Calendar = ( props ) => {
	const { onDayClick, daysInMonth, selectedDay } = props;
	console.log("daysInMonth", daysInMonth)

	const createSpan = ( text, current = false ) => (
		<span 
			style={ current ? { cursor: 'pointer', backgroundColor: '#b8b8b8', minWidth: '50%', display: 'inline-block' } : { cursor: 'pointer' } }
			onClick={
				
				(e) => { 
					let clone = moment(selectedDay, "DD-MM-YYYY").set({'date': Number(e.target.innerText) })
					onDayClick( clone.format("DD-MM-YYYY") ) 
				}
			}> 
			{ text }
		</span>
	);

	const weekDays = () => moment.weekdaysShort().map(day => <li style={ liStyle } key={day}>{day}</li>);

	const createDays = (  ) => {
		let clone = moment(selectedDay, "DD-MM-YYYY");
		//console.log("createDays ", clone.format("DD-MM-YYYY"), "Day ", clone.startOf('month').day())
		let myDate = moment(clone, "DD-MM-YYYY");
		let rows = Array(myDate.startOf('month').day()).fill(0).map( (_, day) => <li  name={day+1} style={ liStyle } key={day+1}>{createSpan( "" ) }</li>);


		for(let i = 1; i <= daysInMonth; i++) {
			rows.push(<li  name={i} style={ liStyle } key={i*10}>{createSpan( i, i === clone.date() ) }</li>)
		}
		return rows;
	}

	const table = (
		<div>
			<div>
				<div style={{padding: "5px 10px", width: "100%" }}>
					<ul style={{margin: 0, padding: "10px 0", listStyleType: "none"}}>
						{ weekDays() }
					</ul>
					<ul style={{margin: 0, padding: "10px 0", listStyleType: "none"}}>
						{ createDays() }
					</ul>
				</div>
			</div>
		</div>
		
	);
	return table;
}

export default Calendar;