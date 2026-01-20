import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import { Route, Depot } from '../types';
import { Card } from './Card';

interface MapCanvasProps {
  routes: Route[];
  depot: Depot;
  showLabels?: boolean;
  showRouteNumbers?: boolean;
  highlightedNodes?: string[];
}

export function MapCanvas({
  routes,
  depot,
  showLabels = true,
  showRouteNumbers = true,
  highlightedNodes = [],
}: MapCanvasProps) {

  // Collect all coordinates to auto-fit bounds
  const allPoints: [number, number][] = [
    [depot.lat, depot.lon],
    ...routes.flatMap(r => r.stops.map(s => [s.lat, s.lon] as [number, number]))
  ];

  return (
    <Card
      className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center"
      padding="none" // ensure no padding from the Card component
    >
      <MapContainer
        bounds={allPoints}
        className="w-full h-full rounded-lg"
        scrollWheelZoom
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Routes */}
        {routes.map(route => (
          <Polyline
            key={route.id}
            positions={route.stops.map(s => [s.lat, s.lon])}
            pathOptions={{
              color: route.color,
              weight: 4,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Depot */}
        <CircleMarker
          center={[depot.lat, depot.lon]}
          radius={8}
          pathOptions={{
            color: '#fff',
            fillColor: '#DC2626',
            fillOpacity: 1,
            weight: 2,
          }}
        >
          {showLabels && <Tooltip permanent direction="top">Depot</Tooltip>}
        </CircleMarker>

        {/* Stops */}
        {routes.map(route =>
          route.stops.slice(1).map((stop, idx) => {
            const isHighlighted = highlightedNodes.includes(stop.nodeId);

            return (
              <CircleMarker
                key={`${route.id}-${stop.nodeId}`}
                center={[stop.lat, stop.lon]}
                radius={isHighlighted ? 7 : 5}
                pathOptions={{
                  color: '#fff',
                  fillColor: route.color,
                  fillOpacity: 1,
                  weight: isHighlighted ? 3 : 1,
                }}
              >
                {showLabels && (
                  <Tooltip direction="top" offset={[0, -5]} permanent>
                    {stop.nodeName}
                  </Tooltip>
                )}

                {showRouteNumbers && (
                  <Tooltip direction="center" permanent>
                    {idx + 1}
                  </Tooltip>
                )}
              </CircleMarker>
            );
          })
        )}
      </MapContainer>
    </Card>
  );
}
