import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import heroVideo from "./assets/hero-video.mp4";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zctwuadyvwyxqgallqxn.supabase.co";
const SUPABASE_KEY = "sb_publishable_bC2GK8aMTdvVG1yQhm5ONA_ZzrtFkA0";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── COLORS / CONSTANTS ───────────────────────────────────────────────────────
const C = {
  red: "#D52027",
  teal: "#12A5BF",
  tealLight: "#1cbdd9",
  navy: "#1a2744",
  dark: "#323239",
  mid: "#434343",
  white: "#ffffff",
  off: "#f8f9fb",
  border: "#e8ecf0",
  gold: "#c9972c",
};

const WMS = "https://wms.edigitalnepal.com/wms/files";

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(null);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const width = w ?? 0;
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    w: width,
    ready: w !== null,
  };
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: `${WMS}/ws-post-images/1705054040613_a2884100-42da-4272-a916-a7ca53d6af1f.jpg`,
    tag: "Kathmandu's Premier English Medium School",
    h1: ["Nurturing ", "Excellence", ",\nInspiring Futures"],
    sub: "A community of passionate educators dedicated since 1996 to providing a dynamic and engaging learning environment for students from PG to Secondary level.",
  },
  {
    img: `${WMS}/ws-post-images/1707992662478_75d9a4c0-a664-4a74-8657-52e67ee556d5.jpg`,
    tag: "Excellence Since 1996",
    h1: ["Building ", "Bright", "\nMinds Daily"],
    sub: "Located at Shantinagar, Kathmandu. Our team of experienced teachers works tirelessly to inspire and motivate students to achieve their full potential.",
  },
  {
    img: `${WMS}/ws-post-images/1706265168461_8aec0f5f-ca93-429a-b355-c7a1c182fb9e.JPG`,
    tag: "Where Learning Comes Alive",
    h1: ["Empowering ", "Students", "\nfor Tomorrow"],
    sub: "We foster a love of learning, creativity, and collaboration — equipping students with 21st-century skills and knowledge to succeed in a rapidly changing world.",
  },
];

const SERVICES = [
  {
    label: "Cafeteria",
    img: `${WMS}/ws-post-images/1706265168461_8aec0f5f-ca93-429a-b355-c7a1c182fb9e.JPG`,
    desc: "Indulge in a healthy culinary experience at our school cafeteria, where we prioritize the well-being of our students. Our hygienic cafeteria is dedicated to serving nutritious meals, providing a foundation for their overall growth and development. With a meticulously crafted kitchen menu, we ensure every meal supplies the essential nutrients students need.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
    ),
  },
  {
    label: "Transportation",
    img: `${WMS}/ws-post-images/1744943792095_6a616909-0d60-4b56-9951-731d320ebc2c.jpg`,
    desc: "We offer a safe and reliable transportation service ensuring students commute comfortably from home to school and back. Our fleet is well-maintained and drivers are experienced and background-checked, giving parents peace of mind every day.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ),
  },
  {
    label: "Library",
    img: `${WMS}/ws-post-images/1701860202669_9d30374c-4ca5-436e-9d64-634ea05d00b1.jpg`,
    desc: "Our well-stocked library is a hub of knowledge and discovery. With thousands of books, journals, and digital resources, students are encouraged to read beyond their curriculum, fostering independent thinking and a lifelong love for learning.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    ),
  },
  {
    label: "Dance",
    img: `${WMS}/ws-post-images/1735714642624_4b116aef-43b9-4eda-bafc-bf8e6a3114c5.jpg`,
    desc: "Dance is an integral part of our co-curricular offering. Students learn classical and contemporary dance forms that help build confidence, discipline, coordination, and cultural appreciation. Our trained instructors guide each student with care and creativity.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v8"/><path d="M7.5 14c1.5 2 7.5 2 9 0"/><path d="M9 11l-2 5"/><path d="M15 11l2 5"/></svg>
    ),
  },
];

const BLOGS = [
  {
    img: `${WMS}/ws-post-images/1780286797990_99a96a91-4125-4975-aa86-6d5121f0b6f8.png`,
    date: "June 1",
    title: "Artificial Intelligence",
    author: "Anupam Rawal",
  },
  {
    img: `${WMS}/ws-post-images/1780286636222_4e014b42-174a-440a-8143-8172631e856e.png`,
    date: "June 1",
    title: "Air Pollution in Kathmandu",
    author: "Miraj Bajgain",
  },
  {
    img: `${WMS}/ws-post-images/1780286454285_37826de6-9da3-40a9-9239-d2a41def4748.png`,
    date: "June 1",
    title: "\"हाम्रो खाना, हाम्रो औषधि\"",
    author: "Diya Joshi",
  },
];

const EVENTS = [
  {
    img: `${WMS}/ws-post-images/1755409861854_979f668e-2149-4062-9f4e-064d17a6b3f0.jpg`,
    day: "17", month: "Aug",
    title: "Thanksgiving Program Honoring Chinese Volunteers for Educational Support",
    large: true,
  },
  {
    img: `${WMS}/ws-post-images/1753092287010_daeb773f-8848-44ae-8952-7cd304a4112a.jpg`,
    day: "21", month: "Jul",
    title: "Celebrating Literary Excellence: Shuravi's Success in Ramayan Recitation Contest",
    large: false,
  },
  {
    img: `${WMS}/ws-post-images/1753176045942_d5e843ed-6206-46e1-b8e5-9dbfc20e3600.JPG`,
    day: "22", month: "Jul",
    title: "Our Model United Nations Achievement",
    large: false,
  },
  {
    img: `${WMS}/ws-post-images/1748000675370_a9645800-2eec-47c3-a43b-ce1c47e79166.jpg`,
    day: "23", month: "May",
    title: "Inter-School Sports Festival 2081",
    large: false,
  },
];

const COURSES = [
  {
    num: "01",
    title: "Early Childhood Education",
    desc: "Engaging young children in Activity Based Learning, enhancing their understanding and retention through hands-on tasks and thematic curriculum design.",
    img: `${WMS}/ws-post-images/1702031655672_54b5553d-33da-4996-83ed-770de31f47e2.jpg`,
  },
  {
    num: "02",
    title: "Basic Level Education",
    desc: "Incorporating the Playway Method using interactive play and hands-on activities to promote cognitive and social development through Learning by Doing.",
    img: `${WMS}/ws-post-images/1735714642624_4b116aef-43b9-4eda-bafc-bf8e6a3114c5.jpg`,
  },
  {
    num: "03",
    title: "Secondary Level Education",
    desc: "A progressive approach focused on student-centered learning, emphasizing critical thinking, collaboration, and real-world problem-solving.",
    img: `${WMS}/ws-post-images/1701860202669_9d30374c-4ca5-436e-9d64-634ea05d00b1.jpg`,
  },
];

