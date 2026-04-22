// app/page.tsx  (or components/HomePage.tsx)
"use client";
import { Avatar, Btn, SectionLabel } from "@/components/ui";
import MiniDoctorCard from "@/components/MiniDoctorCard";
import T from "@/lib/tokens";
import { DOCTORS, STATS, SPECIALTIES_GRID } from "@/lib/data";
import { Doctor } from "@/lib/types";

interface HomePageProps {
  onExplore: () => void;
  onBook: (doc: Doctor) => void;
}

export default function HomePage({ onExplore, onBook }: HomePageProps) {
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(145deg, ${T.navy} 0%, ${T.navyLight} 55%, #1a5fa8 100%)`,
        padding: "clamp(48px,8vw,96px) clamp(16px,4vw,80px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute",top:-80,right:-60,width:360,height:360,borderRadius:"50%",background:T.sky,opacity:.06 }} />
        <div style={{ position:"absolute",bottom:-120,left:-80,width:280,height:280,borderRadius:"50%",background:T.sky,opacity:.05 }} />

        <div style={{
          maxWidth: 920, margin: "0 auto", position: "relative",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center",
        }}>
          {/* Left copy */}
          <div>
            <div className="anim-1" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:"rgba(56,189,248,.15)",border:`1px solid ${T.sky}40`,
              borderRadius:999,padding:"6px 16px",marginBottom:24,
            }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:T.sky,display:"inline-block" }} />
              <span style={{ color:T.sky,fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase" }}>
                Healthcare Reimagined
              </span>
            </div>

            <h1 className="anim-2" style={{
              fontSize:"clamp(32px,4.5vw,52px)",fontWeight:900,color:T.white,
              lineHeight:1.1,letterSpacing:-1.5,marginBottom:20,
            }}>
              Your Health,<br />
              <span style={{ color:T.sky }}>Our Priority.</span>
            </h1>

            <p className="anim-3" style={{ color:"#BAC8E0",fontSize:16,lineHeight:1.7,marginBottom:32,maxWidth:440 }}>
              Connect with world-class specialists from the comfort of your home.
              Book instantly, consult confidently, heal faster.
            </p>

            <div className="anim-4" style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <Btn onClick={onExplore} variant="sky">Find a Doctor →</Btn>
              <button style={{
                background:"transparent",border:`1.5px solid rgba(255,255,255,0.25)`,
                color:T.white,borderRadius:10,padding:"12px 24px",fontSize:14,
                fontWeight:600,cursor:"pointer",fontFamily:"inherit",
              }}>
                How it works
              </button>
            </div>

            {/* Trust strip */}
            <div className="anim-4" style={{ display:"flex",alignItems:"center",gap:16,marginTop:36 }}>
              <div style={{ display:"flex" }}>
                {["AO","LF","MC","SM"].map((ini,i) => (
                  <div key={ini} style={{
                    width:30,height:30,borderRadius:"50%",marginLeft:i===0?0:-8,
                    background:`linear-gradient(135deg,${T.navyLight},${T.skyDark})`,
                    border:`2px solid ${T.navy}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:10,fontWeight:700,color:T.white,zIndex:4-i,
                  }}>{ini}</div>
                ))}
              </div>
              <div>
                <div style={{ color:T.white,fontWeight:700,fontSize:14 }}>12,400+ patients</div>
                <div style={{ color:"#8AACCC",fontSize:12 }}>trust VirtuCare</div>
              </div>
            </div>
          </div>

          {/* Right — upcoming visit card */}
          <div style={{ display:"flex",justifyContent:"center" }}>
            <div style={{
              background:"rgba(255,255,255,0.07)",backdropFilter:"blur(16px)",
              border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:24,
              padding:28,width:"100%",maxWidth:340,
            }}>
              <div style={{ fontSize:13,color:T.sky,fontWeight:700,letterSpacing:0.5,marginBottom:20 }}>UPCOMING VISIT</div>
              <div style={{ display:"flex",gap:14,alignItems:"center",marginBottom:20 }}>
                <Avatar initials="AO" size={52} ring />
                <div>
                  <div style={{ color:T.white,fontWeight:800,fontSize:16 }}>Dr. Amara Osei</div>
                  <div style={{ color:"#8AACCC",fontSize:13,marginTop:2 }}>Cardiologist</div>
                </div>
              </div>
              <div style={{
                background:"rgba(255,255,255,0.08)",borderRadius:14,
                padding:"14px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20,
              }}>
                {([["📅","Date","Mon, Apr 28"],["🕑","Time","10:00 AM"],["📍","Location","Virtual"],["⏱","Duration","30 min"]] as [string,string,string][]).map(([icon,label,val]) => (
                  <div key={label}>
                    <div style={{ color:"#6A8EB0",fontSize:11,fontWeight:600,marginBottom:3 }}>{icon} {label}</div>
                    <div style={{ color:T.white,fontWeight:700,fontSize:13 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{
                background:T.sky,borderRadius:10,padding:"10px 0",
                textAlign:"center",color:T.navy,fontWeight:800,fontSize:14,cursor:"pointer",
              }}>
                Join Consultation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section style={{
        background:T.white,
        padding:"clamp(24px,4vw,48px) clamp(16px,4vw,80px)",
        borderBottom:`1.5px solid ${T.borderLight}`,
      }}>
        <div style={{ maxWidth:920,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }}>
          {STATS.map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:28,marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontSize:28,fontWeight:900,color:T.navy,letterSpacing:-1 }}>{s.value}</div>
              <div style={{ fontSize:13,color:T.slate,fontWeight:500,marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPECIALTIES GRID ──────────────────────────────── */}
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(16px,4vw,80px)" }}>
        <div style={{ maxWidth:920,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36 }}>
            <div>
              <SectionLabel>SPECIALTIES</SectionLabel>
              <h2 style={{ fontSize:28,fontWeight:800,color:T.navy,letterSpacing:-0.5 }}>Browse by Category</h2>
            </div>
            <button onClick={onExplore} style={{ background:"none",border:"none",color:T.skyDark,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>View all →</button>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:16 }}>
            {SPECIALTIES_GRID.map((sp,i) => (
              <div key={i} onClick={onExplore} className="card-hover" style={{
                background:T.white,borderRadius:16,border:`1.5px solid ${T.borderLight}`,
                padding:"20px 16px",textAlign:"center",cursor:"pointer",
                boxShadow:"0 2px 8px rgba(11,31,75,.05)",
              }}>
                <div style={{ fontSize:28,marginBottom:10 }}>{sp.icon}</div>
                <div style={{ fontSize:13,fontWeight:700,color:T.navy,marginBottom:3 }}>{sp.label}</div>
                <div style={{ fontSize:11,color:T.slateLight }}>{sp.count} doctors</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DOCTORS ──────────────────────────────── */}
      <section style={{ padding:"0 clamp(16px,4vw,80px) clamp(48px,6vw,72px)",background:T.offWhite }}>
        <div style={{ maxWidth:920,margin:"0 auto",paddingTop:"clamp(40px,6vw,72px)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32 }}>
            <div>
              <SectionLabel>RECOMMENDED</SectionLabel>
              <h2 style={{ fontSize:28,fontWeight:800,color:T.navy,letterSpacing:-0.5 }}>Top Specialists</h2>
            </div>
            <button onClick={onExplore} style={{ background:"none",border:"none",color:T.skyDark,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>See all →</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20 }}>
            {DOCTORS.slice(0,4).map(doc => (
              <MiniDoctorCard key={doc.id} doc={doc} onBook={() => onBook(doc)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section style={{ padding:"clamp(48px,6vw,80px) clamp(16px,4vw,80px)" }}>
        <div style={{ maxWidth:920,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <SectionLabel>PROCESS</SectionLabel>
            <h2 style={{ fontSize:28,fontWeight:800,color:T.navy,letterSpacing:-0.5 }}>How VirtuCare Works</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32 }}>
            {[
              { step:"01",title:"Find a Doctor",desc:"Browse our network of verified specialists and filter by specialty, availability and ratings.",icon:"🔍" },
              { step:"02",title:"Book a Slot",desc:"Select your preferred date and time from real-time availability and confirm your appointment.",icon:"📅" },
              { step:"03",title:"Start Healing",desc:"Attend your virtual or in-person consultation and receive your personalised care plan.",icon:"✅" },
            ].map((s,i) => (
              <div key={i} style={{ position:"relative" }}>
                <div style={{ background:T.white,borderRadius:20,border:`1.5px solid ${T.borderLight}`,padding:28,boxShadow:"0 4px 20px rgba(11,31,75,.06)" }}>
                  <div style={{
                    width:44,height:44,borderRadius:12,
                    background:`linear-gradient(135deg,${T.navy},${T.navyLight})`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:20,marginBottom:18,
                  }}>{s.icon}</div>
                  <div style={{ fontSize:11,color:T.slateLight,fontWeight:700,letterSpacing:1.5,marginBottom:8 }}>STEP {s.step}</div>
                  <div style={{ fontSize:17,fontWeight:800,color:T.navy,marginBottom:10 }}>{s.title}</div>
                  <div style={{ fontSize:14,color:T.slate,lineHeight:1.65 }}>{s.desc}</div>
                </div>
                {i < 2 && <div style={{ position:"absolute",top:"50%",right:-20,fontSize:20,color:T.skyLight,zIndex:10 }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section style={{ padding:"0 clamp(16px,4vw,80px) clamp(48px,6vw,72px)" }}>
        <div style={{ maxWidth:920,margin:"0 auto" }}>
          <div style={{
            background:`linear-gradient(135deg,${T.navy},${T.navyLight})`,
            borderRadius:24,padding:"48px clamp(24px,4vw,60px)",
            display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,
            position:"relative",overflow:"hidden",
          }}>
            <div style={{ position:"absolute",right:-40,top:-40,width:200,height:200,borderRadius:"50%",background:T.sky,opacity:.07 }} />
            <div>
              <h3 style={{ color:T.white,fontWeight:800,fontSize:24,letterSpacing:-0.5,marginBottom:8 }}>
                Ready to take control of your health?
              </h3>
              <p style={{ color:"#8AACCC",fontSize:14,lineHeight:1.6 }}>
                Join 12,400+ patients who trust VirtuCare for their healthcare needs.
              </p>
            </div>
            <Btn onClick={onExplore} variant="sky">Book Your First Visit</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}