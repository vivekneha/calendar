/* eslint-disable no-console */
import React, { useState } from 'react'
import './styles.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const URL = 'https://api.tvmaze.com/search/shows'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SEASONS = 'http://api.tvmaze.com/shows'

const PennyMacApp = () => {
    const [textData, setTextData] = useState('')
    const [data, setData] = useState([])

    const onClick = () => {
        // eslint-disable-next-line no-console
        console.log('textData', textData)

        fetch(`${URL}?q=${textData}`)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log('json', json)

                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < json.length; i++) {
                    console.log(
                        json[i].show.id,
                        json[i].show.name,
                        json[i].show.image
                    )
                }
                setData(json)
            })
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    return (
        <div className="app">
            <h2>Show Finder</h2>
            <div className="search">
                <div className="item">
                    <input
                        name="search"
                        onChange={(e) => {
                            setTextData(e.target.value)
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="item">
                    <button type="button" onClick={() => onClick()}>
                        Search
                    </button>
                </div>
            </div>

            <div>
                {data.map((d: any) => (
                    <div key={d.show.id} className="grid-container">
                        <a
                            // href={`${SEASONS}/${d.show.id}/seasons`}
                            href={`${d.show.url}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {' '}
                            <img
                                src={d.show.image ? d.show.image.medium : ''}
                                alt={d.show.name}
                            />
                        </a>
                        <p
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: d.show.summary }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PennyMacApp