const TESTIMONIALS = [
  {
    name: "Laxmi Koirala",
    role: "Parent of Deepson Koirala & Darsh Koirala",
    q: "What has been the most rewarding experience for you as a parent at Babylon National School?",
    text: "As a parent of Deepson Koirala, the most rewarding experience for us has been seeing his all-round growth. The school has provided a perfect balance between academics and extracurricular activities. The teachers truly care about each student's development.",
    img: `${WMS}/ws-post-images/1737706699347_5e70dab7-8575-46ed-8a62-532efa9f0c7e.jpg`,
    accent: C.red,
  },
  {
    name: "Kamala Chaulagain",
    role: "Parent of Abhinna Lamsal & Abhipsa Lamsal",
    q: "What are your expectations for the school in preparing students for a globalized world?",
    text: "Productive education, Skillful learning, Fruitful production — to help grow and develop the individual capacity of each child through Digital learning processes and international collaboration.",
    img: `${WMS}/ws-post-images/1737705941892_22adfe1c-ec1c-4e07-ad7d-60668e4cd6ee.jpg`,
    accent: C.teal,
  },
];

const SYLLABUS = [
  { label: "Grade I Syllabus 2083", url: "https://drive.google.com/file/d/1kKYDeytxc6trMHzUEimhV2McXsE3va2D/view?usp=sharing" },
  { label: "Grade II Syllabus 2083", url: "https://drive.google.com/file/d/1HtrcbTATRxkZ5eZDKL-bdZ_uID_ca5dB/view?usp=sharing" },
  { label: "Grade III Syllabus 2083", url: "https://drive.google.com/file/d/1MTtSRBYu1a3fnXc9uKVXOq-POYiOLTPQ/view?usp=drive_link" },
  { label: "Grade IV Syllabus 2083", url: "https://drive.google.com/file/d/1KX7z13O76QD5xBRmtdrvv0haPTgTTmD1/view?usp=drive_link" },
  { label: "Grade V Syllabus 2083", url: "https://drive.google.com/file/d/1QKh3VvQxYhtOMZAIzTz6IvdofVKeBtIr/view?usp=sharing" },
  { label: "Grade VI Syllabus 2083", url: "https://drive.google.com/file/d/1GIZbp-BJC6tCR9gEYJA0jMhQCaW3jOvk/view?usp=sharing" },
  { label: "Grade VII Syllabus 2083", url: "https://drive.google.com/file/d/16LyjTO843JEKkAUHSEewY_JMO7VnAAQv/view?usp=sharing" },
  { label: "Grade VIII Syllabus 2083", url: "https://drive.google.com/file/d/1EuqECnGpU8adf_lN0jP1csiAMnb_-v83/view?usp=drive_link" },
  { label: "Grade IX Syllabus 2083", url: "https://drive.google.com/file/d/11LN5LeGzaBd-m71uMn5g9gzZ3z0CdoC6/view?usp=sharing" },
  { label: "Grade X Syllabus 2083", url: "https://drive.google.com/file/d/1NY62_CdkQOCQtQM9QGRtJSNwYHAOb0mZ/view?usp=sharing" },
  { label: "Academic Calendar 2083", url: "https://drive.google.com/file/d/1xWlzH_yNDxA0OODFwRzdEObwGQj3jbQt/view?usp=sharing" },
];

