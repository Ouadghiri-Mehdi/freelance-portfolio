"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FONT_LINKS = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </>
);

const STYLES = `
:root{
  --paper:#FAFAF8;
  --paper-2:#F1F0E9;
  --ink:#111110;
  --ink-soft:#56554F;
  --line:#DEDCD2;
  --signal:#FF4D2E;
  --signal-deep:#C73B22;
  --display:'Bricolage Grotesque', sans-serif;
  --sans:'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --mono:'Space Mono', monospace;
}
html{scroll-behavior:smooth;}
.mh-root{background:var(--paper); color:var(--ink); font-family:var(--sans); line-height:1.6; cursor:none; position:relative; overflow-x:hidden;}
.mh-root *{box-sizing:border-box; cursor:none;}
.mh-wrap{max-width:1180px; margin:0 auto; padding:0 28px;}
.mh-root a{color:inherit; text-decoration:none;}
@media (pointer:coarse){
  .mh-root, .mh-root *{cursor:auto;}
  .mh-cursor, .mh-cursor-ring{display:none;}
}
@media (prefers-reduced-motion: reduce){
  .mh-root *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
}

.mh-cursor{position:fixed; top:-20px; left:-20px; width:8px; height:8px; border-radius:50%; background:var(--signal); pointer-events:none; z-index:200; transition:width .15s, height .15s, background .15s; will-change:transform;}
.mh-cursor-ring{position:fixed; top:-40px; left:-40px; width:36px; height:36px; border-radius:50%; border:1px solid var(--ink); pointer-events:none; z-index:199; transition:width .2s, height .2s, border-color .2s; will-change:transform;}
.mh-cursor.active{width:12px; height:12px; background:var(--ink);}
.mh-cursor-ring.active{width:56px; height:56px; border-color:var(--signal); opacity:.4;}
.mh-cursor-label{position:fixed; top:-20px; left:-20px; pointer-events:none; z-index:202; font-family:var(--mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink); background:var(--paper); border:1px solid var(--ink); padding:4px 10px; white-space:nowrap; opacity:0; transition:opacity .15s; will-change:transform;}
.mh-cursor-label.show{opacity:1;}

.mh-webgl{position:absolute; top:0; left:0; width:100%; height:100%; z-index:0;}

.mh-eyebrow{font-family:var(--mono); font-size:11.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--signal-deep); display:inline-flex; align-items:center; gap:10px; margin-bottom:16px;}
.mh-eyebrow::before{content:''; width:18px; height:1px; background:var(--signal); display:inline-block;}

header.mh-header{position:sticky; top:0; z-index:90; background:rgba(250,250,248,.82); backdrop-filter:blur(10px); border-bottom:1px solid var(--line);}
.mh-nav{display:flex; align-items:center; justify-content:space-between; padding:20px 28px; max-width:1180px; margin:0 auto;}
.mh-brand{font-family:var(--display); font-weight:700; font-size:19px;}
.mh-nav-links{display:flex; gap:32px; list-style:none; font-size:13.5px; padding:0; margin:0; font-family:var(--mono);}
.mh-nav-links a{opacity:.7; transition:opacity .15s;}
.mh-nav-links a:hover{opacity:1; color:var(--signal-deep);}
.mh-burger{display:none; background:none; border:1px solid var(--line); font-size:18px; padding:6px 10px; line-height:1;}

.mh-mobile-nav{display:none; position:fixed; inset:0; background:var(--paper); z-index:95; flex-direction:column; justify-content:center; align-items:center; gap:36px;}
.mh-mobile-nav.open{display:flex;}
.mh-mobile-nav a{font-family:var(--display); font-weight:700; font-size:clamp(28px,6vw,42px); opacity:.8; transition:opacity .15s, color .15s;}
.mh-mobile-nav a:hover{opacity:1; color:var(--signal);}
.mh-mobile-close{position:absolute; top:20px; right:28px; background:none; border:none; font-size:28px; color:var(--ink);}

.mh-btn{font-family:var(--mono); font-weight:700; font-size:13px; border:1px solid var(--ink); cursor:none; border-radius:0; padding:13px 24px; display:inline-flex; align-items:center; gap:9px; background:transparent; transition:background .2s, color .2s;}
.mh-btn:hover{background:var(--ink); color:var(--paper);}
.mh-btn-solid{background:var(--signal); border-color:var(--signal); color:var(--paper);}
.mh-btn-solid:hover{background:var(--signal-deep); border-color:var(--signal-deep); color:var(--paper);}

.mh-hero{position:relative; min-height:92vh; display:flex; flex-direction:column; justify-content:center; padding:60px 0 80px; overflow:hidden;}
.mh-hero-inner{position:relative; z-index:2; display:grid; grid-template-columns:1fr 340px; gap:48px; align-items:center;}
.mh-hero-text{}
.mh-hero-photo{position:relative;}
.mh-hero-photo img{width:100%; aspect-ratio:3/4; object-fit:cover; object-position:top; filter:grayscale(15%); border:1px solid var(--line);}
.mh-hero-photo::before{content:''; position:absolute; inset:-8px -8px 8px 8px; border:1px solid var(--signal); z-index:-1;}

.mh-kicker{font-family:var(--mono); font-size:13px; letter-spacing:.1em; color:var(--ink-soft); margin-bottom:24px;}
.mh-name{font-family:var(--display); font-weight:800; font-size:clamp(56px,11vw,158px); line-height:.86; letter-spacing:-0.02em; margin:0; user-select:none;}
.mh-name .accent{color:var(--signal);}
.mh-role{font-family:var(--display); font-weight:500; font-style:italic; font-size:clamp(20px,2.6vw,30px); margin-top:18px; max-width:680px; color:var(--ink-soft);}
.mh-tags{display:flex; flex-wrap:wrap; gap:8px; margin:30px 0 36px;}
.mh-tag{font-family:var(--mono); font-size:11.5px; border:1px solid var(--line); padding:6px 14px; opacity:0; transform:translateY(12px); transition:opacity .4s ease, transform .4s ease;}
.mh-tags.in .mh-tag{opacity:1; transform:translateY(0);}
.mh-cta-row{display:flex; gap:16px; flex-wrap:wrap; align-items:center;}
.mh-scroll-cue{position:absolute; bottom:28px; left:28px; font-family:var(--mono); font-size:11px; display:flex; align-items:center; gap:10px; color:var(--ink-soft); z-index:2;}
.mh-scroll-cue .ln{width:30px; height:1px; background:var(--ink-soft); position:relative; overflow:hidden;}
.mh-scroll-cue .ln::after{content:''; position:absolute; left:-100%; top:0; width:100%; height:100%; background:var(--signal); animation:mh-line 1.8s ease-in-out infinite;}
@keyframes mh-line{ 50%{left:100%;} 100%{left:100%;} }

.mh-stats{border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:32px 0; margin:0;}
.mh-stats-inner{display:flex; gap:0; justify-content:space-around; flex-wrap:wrap;}
.mh-stat{text-align:center; padding:16px 32px;}
.mh-stat-num{font-family:var(--display); font-weight:800; font-size:clamp(32px,5vw,52px); line-height:1; letter-spacing:-0.02em;}
.mh-stat-num .accent{color:var(--signal);}
.mh-stat-label{font-family:var(--mono); font-size:11px; letter-spacing:.1em; color:var(--ink-soft); text-transform:uppercase; margin-top:6px;}
.mh-stat-sep{width:1px; background:var(--line); align-self:stretch;}

.mh-thread{position:fixed; left:28px; top:0; bottom:0; width:1px; background:var(--line); z-index:80;}
.mh-thread-fill{position:absolute; left:0; top:0; width:100%; background:var(--signal);}
@media (max-width:980px){ .mh-thread{display:none;} }

.mh-split span{display:inline-block; opacity:0; transform:translateY(.4em); transition:opacity .5s ease, transform .5s ease;}
.mh-split.in span{opacity:1; transform:translateY(0);}

.mh-fade{opacity:0; transform:translateY(20px); transition:opacity .6s ease, transform .6s ease;}
.mh-fade.in{opacity:1; transform:translateY(0);}

.mh-section{padding:120px 0; position:relative; border-top:1px solid var(--line);}
.mh-section-head{max-width:680px; margin-bottom:54px;}
h2.mh-h2{font-family:var(--display); font-weight:700; font-size:clamp(30px,4.5vw,48px); line-height:1.08; letter-spacing:-0.01em;}
.mh-lede{font-size:16.5px; color:var(--ink-soft); max-width:560px;}

.mh-manifesto{font-family:var(--display); font-weight:500; font-size:clamp(24px,3.6vw,40px); line-height:1.32; max-width:980px;}
.mh-manifesto .dim{color:var(--line); }
.mh-manifesto.in .dim{color:var(--ink-soft); transition:color 1s ease .6s;}

.mh-services{display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--line); border:1px solid var(--line);}
.mh-service{background:var(--paper); padding:36px; transition:background .25s; position:relative; overflow:hidden;}
.mh-service::after{content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:var(--signal); transition:width .35s ease;}
.mh-service:hover{background:var(--paper-2);}
.mh-service:hover::after{width:100%;}
.mh-service .sn{font-family:var(--mono); font-size:12px; color:var(--signal-deep); margin-bottom:18px;}
.mh-service h3{font-family:var(--display); font-weight:700; font-size:22px; margin-bottom:12px;}
.mh-service p{font-size:14.5px; color:var(--ink-soft);}
.mh-service .stack{font-family:var(--mono); font-size:11px; color:var(--ink-soft); margin-top:16px; border-top:1px solid var(--line); padding-top:14px;}

.mh-projects{display:flex; flex-direction:column;}
.mh-project{display:grid; grid-template-columns:110px 1fr auto; gap:24px; align-items:center; padding:30px 0; border-bottom:1px solid var(--line); transition:padding-left .25s, background .25s;}
.mh-project:hover{padding-left:14px; background:var(--paper-2);}
.mh-project .yr{font-family:var(--mono); font-size:12.5px; color:var(--ink-soft);}
.mh-project h3{font-family:var(--display); font-weight:700; font-size:clamp(20px,2.4vw,28px);}
.mh-project p{font-size:13.5px; color:var(--ink-soft); margin-top:6px; max-width:520px;}
.mh-project .go{font-family:var(--mono); font-size:12px; opacity:0; transition:opacity .25s, transform .25s; transform:translateX(-8px);}
.mh-project:hover .go{opacity:1; transform:translateX(0);}
.mh-flagship{border:1px solid var(--ink); padding:4px 10px; font-family:var(--mono); font-size:10px; margin-left:10px; vertical-align:middle; letter-spacing:.06em;}

.mh-badge{display:inline-block; font-family:var(--mono); font-size:10px; letter-spacing:.08em; padding:3px 9px; margin-left:10px; vertical-align:middle; border-radius:0;}
.mh-badge-live{background:#d4f0d4; color:#1a6b1a; border:1px solid #9fd89f;}
.mh-badge-progress{background:#fff3d4; color:#7a5000; border:1px solid #f0d070;}
.mh-badge-concept{background:#ede9ff; color:#4a2fa0; border:1px solid #c2b8f0;}

.mh-approach{display:grid; grid-template-columns:repeat(4,1fr); gap:0;}
.mh-ap-step{border-top:2px solid var(--ink); padding-top:20px; padding-right:20px; transition:border-color .3s;}
.mh-ap-step:hover{border-color:var(--signal);}
.mh-ap-step .n{font-family:var(--mono); color:var(--signal-deep); font-size:12px; margin-bottom:12px;}
.mh-ap-step h3{font-family:var(--display); font-weight:700; font-size:18px; margin-bottom:8px;}
.mh-ap-step p{font-size:13.5px; color:var(--ink-soft);}

.mh-final{text-align:center; padding:140px 0;}
.mh-final .big-name{font-family:var(--display); font-weight:800; font-size:clamp(40px,8vw,110px); line-height:.86; letter-spacing:-0.02em; margin:0 0 24px; user-select:none;}
.mh-final .big-name .accent{color:var(--signal);}
.mh-final p{color:var(--ink-soft); max-width:480px; margin:0 auto 36px; font-size:15.5px;}

.mh-form{max-width:440px; margin:0 auto; text-align:left;}
.mh-field{margin-bottom:16px;}
.mh-field label{display:block; font-family:var(--mono); font-size:11px; letter-spacing:.05em; color:var(--ink-soft); margin-bottom:7px;}
.mh-field input, .mh-field textarea{
  width:100%; background:var(--paper); border:1px solid var(--ink); border-radius:0;
  padding:13px 14px; color:var(--ink); font-family:var(--sans); font-size:14.5px;
  transition:border-color .2s;
}
.mh-field input:focus, .mh-field textarea:focus{outline:none; border-color:var(--signal);}
.mh-field textarea{resize:vertical; min-height:90px;}
.mh-field .err{font-family:var(--mono); font-size:11px; color:var(--signal-deep); margin-top:6px;}
.mh-submit{width:100%; justify-content:center;}
.mh-status{font-family:var(--mono); font-size:11.5px; margin-top:12px; color:var(--ink-soft);}
.mh-success{text-align:center; padding:10px 0;}
.mh-success .check{width:36px; height:36px; border:1px solid var(--ink); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 14px;}

footer.mh-footer{border-top:1px solid var(--line); padding:48px 0;}
.mh-foot-row{display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; font-family:var(--mono); font-size:12px; color:var(--ink-soft);}
.mh-foot-row a:hover{color:var(--signal-deep);}

@media (max-width:980px){
  .mh-nav-links{display:none;}
  .mh-burger{display:block;}
  .mh-services, .mh-approach{grid-template-columns:1fr;}
  .mh-project{grid-template-columns:1fr; gap:6px;}
  .mh-section{padding:72px 0;}
  .mh-hero-inner{grid-template-columns:1fr;}
  .mh-hero-photo{display:none;}
  .mh-stats-inner{gap:0;}
  .mh-stat{padding:16px 20px;}
  .mh-stat-sep{display:none;}
}
`;

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function SplitReveal({ text, as: Tag = "span", className = "" }) {
  const [ref, shown] = useReveal(0.3);
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`mh-split ${shown ? "in" : ""} ${className}`}>
      {words.map((w, i) => (
        <span key={i} style={{ transitionDelay: `${i * 45}ms` }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

function Reveal({ children, className = "" }) {
  const [ref, shown] = useReveal(0.15);
  return (
    <div ref={ref} className={`mh-fade ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ── Curseur magnétique ──────────────────────────────────────────────────
function useMagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia && !window.matchMedia("(pointer:fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    let mouseX = -20, mouseY = -20, ringX = -20, ringY = -20;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mouseX - 4}px,${mouseY - 4}px,0)`;
      if (label) label.style.transform = `translate3d(${mouseX + 16}px,${mouseY - 8}px,0)`;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ring) {
        ring.style.transform = `translate3d(${ringX - 18}px,${ringY - 18}px,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setLabel = (text) => {
      if (!label) return;
      if (text) {
        label.textContent = text;
        label.classList.add("show");
      } else {
        label.classList.remove("show");
      }
    };

    const onOver = (e) => {
      const project = e.target.closest(".mh-project");
      const photo = e.target.closest(".mh-hero-photo");
      if (project) setLabel("Voir →");
      else if (photo) setLabel("Volta");
      else setLabel(null);

      if (e.target.closest("a, button, .magnetic")) {
        dot && dot.classList.add("active");
        ring && ring.classList.add("active");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, .magnetic")) {
        dot && dot.classList.remove("active");
        ring && ring.classList.remove("active");
      }
      if (!e.relatedTarget || (!e.relatedTarget.closest(".mh-project") && !e.relatedTarget.closest(".mh-hero-photo"))) {
        setLabel(null);
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { dotRef, ringRef, labelRef };
}

// ── Boutons magnétiques ─────────────────────────────────────────────────
function useMagnetic(rootRef) {
  useEffect(() => {
    if (window.matchMedia && !window.matchMedia("(pointer:fine)").matches) return;
    const root = rootRef.current || document;
    const els = root.querySelectorAll(".magnetic");
    const handlers = [];
    els.forEach((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      };
      const onLeave = () => {
        el.style.transform = "translate(0,0)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      handlers.push([el, onMove, onLeave]);
    });
    return () => {
      handlers.forEach(([el, onMove, onLeave]) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [rootRef]);
}

// ── Fond WebGL : réseau de nœuds ────────────────────────────────────────
function NetworkBackground() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const COUNT = 64;
    const positions = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 520,
          (Math.random() - 0.5) * 420,
          (Math.random() - 0.5) * 300
        )
      );
    }

    const pointsGeo = new THREE.BufferGeometry().setFromPoints(positions);
    const pointsMat = new THREE.PointsMaterial({
      color: 0xff4d2e,
      size: 4.5,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    const linePositions = [];
    const maxDist = 140;
    for (let i = 0; i < COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < COUNT && connections < 2; j++) {
        if (positions[i].distanceTo(positions[j]) < maxDist) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
          connections++;
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x111110, transparent: true, opacity: 0.1 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    let targetRotX = 0, targetRotY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.35;
      targetRotX = ny * 0.2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf;
    let t = 0;
    const animate = () => {
      t += reduceMotion ? 0 : 0.0022;
      group.rotation.y += (targetRotY + t - group.rotation.y) * 0.04;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="mh-webgl" aria-hidden="true" />;
}

// ── Formulaire de contact (FormSubmit) ──────────────────────────────────
const CONTACT_EMAIL = "ouadghirielmehdi4@gmail.com";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Indique votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide.";
    if (!message.trim()) e.message = "Un mot sur votre projet.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: `Volta — message de ${name}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mh-success">
        <div className="check">✓</div>
        <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 19 }}>Message envoyé.</h3>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Réponse sous 24h.</p>
      </div>
    );
  }

  return (
    <form className="mh-form" onSubmit={handleSubmit} noValidate>
      <div className="mh-field">
        <label htmlFor="mh-name">Nom</label>
        <input
          id="mh-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>
      <div className="mh-field">
        <label htmlFor="mh-email">Email</label>
        <input
          id="mh-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@entreprise.com"
        />
        {errors.email && <div className="err">{errors.email}</div>}
      </div>
      <div className="mh-field">
        <label htmlFor="mh-message">Projet</label>
        <textarea
          id="mh-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ce que vous voulez construire ou automatiser..."
        />
        {errors.message && <div className="err">{errors.message}</div>}
      </div>
      <button
        type="submit"
        className="mh-btn mh-btn-solid mh-submit magnetic"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer →"}
      </button>
      {status === "error" && (
        <div className="mh-status">
          Problème d&apos;envoi — écris directement à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--signal-deep)" }}>
            {CONTACT_EMAIL}
          </a>
        </div>
      )}
    </form>
  );
}

// ── Tags avec animation en cascade ──────────────────────────────────────
function TagsReveal({ tags }) {
  const [ref, shown] = useReveal(0.3);
  return (
    <div ref={ref} className={`mh-tags ${shown ? "in" : ""}`}>
      {tags.map((t, i) => (
        <span
          key={i}
          className="mh-tag"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function MehdiPortfolio() {
  const rootRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dotRef, ringRef, labelRef } = useMagneticCursor();
  useMagnetic(rootRef);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const top = h.scrollTop || document.body.scrollTop;
      const max = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (top / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu si on clique un lien
  const closeMenu = () => setMobileOpen(false);

  const projects = [
    {
      yr: "2026",
      title: "Trame",
      status: "EN COURS",
      desc: "Copilote de décision IA — agents connectés qui relient les données dispersées d'une entreprise pour appuyer chaque décision.",
      flagship: true,
    },
    {
      yr: "2025",
      title: "Fiabilité industrielle",
      status: "LIVRÉ",
      desc: "Plateforme d'analyse de pannes — logique bayésienne, RCA automatisé, recherche documentaire augmentée (RAG).",
    },
    {
      yr: "2025",
      title: "Commerce cross-border",
      status: "LIVRÉ",
      desc: "App mobile e-commerce pour le marché mauritanien — React Native, paiements locaux (Bankily, Masrvi).",
    },
    {
      yr: "2024",
      title: "Suite d'automatisation académique",
      status: "LIVRÉ",
      desc: "Outils internes pour la gestion académique — Python, Streamlit, Power BI, Microsoft Graph API.",
    },
  ];

  const badgeClass = (status) => {
    if (status === "LIVRÉ") return "mh-badge mh-badge-live";
    if (status === "EN COURS") return "mh-badge mh-badge-progress";
    return "mh-badge mh-badge-concept";
  };

  return (
    <div className="mh-root" ref={rootRef}>
      <style>{STYLES}</style>
      {FONT_LINKS}
      <div className="mh-cursor" ref={dotRef} />
      <div className="mh-cursor-ring" ref={ringRef} />
      <div className="mh-cursor-label" ref={labelRef} />

      {/* Menu mobile overlay */}
      <nav className={`mh-mobile-nav ${mobileOpen ? "open" : ""}`} aria-label="Navigation mobile">
        <button className="mh-mobile-close" onClick={closeMenu} aria-label="Fermer">✕</button>
        <a href="#approche" onClick={closeMenu}>Approche</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#projets" onClick={closeMenu}>Projets</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className="mh-thread">
        <div className="mh-thread-fill" style={{ height: `${scrollPct}%` }} />
      </div>

      <header className="mh-header">
        <nav className="mh-nav">
          <a href="#" className="mh-brand">Volta.</a>
          <ul className="mh-nav-links">
            <li><a href="#approche">Approche</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projets">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="mh-btn magnetic">Parlons-en →</a>
          <button
            className="mh-burger"
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>

      <main>
        <section className="mh-hero">
          <NetworkBackground />
          <div className="mh-wrap mh-hero-inner">
            <div className="mh-hero-text">
              <p className="mh-kicker">Développement · Automatisation · IA appliquée</p>
              <SplitReveal
                as="h1"
                className="mh-name"
                text="Volta."
              />
              <p className="mh-role">
                Votre produit digital, de l&apos;idée à la mise en ligne. Vos process répétitifs,
                automatisés. Du résultat concret — sans recruter une équipe.
              </p>
              <TagsReveal
                tags={["Next.js / React / TypeScript", "n8n / Make / APIs IA", "Supabase / PostgreSQL"]}
              />
              <div className="mh-cta-row">
                <a href="#projets" className="mh-btn mh-btn-solid magnetic">Voir mes projets</a>
                <a href="#contact" className="mh-btn magnetic">Réserver un échange</a>
              </div>
            </div>
            <div className="mh-hero-photo">
              <img src="/mehdi.png" alt="Volta — Développement & Automatisation" />
            </div>
          </div>
          <div className="mh-scroll-cue">
            <span>scroll</span>
            <span className="ln" />
          </div>
        </section>

        {/* Bande de stats */}
        <div className="mh-stats">
          <div className="mh-wrap">
            <div className="mh-stats-inner">
              <div className="mh-stat">
                <div className="mh-stat-num">4<span className="accent">+</span></div>
                <div className="mh-stat-label">Projets livrés</div>
              </div>
              <div className="mh-stat-sep" />
              <div className="mh-stat">
                <div className="mh-stat-num">3</div>
                <div className="mh-stat-label">Secteurs couverts</div>
              </div>
              <div className="mh-stat-sep" />
              <div className="mh-stat">
                <div className="mh-stat-num">&lt;4<span className="accent">sem</span></div>
                <div className="mh-stat-label">Proto → prod</div>
              </div>
              <div className="mh-stat-sep" />
              <div className="mh-stat">
                <div className="mh-stat-num">1</div>
                <div className="mh-stat-label">Produit IA en cours</div>
              </div>
            </div>
          </div>
        </div>

        <section className="mh-section" id="approche">
          <div className="mh-wrap">
            <SplitReveal
              as="p"
              className="mh-manifesto"
              text="On construit ce qui rapporte, pas ce qui impressionne. On automatise avant d'embaucher. On livre en jours — parce qu'une idée qui attend ne rapporte rien."
            />
          </div>
        </section>

        <section className="mh-section" id="services">
          <div className="mh-wrap">
            <Reveal className="mh-section-head">
              <p className="mh-eyebrow">Ce qu&apos;on livre</p>
              <h2 className="mh-h2">Du code au système qui tourne seul.</h2>
            </Reveal>
            <Reveal>
              <div className="mh-services">
                <div className="mh-service">
                  <div className="sn">01</div>
                  <h3>Développement web &amp; produit</h3>
                  <p>Un MVP testable en quelques semaines. Une plateforme qui tient la charge en production. Votre idée prend forme — vite.</p>
                  <div className="stack">NEXT.JS · REACT · TYPESCRIPT · SUPABASE</div>
                </div>
                <div className="mh-service">
                  <div className="sn">02</div>
                  <h3>Automatisation de workflows</h3>
                  <p>Ce que vos équipes font à la main aujourd&apos;hui, tourne tout seul demain. Zéro ressaisie, zéro oubli.</p>
                  <div className="stack">N8N · MAKE · ZAPIER · WHATSAPP API</div>
                </div>
                <div className="mh-service">
                  <div className="sn">03</div>
                  <h3>IA appliquée</h3>
                  <p>L&apos;IA branchée sur vos vraies données — pas une démo. Un copilote qui connaît votre métier.</p>
                  <div className="stack">OPENAI API · CLAUDE API · RAG</div>
                </div>
                <div className="mh-service">
                  <div className="sn">04</div>
                  <h3>Conseil &amp; exécution rapide</h3>
                  <p>Une heure ensemble suffit pour poser le scope, choisir la stack, estimer le délai. On part vite.</p>
                  <div className="stack">PRODUCT · ARCHITECTURE · MVP</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mh-section" id="projets">
          <div className="mh-wrap">
            <Reveal className="mh-section-head">
              <p className="mh-eyebrow">Projets</p>
              <h2 className="mh-h2">Des problèmes réels, des systèmes qui tournent.</h2>
            </Reveal>
            <Reveal>
              <div className="mh-projects">
                {projects.map((p, i) => (
                  <div className="mh-project magnetic" key={i}>
                    <div className="yr">{p.yr}</div>
                    <div>
                      <h3>
                        {p.title}
                        <span className={badgeClass(p.status)}>{p.status}</span>
                        {p.flagship && <span className="mh-flagship">PROJET PHARE</span>}
                      </h3>
                      <p>{p.desc}</p>
                    </div>
                    <div className="go">voir →</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mh-section">
          <div className="mh-wrap">
            <Reveal className="mh-section-head">
              <p className="mh-eyebrow">Méthode</p>
              <h2 className="mh-h2">Quatre étapes, pas de zone grise.</h2>
            </Reveal>
            <Reveal>
              <div className="mh-approach">
                <div className="mh-ap-step">
                  <div className="n">01</div>
                  <h3>Écouter</h3>
                  <p>Comprendre le vrai problème, pas la demande de surface.</p>
                </div>
                <div className="mh-ap-step">
                  <div className="n">02</div>
                  <h3>Cadrer</h3>
                  <p>Un scope clair, un MVP défini, un délai réaliste.</p>
                </div>
                <div className="mh-ap-step">
                  <div className="n">03</div>
                  <h3>Construire</h3>
                  <p>Itérations rapides, démos fréquentes, pas de boîte noire.</p>
                </div>
                <div className="mh-ap-step">
                  <div className="n">04</div>
                  <h3>Automatiser</h3>
                  <p>Ce qui peut tourner seul, tourne seul. Vous gardez la main.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mh-section mh-final" id="contact">
          <div className="mh-wrap">
            <Reveal>
              <p className="mh-eyebrow" style={{ justifyContent: "center" }}>Travaillons ensemble</p>
              <SplitReveal as="h2" className="big-name mh-name" text="Parlons." />
              <p>Un projet, une idée, un process qui vous coûte du temps chaque semaine — parlons-en.</p>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 28, marginTop: -12 }}>
                30 min · Sans engagement · Réponse sous 24h
              </p>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mh-footer">
        <div className="mh-wrap mh-foot-row">
          <span>© 2026 Volta — Développement · Automatisation · IA appliquée</span>
          <span style={{ display: "flex", gap: 20 }}>
            <a href={`mailto:${CONTACT_EMAIL}`} className="magnetic">Email</a>
            <a href="https://www.linkedin.com/in/ouadghiri-mehdi/" target="_blank" rel="noopener noreferrer" className="magnetic">LinkedIn</a>
            <a href="https://github.com/Ouadghiri-Mehdi" target="_blank" rel="noopener noreferrer" className="magnetic">GitHub</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
