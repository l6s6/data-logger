import React from 'react';

const GPXGenerator = (props) => {
  const handleGenerateGPX = (latitudes, longitudes, elevations) => {
    if (
      !Array.isArray(latitudes) ||
      !Array.isArray(longitudes) ||
      !Array.isArray(elevations) ||
      latitudes.length !== longitudes.length ||
      longitudes.length !== elevations.length
    ) {
      console.error('Ungültige Eingabe');
      return;
    }

    const points = latitudes.map((lat, index) => ({
      latitude: lat,
      longitude: longitudes[index],
      elevation: elevations[index],
    }));
    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" creator="YourAppName">
      <trk>
        <trkseg>
          ${points
            .map(
              (
                point
              ) => `<trkpt lat="${point.latitude}" lon="${point.longitude}">
            <ele>${point.elevation}</ele>
          </trkpt>`
            )
            .join('')}
        </trkseg>
      </trk>
    </gpx>`;

    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);

    // Download the GPX file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'track.gpx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>GPX Generator</h1>
      <button
        onClick={() => handleGenerateGPX(props.lat, props.lon, props.height)}
      >
        Generate GPX
      </button>
    </div>
  );
};

export default GPXGenerator;