const BUDS = [
  { label: "Babylon Buds Issue_28", url: "https://drive.google.com/file/d/1NRIw600skwL-PAx1p4aMQzliHgRX8PcZ/view?usp=sharing" },
  { label: "Babylon Buds Issue_27", url: "https://drive.google.com/file/d/11qLkNA0YNwS6HK5zJo3DGw5FPHPH_BWF/view?usp=drivesdk" },
  { label: "Babylon Buds Issue_26", url: "https://drive.google.com/file/d/16nQgVR4YZMXmn9O7Li0UtnJjJMv2AoAX/view?usp=drive_link" },
  { label: "Babylon Buds Issue_25", url: "#" },
  { label: "Babylon Buds Issue_24", url: "#" },
  { label: "Babylon Buds Issue_23", url: "#" },
  { label: "Babylon Buds Issue_22", url: "#" },
  { label: "Babylon Buds Issue_21", url: "#" },
  { label: "Babylon Buds Issue_19", url: "#" },
  { label: "Babylon Buds Issue_12", url: "#" },
  { label: "Babylon Buds Issue_11", url: "#" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
);
const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const SecLabel = ({ children, center = false }) => (
  <div style={{
    fontSize: 11.5, letterSpacing: 3, textTransform: "uppercase", color: C.teal,
    fontWeight: 700, marginBottom: 10,
    display: "flex", alignItems: "center", gap: 8,
    justifyContent: center ? "center" : "flex-start"
  }}>
    {!center && <span style={{ width: 20, height: 2, background: C.teal, display: "block" }} />}
    {children}
    {center && <span style={{ width: 20, height: 2, background: C.teal, display: "block" }} />}
  </div>
);

const SecTitle = ({ children, center = false }) => (
  <h2 style={{
    fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700,
    color: C.mid, lineHeight: 1.25, marginBottom: 14, textAlign: center ? "center" : "left"
  }}>{children}</h2>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
// ⚠️  Topbar (E-Portal + Login) has been REMOVED as requested.

const NAV_ITEMS = [
  { label: "Home", anchor: "home" },
  { label: "About", anchor: "about", sub: [
    { label: "About Us", anchor: "about" },
    { label: "Mission & Vision", anchor: "about" },
    { label: "Our Philosophy", anchor: "about" },
    { label: "Governing Body", anchor: "about" },
    { label: "Our Team", anchor: "about" },
  ]},
  { label: "Gallery", anchor: "gallery", sub: [
    { label: "Hanging Garden Vol_1", anchor: "gallery" },
    { label: "Hanging Garden Vol_2", anchor: "gallery" },
    { label: "Image Gallery", anchor: "gallery" },
    { label: "Video Gallery", anchor: "gallery" },
  ]},
  { label: "Information", anchor: "information", sub: [
    { label: "ECA", anchor: "information" },
    { label: "Notice", anchor: "information" },
    { label: "Facilities", anchor: "information" },
    { label: "Blog", anchor: "blog" },
  ]},
  { label: "Babylon Buds", anchor: "buds", sub: BUDS.map(b => ({ label: b.label, href: b.url })) },
  { label: "Parents Portal", anchor: "contact" },
  { label: "News", anchor: "events" },
  { label: "Syllabus", anchor: "syllabus", sub: SYLLABUS.map(s => ({ label: s.label, href: s.url })) },
  { label: "Programs", anchor: "courses" },
  { label: "Career", anchor: "contact" },
  { label: "Contact", anchor: "contact" },
];

function scrollTo(anchor) {
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavItem({ item, isMobile, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!isMobile) {
      const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <li style={{ borderBottom: `1px solid ${C.border}` }}>
        {item.sub ? (
          <>
            <button onClick={() => setOpen(v => !v)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", background: "none", border: "none", fontSize: 14, fontWeight: 500, color: C.mid, cursor: "pointer" }}>
              {item.label} <ChevronDown />
            </button>
            {open && (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, background: C.off }}>
                {item.sub.map(s => (
                  <li key={s.label} style={{ borderTop: `1px solid ${C.border}` }}>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noreferrer"
                        style={{ display: "block", padding: "11px 32px", fontSize: 13, color: C.mid, textDecoration: "none" }}
                        onClick={onClose}>{s.label}</a>
                    ) : (
                      <button onClick={() => { scrollTo(s.anchor); onClose(); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 32px", fontSize: 13, color: C.mid, background: "none", border: "none", cursor: "pointer" }}>{s.label}</button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <button onClick={() => { scrollTo(item.anchor); onClose(); }}
            style={{ width: "100%", textAlign: "left", padding: "13px 20px", background: "none", border: "none", fontSize: 14, fontWeight: 500, color: C.mid, cursor: "pointer" }}>
            {item.label}
          </button>
        )}
      </li>
    );
  }

  return (
    <li ref={ref} style={{ position: "relative", listStyle: "none" }}
      onMouseEnter={() => item.sub && setOpen(true)}
      onMouseLeave={() => item.sub && setOpen(false)}>
      <button onClick={() => scrollTo(item.anchor)}
        style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 9px", background: "none", border: "none", fontSize: 12.5, fontWeight: 500, color: C.mid, cursor: "pointer", borderRadius: 7, whiteSpace: "nowrap" }}
        onMouseOver={e => { e.currentTarget.style.background = "rgba(18,165,191,.07)"; e.currentTarget.style.color = C.teal; }}
        onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.mid; }}
      >
        {item.label}{item.sub && <ChevronDown />}
      </button>
      {item.sub && open && (
        <ul style={{ position: "absolute", top: "100%", left: 0, background: "white", minWidth: 200, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,.12)", padding: "8px 0", zIndex: 200, listStyle: "none", margin: 0, maxHeight: 280, overflowY: "auto" }}>
          {item.sub.map(s => (
            <li key={s.label}>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noreferrer"
                  style={{ display: "block", padding: "9px 18px", fontSize: 13, color: C.mid, textDecoration: "none", transition: "all .2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(18,165,191,.08)"; e.currentTarget.style.color = C.teal; e.currentTarget.style.paddingLeft = "24px"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.mid; e.currentTarget.style.paddingLeft = "18px"; }}
                >{s.label}</a>
              ) : (
                <button onClick={() => scrollTo(s.anchor)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 18px", fontSize: 13, color: C.mid, background: "none", border: "none", cursor: "pointer", transition: "all .2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(18,165,191,.08)"; e.currentTarget.style.color = C.teal; e.currentTarget.style.paddingLeft = "24px"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.mid; e.currentTarget.style.paddingLeft = "18px"; }}
                >{s.label}</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Navbar({ onApply }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDesktop, ready } = useBreakpoint();

  useEffect(() => {
    const id = "bns-nav-style";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `
        #bns-hamburger { display: flex !important; }
        #bns-desktop-nav, #bns-apply-btn { display: none !important; }
        @media (min-width: 1024px) {
          #bns-hamburger { display: none !important; }
          #bns-desktop-nav { display: flex !important; }
          #bns-apply-btn { display: block !important; }
        }
      `;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  return (
    <>
      <nav style={{
        background: "white", minHeight: 64, padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.1)" : "0 2px 8px rgba(0,0,0,.06)",
        transition: "box-shadow .3s",
        width: "100%", boxSizing: "border-box"
      }}>
        <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
          <img src={`${WMS}/ws-profile/1673510420231_2830d6ec-d646-4eb1-8df2-75fbaff60958.png`}
            alt="Babylon National School" style={{ height: 48, objectFit: "contain" }} />
        </button>

        <ul id="bns-desktop-nav" style={{ gap: 0, alignItems: "center", listStyle: "none", margin: "0 12px", padding: 0, flexWrap: "wrap", flex: 1, justifyContent: "center" }}>
          {NAV_ITEMS.map(item => <NavItem key={item.label} item={item} />)}
        </ul>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <button id="bns-apply-btn" onClick={onApply}
            style={{ background: C.red, color: "white", padding: "10px 22px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, border: "none", cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}
            onMouseOver={e => { e.currentTarget.style.background = "#b81c22"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "none"; }}
          >Apply Now</button>

          <button id="bns-hamburger" onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8, width: 40, height: 40 }}>
            <span style={{ width: 22, height: 2, background: mobileOpen ? C.teal : C.mid, display: "block", transition: "all .25s", transform: mobileOpen ? "rotate(45deg) translate(0, 7px)" : "none", borderRadius: 2 }} />
            <span style={{ width: 22, height: 2, background: mobileOpen ? "transparent" : C.mid, display: "block", transition: "opacity .25s", borderRadius: 2, opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: mobileOpen ? C.teal : C.mid, display: "block", transition: "all .25s", transform: mobileOpen ? "rotate(-45deg) translate(0, -7px)" : "none", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(0,0,0,.45)" }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "white", maxHeight: "90vh", overflowY: "auto", paddingTop: 64, boxShadow: "0 8px 30px rgba(0,0,0,.2)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}` }}>
              <button onClick={() => { onApply(); setMobileOpen(false); }}
                style={{ width: "100%", background: C.red, color: "white", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
                Apply Now
              </button>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_ITEMS.map(item => (
                <NavItem key={item.label} item={item} isMobile onClose={() => setMobileOpen(false)} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO SLIDER ─────────────────────────────────────────────────────────────
// ┌─────────────────────────────────────────────────────────────────────────┐
// │  VIDEO BACKGROUND HERO                                                  │
// │  Place your video file at:  src/assets/hero-video.mp4                  │
// │  The video plays silently on loop behind the slides.                   │
// │  If no video is available the fallback image shows instead.            │
// └─────────────────────────────────────────────────────────────────────────┘

// Import your video — uncomment the line below once you add the file:
// import heroVideo from "./assets/hero-video.mp4";
// Then replace  heroVideo={null}  with  heroVideo={heroVideo}  in <HeroSlider>

function HeroSlider({ onApply, heroVideo }) {
  const [cur, setCur] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const [slides, setSlides] = useState(SLIDES);

  useEffect(() => {
    sb.from("hero_slides").select("*").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) {
        setSlides(data.map(s => ({
          img: s.img_url,
          tag: s.tag,
          h1: [s.h1_before || "", s.h1_highlight || "", s.h1_after || ""],
          sub: s.subtitle,
        })));
      }
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCur(v => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[cur] || slides[0];
  if (!s) return null;

  const heroH = isMobile ? 560 : isTablet ? 600 : 640;
  const heroPad = isMobile ? "0 24px" : isTablet ? "0 48px" : "0 96px";

  return (
    <div id="home" style={{ position: "relative", overflow: "hidden", height: heroH }}>

      {/* ── VIDEO BACKGROUND (shown when heroVideo prop is provided) ── */}
      {heroVideo ? (
        <video
          key={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        /* ── FALLBACK: slide image when no video ── */
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "background-image 0.8s ease",
          }}
        />
      )}

      {/* ── GRADIENT OVERLAY ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(105deg, rgba(10,20,50,.88) 0%, rgba(10,20,50,.55) 55%, rgba(10,20,50,.25) 100%)",
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", alignItems: "center", padding: heroPad,
      }}>
        <div style={{ maxWidth: isMobile ? "100%" : 620 }}>

          {/* Eyebrow tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(18,165,191,.18)",
            border: "1px solid rgba(18,165,191,.45)",
            color: "#a8eaf6",
            fontSize: isMobile ? 10 : 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: 30,
            marginBottom: isMobile ? 18 : 22,
            fontWeight: 600,
            fontFamily: "'Cormorant Garamond', 'Cinzel', Georgia, serif",
          }}>
            <span style={{ width: 18, height: 1, background: "rgba(18,165,191,.8)", display: "inline-block" }} />
            {s.tag}
            <span style={{ width: 18, height: 1, background: "rgba(18,165,191,.8)", display: "inline-block" }} />
          </div>

          {/* Main headline — Cormorant Garamond for a refined editorial feel */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Cinzel', Georgia, serif",
            fontSize: isMobile ? 42 : isTablet ? 58 : 72,
            color: "white",
            lineHeight: 1.05,
            marginBottom: isMobile ? 16 : 20,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            textShadow: "0 2px 32px rgba(0,0,0,.35)",
          }}>
            {s.h1[0]}
            <em style={{
              color: C.gold,
              fontStyle: "italic",
              fontWeight: 600,
            }}>
              {s.h1[1]}
            </em>
            {s.h1[2].split("\n").map((t, i) =>
              i === 0 ? <span key={i}>{t}</span> : <span key={i}><br />{t}</span>
            )}
          </h1>

          {/* Thin decorative rule */}
          <div style={{
            width: 60, height: 2,
            background: `linear-gradient(to right, ${C.teal}, transparent)`,
            marginBottom: isMobile ? 14 : 18,
            borderRadius: 2,
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? 15.5 : 17.5,
            color: "rgba(255,255,255,.78)",
            lineHeight: 1.75,
            marginBottom: isMobile ? 28 : 36,
            maxWidth: 500,
            fontWeight: 400,
            letterSpacing: "0.2px",
          }}>
            {s.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={onApply}
              style={{
                background: C.red,
                color: "white",
                padding: isMobile ? "12px 24px" : "14px 32px",
                borderRadius: 8,
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all .25s",
                boxShadow: "0 4px 18px rgba(213,32,39,.45)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.3px",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "#b81c22"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(213,32,39,.5)"; }}
              onMouseOut={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(213,32,39,.45)"; }}
            >
              Apply for Admission <Arrow />
            </button>

            <button onClick={() => scrollTo("about")}
              style={{
                border: "1.5px solid rgba(255,255,255,.45)",
                color: "white",
                padding: isMobile ? "12px 24px" : "14px 32px",
                borderRadius: 8,
                fontSize: isMobile ? 13 : 14,
                fontWeight: 500,
                background: "rgba(255,255,255,.06)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                transition: "all .25s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.3px",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.45)"; e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.transform = "none"; }}
            >
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* ── SLIDE DOTS (hidden when video is playing — video has no slides) ── */}
      {!heroVideo && (
        <>
          <div style={{ position: "absolute", bottom: 28, left: isMobile ? 24 : 96, zIndex: 10, display: "flex", gap: 10 }}>
            {[-1, 1].map((d, i) => (
              <button key={i} onClick={() => setCur(v => (v + d + slides.length) % slides.length)}
                style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "all .2s" }}
                onMouseOver={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.borderColor = C.teal; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
              >
                {d === -1
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
              </button>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 36, right: isMobile ? 24 : 96, zIndex: 10, display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCur(i)}
                style={{ width: i === cur ? 28 : 8, height: 8, borderRadius: 4, background: i === cur ? C.teal : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", transition: "all .35s", padding: 0 }} />
            ))}
          </div>
        </>
      )}

      {/* ── SCROLL INDICATOR ── */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        opacity: 0.6, pointerEvents: "none",
      }}>
        <span style={{ fontSize: 9.5, color: "white", letterSpacing: 2.5, textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif" }}>Scroll</span>
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
          <rect x="1" y="1" width="14" height="20" rx="7" stroke="white" strokeWidth="1.2" opacity="0.6"/>
          <rect x="7" y="4" width="2" height="5" rx="1" fill="white" opacity="0.8">
            <animate attributeName="y" values="4;10;4" dur="1.6s" repeatCount="indefinite"/>
          </rect>
        </svg>
      </div>

    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";

  return (
    <section id="about" style={{ padding: "80px 0", background: C.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
          gap: isNarrow ? 40 : 72,
          alignItems: "center"
        }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", height: isNarrow ? 280 : 480, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 60px rgba(18,165,191,.15)" }}>
              <img src={`${WMS}/ws-post-images/1707992662478_75d9a4c0-a664-4a74-8657-52e67ee556d5.jpg`}
                alt="Babylon National School" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: -16, right: isNarrow ? 0 : -20, background: C.red, color: "white", padding: "18px 22px", borderRadius: 14, textAlign: "center", boxShadow: "0 12px 32px rgba(213,32,39,.3)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isNarrow ? 34 : 44, fontWeight: 700, lineHeight: 1 }}>1996</div>
              <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4, letterSpacing: 1 }}>FOUNDED</div>
            </div>
          </div>
          <div style={{ paddingTop: isNarrow ? 24 : 0 }}>
            <SecLabel>About Us</SecLabel>
            <SecTitle>Welcome To<br />Babylon National School</SecTitle>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>
              We are a community of passionate educators dedicated since 1996 to providing a dynamic and engaging learning environment for all our students. Located at Shantinagar, Kathmandu, our experienced teachers inspire and motivate students to achieve their full potential.
            </p>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 28 }}>
              We strive to create a welcoming and inclusive school culture that fosters a love of learning, creativity, and collaboration — empowering students with 21st-century skills and knowledge they need to succeed in a rapidly changing world.
            </p>
            <div style={{ display: "flex", gap: isMobile ? 20 : 32, marginBottom: 32, flexWrap: "wrap" }}>
              {[["2000+", "Students"], ["100+", "Faculty"], ["PG–X", "Classes"], ["25+", "Years"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: C.teal }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("courses")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `2px solid ${C.teal}`, color: C.teal, background: "transparent", padding: "11px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}
              onMouseOver={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = "white"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.teal; }}
            >Explore Programs <Arrow size={15} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────
const FALLBACK_MSGS = [
  {
    person: "Chairperson",
    title: "Message from the Chairperson",
    content: "It is with immense pride and gratitude that I welcome you to our school. Our journey began in 1996 with just 27 students, fueled by a vision to provide quality education that nurtures every child's potential. Today, we stand as a beacon of holistic education in Kathmandu.",
    img_url: `${WMS}/ws-post-images/1744943792095_6a616909-0d60-4b56-9951-731d320ebc2c.jpg`,
    accent: C.teal,
  },
  {
    person: "Principal",
    title: "Message from the Principal",
    content: "The truth behind these words resonates profoundly in all aspects of life. Every challenge we encounter shapes us into who we are, instilling resilience and determination. At Babylon, we prepare students not just academically but as well-rounded individuals ready for tomorrow's world.",
    img_url: `${WMS}/ws-post-images/1744907581386_7ef57f74-042a-4f31-b8ed-1ef102841d71.jpg`,
    accent: C.red,
  },
];
const ACCENTS = [C.teal, C.red, C.gold, C.navy];

function Messages() {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [msgs, setMsgs] = useState(FALLBACK_MSGS);

  useEffect(() => {
    sb.from("messages").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setMsgs(data.map((m, i) => ({ ...m, accent: ACCENTS[i % ACCENTS.length] })));
    });
  }, []);

  return (
    <section style={{ padding: "80px 0", background: C.off }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SecLabel center>Leadership</SecLabel>
          <SecTitle center>Messages from Our Leaders</SecTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : msgs.length === 1 ? "1fr" : "1fr 1fr", gap: 32 }}>
          {msgs.map((m, i) => (
            <div key={m.id || m.person} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.07)", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 6, background: m.accent }} />
              <div style={{ padding: isMobile ? 20 : 32 }}>
                <div style={{ display: "inline-block", background: `${m.accent}15`, color: m.accent, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>{m.person}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.mid, marginBottom: 14 }}>{m.title}</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, marginBottom: 20 }}>{m.content}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: `2px solid ${m.accent}`, flexShrink: 0 }}>
                    {m.img_url
                      ? <img src={m.img_url} alt={m.person} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", background: `${m.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: m.accent }}>{m.person?.charAt(0)}</div>
                    }
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.mid }}>{m.person}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Babylon National School</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SERVICE_ICONS = {
  Cafeteria: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  Transportation: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Library: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Dance: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v8"/><path d="M7.5 14c1.5 2 7.5 2 9 0"/><path d="M9 11l-2 5"/><path d="M15 11l2 5"/></svg>,
};
const DEFAULT_SVC_ICON = <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

function Services() {
  const [active, setActive] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    sb.from("services").select("*").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setServices(data.map(s => ({ ...s, icon: SERVICE_ICONS[s.label] || DEFAULT_SVC_ICON, desc: s.description, img: s.img_url })));
    });
  }, []);

  const s = services[active] || services[0];
  if (!s) return null;

  return (
    <section id="services" style={{ padding: "80px 0", background: C.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ marginBottom: 8 }}>
          <SecLabel>Our Services</SecLabel>
          <SecTitle>Services We Provide</SecTitle>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {services.map((svc, i) => (
            <button key={svc.label} onClick={() => setActive(i)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "12px 18px", borderRadius: 12, cursor: "pointer", transition: "all .2s", border: "none",
                background: active === i ? C.teal : C.off,
                color: active === i ? "white" : C.mid,
                boxShadow: active === i ? "0 4px 14px rgba(18,165,191,.35)" : "none",
                minWidth: 80,
              }}
            >
              {svc.icon}
              <span style={{ fontSize: 12, fontWeight: 600 }}>{svc.label}</span>
            </button>
          ))}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
          gap: 0, alignItems: "center",
          background: C.off, borderRadius: 18, overflow: "hidden"
        }}>
          <div style={{ height: isNarrow ? 240 : 380, overflow: "hidden" }}>
            <img src={s.img || s.img_url} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all .4s" }} />
          </div>
          <div style={{ padding: isMobile ? "28px 20px" : isTablet ? "32px 28px" : "40px 40px 40px 0" }}>
            <div style={{ color: C.teal, marginBottom: 12 }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: C.mid, marginBottom: 16 }}>{s.label}</h3>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>{s.desc}</p>
            <button onClick={() => scrollTo("contact")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `2px solid ${C.teal}`, color: C.teal, background: "transparent", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}
              onMouseOver={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = "white"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.teal; }}
            >Learn More <Arrow size={15} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function Blog() {
  const { isMobile, isTablet } = useBreakpoint();
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const [blogs, setBlogs] = useState(BLOGS);

  useEffect(() => {
    sb.from("blogs").select("*").eq("status", "Published").order("date", { ascending: false }).limit(3).then(({ data }) => {
      if (data && data.length > 0) setBlogs(data.map(b => ({ ...b, img: b.img_url, date: b.date ? new Date(b.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : b.date })));
    });
  }, []);

  return (
    <section id="blog" style={{ padding: "80px 0", background: C.off }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          <div><SecLabel>Blog</SecLabel><SecTitle>Latest Blog</SecTitle></div>
          <a href="https://babylonschool.edu.np/information-center/blog" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: C.teal, textDecoration: "none" }}>
            View All <Arrow size={14} />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 28 }}>
          {blogs.map(b => (
            <div key={b.id || b.title} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.06)", cursor: "pointer" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.12)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.06)"; }}
            >
              <div style={{ height: 200, overflow: "hidden" }}>
                <img src={b.img} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{b.date}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: C.mid, marginBottom: 10, lineHeight: 1.35 }}>{b.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "#888" }}>{b.author}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, color: C.teal, fontWeight: 600 }}>Read More <Arrow size={13} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function Events() {
  const { isMobile, isTablet } = useBreakpoint();
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [events, setEvents] = useState(EVENTS);

  useEffect(() => {
    sb.from("events").select("*").order("date", { ascending: false }).limit(4).then(({ data }) => {
      if (data && data.length > 0) {
        setEvents(data.map((e, i) => {
          const d = e.date ? new Date(e.date) : null;
          return {
            ...e,
            img: e.img_url || EVENTS[i % EVENTS.length]?.img,
            day: d ? String(d.getDate()).padStart(2, "0") : e.day,
            month: d ? MONTHS[d.getMonth()] : e.month,
            large: i === 0,
          };
        }));
      }
    });
  }, []);

  return (
    <section id="events" style={{ padding: "80px 0", background: C.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          <div><SecLabel>Events</SecLabel><SecTitle>Latest Events</SecTitle></div>
          <a href="https://babylonschool.edu.np/news" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: C.teal, textDecoration: "none" }}>
            View All <Arrow size={14} />
          </a>
        </div>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {events.map(e => <EventCard key={e.id || e.title} event={e} forceMobile />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <EventCard event={events[0]} large />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {events.slice(1).map(e => <EventCard key={e.id || e.title} event={e} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function EventCard({ event, large, forceMobile }) {
  const [hov, setHov] = useState(false);
  const cardH = forceMobile ? 180 : large ? 420 : 120;

  return (
    <div onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}
      style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", height: cardH, transition: "box-shadow .2s", boxShadow: hov ? "0 12px 32px rgba(0,0,0,.2)" : "0 4px 14px rgba(0,0,0,.1)" }}>
      <img src={event.img} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", top: 14, right: 14, background: C.teal, color: "white", borderRadius: 10, padding: "8px 12px", textAlign: "center", minWidth: 48 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: large ? 26 : 18, fontWeight: 700, lineHeight: 1 }}>{event.day}</div>
        <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{event.month}</div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: large ? "24px 24px 20px" : "12px 16px 14px" }}>
        <p style={{ color: "white", fontWeight: 600, fontSize: large ? 16 : 13, lineHeight: 1.4, marginBottom: large ? 12 : 0 }}>{event.title}</p>
        {large && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.tealLight, fontWeight: 600 }}>
            Read More <Arrow size={13} />
          </span>
        )}
      </div>
    </div>
  );
}

// ─── COURSES ─────────────────────────────────────────────────────────────────
function Courses() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [courses, setCourses] = useState(COURSES);

  useEffect(() => {
    sb.from("courses").select("*").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setCourses(data.map(c => ({ ...c, img: c.img_url, desc: c.description })));
    });
  }, []);

  return (
    <section id="courses" style={{ padding: "80px 0", background: C.navy }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: 3, textTransform: "uppercase", color: C.teal, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 2, background: C.teal, display: "block" }} />Key Notes
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: 0 }}>Browse Our Course Category</h2>
          </div>
          <a href="https://babylonschool.edu.np/programs" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,.55)", textDecoration: "none" }}>
            View All Programs <Arrow size={14} />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 28 }}>
          {courses.map(c => (
            <div key={c.id || c.title} style={{ background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.3)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(26,39,68,.35)" }} />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: "rgba(255,255,255,.1)", lineHeight: 1, marginBottom: 8 }}>{c.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 16 }}>{c.desc}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.teal, fontWeight: 600 }}>
                  Read More <Arrow size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint();
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    sb.from("testimonials").select("*").eq("active", true).then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data.map(t => ({ ...t, img: t.img_url, q: t.question, text: t.text, accent: t.accent || C.teal })));
    });
  }, []);

  return (
    <section id="testimonials" style={{ padding: "80px 0", background: C.off }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SecLabel center>Community</SecLabel>
          <SecTitle center>Hear from our Community</SecTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr", gap: 32 }}>
          {testimonials.map(t => (
            <div key={t.id || t.name} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.07)", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 4, background: t.accent }} />
              <div style={{ padding: isMobile ? 20 : 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={t.accent}><path d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94m10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94"/></svg>
                <p style={{ fontSize: 13.5, color: t.accent, fontStyle: "italic", fontWeight: 600, lineHeight: 1.5 }}>{t.q}</p>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75 }}>{t.text}</p>
                <div style={{ display: "flex", gap: 14, alignItems: "center", paddingTop: 14, borderTop: `1px solid ${C.border}`, marginTop: "auto" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                    <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: C.mid }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAP ─────────────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <div style={{ height: 320, position: "relative", overflow: "hidden" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.156!2d85.3357!3d27.7034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190e94aaaaab%3A0x5a5b6d08b01e4d5c!2sBabylon%20National%20School!5e0!3m2!1sen!2snp!4v1620000000000"
        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        title="Babylon National School Location" />
    </div>
  );
}

// ─── SYLLABUS PAGE ────────────────────────────────────────────────────────────
function SyllabusPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";

  return (
    <section id="syllabus" style={{ padding: "80px 0", background: C.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <SecLabel>Academics</SecLabel>
        <SecTitle>Syllabus & Calendar 2083</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16, marginTop: 32 }}>
          {SYLLABUS.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.off, borderRadius: 10, textDecoration: "none", color: C.mid, fontSize: 13.5, fontWeight: 500, border: `1px solid ${C.border}`, transition: "all .2s" }}
              onMouseOver={e => { e.currentTarget.style.background = `${C.teal}10`; e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.teal; }}
              onMouseOut={e => { e.currentTarget.style.background = C.off; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.mid; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ADMISSION MODAL ──────────────────────────────────────────────────────────
function AdmissionModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    studentName: "", dob: "", gender: "", gradeApplied: "", previousSchool: "",
    fatherName: "", motherName: "", guardianPhone: "", guardianEmail: "",
    address: "", emergencyContact: "", hasDocuments: false,
    message: "", heardFrom: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
  const { isMobile } = useBreakpoint();

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const field = (label, key, type = "text", opts = null) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.mid, marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>
      {opts ? (
        <select value={form[key]} onChange={e => upd(key, e.target.value)}
          style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.mid, background: "white", outline: "none" }}>
          <option value="">Select…</option>
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={form[key]} onChange={e => upd(key, e.target.value)} rows={3}
          style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.mid, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
      ) : (
        <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)}
          style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.mid, outline: "none", boxSizing: "border-box" }} />
      )}
    </div>
  );

  const steps = ["Student", "Parent", "Address", "Review"];

  if (submitted) {
    return (
      <ModalShell onClose={onClose}>
        <div style={{ padding: isMobile ? 28 : 48, textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e6f9ec", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.mid, marginBottom: 10 }}>Application Submitted!</h3>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Thank you for applying to Babylon National School. We will review your application and contact you at <strong>{form.guardianEmail || form.guardianPhone}</strong> within 3–5 business days.
          </p>
          <button onClick={onClose}
            style={{ background: C.teal, color: "white", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <div style={{ display: "flex", background: C.off, borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, minWidth: isMobile ? 70 : 110, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "12px 8px", borderBottom: `3px solid ${step === i + 1 ? C.teal : "transparent"}`, cursor: step > i + 1 ? "pointer" : "default" }}
            onClick={() => step > i + 1 && setStep(i + 1)}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: step > i + 1 ? C.teal : step === i + 1 ? C.teal : C.border, display: "flex", alignItems: "center", justifyContent: "center", color: step >= i + 1 ? "white" : "#aaa", fontSize: 12, fontWeight: 700 }}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: step === i + 1 ? C.teal : "#999", textAlign: "center" }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: isMobile ? "20px 16px 16px" : "32px 32px 24px", overflowY: "auto", maxHeight: isMobile ? "55vh" : "60vh" }}>
        {step === 1 && (
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.mid, marginBottom: 20 }}>Student's Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 20px" }}>
              <div>{field("Student's Full Name *", "studentName")}</div>
              <div>{field("Date of Birth *", "dob", "date")}</div>
              <div>{field("Gender *", "gender", "text", ["Male", "Female", "Other"])}</div>
              <div>{field("Grade Applying For *", "gradeApplied", "text", ["Nursery", "LKG", "UKG", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI", "Grade VII", "Grade VIII", "Grade IX", "Grade X"])}</div>
            </div>
            {field("Previous School (if any)", "previousSchool")}
          </div>
        )}
        {step === 2 && (
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.mid, marginBottom: 20 }}>Parent / Guardian Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 20px" }}>
              <div>{field("Father's Full Name *", "fatherName")}</div>
              <div>{field("Mother's Full Name *", "motherName")}</div>
              <div>{field("Contact Phone *", "guardianPhone", "tel")}</div>
              <div>{field("Email Address *", "guardianEmail", "email")}</div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.mid, marginBottom: 20 }}>Address & Documents</h4>
            {field("Home Address *", "address", "textarea")}
            {field("Emergency Contact Number *", "emergencyContact", "tel")}
            {field("How did you hear about us?", "heardFrom", "text", ["Friend / Family", "Social Media", "Google", "Newspaper", "Walk-in", "Other"])}
            {field("Additional Message", "message", "textarea")}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginTop: 8 }}>
              <input type="checkbox" checked={form.hasDocuments} onChange={e => upd("hasDocuments", e.target.checked)} style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, color: C.mid }}>I confirm documents (birth certificate, transfer certificate) will be submitted at the school.</span>
            </label>
          </div>
        )}
        {step === 4 && (
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.mid, marginBottom: 20 }}>Review Your Application</h4>
            {[
              ["Student Name", form.studentName], ["Date of Birth", form.dob], ["Gender", form.gender],
              ["Grade Applied", form.gradeApplied], ["Father's Name", form.fatherName], ["Mother's Name", form.motherName],
              ["Phone", form.guardianPhone], ["Email", form.guardianEmail], ["Address", form.address],
            ].map(([l, v]) => v && (
              <div key={l} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: `1px solid ${C.border}`, flexWrap: isMobile ? "wrap" : "nowrap" }}>
                <span style={{ minWidth: 120, fontSize: 13, color: "#888", fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 13.5, color: C.mid }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: isMobile ? "12px 16px 16px" : "16px 32px 24px", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => step > 1 && setStep(s => s - 1)}
          style={{ padding: "10px 18px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "white", fontSize: 14, color: C.mid, cursor: step === 1 ? "not-allowed" : "pointer", opacity: step === 1 ? 0.4 : 1 }}
          disabled={step === 1}>← Back</button>
        <button
  onClick={async () => {
    if (step < 4) { setStep(s => s + 1); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("http://localhost:4000/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setSubmitError(data.message || "Failed. Try again.");
    } catch {
      setSubmitError("Cannot connect to server.");
    } finally {
      setSubmitting(false);
    }
  }}
  disabled={submitting}
  style={{ padding: "10px 24px", borderRadius: 8, background: submitting ? "#aaa" : C.teal, color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
  {submitting ? "Submitting…" : step === 4 ? "Submit →" : "Next →"}
</button>
      </div>
    </ModalShell>
  );
}

function ModalShell({ children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(26,39,68,.65)", backdropFilter: "blur(4px)", overflowY: "auto", padding: "16px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 780, background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.25)", marginTop: 8 }}>
        <div style={{ background: C.navy, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={`${WMS}/ws-profile/1673510420231_2830d6ec-d646-4eb1-8df2-75fbaff60958.png`} alt="BNS" style={{ height: 36, filter: "brightness(0) invert(1) opacity(.9)" }} />
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Online Admission Form</div>
              <div style={{ color: "rgba(255,255,255,.55)", fontSize: 11 }}>Babylon National School — 2081/82</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.12)", border: "none", color: "white", width: 34, height: 34, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>
        {children}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "10px 20px 14px", borderTop: `1px solid ${C.border}`, background: "#fafbfc" }}>
          <span style={{ fontSize: 11, color: "#aaa", letterSpacing: 0.5 }}>Powered by</span>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="28" height="28" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="5,45 50,5 95,45" stroke="url(#houseGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline points="15,38 15,82 85,82 85,38" stroke="url(#houseGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <rect x="62" y="8" width="10" height="16" rx="1" fill="url(#houseGrad)"/>
              <line x1="50" y1="82" x2="50" y2="55" stroke="#1a3a8f" strokeWidth="3"/>
              <circle cx="50" cy="30" r="4" fill="#c9972c"/>
              <rect x="42" y="65" width="16" height="17" rx="2" fill="#c9972c" opacity="0.85"/>
              <defs>
                <linearGradient id="houseGrad" x1="5" y1="5" x2="95" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#12A5BF"/>
                  <stop offset="100%" stopColor="#1a3a8f"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1a3a8f", letterSpacing: 0.5, fontFamily: "sans-serif" }}>JANAKI</div>
              <div style={{ fontSize: 8.5, fontWeight: 600, color: "#444", letterSpacing: 1.5, textTransform: "uppercase" }}>Digital Solutions Pvt. Ltd.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onApply }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const pad = isMobile ? "48px 20px 0" : isTablet ? "56px 32px 0" : "64px 48px 0";
  const footerCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1.5fr";

  return (
    <footer id="contact" style={{ background: C.navy, color: "white", padding: pad }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.red}, #a01820)`, borderRadius: 18, padding: isMobile ? "28px 20px" : "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 22 : 26, fontWeight: 700, marginBottom: 8 }}>Apply Now!</h3>
            <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 500 }}>Admissions are open for the academic year 2081/82. Join our community of learners and achievers today.</p>
          </div>
          <button onClick={onApply}
            style={{ background: "white", color: C.red, padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}
          >Start Application →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: footerCols, gap: isMobile ? 32 : 40, paddingBottom: 40 }}>
          <div>
            <img src={`${WMS}/ws-profile/1673510420231_2830d6ec-d646-4eb1-8df2-75fbaff60958.png`} alt="BNS" style={{ height: 44, marginBottom: 16, filter: "brightness(0) invert(1) opacity(.85)" }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 20 }}>Babylon National School is a co-ed English medium school from PG to secondary level, dedicated to excellence since 1996.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ icon: "f", href: "https://www.facebook.com/BabylonNationalSchool/" }, { icon: "in", href: "#" }, { icon: "yt", href: "#" }].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,.7)", textDecoration: "none", transition: "all .2s", fontWeight: 700 }}
                  onMouseOver={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = "white"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "rgba(255,255,255,.7)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 18 }}>Useful Links</h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {[["About", "about"], ["Gallery", "gallery"], ["Information", "information"], ["Babylon Buds", "buds"], ["Parents Portal", "contact"], ["News", "events"]].map(([l, a]) => (
                <li key={l} style={{ marginBottom: 10 }}>
                  <button onClick={() => scrollTo(a)}
                    style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgba(255,255,255,.6)", background: "none", border: "none", cursor: "pointer", transition: "color .2s", padding: 0 }}
                    onMouseOver={e => e.currentTarget.style.color = C.tealLight}
                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
                  ><ChevronRight />{l}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 18 }}>Academics</h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {[["Early Childhood", "courses"], ["Basic Level", "courses"], ["Secondary Level", "courses"], ["Programs", "courses"], ["Career", "contact"], ["Apply Now", null]].map(([l, a]) => (
                <li key={l} style={{ marginBottom: 10 }}>
                  <button onClick={() => a ? scrollTo(a) : onApply()}
                    style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgba(255,255,255,.6)", background: "none", border: "none", cursor: "pointer", transition: "color .2s", padding: 0 }}
                    onMouseOver={e => e.currentTarget.style.color = C.tealLight}
                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
                  ><ChevronRight />{l}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 18 }}>Contact Info</h5>
            {[
              { text: "BalaBhadra Marga, Kathmandu" },
              { text: "info@babylonschool.edu.np", href: "mailto:info@babylonschool.edu.np" },
              { text: "+977-1-4108905, 4108973", href: "tel:+97714108905" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ color: C.teal, marginTop: 2 }}>●</span>
                {item.href ? (
                  <a href={item.href} style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", textDecoration: "none", lineHeight: 1.5 }}>{item.text}</a>
                ) : (
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>{item.text}</span>
                )}
              </div>
            ))}
            {!sent ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Quick Message</div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "white", fontSize: 13, marginBottom: 8, outline: "none", boxSizing: "border-box" }} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "white", fontSize: 13, marginBottom: 8, outline: "none", boxSizing: "border-box" }} />
                <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your message" rows={3}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "white", fontSize: 13, marginBottom: 8, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                <button onClick={async () => {
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
    } catch { setSent(true); }
  }}
  style={{ width: "100%", padding: "10px", background: C.teal, color: "white", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
  Send Message
</button>
              </div>
            ) : (
              <div style={{ marginTop: 20, padding: "14px", background: "rgba(18,165,191,.15)", borderRadius: 8, fontSize: 13, color: C.tealLight }}>
                ✓ Message sent! We'll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: isMobile ? "16px 20px" : "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.35)" }}>© {new Date().getFullYear()} Babylon National School. All rights reserved.</span>
        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.35)" }}>BalaBhadra Marga, Kathmandu, Nepal</span>
        <a href="/admin"
          style={{ fontSize: 12, color: "rgba(255,255,255,.4)", textDecoration: "none", padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(255,255,255,.15)", display: "flex", alignItems: "center", gap: 6, transition: "all .2s" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "white"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.4)"; }}
        >
          🔐 Admin Panel
        </a>
      </div>
    </footer>
  );
}

