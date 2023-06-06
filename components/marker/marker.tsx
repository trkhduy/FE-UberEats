import { Marker } from '@react-google-maps/api'
import React, { FC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Geocode from 'react-geocode'

const GetMarker: FC<any> = ({ address, center }) => {
    console.log("Address: " + address);

    const [restaurantLocation, setRestaurantLocation]: any = useState()
    Geocode.setApiKey(process.env.GOOGLE_MAPS_API_KEY as string)
    Geocode.enableDebug()
    const getLocation = (address: any) => {
        if (address !== '') {
            Geocode.fromAddress(address).then(
                res => {
                    const { lat, lng } = res.results[0].geometry.location
                    const location: any = { lat: lat, lng: lng }
                    setRestaurantLocation(location)
                },
                err => {
                    return err
                }
            )
        }
    }
    useEffect(() => {
        getLocation(address);
    }, [address])
    return (
        <>
            <Marker position={center} />
            <Marker position={restaurantLocation} />
        </>
    )
}

export default GetMarker