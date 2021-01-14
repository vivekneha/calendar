import React, { useState, useEffect } from 'react';

const Note = ( props ) => {
	const { note, onNoteInputChange } = props;
	const [ inputNote , setInput ] = useState( note );

	useEffect( () => {
		setInput( note );
	}, [ note ])

	return (
		<>
		<label style={{verticalAlign: 'top', margin: '10px'}}>Note:</label>
		<textarea 
			type="text"
			placeholder="Please enter note and hit enter..."
			value={ inputNote } 
			onChange={ e => { 
				setInput(e.target.value);
			}}>
		</textarea>
		<input 
			type="button" 
			value="Submit" 
			style={{verticalAlign: 'top', margin: '10px'}}
			onClick={ e => {
				onNoteInputChange( inputNote )
			}}
		>
		</input>
		</>
	)
}

export default Note;