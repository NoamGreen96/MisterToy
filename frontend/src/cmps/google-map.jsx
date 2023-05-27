import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px' }}>{text}</div>

export function GoogleMap() {
    const [markers, setMarkers] = useState([
        { id: 1, lat: 32.809143, lng: 35.119774, text: 'Toy store 🧸' },
        { id: 2, lat: 32.841740, lng: 35.092230, text: 'Toy store 🧸' },
    ])
    const zoom = 12
    const [center, setCenter] = useState(markers[0])

    function handleClick({ lat, lng }) {
        setCenter({ lat, lng })
    }

    return (
        <div>
            <div style={{ height: '60vh', width: 'auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB6a0XR998qaYqWOWpdOLEdoPyeB- 7_xto" }}
                    defaultCenter={markers[0]}
                    defaultZoom={zoom}
                    center={center}
                    onClick={handleClick}
                >
                    {markers.map(marker => (
                        <AnyReactComponent
                            key={marker.id}
                            lat={marker.lat}
                            lng={marker.lng}
                            text={marker.text}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    )
}



