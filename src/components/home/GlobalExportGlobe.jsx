import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Globe, Plane, Ship, ShieldCheck, ArrowRight, 
  MapPin, CheckCircle2, Sparkles, Navigation, Package, Shirt
} from 'lucide-react';

export default function GlobalExportGlobe() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedHub, setSelectedHub] = useState(0);
  const [activeRegion, setActiveRegion] = useState('all');
  const [isRotating, setIsRotating] = useState(true);
  const [mascotBounce, setMascotBounce] = useState(false);
  const rotationRef = useRef({ yaw: 0.6, pitch: 0.25 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Sialkot HQ Coordinates (Factory Origin)
  const SIALKOT = { name: 'Sialkot HQ', lat: 32.49, lon: 74.52, isHQ: true };

  // Well-spaced, non-clustered global export destinations representing both Sportswear & Sports Goods
  const exportHubs = [
    {
      id: 'us',
      name: 'United States',
      country: 'USA',
      flag: '🇺🇸',
      lat: 39.50,
      lon: -98.35, // Centralized continental US coordinate
      region: 'na',
      slug: 'sports-wear-manufacturer-us',
      volume: '110,000+ Units/Yr',
      airTransit: '4-6 Days (DHL / FedEx Priority)',
      seaTransit: '18-22 Days (NY/NJ & Long Beach DDP)',
      sportswear: 'American Football & 7v7 Uniforms, Baseball Button-Downs, Heavy 460 GSM Hoodies',
      sportsGoods: 'Thermal-Bonded Soccer Match Balls, Cowhide Boxing Fight Gloves & BJJ Gis',
      clientRating: '4.98 / 5.0 (220+ US Brands)'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      country: 'United Kingdom',
      flag: '🇬🇧',
      lat: 53.5,
      lon: -2.0, // Central UK
      region: 'eu',
      slug: 'sports-wear-manufacturer-uk',
      volume: '65,000+ Units/Yr',
      airTransit: '3-5 Days (Heathrow Air Cargo)',
      seaTransit: '20-24 Days (Port of Felixstowe)',
      sportswear: 'FA-Compliant Football Club Match Kits, Pro Rugby Union/League Uniforms',
      sportsGoods: 'FIFA Quality Pro Match Balls, German Contact Latex Goalkeeper Gloves',
      clientRating: '4.97 / 5.0 (150+ Clubs)'
    },
    {
      id: 'ca',
      name: 'Canada',
      country: 'Canada',
      flag: '🇨🇦',
      lat: 53.0,
      lon: -95.0, // Central Canadian corridor
      region: 'na',
      slug: 'sports-wear-manufacturer-canada',
      volume: '38,000+ Units/Yr',
      airTransit: '4-6 Days (Air Canada Express)',
      seaTransit: '20-25 Days (Montreal & Vancouver)',
      sportswear: 'Pro 300 GSM Air-Knit Hockey Sweaters, Thermal Conditioning Tops & Tracksuits',
      sportsGoods: 'Waterproof 900D Heavy Sports Equipment Bags & Training Gear',
      clientRating: '4.95 / 5.0 (90+ Canadian Clubs)'
    },
    {
      id: 'au',
      name: 'Australia',
      country: 'Australia',
      flag: '🇦🇺',
      lat: -25.27,
      lon: 133.77, // Central Australia
      region: 'apac',
      slug: 'sports-wear-manufacturer-australia',
      volume: '45,000+ Units/Yr',
      airTransit: '5-7 Days (Qantas Freight Priority)',
      seaTransit: '18-24 Days (Melbourne & Sydney)',
      sportswear: 'AFL Footy Guernseys, Sublimated Netball Match Dresses & UPF 50+ Lycra Rashguards',
      sportsGoods: 'Hand-Stitched Cricket Leather Match Balls & Rugby Training Shields',
      clientRating: '4.96 / 5.0 (110+ Aussie Brands)'
    },
    {
      id: 'de',
      name: 'Germany',
      country: 'Germany',
      flag: '🇩🇪',
      lat: 51.16,
      lon: 10.45, // Central Germany
      region: 'eu',
      slug: 'sports-wear-manufacturer-germany',
      volume: '42,000+ Units/Yr',
      airTransit: '3-5 Days (Lufthansa Cargo Direct)',
      seaTransit: '22-26 Days (Port of Hamburg)',
      sportswear: 'Handball League Kits, Aerodynamic Cycling Skinsuits & Micro-Mesh Running Tees',
      sportsGoods: 'Official Size Handball Match Balls, Cut-Resistant Shin Guards & Agility Accessories',
      clientRating: '4.99 / 5.0 (OEKO-TEX Certified)'
    },
    {
      id: 'uae',
      name: 'UAE & Middle East',
      country: 'UAE & GCC',
      flag: '🇦🇪',
      lat: 24.2,
      lon: 54.5, // Arabian Gulf
      region: 'me',
      slug: 'sports-wear-manufacturer-uae',
      volume: '52,000+ Units/Yr',
      airTransit: '2-4 Days (Emirates SkyCargo Direct)',
      seaTransit: '8-12 Days (Port of Jebel Ali, Dubai)',
      sportswear: 'High-Heat Breathable Padel Polos, Football Academy Kits & Marathon Tees',
      sportsGoods: 'Padel Racket Thermal Bags, Leather Boxing Sparring Gloves & BJJ Ripstop Gis',
      clientRating: '4.98 / 5.0 (120+ GCC Partners)'
    },
    {
      id: 'fr',
      name: 'France',
      country: 'France',
      flag: '🇫🇷',
      lat: 46.5,
      lon: 2.5, // Central France
      region: 'eu',
      slug: 'sports-wear-manufacturer-france',
      volume: '30,000+ Units/Yr',
      airTransit: '3-5 Days (Air France Cargo CDG)',
      seaTransit: '20-24 Days (Port of Le Havre)',
      sportswear: 'Top 14 Style Rugby Jerseys, Technical Trail Running Singlets & Athleisure',
      sportsGoods: 'Heavy-Duty Ball Carrying Sacks, Combat Kick Shields & Fitness Belts',
      clientRating: '4.94 / 5.0'
    },
    {
      id: 'jp',
      name: 'Japan & East Asia',
      country: 'Japan',
      flag: '🇯🇵',
      lat: 36.2,
      lon: 138.25, // Japan
      region: 'apac',
      slug: 'sports-wear-manufacturer-us',
      volume: '26,000+ Units/Yr',
      airTransit: '4-6 Days (Narita Express Cargo)',
      seaTransit: '14-18 Days (Port of Yokohama)',
      sportswear: 'Single/Double Weave Judo Gis, 4-Way Compression Rashguards & Running Singlets',
      sportsGoods: 'Micro-Fiber FIFA Spec Footballs & Traditional Leather Martial Arts Gear',
      clientRating: '4.96 / 5.0'
    },
    {
      id: 'za',
      name: 'South Africa',
      country: 'South Africa',
      flag: '🇿🇦',
      lat: -29.0,
      lon: 24.5, // South Africa
      region: 'apac',
      slug: 'sports-wear-manufacturer-uk',
      volume: '22,000+ Units/Yr',
      airTransit: '5-7 Days (Air Freight Door-to-Door)',
      seaTransit: '22-26 Days (Durban Sea Port)',
      sportswear: 'Rugby Union Match Jerseys, Cricket Whites & Sublimated Tracksuits',
      sportsGoods: 'Four-Piece Cricket Leather Balls, Rugby Match Balls & Tackle Bags',
      clientRating: '4.93 / 5.0'
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

    // Pre-calculate sample distributed land points on sphere
    const dotsCount = 420;
    const sphereDots = [];
    for (let i = 0; i < dotsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);
      sphereDots.push({
        x: Math.sin(theta) * sinPhi,
        y: Math.cos(phi),
        z: Math.cos(theta) * sinPhi
      });
    }

    let arcProgress = 0;

    const render = () => {
      // Auto-rotation if user isn't dragging
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.yaw += 0.0035;
      }
      arcProgress = (arcProgress + 0.010) % 1;

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Globe Outer Ambient Glow (Dark aesthetic with warm orange rim)
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.85,
        centerX, centerY, radius * 1.25
      );
      glowGradient.addColorStop(0, 'rgba(255, 117, 31, 0.14)');
      glowGradient.addColorStop(0.5, 'rgba(255, 117, 31, 0.04)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill (Deep Obsidian Charcoal with warm gradient)
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.1,
        centerX, centerY, radius
      );
      sphereGradient.addColorStop(0, '#2A2624');
      sphereGradient.addColorStop(0.65, '#171514');
      sphereGradient.addColorStop(1, '#0C0B0A');

      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Crisp Globe Border Ring
      ctx.strokeStyle = 'rgba(255, 117, 31, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Subtle Latitude/Longitude Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

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

      // 5. Decorative Land Dots
      sphereDots.forEach((dot) => {
        const rot = rotatePoint(dot, rotationRef.current.yaw, rotationRef.current.pitch);
        if (rot.z > 0) {
          const screenX = centerX + rot.x * radius;
          const screenY = centerY - rot.y * radius;
          const alpha = (rot.z * 0.4).toFixed(2);
          ctx.fillStyle = `rgba(245, 241, 232, ${alpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw Export Trajectory Flight Arcs from Sialkot HQ to Well-Spaced Hubs
      const sialkot3D = toCartesian(SIALKOT.lat, SIALKOT.lon);
      const sialkotRot = rotatePoint(sialkot3D, rotationRef.current.yaw, rotationRef.current.pitch);

      exportHubs.forEach((hub, hIdx) => {
        const hub3D = toCartesian(hub.lat, hub.lon);
        const hubRot = rotatePoint(hub3D, rotationRef.current.yaw, rotationRef.current.pitch);

        // Render arc if either Sialkot or the hub is in view
        if (sialkotRot.z > -0.2 || hubRot.z > -0.2) {
          const isCurrentSelected = selectedHub === hIdx;

          ctx.beginPath();
          const arcSegments = 26;
          for (let s = 0; s <= arcSegments; s++) {
            const t = s / arcSegments;
            const ix = sialkot3D.x * (1 - t) + hub3D.x * t;
            const iy = sialkot3D.y * (1 - t) + hub3D.y * t;
            const iz = sialkot3D.z * (1 - t) + hub3D.z * t;
            const mag = Math.sqrt(ix * ix + iy * iy + iz * iz);

            // Elevated loft curve
            const loft = 1.0 + Math.sin(t * Math.PI) * 0.20;
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
            ? 'rgba(255, 117, 31, 0.95)' 
            : 'rgba(255, 117, 31, 0.30)';
          ctx.lineWidth = isCurrentSelected ? 2.5 : 1.2;
          ctx.setLineDash(isCurrentSelected ? [5, 4] : [2, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated courier packet traveling along the trajectory
          const tP = (arcProgress + hIdx * 0.12) % 1;
          const ix = sialkot3D.x * (1 - tP) + hub3D.x * tP;
          const iy = sialkot3D.y * (1 - tP) + hub3D.y * tP;
          const iz = sialkot3D.z * (1 - tP) + hub3D.z * tP;
          const mag = Math.sqrt(ix * ix + iy * iy + iz * iz);
          const loft = 1.0 + Math.sin(tP * Math.PI) * 0.20;
          const packet3D = {
            x: (ix / mag) * loft,
            y: (iy / mag) * loft,
            z: (iz / mag) * loft
          };
          const packetRot = rotatePoint(packet3D, rotationRef.current.yaw, rotationRef.current.pitch);

          if (packetRot.z > 0.05) {
            const px = centerX + packetRot.x * radius;
            const py = centerY - packetRot.y * radius;
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#FF751F';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(px, py, isCurrentSelected ? 3.5 : 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 7. Draw Destination Hotspots (Filtered by front depth z > 0.12 for clean breathing room)
      exportHubs.forEach((hub, hIdx) => {
        const hub3D = toCartesian(hub.lat, hub.lon);
        const hubRot = rotatePoint(hub3D, rotationRef.current.yaw, rotationRef.current.pitch);

        // Only draw if facing the viewer with ample clearance (prevents perimeter clutter)
        if (hubRot.z > 0.12) {
          const hx = centerX + hubRot.x * radius;
          const hy = centerY - hubRot.y * radius;
          const isCurrent = selectedHub === hIdx;

          // Pulsing radar ripple around the active pin
          if (isCurrent) {
            ctx.strokeStyle = 'rgba(255, 117, 31, 0.7)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(hx, hy, 12, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Pin marker center
          ctx.fillStyle = isCurrent ? '#FF751F' : '#FFFFFF';
          ctx.beginPath();
          ctx.arc(hx, hy, isCurrent ? 5.5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isCurrent ? '#FFFFFF' : '#FF751F';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Text label only for active selection or high-depth focal points (eliminates label clutter)
          if (isCurrent) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.fillText(`${hub.flag} ${hub.country}`, hx + 10, hy - 4);
          }
        }
      });

      // 8. Draw Sialkot Factory Origin (Radiating Gold/Orange Beacon)
      if (sialkotRot.z > 0.08) {
        const sx = centerX + sialkotRot.x * radius;
        const sy = centerY - sialkotRot.y * radius;

        ctx.strokeStyle = 'rgba(255, 117, 31, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sx, sy, 11, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FF751F';
        ctx.beginPath();
        ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText('🏭 Hare Plant (Sialkot HQ)', sx + 14, sy + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedHub, activeRegion, isRotating]);

  // Mouse drag handlers for manual 3D globe rotation
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

  // Smoothly rotate globe towards a selected country hub
  const selectHub = (index) => {
    setSelectedHub(index);
    const targetHub = exportHubs[index];
    if (targetHub) {
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
            Supplying 45+ International Sportswear & Goods Markets
          </h2>
          <p className="text-sm text-[#595856] mt-1 max-w-2xl">
            From our factory in Sialkot, Pakistan to commercial sports brands, leagues, and distributors worldwide. Delivering both technical sportswear apparel and athletic equipment internationally.
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

      {/* Main Interactive Stage: 3D Canvas Globe + Detailed Dual Capability Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3D Interactive Canvas Globe (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div 
            className="relative rounded-3xl overflow-hidden bg-[#141211] border border-black/40 p-4 shadow-2xl group cursor-grab active:cursor-grabbing"
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

            {/* Bottom Quick Destination Pills */}
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

        {/* Right: Detailed Export Intel Card showcasing BOTH Sportswear & Sports Goods */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Mascot Global Dispatch Companion */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={mascotBounce ? { scale: [1, 0.92, 1.1, 1], rotate: [0, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={() => {
              setMascotBounce(true);
              try {
                confetti({
                  particleCount: 35,
                  spread: 65,
                  origin: { y: 0.6 },
                  colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
                });
              } catch (err) {}
              setTimeout(() => {
                navigate(`/contact?source=globe-mascot&country=${encodeURIComponent(activeHubData.country)}`);
              }, 400);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Click to request export shipping quote to ${activeHubData.country} with Hurry the Hare`}
            title={`Click Hurry for DDP delivery quote to ${activeHubData.country}! 🐰`}
            className="rounded-3xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/60 p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all flex items-center gap-4 relative overflow-hidden group cursor-pointer"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FAF8F3] border-2 border-[#E5DFD5] group-hover:border-[#FF751F] shadow-sm shrink-0 transition-colors">
              <img
                src="/images/mascot/hurry-global.jpg"
                alt="Hurry the Hare - Global Export Dispatcher"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
            </div>

            <div className="min-w-0 space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1A1A1A]">Hurry the Hare</span>
                  <span className="text-[10px] font-bold text-white bg-[#FF751F] px-2 py-0.5 rounded-full shadow-sm">
                    Dispatcher
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#FF751F] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Ship Here</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-xs text-[#595856] leading-relaxed">
                "Direct air dispatch into <strong className="text-[#1A1A1A]">{activeHubData.country}</strong> in {activeHubData.airTransit.split(' ')[0]} with all customs DDP pre-cleared!"
              </p>
              <div className="flex items-center gap-3 text-[10px] text-[#8A847A] pt-0.5">
                <span className="text-[#FF751F] font-semibold">✈ Direct DDP Delivery</span>
                <span>•</span>
                <span>45+ Export Markets</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">Click to Quote</span>
              </div>
            </div>
          </motion.div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-lg space-y-5">
            
            {/* Country Header */}
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
                  <span>Regional Hub: {activeHubData.name}</span>
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FF751F]/10 border border-[#FF751F]/20 text-[#FF751F] text-right">
                <span className="text-xs font-mono font-bold block">{activeHubData.volume}</span>
                <span className="text-[10px] text-[#8A847A] block">Annual Flow</span>
              </div>
            </div>

            {/* Freight Speed Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#F5F1E8] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold text-[#8A847A] uppercase flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-[#FF751F]" />
                  Air Priority Express
                </span>
                <p className="font-display font-bold text-xs text-[#1A1A1A]">
                  {activeHubData.airTransit}
                </p>
                <span className="text-[10px] text-emerald-600 block">DDP Customs Cleared</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F5F1E8] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold text-[#8A847A] uppercase flex items-center gap-1">
                  <Ship className="w-3.5 h-3.5 text-[#FF751F]" />
                  Ocean Freight
                </span>
                <p className="font-display font-bold text-xs text-[#1A1A1A]">
                  {activeHubData.seaTransit}
                </p>
                <span className="text-[10px] text-[#595856] block">Lowest landed unit cost</span>
              </div>
            </div>

            {/* Dual Manufacturing Lines Breakdown (Sportswear + Sports Goods) */}
            <div className="space-y-2.5">
              
              {/* 1. Custom Sportswear Line */}
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5" />
                  Custom Sportswear Apparel:
                </span>
                <p className="text-xs text-[#595856] leading-relaxed">
                  {activeHubData.sportswear}
                </p>
              </div>

              {/* 2. Sports Goods & Equipment Line */}
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#FF751F]" />
                  Sports Goods & Equipment:
                </span>
                <p className="text-xs text-[#595856] leading-relaxed">
                  {activeHubData.sportsGoods}
                </p>
              </div>

            </div>

            {/* Satisfaction Rating */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#595856]">Client Satisfaction:</span>
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
