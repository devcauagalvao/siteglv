import { useLayoutEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import useAutoPerformanceMode from '../hooks/useAutoPerformanceMode';

type WorldMapProps = {
    className?: string;
};

export default function WorldMap({ className }: WorldMapProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const { enabled: performanceMode } = useAutoPerformanceMode();
    const performanceModeRef = useRef(performanceMode);
    performanceModeRef.current = performanceMode;

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        let disposed = false;
        let resizeObserver: ResizeObserver | null = null;
        let stopAnimations: null | (() => void) = null;
        let isInView = true;
        let tryStartAnimations: null | (() => void) = null;

        const updateAnimationRunningState = () => {
            const shouldRun = isInView && document.visibilityState !== 'hidden';
            if (!shouldRun) {
                try { stopAnimations?.(); } catch { }
                stopAnimations = null;
                return;
            }
            tryStartAnimations?.();
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                isInView = entry.isIntersecting;
                updateAnimationRunningState();
            },
            { threshold: 0.01 }
        );
        io.observe(container);

        const onVis = () => updateAnimationRunningState();
        document.addEventListener('visibilitychange', onVis);

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
                        filter: ['all', ['!=', 'name', 'Ireland'], ['!=', 'name', 'Mumbai']],
                        paint: {
                            'circle-radius': 4,
                            'circle-color': '#ffffff',
                            'circle-opacity': 0.9,
                            'circle-stroke-color': '#ffffff',
                            'circle-stroke-width': 1,
                        },
                    });

                    // Retângulo branco atrás do texto (sem borda)
                    if (!map.hasImage('label-bg')) {
                        const canvas = document.createElement('canvas');
                        // maior resolução para evitar borrões nas bordas ao escalar
                        canvas.width = 64;
                        canvas.height = 64;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                            map.addImage('label-bg', imageData, { pixelRatio: 1 });
                        }
                    }

                    map.addLayer({
                        id: 'aws-regions-labels-bg',
                        type: 'symbol',
                        source: 'aws-regions',
                        filter: ['all', ['!=', 'name', 'Ireland'], ['!=', 'name', 'Mumbai']],
                        layout: {
                            'text-field': ['get', 'name'],
                            'text-size': 12,
                            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
                            'text-anchor': 'center',
                            'text-offset': [
                                'case',
                                ['any',
                                    ['==', ['get', 'name'], 'São Paulo'],
                                    ['==', ['get', 'name'], 'Sydney'],
                                ],
                                ['literal', [0, 1.2]],
                                ['literal', [0, -1.6]],
                            ],
                            'text-allow-overlap': true,
                            'text-ignore-placement': true,
                            'icon-image': 'label-bg',
                            'icon-anchor': 'center',
                            'icon-allow-overlap': true,
                            'icon-ignore-placement': true,
                            'icon-text-fit': 'both',
                            'icon-text-fit-padding': [2, 6, 2, 6],
                        },
                        paint: {
                            'text-opacity': 0,
                            'icon-opacity': 1,
                        },
                    });

                    map.addLayer({
                        id: 'aws-regions-labels',
                        type: 'symbol',
                        source: 'aws-regions',
                        filter: ['all', ['!=', 'name', 'Ireland'], ['!=', 'name', 'Mumbai']],
                        layout: {
                            'text-field': ['get', 'name'],
                            'text-size': 12,
                            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
                            'text-anchor': 'center',
                            'text-offset': [
                                'case',
                                ['any',
                                    ['==', ['get', 'name'], 'São Paulo'],
                                    ['==', ['get', 'name'], 'Sydney'],
                                ],
                                ['literal', [0, 1.2]],
                                ['literal', [0, -1.6]],
                            ],
                            'text-allow-overlap': true,
                            'text-ignore-placement': true,
                        },
                        paint: {
                            'text-color': '#000000',
                            'text-halo-width': 0,
                        },
                    });

                    type LngLat = [number, number];
                    const ROUTE_ORDER: string[] = [
                        'São Paulo',
                        'N. Virginia',
                        'Oregon',
                        'Frankfurt',
                        'Bahrain',
                        'Singapore',
                        'Tokyo',
                        'Sydney',
                        'São Paulo',
                    ];

                    const degToRad = (d: number) => (d * Math.PI) / 180;
                    const radToDeg = (r: number) => (r * 180) / Math.PI;

                    // 0 = linha quase reta (2D), 1 = curvatura total great-circle
                    const GREAT_CIRCLE_CURVATURE = 0.50;

                    // Interpolação geodésica (grande círculo) para dar “curvatura” de globo.
                    const interpolateGreatCircle = (a: LngLat, b: LngLat, steps: number): LngLat[] => {
                        const safeSteps = Math.max(2, steps);
                        const [lon1d, lat1d] = a;
                        const [lon2d, lat2d] = b;

                        const lon1 = degToRad(lon1d);
                        const lat1 = degToRad(lat1d);
                        const lon2 = degToRad(lon2d);
                        const lat2 = degToRad(lat2d);

                        const sinLat1 = Math.sin(lat1);
                        const cosLat1 = Math.cos(lat1);
                        const sinLat2 = Math.sin(lat2);
                        const cosLat2 = Math.cos(lat2);
                        const dLon = lon2 - lon1;

                        const cosD = sinLat1 * sinLat2 + cosLat1 * cosLat2 * Math.cos(dLon);
                        const d = Math.acos(Math.max(-1, Math.min(1, cosD)));
                        if (!Number.isFinite(d) || d === 0) return [a, b];

                        const sinD = Math.sin(d);
                        const pts: LngLat[] = [];
                        for (let i = 0; i < safeSteps; i++) {
                            const f = i / (safeSteps - 1);
                            const A = Math.sin((1 - f) * d) / sinD;
                            const B = Math.sin(f * d) / sinD;

                            const x = A * cosLat1 * Math.cos(lon1) + B * cosLat2 * Math.cos(lon2);
                            const y = A * cosLat1 * Math.sin(lon1) + B * cosLat2 * Math.sin(lon2);
                            const z = A * sinLat1 + B * sinLat2;

                            const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
                            const lon = Math.atan2(y, x);
                            let lonDeg = radToDeg(lon);
                            let latDeg = radToDeg(lat);

                            // normaliza
                            if (lonDeg > 180) lonDeg -= 360;
                            if (lonDeg < -180) lonDeg += 360;
                            if (latDeg > 90) latDeg = 90;
                            if (latDeg < -90) latDeg = -90;
                            pts.push([lonDeg, latDeg]);
                        }
                        return pts;
                    };

                    // Interpolação linear em lon/lat usando o menor deslocamento longitudinal.
                    const interpolateLinearShortest = (a: LngLat, b: LngLat, steps: number): LngLat[] => {
                        const safeSteps = Math.max(2, steps);
                        const [lon1, lat1] = a;
                        let lon2 = b[0];
                        const lat2 = b[1];

                        let dLon = lon2 - lon1;
                        if (dLon > 180) lon2 -= 360;
                        else if (dLon < -180) lon2 += 360;
                        dLon = lon2 - lon1;

                        const dLat = lat2 - lat1;
                        const pts: LngLat[] = [];
                        for (let i = 0; i < safeSteps; i++) {
                            const t = i / (safeSteps - 1);
                            let lon = lon1 + dLon * t;
                            const lat = lat1 + dLat * t;
                            if (lon > 180) lon -= 360;
                            if (lon < -180) lon += 360;
                            pts.push([lon, Math.max(-90, Math.min(90, lat))]);
                        }
                        return pts;
                    };

                    // “Suaviza” a curvatura do great-circle, misturando com uma linha mais reta.
                    const interpolateSoftGreatCircle = (a: LngLat, b: LngLat, steps: number): LngLat[] => {
                        const gc = interpolateGreatCircle(a, b, steps);
                        const lin = interpolateLinearShortest(a, b, steps);
                        const alpha = Math.max(0, Math.min(1, GREAT_CIRCLE_CURVATURE));

                        const out: LngLat[] = [];
                        const n = Math.min(gc.length, lin.length);
                        for (let i = 0; i < n; i++) {
                            const [lonG, latG] = gc[i];
                            const [lonL, latL] = lin[i];
                            let lon = lonL + (lonG - lonL) * alpha;
                            const lat = latL + (latG - latL) * alpha;
                            if (lon > 180) lon -= 360;
                            if (lon < -180) lon += 360;
                            out.push([lon, Math.max(-90, Math.min(90, lat))]);
                        }
                        return out.length >= 2 ? out : [a, b];
                    };

                    const splitAtAntimeridian = (points: LngLat[]): LngLat[][] => {
                        if (points.length < 2) return [points];
                        const lines: LngLat[][] = [[points[0]]];

                        for (let i = 1; i < points.length; i++) {
                            const [lon1, lat1] = points[i - 1];
                            const [lon2, lat2] = points[i];
                            const dLon = lon2 - lon1;

                            // cruzou o dateline quando o salto é grande (ex.: 179 -> -179)
                            if (Math.abs(dLon) > 180) {
                                // “desembrulha” para achar interseção em ±180
                                const lon2u = dLon > 0 ? lon2 - 360 : lon2 + 360;
                                const crossingLon = lon1 > 0 ? 180 : -180;
                                const denom = lon2u - lon1;
                                const t = denom === 0 ? 0.5 : (crossingLon - lon1) / denom;
                                const latCross = lat1 + (lat2 - lat1) * t;

                                // fecha linha atual no limite
                                lines[lines.length - 1].push([crossingLon, latCross]);
                                // abre nova linha do outro lado
                                const otherSideLon = crossingLon === 180 ? -180 : 180;
                                lines.push([[otherSideLon, latCross], [lon2, lat2]]);
                                continue;
                            }

                            lines[lines.length - 1].push([lon2, lat2]);
                        }

                        return lines;
                    };

                    // Arco suave em lon/lat (2D) para forçar direção na tela (ex.: ir “pra esquerda”)
                    // Usado apenas quando a rota desejada não deve atravessar o dateline.
                    const interpolateScreenArc = (
                        a: LngLat,
                        b: LngLat,
                        steps: number,
                        prefer: 'left' | 'right',
                        bend: 'auto' | 'up' | 'down' = 'auto'
                    ): LngLat[] => {
                        const safeSteps = Math.max(2, steps);
                        const [lon1, lat1] = a;
                        let lon2 = b[0];
                        const lat2 = b[1];

                        if (prefer === 'left' && lon2 > lon1) lon2 -= 360;
                        if (prefer === 'right' && lon2 < lon1) lon2 += 360;

                        const dLon = lon2 - lon1;
                        const dLat = lat2 - lat1;
                        const dist = Math.sqrt(dLon * dLon + dLat * dLat);
                        const autoSign = lat1 + lat2 >= 0 ? 1 : -1;
                        const sign = bend === 'up' ? 1 : bend === 'down' ? -1 : autoSign;
                        const amp = sign * Math.min(22, Math.max(8, dist * 0.12));

                        const pts: LngLat[] = [];
                        for (let i = 0; i < safeSteps; i++) {
                            const t = i / (safeSteps - 1);
                            let lon = lon1 + dLon * t;
                            const lat = (lat1 + dLat * t) + amp * Math.sin(Math.PI * t);
                            // normaliza para [-180, 180] sem criar salto (este caso não cruza dateline)
                            if (lon > 180) lon -= 360;
                            if (lon < -180) lon += 360;
                            pts.push([lon, Math.max(-90, Math.min(90, lat))]);
                        }
                        return pts;
                    };

                    const appendLinePart = (lines: LngLat[][], part: LngLat[]) => {
                        if (part.length === 0) return;
                        if (lines.length === 0) {
                            lines.push([...part]);
                            return;
                        }
                        const lastLine = lines[lines.length - 1];
                        const last = lastLine[lastLine.length - 1];
                        const first = part[0];
                        if (last && first && last[0] === first[0] && last[1] === first[1]) {
                            lastLine.push(...part.slice(1));
                        } else {
                            lines.push([...part]);
                        }
                    };

                    const startRouteAnimation = async () => {
                        const resp = await fetch('/maps/aws-regions.geojson');
                        if (!resp.ok) return;
                        const geo = await resp.json();
                        if (disposed) return;

                        const byName = new Map<string, LngLat>();
                        for (const f of geo?.features ?? []) {
                            const name = f?.properties?.name;
                            const coords = f?.geometry?.coordinates;
                            if (typeof name === 'string' && Array.isArray(coords) && coords.length >= 2) {
                                const lon = Number(coords[0]);
                                const lat = Number(coords[1]);
                                if (Number.isFinite(lon) && Number.isFinite(lat)) byName.set(name, [lon, lat]);
                            }
                        }

                        const routePoints: LngLat[] = [];
                        for (const name of ROUTE_ORDER) {
                            const p = byName.get(name);
                            if (!p) return;
                            routePoints.push(p);
                        }

                        const segments: LngLat[][] = [];
                        for (let i = 0; i < routePoints.length - 1; i++) {
                            const fromName = ROUTE_ORDER[i];
                            const toName = ROUTE_ORDER[i + 1];
                            const a = routePoints[i];
                            const b = routePoints[i + 1];

                            // Pedido específico: Sydney -> São Paulo sempre “pra esquerda” (sem dar a volta)
                            if (fromName === 'Sydney' && toName === 'São Paulo') {
                                // e curvando para cima
                                segments.push(interpolateScreenArc(a, b, 120, 'left', 'up'));
                                continue;
                            }

                            segments.push(interpolateSoftGreatCircle(a, b, 90));
                        }

                        // Linha completa (estática) no final da animação
                        const fullLines: LngLat[][] = [[segments[0][0]]];
                        for (let s = 0; s < segments.length; s++) {
                            const parts = splitAtAntimeridian(segments[s]);
                            for (const part of parts) appendLinePart(fullLines, part);
                        }

                        const haversineKm = (p1: LngLat, p2: LngLat) => {
                            const R = 6371;
                            const toRad = (d: number) => (d * Math.PI) / 180;
                            const [lon1, lat1] = p1;
                            const [lon2, lat2] = p2;
                            const dLat = toRad(lat2 - lat1);
                            const dLon = toRad(lon2 - lon1);
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            return R * c;
                        };


                        if (!map.getSource('aws-route')) {
                            map.addSource('aws-route', {
                                type: 'geojson',
                                data: {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: { type: 'MultiLineString', coordinates: [[routePoints[0]]] },
                                },
                            });

                            map.addLayer({
                                id: 'aws-route-line',
                                type: 'line',
                                source: 'aws-route',
                                layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                },
                                paint: {
                                    'line-color': '#ffffff',
                                    'line-opacity': 0.55,
                                    'line-width': 2,
                                },
                            });
                        }

                        const routeSource = map.getSource('aws-route') as maplibregl.GeoJSONSource;

                        const durationPerSegmentMs = 900;
                        const totalSegments = segments.length;
                        const totalMs = durationPerSegmentMs * totalSegments;

                        let routeRaf = 0;
                        let dotsRaf = 0;

                        // Dots (bolinhas) seguindo a rota
                        const ensureDotsLayer = () => {
                            if (!map.getSource('aws-route-dots')) {
                                map.addSource('aws-route-dots', {
                                    type: 'geojson',
                                    data: {
                                        type: 'FeatureCollection',
                                        features: [],
                                    },
                                });

                                map.addLayer({
                                    id: 'aws-route-dots',
                                    type: 'circle',
                                    source: 'aws-route-dots',
                                    paint: {
                                        'circle-radius': 4,
                                        'circle-color': '#ffffff',
                                        'circle-opacity': 0.85,
                                    },
                                });
                            }
                        };

                        const startDots = () => {
                            ensureDotsLayer();
                            const dotsSource = map.getSource('aws-route-dots') as maplibregl.GeoJSONSource;

                            // 2 bolinhas saindo de cada cidade (por trecho). Ao chegar no destino do trecho,
                            // reinicia e “saem mais 2” novamente daquele mesmo trecho.
                            const DOTS_PER_SEGMENT = 2;
                            const DOT_TRAVEL_MS = 1800;
                            const DOT_SPACING_T = 0.12; // segunda bolinha um pouco atrás

                            const segmentCumulativeKm: number[][] = segments.map((seg) => {
                                const cum: number[] = [0];
                                for (let i = 1; i < seg.length; i++) {
                                    cum[i] = cum[i - 1] + haversineKm(seg[i - 1], seg[i]);
                                }
                                return cum;
                            });

                            const pointOnSegmentByT = (segIndex: number, t01: number): LngLat => {
                                const seg = segments[segIndex];
                                const cum = segmentCumulativeKm[segIndex];
                                const segLen = cum[cum.length - 1] || 1;
                                const dist = Math.max(0, Math.min(1, t01)) * segLen;

                                let lo = 0;
                                let hi = cum.length - 1;
                                while (lo < hi) {
                                    const mid = Math.floor((lo + hi) / 2);
                                    if (cum[mid] < dist) lo = mid + 1;
                                    else hi = mid;
                                }

                                const i1 = Math.max(1, lo);
                                const i0 = i1 - 1;
                                const d0 = cum[i0];
                                const d1 = cum[i1];
                                const localT = d1 - d0 <= 0 ? 0 : (dist - d0) / (d1 - d0);
                                const [lon0, lat0] = seg[i0];
                                const [lon1, lat1] = seg[i1];
                                const lon = lon0 + (lon1 - lon0) * localT;
                                const lat = lat0 + (lat1 - lat0) * localT;
                                return [lon, lat];
                            };

                            const dotsStart = performance.now();

                            const tickDots = (now: number) => {
                                if (disposed) return;

                                const baseT = ((now - dotsStart) % DOT_TRAVEL_MS) / DOT_TRAVEL_MS;
                                const features: any[] = [];

                                for (let segIndex = 0; segIndex < segments.length; segIndex++) {
                                    for (let i = 0; i < DOTS_PER_SEGMENT; i++) {
                                        let t = baseT - i * DOT_SPACING_T;
                                        if (t < 0) t += 1;
                                        const p = pointOnSegmentByT(segIndex, t);
                                        features.push({
                                            type: 'Feature',
                                            properties: {},
                                            geometry: { type: 'Point', coordinates: p },
                                        });
                                    }
                                }

                                try {
                                    dotsSource.setData({
                                        type: 'FeatureCollection',
                                        features,
                                    } as any);
                                } catch {
                                    // ignore
                                }

                                dotsRaf = requestAnimationFrame(tickDots);
                            };

                            dotsRaf = requestAnimationFrame(tickDots);
                        };

                        // Animação da linha (uma vez) e depois para
                        const startTime = performance.now();
                        const tickRoute = (now: number) => {
                            if (disposed) return;
                            const elapsed = now - startTime;
                            const clamped = Math.max(0, Math.min(totalMs, elapsed));
                            const segIndex = Math.min(totalSegments - 1, Math.floor(clamped / durationPerSegmentMs));
                            const segT = (clamped - segIndex * durationPerSegmentMs) / durationPerSegmentMs;

                            const lines: LngLat[][] = [[segments[0][0]]];

                            for (let s = 0; s < segIndex; s++) {
                                const parts = splitAtAntimeridian(segments[s]);
                                for (const part of parts) appendLinePart(lines, part);
                            }

                            const currentSeg = segments[segIndex];
                            const take = Math.max(2, Math.floor(segT * (currentSeg.length - 1)) + 1);
                            const partial = currentSeg.slice(0, take);
                            const partialParts = splitAtAntimeridian(partial);
                            for (const part of partialParts) appendLinePart(lines, part);

                            try {
                                routeSource.setData({
                                    type: 'Feature',
                                    properties: {},
                                    geometry: { type: 'MultiLineString', coordinates: lines },
                                } as any);
                            } catch {
                                // ignore
                            }

                            if (elapsed >= totalMs) {
                                // garante linha completa e para
                                try {
                                    routeSource.setData({
                                        type: 'Feature',
                                        properties: {},
                                        geometry: { type: 'MultiLineString', coordinates: fullLines },
                                    } as any);
                                } catch {
                                    // ignore
                                }

                                // Dots são o loop contínuo mais pesado — desliga em modo performance
                                if (!performanceModeRef.current) startDots();
                                return;
                            }

                            routeRaf = requestAnimationFrame(tickRoute);
                        };

                        routeRaf = requestAnimationFrame(tickRoute);

                        return () => {
                            try { cancelAnimationFrame(routeRaf); } catch { }
                            try { cancelAnimationFrame(dotsRaf); } catch { }
                        };
                    };

                    // inicia/retoma (sem bloquear o load do mapa)
                    tryStartAnimations = () => {
                        if (disposed) return;
                        if (stopAnimations) return;
                        void (async () => {
                            const stop = await startRouteAnimation();
                            if (typeof stop === 'function') stopAnimations = stop;
                        })();
                    };

                    updateAnimationRunningState();
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
            try { stopAnimations?.(); } catch { }
            stopAnimations = null;
            try { document.removeEventListener('visibilitychange', onVis); } catch { }
            try { io.disconnect(); } catch { }
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