// ─── FLOATING APPLY + SCROLL TOP ──────────────────────────────────────────────
function FloatingButtons({ onApply }) {
  const [showTop, setShowTop] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <button onClick={onApply}
        style={{
          position: "fixed", left: 0, top: "50%", transform: "translateY(-50%)",
          writingMode: "vertical-lr", background: C.red, color: "white", border: "none",
          padding: isMobile ? "14px 9px" : "18px 12px",
          fontSize: isMobile ? 11 : 13, fontWeight: 700, cursor: "pointer", zIndex: 999,
          borderRadius: "0 8px 8px 0", letterSpacing: 1,
          boxShadow: "4px 0 18px rgba(213,32,39,.35)"
        }}>
        Apply Now!
      </button>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", right: isMobile ? 16 : 40, bottom: isMobile ? 20 : 40, width: 40, height: 40, borderRadius: 7, background: "white", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,.18)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.mid} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      )}
    </>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────
function Gallery() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr 1fr" : "repeat(3, 1fr)";
  const pad = isMobile ? "60px 20px" : isTablet ? "70px 32px" : "80px 48px";
  const [imgs, setImgs] = useState([
    `${WMS}/ws-post-images/1705054040613_a2884100-42da-4272-a916-a7ca53d6af1f.jpg`,
    `${WMS}/ws-post-images/1707992662478_75d9a4c0-a664-4a74-8657-52e67ee556d5.jpg`,
    `${WMS}/ws-post-images/1755409861854_979f668e-2149-4062-9f4e-064d17a6b3f0.jpg`,
    `${WMS}/ws-post-images/1753092287010_daeb773f-8848-44ae-8952-7cd304a4112a.jpg`,
    `${WMS}/ws-post-images/1737706699347_5e70dab7-8575-46ed-8a62-532efa9f0c7e.jpg`,
    `${WMS}/ws-post-images/1737705941892_22adfe1c-ec1c-4e07-ad7d-60668e4cd6ee.jpg`,
  ]);

  useEffect(() => {
    sb.from("gallery").select("*").eq("active", true).order("sort_order", { ascending: true }).limit(6).then(({ data }) => {
      if (data && data.length > 0) setImgs(data.map(g => g.img_url).filter(Boolean));
    });
  }, []);

  return (
    <section id="gallery" style={{ padding: "80px 0", background: C.off }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: pad }}>
        <SecLabel>Gallery</SecLabel>
        <SecTitle>Life at Babylon</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 10 : 16, marginTop: 32 }}>
          {imgs.map((src, i) => (
            <div key={i} style={{ height: isMobile ? 140 : i < 2 ? 240 : 180, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "transform .2s" }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseOut={e => e.currentTarget.style.transform = "none"}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showAdmission, setShowAdmission] = useState(false);

  useEffect(() => {
    // Load Cormorant Garamond (hero headlines) + Plus Jakarta Sans (body)
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.width = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100%";
  }, []);

  // ┌──────────────────────────────────────────────────────────────────┐
  // │  HOW TO USE YOUR VIDEO                                           │
  // │                                                                  │
  // │  1. Add your video file to:  src/assets/hero-video.mp4          │
  // │  2. Uncomment the import below:                                  │
  // │       import heroVideo from "./assets/hero-video.mp4";          │
  // │  3. Change  heroVideo={null}  to  heroVideo={heroVideo}         │
  // │     in the <HeroSlider> line below.                              │
  // └──────────────────────────────────────────────────────────────────┘
  // import heroVideo from "./assets/hero-video.mp4";   ← uncomment this line

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.dark, background: C.white, overflowX: "hidden", width: "100%", margin: 0, padding: 0, boxSizing: "border-box" }}>
      <FloatingButtons onApply={() => setShowAdmission(true)} />
      {/* Topbar (E-Portal + Login) REMOVED */}
      <Navbar onApply={() => setShowAdmission(true)} />
      <HeroSlider
  onApply={() => setShowAdmission(true)}
  // change null to heroVideo after importing your video
  heroVideo={heroVideo}
/>
      <About />
      <Messages />
      <Services />
      <Blog />
      <Events />
      <Courses />
      <Gallery />
      <Testimonials />
      <SyllabusPage />
      <MapSection />
      <Footer onApply={() => setShowAdmission(true)} />
      {showAdmission && <AdmissionModal onClose={() => setShowAdmission(false)} />}
    </div>
  );
}