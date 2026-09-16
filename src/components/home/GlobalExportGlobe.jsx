import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Plane, Ship, ShieldCheck, ArrowRight, 
  MapPin, CheckCircle2, Sparkles, Navigation, Layers
} from 'lucide-react';
import { countryServices } from '../../data/countryServicesData';

export default function GlobalExportGlobe() {
  const canvasRef = useRef(null);
  const [selectedHub, setSelectedHub] = useState(0);
  const [activeRegion, setActiveRegion] = useState('all');
  const [isRotating, setIsRotating] = useState(true);
  const rotationRef = useRef({ yaw: 0.8, pitch: 0.3 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Sialkot HQ Coordinates
  const SIALKOT = { name: 'Sialkot HQ', lat: 32.49, lon: 74.52, isHQ: true };

  // Major Global Export Hubs with geographic coordinates
  const exportHubs = [
    {
      id: 'us-nyc',
      name: 'New York & East Coast',
      country: 'USA',
      flag: '🇺🇸',
      lat: 40.71,
      lon: -74.0,
      region: 'na',
      slug: 'sports-wear-manufacturer-us',
      volume: '65,000+ Units/Yr',
      airTransit: '4-6 Days (DHL / FedEx)',
      seaTransit: '18-22 Days (Port of NY/NJ)',
      primaryLines: '7v7 Football, Baseball Jerseys & Heavy French Terry Hoodies',
      clientRating: '4.98 / 5.0 (180+ Brands)'
    },
    {
      id: 'us-la',
      name: 'Los Angeles & West Coast',
      country: 'USA',
      flag: '🇺🇸',
      lat: 34.05,
      lon: -118.24,
      region: 'na',
      slug: 'sports-wear-manufacturer-us',
      volume: '45,000+ Units/Yr',
      airTransit: '4-6 Days Express',
      seaTransit: '16-20 Days (Port of Long Beach)',
      primaryLines: 'Basketball Uniforms, Seamless Gymwear & Combat Gear',
      clientRating: '4.95 / 5.0'
    },
    {
      id: 'uk-london',
      name: 'London & Midlands',
      country: 'United Kingdom',
      flag: '🇬🇧',
      lat: 51.5,
      lon: -0.12,
      region: 'eu',
      slug: 'sports-wear-manufacturer-uk',
      volume: '55,000+ Units/Yr',
      airTransit: '3-5 Days (LHR Cargo)',
      seaTransit: '20-24 Days (Felixstowe)',
      primaryLines: 'Football Club Match Kits, Rugby Uniforms & Tracksuits',
      clientRating: '4.97 / 5.0 (140+ Clubs)'
    },
    {
      id: 'de-frankfurt',
      name: 'Frankfurt & Munich',
      country: 'Germany',
      flag: '🇩🇪',
      lat: 50.11,
      lon: 8.68,
      region: 'eu',
      slug: 'sports-wear-manufacturer-germany',
      volume: '38,000+ Units/Yr',
      airTransit: '3-5 Days Direct',
      seaTransit: '22-26 Days (Hamburg)',
      primaryLines: 'Handball Kits, Aero Cycling Suits & Running Singlets',
      clientRating: '4.99 / 5.0 (OEKO-TEX Certified)'
    },
    {
      id: 'au-sydney',
      name: 'Sydney & Melbourne',
      country: 'Australia',
      flag: '🇦🇺',
      lat: -33.86,
      lon: 151.2,
      region: 'apac',
      slug: 'sports-wear-manufacturer-australia',
      volume: '42,000+ Units/Yr',
      airTransit: '5-7 Days (Qantas Air)',
      seaTransit: '18-24 Days (Port Botany)',
      primaryLines: 'AFL Guernseys, Netball Dresses & UPF 50+ Rashguards',
      clientRating: '4.96 / 5.0'
    },
    {
      id: 'ca-toronto',
      name: 'Toronto & Montreal',
      country: 'Canada',
      flag: '🇨🇦',
      lat: 43.65,
      lon: -79.38,
      region: 'na',
      slug: 'sports-wear-manufacturer-canada',
      volume: '32,000+ Units/Yr',
      airTransit: '4-6 Days (Air Canada)',
      seaTransit: '20-25 Days (Montreal)',
      primaryLines: 'Pro Air-Knit Hockey Sweaters & Winter Thermal Tops',
      clientRating: '4.94 / 5.0'
    },
    {
      id: 'uae-dubai',
      name: 'Dubai & Abu Dhabi',
      country: 'UAE & GCC',
      flag: '🇦🇪',
      lat: 25.2,
      lon: 55.27,
      region: 'me',
      slug: 'sports-wear-manufacturer-uae',
      volume: '48,000+ Units/Yr',
      airTransit: '2-4 Days (Emirates SkyCargo)',
      seaTransit: '8-12 Days (Jebel Ali Port)',
      primaryLines: 'Padel Sportswear, Soccer Academy Kits & Boxing Gloves',
      clientRating: '4.98 / 5.0'
    },
    {
      id: 'fr-paris',
      name: 'Paris & Lyon',
      country: 'France',
      flag: '🇫🇷',
      lat: 48.85,
      lon: 2.35,
      region: 'eu',
      slug: 'sports-wear-manufacturer-france',
      volume: '28,000+ Units/Yr',
      airTransit: '3-5 Days Express',
      seaTransit: '20-24 Days (Le Havre)',
      primaryLines: 'Rugby Jerseys, Trail Running Gear & Combed Cotton Athleisure',
      clientRating: '4.93 / 5.0'
    },
    {
      id: 'nl-amsterdam',
      name: 'Amsterdam & Rotterdam',
      country: 'Netherlands',
      flag: '🇳🇱',
      lat: 52.37,
      lon: 4.89,
      region: 'eu',
      slug: 'sports-wear-manufacturer-netherlands',
      volume: '26,000+ Units/Yr',
      airTransit: '3-5 Days (Schiphol)',
      seaTransit: '20-22 Days (Rotterdam)',
      primaryLines: 'Recycled Poly Field Hockey Kits & Speed Skating Suits',
      clientRating: '4.95 / 5.0'
    }
  ];

  // Filter hubs
  const filteredHubs = activeRegion === 'all' 
    ? exportHubs 
    : exportHubs.filter(h => h.region === activeRegion);

  // Convert Lat/Lon to 3D Cartesian coords on unit sphere
  const toCartesian = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    return { x, y, z };
  };

  // Rotate 3D point based on yaw & pitch
  const rotatePoint = (p, yaw, pitch) => {
    // Rotate around Y axis (yaw)
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const x1 = p.x * cosY + p.z * sinY;
    const y1 = p.y;
    const z1 = -p.x * sinY + p.z * cosY;

    // Rotate around X axis (pitch)
    const cosX = Math.cos(pitch);
    const sinX = Math.sin(pitch);
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    return { x: x2, y: y2, z: z2 };
  };

  // Canvas 3D Globe Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Pre-calculate sample land dots distributed on the sphere
    const dotsCount = 450;
    const sphereDots = [];
    for (let i = 0; i < dotsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random());
      const sinPhi = Math.sin(phi);
      sphereDots.push({
        x: Math.sin(theta) * sinPhi,
        y: Math.cos(phi),
        z: Math.cos(theta) * sinPhi
      });
    }

    let arcProgress = 0;

    const render = () => {
      // Auto-rotation if not interacting
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.yaw += 0.004;
      }
      arcProgress = (arcProgress + 0.012) % 1;

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Globe Ambient Shadow & Outer Atmosphere Glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius * 1.25
      );
      glowGradient.addColorStop(0, 'rgba(255, 117, 31, 0.12)');
      glowGradient.addColorStop(0.6, 'rgba(255, 117, 31, 0.03)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill (Dark Luxury Obsidian with Warm Tint)
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
        centerX, centerY, radius
      );
      sphereGradient.addColorStop(0, '#2D2825');
      sphereGradient.addColorStop(0.7, '#1A1817');
      sphereGradient.addColorStop(1, '#0E0D0C');

      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Globe Border Ring
      ctx.strokeStyle = 'rgba(255, 117, 31, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Latitude / Longitude Grid Rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // Draw latitude circles
      [-45, 0, 45].forEach((latDeg) => {
        const phi = (90 - latDeg) * (Math.PI / 180);
        const yBase = Math.cos(phi);
        const rRing = Math.sin(phi);

        ctx.beginPath();
        for (let a = 0; a <= 360; a += 15) {
          const rad = (a * Math.PI) / 180;
          const p = { x: Math.cos(rad) * rRing, y: yBase, z: Math.sin(rad) * rRing };
          const rot = rotatePoint(p, rotationRef.current.yaw, rotationRef.current.pitch);
          if (rot.z > 0) {
            const screenX = centerX + rot.x * radius;
            const screenY = centerY - rot.y * radius;
            if (a === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      });

      // 5. Draw Decorative Landmass Points on Sphere
      sphereDots.forEach((dot) => {
        const rot = rotatePoint(dot, rotationRef.current.yaw, rotationRef.current.pitch);
        if (rot.z > 0) {
          const screenX = centerX + rot.x * radius;
          const screenY = centerY - rot.y * radius;
          const alpha = (rot.z * 0.45).toFixed(2);
          ctx.fillStyle = `rgba(229, 223, 213, ${alpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw Export Trajectory Flight Arcs from Sialkot to Hubs
      const sialkot3D = toCartesian(SIALKOT.lat, SIALKOT.lon);
      const sialkotRot = rotatePoint(sialkot3D, rotationRef.current.yaw, rotationRef.current.pitch);

      exportHubs.forEach((hub, hIdx) => {
        const hub3D = toCartesian(hub.lat, hub.lon);
        const hubRot = rotatePoint(hub3D, rotationRef.current.yaw, rotationRef.current.pitch);

        // If either Sialkot or the hub is on the visible front hemisphere
        if (sialkotRot.z > -0.2 || hubRot.z > -0.2) {
          const isCurrentSelected = selectedHub === hIdx;

          // Draw great-circle arc interpolation
          ctx.beginPath();
          const arcSegments = 24;
          for (let s = 0; s <= arcSegments; s++) {
            const t = s / arcSegments;
            // Interpolate vector on sphere
            const ix = sialkot3D.x * (1 - t) + hub3D.x * t;
            const iy = sialkot3D.y * (1 - t) + hub3D.y * t;
            const iz = sialkot3D.z * (1 - t) + hub3D.z * t;
            const mag = Math.sqrt(ix * ix + iy * iy + iz * iz);

            // Loft the arc outwards above sphere surface
            const loft = 1.0 + Math.sin(t * Math.PI) * 0.18;
            const pLoft = {
              x: (ix / mag) * loft,
              y: (iy / mag) * loft,
              z: (iz / mag) * loft
            };

            const pRot = rotatePoint(pLoft, rotationRef.current.yaw, rotationRef.current.pitch);
            if (pRot.z > -0.1) {
              const sx = centerX + pRot.x * radius;
              const sy = centerY - pRot.y * radius;
              if (s === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
          }

          ctx.strokeStyle = isCurrentSelected 
            ? 'rgba(255, 117, 31, 0.9)' 
            : 'rgba(255, 117, 31, 0.35)';
          ctx.lineWidth = isCurrentSelected ? 2.5 : 1.2;
          ctx.setLineDash(isCurrentSelected ? [4, 4] : [2, 6]);
          ctx.stroke();
          ctx.setLineDash([]); // Reset dash

          // Glowing animated packet traveling along the arc
          const tP = (arcProgress + hIdx * 0.15) % 1;
          const ix = sialkot3D.x * (1 - tP) + hub3D.x * tP;
          const iy = sialkot3D.y * (1 - tP) + hub3D.y * tP;
          const iz = sialkot3D.z * (1 - tP) + hub3D.z * tP;
          const mag = Math.sqrt(ix * ix + iy * iy + iz * iz);
          const loft = 1.0 + Math.sin(tP * Math.PI) * 0.18;
          const packet3D = {
            x: (ix / mag) * loft,
            y: (iy / mag) * loft,
            z: (iz / mag) * loft
          };
          const packetRot = rotatePoint(packet3D, rotationRef.current.yaw, rotationRef.current.pitch);

          if (packetRot.z > 0) {
            const px = centerX + packetRot.x * radius;
            const py = centerY - packetRot.y * radius;
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#FF751F';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(px, py, isCurrentSelected ? 3.5 : 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      // 7. Draw Destination Hotspots / Pins
      exportHubs.forEach((hub, hIdx) => {
        const hub3D = toCartesian(hub.lat, hub.lon);
        const hubRot = rotatePoint(hub3D, rotationRef.current.yaw, rotationRef.current.pitch);

        if (hubRot.z > 0.05) {
          const hx = centerX + hubRot.x * radius;
          const hy = centerY - hubRot.y * radius;
          const isCurrent = selectedHub === hIdx;

          // Hotspot pulsing ring
          if (isCurrent) {
            ctx.strokeStyle = 'rgba(255, 117, 31, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(hx, hy, 12, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Hotspot solid center
          ctx.fillStyle = isCurrent ? '#FF751F' : '#FFFFFF';
          ctx.beginPath();
          ctx.arc(hx, hy, isCurrent ? 5.5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isCurrent ? '#FFFFFF' : '#FF751F';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Text label for active or prominent hubs
          if (isCurrent || hubRot.z > 0.5) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillText(`${hub.flag} ${hub.country}`, hx + 8, hy - 4);
          }
        }
      });

      // 8. Draw Sialkot Factory Origin Hotspot (Radiating Gold/Orange Beacon)
      if (sialkotRot.z > 0) {
        const sx = centerX + sialkotRot.x * radius;
        const sy = centerY - sialkotRot.y * radius;

        // Radiating pulse ring
        ctx.strokeStyle = 'rgba(255, 117, 31, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FF751F';
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText('🏭 Hare Plant (Sialkot HQ)', sx + 12, sy + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedHub, activeRegion, isRotating]);

  // Mouse drag handlers for rotating the globe manually
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsRotating(false);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    rotationRef.current.yaw += deltaX * 0.008;
    rotationRef.current.pitch = Math.max(-0.8, Math.min(0.8, rotationRef.current.pitch + deltaY * 0.008));
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // When user clicks a hub card, rotate globe toward it
  const selectHub = (index) => {
    setSelectedHub(index);
    const targetHub = exportHubs[index];
    if (targetHub) {
      // Calculate yaw to bring destination into front view
      const targetYaw = -((targetHub.lon + 180) * (Math.PI / 180)) + Math.PI / 2;
      rotationRef.current.yaw = targetYaw;
      rotationRef.current.pitch = 0.2;
    }
  };

  const activeHubData = exportHubs[selectedHub] || exportHubs[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/20">
            <Globe className="w-3.5 h-3.5" />
            Global Export Footprint & Distribution
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] mt-2">
            Supplying 45+ International Sportswear Markets
          </h2>
          <p className="text-sm text-[#595856] mt-1 max-w-2xl">
            From our factory dry-port in Sialkot, Pakistan to commercial ports and doorsteps worldwide. Explore our active export corridors, transit lead times, and country hubs.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-white border border-[#E5DFD5] shadow-sm text-xs font-semibold">
          {[
            { id: 'all', label: 'All Regions' },
            { id: 'na', label: 'North America' },
            { id: 'eu', label: 'Europe' },
            { id: 'apac', label: 'Asia-Pacific' },
            { id: 'me', label: 'Middle East' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRegion === tab.id
                  ? 'bg-[#FF751F] text-white shadow-sm'
                  : 'text-[#595856] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: 3D Canvas Globe + Destination Tooltip Intel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3D Interactive Canvas Globe (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div 
            className="relative rounded-3xl overflow-hidden bg-[#161413] border border-black/40 p-4 shadow-2xl group cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Top Interactive Controls Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-cream-200 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#FF751F]" />
                <span>Drag to Rotate 3D Globe</span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRotating(!isRotating);
                }}
                className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#FF751F] hover:text-white"
              >
                {isRotating ? 'Pause Rotation' : 'Auto-Rotate'}
              </button>
            </div>

            {/* Sialkot Origin Indicator */}
            <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-ping"></span>
              <span>Sialkot Factory Origin</span>
            </div>

            {/* 3D Canvas */}
            <canvas
              ref={canvasRef}
              width={640}
              height={500}
              className="w-full h-[380px] sm:h-[460px] object-contain select-none"
            />

            {/* Bottom Quick Hubs Strip */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredHubs.map((hub, idx) => {
                const globalIndex = exportHubs.findIndex(h => h.id === hub.id);
                const isSelected = selectedHub === globalIndex;

                return (
                  <button
                    key={hub.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectHub(globalIndex);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                      isSelected
                        ? 'bg-[#FF751F] text-white border-[#FF751F] shadow-glow-orange scale-105'
                        : 'bg-black/60 backdrop-blur-md text-cream-200 border-white/10 hover:bg-black/80'
                    }`}
                  >
                    <span>{hub.flag}</span>
                    <span>{hub.country}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Rich Interactive Tooltip & Logistics Profile Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-lg space-y-6">
            
            {/* Header with National Flag and Region Name */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5DFD5]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeHubData.flag}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                    Verified Export Destination
                  </span>
                </div>
                <h3 className="text-2xl font-display font-black text-[#1A1A1A]">
                  {activeHubData.country}
                </h3>
                <p className="text-xs text-[#595856] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF751F]" />
                  <span>Key Entry Corridor: {activeHubData.name}</span>
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FF751F]/10 border border-[#FF751F]/20 text-[#FF751F] text-right">
                <span className="text-xs font-mono font-bold block">{activeHubData.volume}</span>
                <span className="text-[10px] text-[#8A847A] block">Annual Flow</span>
              </div>
            </div>

            {/* Freight Speed Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold text-[#8A847A] uppercase flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-[#FF751F]" />
                  Air Priority Express
                </span>
                <p className="font-display font-bold text-sm text-[#1A1A1A]">
                  {activeHubData.airTransit}
                </p>
                <span className="text-[10px] text-emerald-600 block">DDP Customs Cleared</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold text-[#8A847A] uppercase flex items-center gap-1">
                  <Ship className="w-3.5 h-3.5 text-[#FF751F]" />
                  Ocean LCL / FCL
                </span>
                <p className="font-display font-bold text-sm text-[#1A1A1A]">
                  {activeHubData.seaTransit}
                </p>
                <span className="text-[10px] text-[#595856] block">Lowest landed cost</span>
              </div>
            </div>

            {/* Primary Product Demands for this market */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#1A1A1A] uppercase tracking-wider block">
                Top Product Lines Exported to {activeHubData.country}:
              </span>
              <p className="text-[#595856] leading-relaxed p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                {activeHubData.primaryLines}
              </p>
            </div>

            {/* Client Rating Pill */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#595856]">Satisfaction Rating:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ★ {activeHubData.clientRating}
              </span>
            </div>

            {/* Direct Action Link to Country Page */}
            <div className="pt-2 border-t border-[#E5DFD5]">
              <Link
                to={`/${activeHubData.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#FF751F] hover:bg-[#E65E08] transition-all shadow-md shadow-[#FF751F]/20 hover:scale-[1.02]"
              >
                <span>Explore {activeHubData.country} Service Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
