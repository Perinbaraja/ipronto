import { MapApiResponse } from '@/types/map'
import React, { useState } from 'react'

type Props = {}

const MapSection = (props: Props) => {

    const [mapData, setMapData] = useState<MapApiResponse>([] as unknown as MapApiResponse)

  return (
    <div>MapSection</div>
  )
}

export default MapSection