import React, { useState, useRef, useEffect } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapboxToggle.css";

export default function MapboxToggle() {
  // ✅ 모든 Hooks를 최상위에서 호출
  const [isDomestic, setIsDomestic] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: 127.0276,
    latitude: 37.4979,
    zoom: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [marker, setMarker] = useState(null);
  const [error, setError] = useState("");
  const searchTimeoutRef = useRef(null);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  console.log("Mapbox Token:", MAPBOX_TOKEN);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // ✅ 조건부 렌더링은 Hooks 호출 이후에
  if (!MAPBOX_TOKEN) {
    return (
      <div className="token-error-container">
        <div className="token-error-content">
          <p className="token-error-title">
            Mapbox 토큰이 설정되지 않았습니다.
          </p>
          <p className="token-error-description">
            .env 파일에 VITE_MAPBOX_TOKEN을 설정해주세요.
          </p>
        </div>
      </div>
    );
  }

  const handleToggle = (domestic) => {
    setIsDomestic(domestic);
    setSearchQuery("");
    setSearchResults([]);
    setMarker(null);
    setSelectedLocation(null);
    setShowPopup(false);
    setError("");

    if (domestic) {
      setViewState({ longitude: 127.0276, latitude: 37.4979, zoom: 10 });
    } else {
      setViewState({ longitude: 0, latitude: 20, zoom: 1.5 });
    }
  };

  const searchPlaces = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN}&limit=5&language=ko`
      );

      if (!response.ok) throw new Error("검색에 실패했습니다.");

      const data = await response.json();
      setSearchResults(data.features || []);
    } catch (error) {
      console.error("Search error:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setError("");

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => searchPlaces(query), 300);
  };

  const handleSelectLocation = (location) => {
    const [longitude, latitude] = location.geometry.coordinates;

    setSelectedLocation({
      name: location.text || location.place_name,
      fullName: location.place_name,
      longitude,
      latitude,
    });

    setMarker({ longitude, latitude });
    setViewState({ longitude, latitude, zoom: 13 });
    setSearchResults([]);
    setSearchQuery("");
    setShowPopup(true);
  };

  const handleConfirm = () => {
    console.log("등반 시작:", selectedLocation);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="map-container">
      {/* 국내/해외 토글 */}
      <div className="toggle-container">
        <button
          onClick={() => handleToggle(true)}
          className={`toggle-button ${
            isDomestic ? "toggle-button-active" : "toggle-button-inactive"
          }`}
          aria-label={isDomestic ? "국내 선택됨" : "국내 선택"}
        >
          국내
        </button>
        <button
          onClick={() => handleToggle(false)}
          className={`toggle-button ${
            !isDomestic ? "toggle-button-active" : "toggle-button-inactive"
          }`}
          aria-label={!isDomestic ? "해외 선택됨" : "해외 선택"}
        >
          해외
        </button>
      </div>

      {/* 검색 입력창 */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="장소, 주소 검색해주세요"
          className="search-input"
        />

        {/* 검색 결과 드롭다운 */}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectLocation(result)}
                className="search-result-item"
              >
                <p className="search-result-title">{result.text}</p>
                <p className="search-result-subtitle">{result.place_name}</p>
              </button>
            ))}
          </div>
        )}

        {/* 에러 메시지 */}
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* 지도 */}
      <div className="map-wrapper">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          transitionDuration={1500}
          scrollZoom={false}
          boxZoom={false}
          dragRotate={false}
          dragPan={false}
          keyboard={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          touchPitch={false}
        >
          {marker && (
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <div className="marker-outer">
                <div className="marker-inner"></div>
              </div>
            </Marker>
          )}
        </Map>
      </div>

      {/* 팝업 */}
      {showPopup && selectedLocation && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className="popup-text-gray">
              {selectedLocation.fullName.split(",").slice(0, 2).join(",")}의
            </p>
            <p className="popup-location-name">"{selectedLocation.name}"</p>
            <p className="popup-question">으로 등반을 시작할까요?</p>
            <div className="popup-buttons">
              <button
                onClick={handleCancel}
                className="popup-button popup-button-cancel"
                aria-label="취소"
              >
                아니요
              </button>
              <button
                onClick={handleConfirm}
                className="popup-button popup-button-confirm"
                aria-label="확인"
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}