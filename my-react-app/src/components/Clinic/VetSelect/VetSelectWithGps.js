import React, { useState, useEffect } from 'react';

const VetSelectWithGps = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [vets, setVets] = useState([]);
    const [selectedVet, setSelectedVet] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.error("Geolocation is not available");
        }
    }, []);

    useEffect(() => {
        const fetchVets = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/vets`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setVets(data);
            } catch (error) {
                console.error("Error fetching vets:", error);
            }
        };

        fetchVets();
    }, []);

    const handleSelect = (vet) => {
        setSelectedVet(vet);
    };

    // 거리 계산 함수 (Haversine 공식 사용)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // 지구 반경 (킬로미터)
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    // 사용자의 위치와 수의사 위치를 기반으로 거리순으로 정렬
    const sortedVets = location.latitude && location.longitude
        ? vets.sort((a, b) => {
            const distanceA = calculateDistance(location.latitude, location.longitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(location.latitude, location.longitude, b.latitude, b.longitude);
            return distanceA - distanceB;
        })
        : vets;

    return (
        <div>
            <h1>수의사 선택 및 GPS 위치</h1>
            <h2>GPS 위치</h2>
            {location.latitude && location.longitude ? (
                <p>
                    위도: {location.latitude}, 경도: {location.longitude}
                </p>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}

            <h2>수의사 선택</h2>
            <ul>
                {sortedVets.map(vet => (
                    <li key={vet.userId} onClick={() => handleSelect(vet)}>
                        {vet.name} - {vet.address}
                    </li>
                ))}
            </ul>
            {selectedVet && (
                <div>
                    <h2>선택한 수의사</h2>
                    <p> {selectedVet.vetImage}</p>
                    <p>이름: {selectedVet.name}</p>
                    <p>전화번호: {selectedVet.phoneNumber}</p>
                    <p>이메일: {selectedVet.email}</p>
                    <p>주소: {selectedVet.address}</p>
                    <p>리뷰: {selectedVet.review}</p>
                    <p>상담 건수: {selectedVet.consultationCount}</p>
                    <p>평점: {selectedVet.vetRating}</p>

                </div>
            )}
        </div>
    );
};

export default VetSelectWithGps;
