import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";

const Heatmap = ({currentCity, currentPlace, currentMethod}) => {

    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);

    const mapRef = useRef();

    const fetchData = async () => {
        return await axios.get('')
    }

    useEffect(() => {
        let locations = [];
        let leafletMap = L.map(mapRef.current)

        if (currentCity === 'Волгоград') {
            leafletMap.setView([48.7071, 44.5169], 13);
            locations = [
                [48.7071, 44.5169, 0.5],
                [48.7233, 44.5517, 0.2],
                [48.6806, 44.5363, 0.8],
                [48.7119, 44.5292, 1],
                [48.6845, 44.4814, 1],
                // и т.д.
            ];
        } else if (currentCity === 'Москва') {
            leafletMap.setView([55.751244, 37.618423], 13);
            locations = [
                [55.751244, 37.618423, 1],
                [55.756456, 37.617082, 0.7],
                [55.749611, 37.580338, 0.5],
                [55.763079, 37.617332, 0.4],
                [55.753714, 37.621298, 0.2],
                [55.767831, 37.638138, 0.1],
                // и т.д.
            ];
        } else if (currentCity === 'Санкт-Петербург') {
            leafletMap.setView([59.93863, 30.31413], 13);
            locations = [
                [59.93863, 30.31413, 1],
                [59.93608, 30.31593, 0.7],
                [59.94381, 30.35402, 0.5],
                [59.94433, 30.36114, 0.4],
                [59.93153, 30.36051, 0.2],
                [59.95633, 30.31434, 0.1],
                // и т.д.
            ];
        }

        setMap(leafletMap);

        setLocations(locations);
        const heatLayer = L.heatLayer(locations, { radius: 50, blur: 50, opacity: 0.99, maxZoom: 1, minZoom: 0 }).addTo(leafletMap);

        // Добавляем базовый слой карты
        const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm = new L.TileLayer(osmUrl, {
            attribution: osmAttrib,
            minZoom: 8,
            maxZoom: 16,
        });
        osm.addTo(leafletMap);

        // Очищаем карту при размонтировании компонента
        return () => {
            leafletMap.remove();
        };
    }, [currentCity, currentPlace, currentMethod]);

    return <div ref={mapRef}></div>;
};

export default Heatmap;