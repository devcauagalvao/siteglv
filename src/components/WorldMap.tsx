import { useLayoutEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type WorldMapProps = {
    className?: string;
};

export default function WorldMap({ className }: WorldMapProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        let disposed = false;
        let resizeObserver: ResizeObserver | null = null;

        const initWhenSized = (attempt = 0) => {
            if (disposed) return;
            const rect = container.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) {
                if (attempt < 30) requestAnimationFrame(() => initWhenSized(attempt + 1));
                return;
            }

            const map = new maplibregl.Map({
                container,
                style: {
                    version: 8,
                    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
                    sources: {},
                    layers: [],
                },
                center: [0, 20],
                renderWorldCopies: false,
                interactive: false,
                attributionControl: false,
            });

            mapRef.current = map;

            map.once('load', () => {
                if (disposed) return;

                try {
                    map.addSource('countries', {
                        type: 'geojson',
                        data: '/maps/continents_clipped.geojson',
                    });

                    map.addLayer({
                        id: 'countries-fill',
                        type: 'fill',
                        source: 'countries',
                        paint: {
                            'fill-color': '#2563eb',
                            'fill-opacity': 0.35,
                        },
                    });

                    map.addLayer({
                        id: 'countries-outline',
                        type: 'line',
                        source: 'countries',
                        paint: {
                            'line-color': '#1e3a8a',
                            'line-width': 1,
                        },
                    });

                    map.fitBounds(
                        [
                            [-180, -58],
                            [180, 85],
                        ],
                        {
                            padding: { top: 30, bottom: 30, left: 20, right: 20 },
                            duration: 0,
                        }
                    );

                    map.addSource('aws-regions', {
                        type: 'geojson',
                        data: '/maps/aws-regions.geojson',
                    });

                    map.addLayer({
                        id: 'aws-regions-markers',
                        type: 'circle',
                        source: 'aws-regions',
                        paint: {
                            'circle-radius': 4,
                            'circle-color': '#ffffff',
                            'circle-opacity': 0.9,
                            'circle-stroke-color': '#ffffff',
                            'circle-stroke-width': 1,
                        },
                    });

                    map.addLayer({
                        id: 'aws-regions-labels',
                        type: 'symbol',
                        source: 'aws-regions',
                        layout: {
                            'text-field': ['get', 'name'],
                            'text-size': 12,
                            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
                            'text-anchor': 'center',
                            'text-offset': [0, -1.2],
                            'text-allow-overlap': true,
                            'text-ignore-placement': true,
                        },
                        paint: {
                            'text-color': '#ffffff',
                            'text-halo-color': '#000000',
                            'text-halo-width': 1,
                            'text-halo-blur': 0.5,
                        },
                    });
                } catch {
                    // se falhar, ainda tentamos ao menos mostrar o mapa base
                }

                // obrigatório quando não é fullscreen / quando layout muda
                requestAnimationFrame(() => {
                    try { map.resize(); } catch { }
                });

                // Resize futuro (ex.: grid/sticky, resize de janela) — protegido
                resizeObserver = new ResizeObserver(() => {
                    if (disposed) return;
                    const r = container.getBoundingClientRect();
                    if (r.width <= 0 || r.height <= 0) return;
                    try { map.resize(); } catch { }
                });
                resizeObserver.observe(container);
            });
        };

        initWhenSized();
        return () => {
            disposed = true;
            try { resizeObserver?.disconnect(); } catch { }
            resizeObserver = null;
            try { mapRef.current?.remove(); } catch { }
            mapRef.current = null;
        };
    }, []);

    return (
        <div className={className ?? 'w-full h-[500px] rounded-xl'}>
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}
