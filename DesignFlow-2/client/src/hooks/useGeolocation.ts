import { useState, useEffect } from 'react';

interface GeoData {
  country: string;
  countryCode: string;
}

export function useGeolocation() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setGeoData({
          country: data.country_name || 'Unknown',
          countryCode: data.country_code?.toLowerCase() || 'un'
        });
        setLoading(false);
      })
      .catch(() => {
        setGeoData({ country: 'Unknown', countryCode: 'un' });
        setLoading(false);
      });
  }, []);

  return { geoData, loading };
}
