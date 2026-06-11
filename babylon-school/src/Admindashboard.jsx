import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

const SUPABASE_URL = "https://zctwuadyvwyxqgallqxn.supabase.co";
const SUPABASE_KEY = "sb_publishable_bC2GK8aMTdvVG1yQhm5ONA_ZzrtFkA0";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET = "pictures";

const C = {
  red:"#D52027",teal:"#12A5BF",tealLight:"#1cbdd9",navy:"#1a2744",
  dark:"#323239",mid:"#434343",white:"#ffffff",off:"#f8f9fb",
  border:"#e8ecf0",gold:"#c9972c",green:"#16a34a",greenBg:"#dcfce7",
  amber:"#d97706",amberBg:"#fef3c7",dangerBg:"#fee2e2",
};

// ── Responsive Hook ───────────────────────────────────────────────────────────
function useBreakpoint(){
  const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1024);
  useEffect(()=>{
    const h=()=>setW(window.innerWidth);
    window.addEventListener("resize",h);
    return()=>window.removeEventListener("resize",h);
  },[]);
  return{isMobile:w<640,isTablet:w>=640&&w<1024,isDesktop:w>=1024,w};
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const Ic = ({d,size=18})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const IcDash    =()=><Ic d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>;
const IcStudents=()=><Ic d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>;
const IcStaff   =()=><Ic d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>;
const IcEvents  =()=><Ic d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>;
const IcBlog    =()=><Ic d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/>;
const IcSyllabus=()=><Ic d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>;
const IcGallery =()=><Ic d="M3 3h18v18H3zM3 9h18M9 21V9"/>;
const IcHero    =()=><Ic d="M1 3h22v14H1zM8 21h8M12 17v4"/>;
const IcServices=()=><Ic d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>;
const IcMessages=()=><Ic d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>;
const IcCourses =()=><Ic d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>;
const IcTestim  =()=><Ic d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>;
const IcEdit    =()=><Ic d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>;
const IcDelete  =()=><Ic d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>;
const IcPlus    =()=><Ic d="M12 5v14M5 12h14"/>;
const IcSearch  =()=><Ic d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>;
const IcClose   =()=><Ic d="M18 6 6 18M6 6l12 12"/>;
const IcCheck   =()=><Ic d="M20 6 9 17l-5-5"/>;
const IcLink    =()=><Ic d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>;
const IcExcel   =()=><Ic d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h2M8 17h2M12 13h4M12 17h4"/>;
const IcLogout  =()=><Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>;
const IcUpload  =()=><Ic d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>;
const IcLock    =()=><Ic d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4"/>;
const IcMenu    =()=><Ic d="M3 6h18M3 12h18M3 18h18"/>;
const IcImage   =()=><Ic d="M21 15l-5-5L5 21M21 3H3v18h18zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>;

// ── Shared UI ──────────────────────────────────────────────────────────────────
const inp={width:"100%",padding:"10px 13px",border:`1.5px solid ${C.border}`,borderRadius:9,fontSize:14,color:C.dark,outline:"none",background:C.white,fontFamily:"inherit",boxSizing:"border-box"};

const Field=({label,children})=>(
  <div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:12.5,fontWeight:600,color:C.mid,marginBottom:6}}>{label}</label>
    {children}
  </div>
);
const Inp=({value,onChange,type="text",placeholder,disabled})=>(
  <input type={type} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled} style={{...inp,opacity:disabled?.6:1}}/>
);
const Sel=({value,onChange,options})=>(
  <select value={value||""} onChange={e=>onChange(e.target.value)} style={{...inp}}>
    {options.map(o=><option key={o}>{o}</option>)}
  </select>
);
const Txt=({value,onChange,rows=3,placeholder})=>(
  <textarea value={value||""} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{...inp,resize:"vertical"}}/>
);

function Badge({label}){
  const map={Active:{bg:C.greenBg,color:C.green},Published:{bg:C.greenBg,color:C.green},Completed:{bg:C.greenBg,color:C.green},true:{bg:C.greenBg,color:C.green},Inactive:{bg:C.dangerBg,color:C.red},Draft:{bg:C.amberBg,color:C.amber},Upcoming:{bg:"#dbeafe",color:"#1d4ed8"},false:{bg:C.dangerBg,color:C.red}};
  const s=map[label]||{bg:C.off,color:C.mid};
  return <span style={{padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:600,background:s.bg,color:s.color}}>{String(label)}</span>;
}

function Modal({title,onClose,children,wide}){
  const{isMobile}=useBreakpoint();
  return(
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(26,39,68,.55)",display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",padding:isMobile?0:16}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:isMobile?"18px 18px 0 0":18,width:"100%",maxWidth:isMobile?"100%":wide?720:520,maxHeight:isMobile?"92vh":"90vh",overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:isMobile?"16px 18px":"20px 24px",borderBottom:`1px solid ${C.border}`}}>
          <h3 style={{margin:0,fontSize:isMobile?15:17,fontWeight:700,color:C.dark}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#999",padding:4}}><IcClose/></button>
        </div>
        <div style={{padding:isMobile?16:24,overflowY:"auto",flex:1}}>{children}</div>
      </div>
    </div>
  );
}

function Confirm({name,onConfirm,onCancel}){
  return(
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p style={{color:C.mid,fontSize:15,marginBottom:24,lineHeight:1.6}}>Delete <strong style={{color:C.dark}}>{name}</strong>? This cannot be undone.</p>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button onClick={onCancel} style={{padding:"10px 20px",borderRadius:9,border:`1.5px solid ${C.border}`,background:C.white,color:C.mid,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Cancel</button>
        <button onClick={onConfirm} style={{padding:"10px 20px",borderRadius:9,border:"none",background:C.red,color:"white",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:600}}>Delete</button>
      </div>
    </Modal>
  );
}

function SaveBtn({onClick,label="Save",loading}){
  return(
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
      <button onClick={onClick} disabled={loading} style={{display:"flex",alignItems:"center",gap:7,background:loading?"#aaa":C.teal,color:"white",border:"none",borderRadius:9,padding:"11px 22px",fontSize:14,fontWeight:600,cursor:loading?"not-allowed":"pointer"}}>
        {loading?"Saving…":<><IcCheck/> {label}</>}
      </button>
    </div>
  );
}

function Spinner(){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:60}}>
      <div style={{width:36,height:36,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.teal}`,borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function exportToExcel(data,filename){
  const ws=XLSX.utils.json_to_sheet(data);
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
  XLSX.writeFile(wb,`${filename}.xlsx`);
}

// ── Upload Helper ──────────────────────────────────────────────────────────────
async function uploadFile(file,folder="uploads"){
  const ext=file.name.split(".").pop();
  const path=`${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const{error}=await sb.storage.from(BUCKET).upload(path,file,{upsert:true});
  if(error)return null;
  const{data}=sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ── Photo Upload Widget ────────────────────────────────────────────────────────
function PhotoUpload({url,onChange,folder="uploads",label="Photo"}){
  const[uploading,setUploading]=useState(false);
  const ref=useRef(null);
  const handle=async(file)=>{
    setUploading(true);
    const u=await uploadFile(file,folder);
    if(u)onChange(u);
    setUploading(false);
  };
  return(
    <div style={{display:"flex",alignItems:"center",gap:16,padding:16,background:C.off,borderRadius:12,border:`1px dashed ${C.border}`,marginBottom:16}}>
      {url?(
        <img src={url} alt="" style={{width:64,height:64,borderRadius:10,objectFit:"cover",border:`2px solid ${C.teal}`}}/>
      ):(
        <div style={{width:64,height:64,borderRadius:10,background:C.teal+"20",display:"flex",alignItems:"center",justifyContent:"center",color:C.teal}}><IcImage/></div>
      )}
      <div>
        <div style={{fontSize:13.5,fontWeight:600,color:C.dark,marginBottom:6}}>{label}</div>
        <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&handle(e.target.files[0])}/>
        <button onClick={()=>ref.current.click()} disabled={uploading}
          style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,border:`1.5px solid ${C.teal}`,color:C.teal,background:"white",cursor:"pointer",fontSize:13,fontWeight:600}}>
          <IcUpload/> {uploading?"Uploading…":"Upload Image"}
        </button>
      </div>
    </div>
  );
}

// ── Table Section ──────────────────────────────────────────────────────────────
function TableSection({title,count,onAdd,addLabel,searchVal,onSearch,onExport,children}){
  const{isMobile}=useBreakpoint();
  return(
    <div>
      <div style={{display:"flex",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12,flexDirection:isMobile?"column":"row"}}>
        <div>
          <h2 style={{margin:0,fontSize:isMobile?17:20,fontWeight:700,color:C.dark}}>{title}</h2>
          <p style={{margin:"4px 0 0",fontSize:13,color:"#888"}}>{count} records</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",width:isMobile?"100%":"auto"}}>
          <div style={{position:"relative",flex:isMobile?1:"unset"}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#aaa"}}><IcSearch/></span>
            <input value={searchVal} onChange={e=>onSearch(e.target.value)} placeholder="Search…" style={{...inp,paddingLeft:36,width:isMobile?"100%":200,borderRadius:9}}/>
          </div>
          {onExport&&<button onClick={onExport} style={{display:"flex",alignItems:"center",gap:6,background:C.green,color:"white",border:"none",borderRadius:9,padding:"9px 14px",fontSize:13,fontWeight:600,cursor:"pointer"}}><IcExcel/> {!isMobile&&"Excel"}</button>}
          {onAdd&&<button onClick={onAdd} style={{display:"flex",alignItems:"center",gap:7,background:C.teal,color:"white",border:"none",borderRadius:9,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}><IcPlus/> {addLabel}</button>}
        </div>
      </div>
      <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden"}}>{children}</div>
    </div>
  );
}
function Tbl({cols,children}){
  return(
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:C.off,borderBottom:`1px solid ${C.border}`}}>
          {cols.map(c=><th key={c} style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:700,color:"#888",letterSpacing:.8,textTransform:"uppercase",whiteSpace:"nowrap"}}>{c}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
const TR=({children,last})=><tr style={{borderBottom:last?"none":`1px solid ${C.border}`}}>{children}</tr>;
const TD=({children,bold})=><td style={{padding:"13px 16px",fontSize:13.5,color:bold?C.dark:C.mid,fontWeight:bold?600:400}}>{children}</td>;
function ActBtns({onEdit,onDelete}){
  return(
    <td style={{padding:"13px 16px"}}>
      <div style={{display:"flex",gap:6}}>
        <button onClick={onEdit} style={{padding:"6px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:C.white,color:C.teal,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12.5,fontWeight:600}}><IcEdit/> Edit</button>
        <button onClick={onDelete} style={{padding:"6px 10px",borderRadius:7,border:`1px solid ${C.dangerBg}`,background:C.dangerBg,color:C.red,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12.5,fontWeight:600}}><IcDelete/> Delete</button>
      </div>
    </td>
  );
}

// ── Generic CRUD hook ──────────────────────────────────────────────────────────
function useCRUD(table,orderCol="created_at",asc=false){
  const[rows,setRows]=useState([]);
  const[loading,setLoading]=useState(true);
  const load=async()=>{
    setLoading(true);
    const{data}=await sb.from(table).select("*").order(orderCol,{ascending:asc});
    setRows(data||[]);
    setLoading(false);
  };
  useEffect(()=>{load();},[]);
  const save=async(form,isEdit)=>{
    const{id,...rest}=form;
    if(isEdit)await sb.from(table).update(rest).eq("id",id);
    else await sb.from(table).insert([rest]);
    load();
  };
  const del=async(id)=>{await sb.from(table).delete().eq("id",id);load();};
  return{rows,loading,load,save,del};
}

// ── LOGIN ──────────────────────────────────────────────────────────────────────
function LoginPage({onLogin}){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const handle=async()=>{
    if(!email||!password){setError("Enter email and password.");return;}
    setLoading(true);setError("");
    const{data,error:err}=await sb.from("admins").select("*").eq("email",email).eq("password",password).single();
    if(err||!data){setError("Invalid email or password.");}
    else{sessionStorage.setItem("bns_admin",JSON.stringify({email:data.email,name:data.name}));onLogin(data);}
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif"}}>
      <div style={{background:C.white,borderRadius:20,padding:"48px 40px",width:"100%",maxWidth:420,boxShadow:"0 24px 60px rgba(0,0,0,.3)"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:56,height:56,borderRadius:14,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"white"}}><IcLock/></div>
          <h2 style={{margin:0,fontSize:22,fontWeight:700,color:C.dark}}>Admin Login</h2>
          <p style={{margin:"8px 0 0",fontSize:13.5,color:"#888"}}>Babylon National School</p>
        </div>
        <Field label="Email Address"><Inp value={email} onChange={setEmail} type="email" placeholder="admin@babylonschool.edu.np"/></Field>
        <Field label="Password"><Inp value={password} onChange={setPassword} type="password" placeholder="••••••••"/></Field>
        {error&&<div style={{background:C.dangerBg,color:C.red,padding:"10px 14px",borderRadius:8,fontSize:13.5,marginBottom:16}}>{error}</div>}
        <button onClick={handle} disabled={loading} style={{width:"100%",padding:13,background:loading?"#aaa":C.teal,color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",marginTop:8}}>
          {loading?"Signing in…":"Sign In"}
        </button>
        <p style={{textAlign:"center",fontSize:12,color:"#bbb",marginTop:24}}>Default: admin@babylonschool.edu.np / babylon@admin123</p>
      </div>
    </div>
  );
}

// ── STUDENTS ───────────────────────────────────────────────────────────────────
const GRADES=["Grade PG","Grade Nursery","Grade KG","Grade I","Grade II","Grade III","Grade IV","Grade V","Grade VI","Grade VII","Grade VIII","Grade IX","Grade X"];
function Students(){
  const{rows,loading,save,del}=useCRUD("students");
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({name:"",grade:"Grade I",section:"A",phone:"",email:"",guardian:"",address:"",join_date:new Date().toISOString().slice(0,10),status:"Active"});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const filtered=rows.filter(r=>r.name?.toLowerCase().includes(search.toLowerCase())||r.grade?.toLowerCase().includes(search.toLowerCase())||r.guardian?.toLowerCase().includes(search.toLowerCase()));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  const doDel=async(id)=>{await del(id);setModal(null);};
  return(
    <TableSection title="Students" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Student" searchVal={search} onSearch={setSearch}
      onExport={()=>exportToExcel(rows.map(r=>({Name:r.name,Grade:r.grade,Section:r.section,Guardian:r.guardian,Phone:r.phone,Email:r.email,Address:r.address,"Join Date":r.join_date,Status:r.status})),"Students")}>
      {loading?<Spinner/>:(
        <Tbl cols={["Name","Grade","Section","Guardian","Phone","Join Date","Status","Actions"]}>
          {filtered.map((r,i)=>(
            <TR key={r.id} last={i===filtered.length-1}>
              <TD bold>{r.name}</TD><TD>{r.grade}</TD><TD>{r.section}</TD>
              <TD>{r.guardian}</TD><TD>{r.phone}</TD><TD>{r.join_date}</TD>
              <TD><Badge label={r.status}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {!loading&&filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"#aaa"}}>No students found.</div>}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Student":"Add Student"} onClose={()=>setModal(null)} wide>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Full Name"><Inp value={form.name} onChange={u("name")}/></Field>
            <Field label="Grade"><Sel value={form.grade} onChange={u("grade")} options={GRADES}/></Field>
            <Field label="Section"><Sel value={form.section} onChange={u("section")} options={["A","B","C","D"]}/></Field>
            <Field label="Phone"><Inp value={form.phone} onChange={u("phone")}/></Field>
            <Field label="Email"><Inp value={form.email} onChange={u("email")} type="email"/></Field>
            <Field label="Guardian"><Inp value={form.guardian} onChange={u("guardian")}/></Field>
            <Field label="Join Date"><Inp value={form.join_date} onChange={u("join_date")} type="date"/></Field>
            <Field label="Status"><Sel value={form.status} onChange={u("status")} options={["Active","Inactive"]}/></Field>
          </div>
          <Field label="Address"><Inp value={form.address} onChange={u("address")}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Student"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.name} onConfirm={()=>doDel(modal.del.id)} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── STAFF ──────────────────────────────────────────────────────────────────────
const ROLES=["Principal","Vice Principal","Head of Department","Teacher","Librarian","Admin Staff","Support Staff"];
const DEPTS=["Administration","Science","Mathematics","English","Nepali","Social Studies","Computer","PE","Arts","Library"];
function Staff(){
  const{rows,loading,save,del}=useCRUD("staff");
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({name:"",role:"Teacher",dept:"Science",phone:"",email:"",join_date:new Date().toISOString().slice(0,10),status:"Active",photo_url:""});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const filtered=rows.filter(r=>r.name?.toLowerCase().includes(search.toLowerCase())||r.role?.toLowerCase().includes(search.toLowerCase())||r.dept?.toLowerCase().includes(search.toLowerCase()));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Staff & Teachers" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Staff" searchVal={search} onSearch={setSearch}
      onExport={()=>exportToExcel(rows.map(r=>({Name:r.name,Role:r.role,Department:r.dept,Phone:r.phone,Email:r.email,"Join Date":r.join_date,Status:r.status})),"Staff")}>
      {loading?<Spinner/>:(
        <Tbl cols={["Photo","Name","Role","Department","Phone","Email","Status","Actions"]}>
          {filtered.map((r,i)=>(
            <TR key={r.id} last={i===filtered.length-1}>
              <TD>{r.photo_url?<img src={r.photo_url} alt={r.name} style={{width:38,height:38,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.border}`}}/>:<div style={{width:38,height:38,borderRadius:"50%",background:C.teal+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:C.teal}}>{r.name?.charAt(0)}</div>}</TD>
              <TD bold>{r.name}</TD><TD>{r.role}</TD><TD>{r.dept}</TD>
              <TD>{r.phone}</TD><TD>{r.email}</TD>
              <TD><Badge label={r.status}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {!loading&&filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"#aaa"}}>No staff found.</div>}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Staff":"Add Staff"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.photo_url} onChange={v=>setForm(p=>({...p,photo_url:v}))} folder="staff" label="Staff Photo"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Full Name"><Inp value={form.name} onChange={u("name")}/></Field>
            <Field label="Role"><Sel value={form.role} onChange={u("role")} options={ROLES}/></Field>
            <Field label="Department"><Sel value={form.dept} onChange={u("dept")} options={DEPTS}/></Field>
            <Field label="Phone"><Inp value={form.phone} onChange={u("phone")}/></Field>
            <Field label="Email"><Inp value={form.email} onChange={u("email")} type="email"/></Field>
            <Field label="Join Date"><Inp value={form.join_date} onChange={u("join_date")} type="date"/></Field>
            <Field label="Status"><Sel value={form.status} onChange={u("status")} options={["Active","Inactive"]}/></Field>
          </div>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update Staff":"Add Staff"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.name} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── EVENTS ─────────────────────────────────────────────────────────────────────
function Events(){
  const{rows,loading,save,del}=useCRUD("events","date",false);
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({title:"",date:new Date().toISOString().slice(0,10),category:"Academic",description:"",status:"Upcoming"});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const filtered=rows.filter(r=>r.title?.toLowerCase().includes(search.toLowerCase())||r.category?.toLowerCase().includes(search.toLowerCase()));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Events & News" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Event" searchVal={search} onSearch={setSearch}
      onExport={()=>exportToExcel(rows.map(r=>({Title:r.title,Date:r.date,Category:r.category,Status:r.status,Description:r.description})),"Events")}>
      {loading?<Spinner/>:(
        <Tbl cols={["Title","Date","Category","Status","Description","Actions"]}>
          {filtered.map((r,i)=>(
            <TR key={r.id} last={i===filtered.length-1}>
              <TD bold>{r.title}</TD><TD>{r.date}</TD><TD>{r.category}</TD>
              <TD><Badge label={r.status}/></TD>
              <TD><span style={{maxWidth:200,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.description}</span></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {!loading&&filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"#aaa"}}>No events found.</div>}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Event":"Add Event"} onClose={()=>setModal(null)}>
          <Field label="Title"><Inp value={form.title} onChange={u("title")}/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Date"><Inp value={form.date} onChange={u("date")} type="date"/></Field>
            <Field label="Category"><Sel value={form.category} onChange={u("category")} options={["Academic","Cultural","Sports","Holiday","Community","Workshop","Other"]}/></Field>
            <Field label="Status"><Sel value={form.status} onChange={u("status")} options={["Upcoming","Completed","Cancelled"]}/></Field>
          </div>
          <Field label="Description"><Txt value={form.description} onChange={u("description")} rows={4}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update Event":"Add Event"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.title} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── BLOG ───────────────────────────────────────────────────────────────────────
function Blog(){
  const{rows,loading,save,del}=useCRUD("blogs");
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({title:"",author:"",date:new Date().toISOString().slice(0,10),category:"Education",content:"",status:"Draft",img_url:""});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const filtered=rows.filter(r=>r.title?.toLowerCase().includes(search.toLowerCase())||r.author?.toLowerCase().includes(search.toLowerCase()));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Blog Posts" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="New Post" searchVal={search} onSearch={setSearch}
      onExport={()=>exportToExcel(rows.map(r=>({Title:r.title,Author:r.author,Date:r.date,Category:r.category,Status:r.status})),"Blogs")}>
      {loading?<Spinner/>:(
        <Tbl cols={["Image","Title","Author","Date","Category","Status","Actions"]}>
          {filtered.map((r,i)=>(
            <TR key={r.id} last={i===filtered.length-1}>
              <TD>{r.img_url?<img src={r.img_url} alt="" style={{width:44,height:36,borderRadius:6,objectFit:"cover"}}/>:<div style={{width:44,height:36,borderRadius:6,background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc"}}><IcImage/></div>}</TD>
              <TD bold>{r.title}</TD><TD>{r.author}</TD><TD>{r.date}</TD>
              <TD>{r.category}</TD><TD><Badge label={r.status}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {!loading&&filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"#aaa"}}>No posts found.</div>}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Post":"New Blog Post"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="blog" label="Blog Cover Image"/>
          <Field label="Title"><Inp value={form.title} onChange={u("title")}/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Author"><Inp value={form.author} onChange={u("author")}/></Field>
            <Field label="Date"><Inp value={form.date} onChange={u("date")} type="date"/></Field>
            <Field label="Category"><Sel value={form.category} onChange={u("category")} options={["Technology","Environment","Health","Science","Culture","Sports","Education","Other"]}/></Field>
            <Field label="Status"><Sel value={form.status} onChange={u("status")} options={["Published","Draft"]}/></Field>
          </div>
          <Field label="Content"><Txt value={form.content} onChange={u("content")} rows={6}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update Post":"Publish Post"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.title} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── SYLLABUS ───────────────────────────────────────────────────────────────────
function Syllabus(){
  const{rows,loading,save,del}=useCRUD("syllabus");
  const[search,setSearch]=useState("");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({grade:"Grade I",subject:"Full Syllabus",year:"2083",url:"",status:"Active"});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const filtered=rows.filter(r=>r.grade?.toLowerCase().includes(search.toLowerCase())||r.year?.includes(search));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Syllabus & Documents" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Document" searchVal={search} onSearch={setSearch}
      onExport={()=>exportToExcel(rows.map(r=>({Grade:r.grade,Subject:r.subject,Year:r.year,URL:r.url,Status:r.status})),"Syllabus")}>
      {loading?<Spinner/>:(
        <Tbl cols={["Grade","Subject","Year","Status","URL","Actions"]}>
          {filtered.map((r,i)=>(
            <TR key={r.id} last={i===filtered.length-1}>
              <TD bold>{r.grade}</TD><TD>{r.subject}</TD><TD>{r.year}</TD>
              <TD><Badge label={r.status}/></TD>
              <TD>{r.url?<a href={r.url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,color:C.teal,fontSize:13,textDecoration:"none",fontWeight:500}}><IcLink/> View</a>:<span style={{color:"#ccc"}}>No URL</span>}</TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {!loading&&filtered.length===0&&<div style={{padding:40,textAlign:"center",color:"#aaa"}}>No documents.</div>}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Document":"Add Document"} onClose={()=>setModal(null)}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Grade"><Sel value={form.grade} onChange={u("grade")} options={[...GRADES,"Academic Calendar","Babylon Buds"]}/></Field>
            <Field label="Subject / Type"><Inp value={form.subject} onChange={u("subject")}/></Field>
            <Field label="Year"><Inp value={form.year} onChange={u("year")} placeholder="2083"/></Field>
            <Field label="Status"><Sel value={form.status} onChange={u("status")} options={["Active","Inactive"]}/></Field>
          </div>
          <Field label="Google Drive URL"><Inp value={form.url} onChange={u("url")} placeholder="https://drive.google.com/…"/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Document"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={`${modal.del.grade} ${modal.del.subject}`} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── HERO SLIDES ────────────────────────────────────────────────────────────────
function HeroSlides(){
  const{rows,loading,save,del}=useCRUD("hero_slides","sort_order",true);
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({tag:"",h1_before:"",h1_highlight:"",h1_after:"",subtitle:"",img_url:"",active:true,sort_order:rows.length});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Hero Slides" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Slide" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <Tbl cols={["Preview","Tag","Headline","Active","Order","Actions"]}>
          {rows.map((r,i)=>(
            <TR key={r.id} last={i===rows.length-1}>
              <TD>{r.img_url?<img src={r.img_url} alt="" style={{width:80,height:44,borderRadius:6,objectFit:"cover"}}/>:<div style={{width:80,height:44,borderRadius:6,background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc"}}><IcImage/></div>}</TD>
              <TD>{r.tag}</TD>
              <TD bold>{r.h1_before}{r.h1_highlight}{r.h1_after}</TD>
              <TD><Badge label={String(r.active)}/></TD>
              <TD>{r.sort_order}</TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Slide":"Add Slide"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="hero" label="Slide Background Image"/>
          <Field label="Tag (small label above heading)"><Inp value={form.tag} onChange={u("tag")} placeholder="e.g. Kathmandu's Premier English Medium School"/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 12px"}}>
            <Field label="Heading — Before"><Inp value={form.h1_before} onChange={u("h1_before")} placeholder="Nurturing "/></Field>
            <Field label="Heading — Highlight (gold)"><Inp value={form.h1_highlight} onChange={u("h1_highlight")} placeholder="Excellence"/></Field>
            <Field label="Heading — After"><Inp value={form.h1_after} onChange={u("h1_after")} placeholder=", Inspiring Futures"/></Field>
          </div>
          <Field label="Subtitle"><Txt value={form.subtitle} onChange={u("subtitle")} rows={2}/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Sort Order"><Inp value={String(form.sort_order)} onChange={v=>u("sort_order")(parseInt(v)||0)} type="number"/></Field>
            <Field label="Active"><Sel value={String(form.active)} onChange={v=>setForm(p=>({...p,active:v==="true"}))} options={["true","false"]}/></Field>
          </div>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update Slide":"Add Slide"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.tag||"Slide"} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── SERVICES ───────────────────────────────────────────────────────────────────
function Services(){
  const{rows,loading,save,del}=useCRUD("services","sort_order",true);
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({label:"",description:"",img_url:"",sort_order:rows.length,active:true});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Services" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Service" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <Tbl cols={["Image","Label","Description","Active","Actions"]}>
          {rows.map((r,i)=>(
            <TR key={r.id} last={i===rows.length-1}>
              <TD>{r.img_url?<img src={r.img_url} alt="" style={{width:56,height:40,borderRadius:6,objectFit:"cover"}}/>:<div style={{width:56,height:40,borderRadius:6,background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc"}}><IcImage/></div>}</TD>
              <TD bold>{r.label}</TD>
              <TD><span style={{maxWidth:200,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.description}</span></TD>
              <TD><Badge label={String(r.active)}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Service":"Add Service"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="services" label="Service Image"/>
          <Field label="Label (name)"><Inp value={form.label} onChange={u("label")} placeholder="e.g. Cafeteria"/></Field>
          <Field label="Description"><Txt value={form.description} onChange={u("description")} rows={4}/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Sort Order"><Inp value={String(form.sort_order)} onChange={v=>u("sort_order")(parseInt(v)||0)} type="number"/></Field>
            <Field label="Active"><Sel value={String(form.active)} onChange={v=>setForm(p=>({...p,active:v==="true"}))} options={["true","false"]}/></Field>
          </div>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Service"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.label} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── GALLERY ────────────────────────────────────────────────────────────────────
function Gallery(){
  const{rows,loading,save,del}=useCRUD("gallery","sort_order",true);
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({img_url:"",caption:"",sort_order:rows.length,active:true});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Gallery" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Photo" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <div style={{padding:20,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
          {rows.map(r=>(
            <div key={r.id} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,background:C.white}}>
              {r.img_url?<img src={r.img_url} alt={r.caption} style={{width:"100%",height:110,objectFit:"cover"}}/>:<div style={{width:"100%",height:110,background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc"}}><IcImage/></div>}
              <div style={{padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,color:C.mid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:90}}>{r.caption||"No caption"}</span>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={()=>{setForm({...r});setModal("edit");}} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,background:C.white,color:C.teal,cursor:"pointer",fontSize:11,fontWeight:600}}>Edit</button>
                  <button onClick={()=>setModal({del:r})} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.dangerBg}`,background:C.dangerBg,color:C.red,cursor:"pointer",fontSize:11,fontWeight:600}}>Del</button>
                </div>
              </div>
            </div>
          ))}
          {rows.length===0&&!loading&&<div style={{gridColumn:"1/-1",padding:40,textAlign:"center",color:"#aaa"}}>No gallery photos yet.</div>}
        </div>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Photo":"Add Photo"} onClose={()=>setModal(null)}>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="gallery" label="Gallery Photo"/>
          <Field label="Caption"><Inp value={form.caption} onChange={u("caption")} placeholder="Optional caption"/></Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Sort Order"><Inp value={String(form.sort_order)} onChange={v=>u("sort_order")(parseInt(v)||0)} type="number"/></Field>
            <Field label="Active"><Sel value={String(form.active)} onChange={v=>setForm(p=>({...p,active:v==="true"}))} options={["true","false"]}/></Field>
          </div>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Photo"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.caption||"Photo"} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
function Testimonials(){
  const{rows,loading,save,del}=useCRUD("testimonials");
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({name:"",role:"",question:"",text:"",img_url:"",accent:"#12A5BF",active:true});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Testimonials" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Testimonial" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <Tbl cols={["Photo","Name","Role","Text","Active","Actions"]}>
          {rows.map((r,i)=>(
            <TR key={r.id} last={i===rows.length-1}>
              <TD>{r.img_url?<img src={r.img_url} alt={r.name} style={{width:38,height:38,borderRadius:"50%",objectFit:"cover"}}/>:<div style={{width:38,height:38,borderRadius:"50%",background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:14,fontWeight:700}}>{r.name?.charAt(0)}</div>}</TD>
              <TD bold>{r.name}</TD><TD>{r.role}</TD>
              <TD><span style={{maxWidth:180,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.text}</span></TD>
              <TD><Badge label={String(r.active)}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Testimonial":"Add Testimonial"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="testimonials" label="Person Photo"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Name"><Inp value={form.name} onChange={u("name")}/></Field>
            <Field label="Role / Title"><Inp value={form.role} onChange={u("role")} placeholder="Parent of…"/></Field>
            <Field label="Accent Color"><Inp value={form.accent} onChange={u("accent")} placeholder="#12A5BF"/></Field>
            <Field label="Active"><Sel value={String(form.active)} onChange={v=>setForm(p=>({...p,active:v==="true"}))} options={["true","false"]}/></Field>
          </div>
          <Field label="Question Asked"><Inp value={form.question} onChange={u("question")}/></Field>
          <Field label="Testimonial Text"><Txt value={form.text} onChange={u("text")} rows={4}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Testimonial"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.name} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── MESSAGES (Principal / Chairperson) ─────────────────────────────────────────
function Messages(){
  const{rows,loading,save,del}=useCRUD("messages","sort_order",true);
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({person:"",title:"",content:"",img_url:"",sort_order:rows.length});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Leadership Messages" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Message" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <Tbl cols={["Photo","Person","Title","Content Preview","Actions"]}>
          {rows.map((r,i)=>(
            <TR key={r.id} last={i===rows.length-1}>
              <TD>{r.img_url?<img src={r.img_url} alt={r.person} style={{width:38,height:38,borderRadius:"50%",objectFit:"cover"}}/>:<div style={{width:38,height:38,borderRadius:"50%",background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:14,fontWeight:700}}>{r.person?.charAt(0)}</div>}</TD>
              <TD bold>{r.person}</TD><TD>{r.title}</TD>
              <TD><span style={{maxWidth:200,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.content}</span></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Message":"Add Message"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="messages" label="Person Photo"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Person (e.g. Principal)"><Inp value={form.person} onChange={u("person")}/></Field>
            <Field label="Message Title"><Inp value={form.title} onChange={u("title")}/></Field>
            <Field label="Sort Order"><Inp value={String(form.sort_order)} onChange={v=>u("sort_order")(parseInt(v)||0)} type="number"/></Field>
          </div>
          <Field label="Message Content"><Txt value={form.content} onChange={u("content")} rows={5}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Message"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.person} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── COURSES ────────────────────────────────────────────────────────────────────
function Courses(){
  const{rows,loading,save,del}=useCRUD("courses","sort_order",true);
  const[modal,setModal]=useState(null);
  const[saving,setSaving]=useState(false);
  const blank=()=>({num:"01",title:"",description:"",img_url:"",sort_order:rows.length,active:true});
  const[form,setForm]=useState(blank());
  const u=k=>v=>setForm(p=>({...p,[k]:v}));
  const doSave=async()=>{setSaving(true);await save(form,modal==="edit");setSaving(false);setModal(null);};
  return(
    <TableSection title="Programs / Courses" count={rows.length} onAdd={()=>{setForm(blank());setModal("add");}} addLabel="Add Course" searchVal="" onSearch={()=>{}}>
      {loading?<Spinner/>:(
        <Tbl cols={["No.","Image","Title","Description","Active","Actions"]}>
          {rows.map((r,i)=>(
            <TR key={r.id} last={i===rows.length-1}>
              <TD bold>{r.num}</TD>
              <TD>{r.img_url?<img src={r.img_url} alt="" style={{width:56,height:40,borderRadius:6,objectFit:"cover"}}/>:<div style={{width:56,height:40,borderRadius:6,background:C.off,display:"flex",alignItems:"center",justifyContent:"center",color:"#ccc"}}><IcImage/></div>}</TD>
              <TD bold>{r.title}</TD>
              <TD><span style={{maxWidth:180,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.description}</span></TD>
              <TD><Badge label={String(r.active)}/></TD>
              <ActBtns onEdit={()=>{setForm({...r});setModal("edit");}} onDelete={()=>setModal({del:r})}/>
            </TR>
          ))}
        </Tbl>
      )}
      {(modal==="add"||modal==="edit")&&(
        <Modal title={modal==="edit"?"Edit Course":"Add Course"} onClose={()=>setModal(null)} wide>
          <PhotoUpload url={form.img_url} onChange={v=>setForm(p=>({...p,img_url:v}))} folder="courses" label="Course Image"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Number (e.g. 01)"><Inp value={form.num} onChange={u("num")}/></Field>
            <Field label="Title"><Inp value={form.title} onChange={u("title")}/></Field>
            <Field label="Sort Order"><Inp value={String(form.sort_order)} onChange={v=>u("sort_order")(parseInt(v)||0)} type="number"/></Field>
            <Field label="Active"><Sel value={String(form.active)} onChange={v=>setForm(p=>({...p,active:v==="true"}))} options={["true","false"]}/></Field>
          </div>
          <Field label="Description"><Txt value={form.description} onChange={u("description")} rows={4}/></Field>
          <SaveBtn onClick={doSave} loading={saving} label={modal==="edit"?"Update":"Add Course"}/>
        </Modal>
      )}
      {modal?.del&&<Confirm name={modal.del.title} onConfirm={()=>{del(modal.del.id);setModal(null);}} onCancel={()=>setModal(null)}/>}
    </TableSection>
  );
}

// ── DASHBOARD HOME ─────────────────────────────────────────────────────────────
function StatCard({label,value,icon,accent}){
  return(
    <div style={{background:C.white,borderRadius:14,padding:"22px 24px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:18}}>
      <div style={{width:52,height:52,borderRadius:12,background:accent+"18",display:"flex",alignItems:"center",justifyContent:"center",color:accent,flexShrink:0}}>{icon}</div>
      <div>
        <div style={{fontSize:28,fontWeight:700,color:C.dark,lineHeight:1.1}}>{value}</div>
        <div style={{fontSize:13,color:"#888",marginTop:3}}>{label}</div>
      </div>
    </div>
  );
}

function Dashboard({onNav}){
  const[stats,setStats]=useState({students:0,staff:0,events:0,blogs:0,syllabus:0,gallery:0});
  const[recent,setRecent]=useState([]);
  const[upcoming,setUpcoming]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    const load=async()=>{
      const[s,st,e,b,sy,g]=await Promise.all([
        sb.from("students").select("*",{count:"exact",head:true}),
        sb.from("staff").select("*",{count:"exact",head:true}),
        sb.from("events").select("*",{count:"exact",head:true}),
        sb.from("blogs").select("*",{count:"exact",head:true}),
        sb.from("syllabus").select("*",{count:"exact",head:true}),
        sb.from("gallery").select("*",{count:"exact",head:true}),
      ]);
      setStats({students:s.count||0,staff:st.count||0,events:e.count||0,blogs:b.count||0,syllabus:sy.count||0,gallery:g.count||0});
      const{data:rs}=await sb.from("students").select("*").order("created_at",{ascending:false}).limit(5);
      setRecent(rs||[]);
      const{data:ue}=await sb.from("events").select("*").eq("status","Upcoming").order("date").limit(4);
      setUpcoming(ue||[]);
      setLoading(false);
    };
    load();
  },[]);
  if(loading)return<Spinner/>;
  return(
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:700,color:C.dark}}>Dashboard Overview</h2>
        <p style={{margin:"5px 0 0",fontSize:13.5,color:"#888"}}>Welcome back — Babylon National School Admin</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:16,marginBottom:28}}>
        <StatCard label="Students" value={stats.students} icon={<IcStudents/>} accent={C.teal}/>
        <StatCard label="Staff" value={stats.staff} icon={<IcStaff/>} accent={C.navy}/>
        <StatCard label="Events" value={stats.events} icon={<IcEvents/>} accent={C.gold}/>
        <StatCard label="Blog Posts" value={stats.blogs} icon={<IcBlog/>} accent={C.red}/>
        <StatCard label="Gallery" value={stats.gallery} icon={<IcGallery/>} accent="#8b5cf6"/>
        <StatCard label="Documents" value={stats.syllabus} icon={<IcSyllabus/>} accent={C.green}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15,color:C.dark}}>Recent Students</span>
            <button onClick={()=>onNav("students")} style={{fontSize:12,color:C.teal,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>View All</button>
          </div>
          {recent.length===0?<div style={{padding:32,textAlign:"center",color:"#aaa",fontSize:13}}>No students yet.</div>:
            recent.map((s,i)=>(
              <div key={s.id} style={{padding:"12px 20px",borderBottom:i<recent.length-1?`1px solid ${C.border}`:"none",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:C.teal+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:C.teal}}>{s.name?.charAt(0)}</div>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:600,color:C.dark}}>{s.name}</div>
                    <div style={{fontSize:12,color:"#888"}}>{s.grade} · {s.section}</div>
                  </div>
                </div>
                <Badge label={s.status}/>
              </div>
            ))
          }
        </div>
        <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15,color:C.dark}}>Upcoming Events</span>
            <button onClick={()=>onNav("events")} style={{fontSize:12,color:C.teal,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>View All</button>
          </div>
          {upcoming.length===0?<div style={{padding:32,textAlign:"center",color:"#aaa",fontSize:13}}>No upcoming events.</div>:
            upcoming.map((e,i)=>(
              <div key={e.id} style={{padding:"13px 20px",borderBottom:i<upcoming.length-1?`1px solid ${C.border}`:"none",display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{background:C.navy,color:"white",borderRadius:9,padding:"7px 10px",textAlign:"center",flexShrink:0,minWidth:42}}>
                  <div style={{fontSize:16,fontWeight:700,lineHeight:1}}>{e.date?.split("-")[2]}</div>
                  <div style={{fontSize:9,letterSpacing:1,marginTop:2,opacity:.75,textTransform:"uppercase"}}>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(e.date?.split("-")[1])-1]}
                  </div>
                </div>
                <div>
                  <div style={{fontSize:13.5,fontWeight:600,color:C.dark,lineHeight:1.35}}>{e.title}</div>
                  <div style={{fontSize:12,color:"#888",marginTop:3}}>{e.category}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ────────────────────────────────────────────────────────────────────
const NAVS=[
  {id:"dashboard",label:"Dashboard",icon:<IcDash/>},
  {id:"students",label:"Students",icon:<IcStudents/>},
  {id:"staff",label:"Staff & Teachers",icon:<IcStaff/>},
  {id:"events",label:"Events & News",icon:<IcEvents/>},
  {id:"blog",label:"Blog Posts",icon:<IcBlog/>},
  {id:"syllabus",label:"Syllabus",icon:<IcSyllabus/>},
  {id:"hero",label:"Hero Slides",icon:<IcHero/>},
  {id:"services",label:"Services",icon:<IcServices/>},
  {id:"gallery",label:"Gallery",icon:<IcGallery/>},
  {id:"testimonials",label:"Testimonials",icon:<IcTestim/>},
  {id:"messages",label:"Leadership Messages",icon:<IcMessages/>},
  {id:"courses",label:"Programs / Courses",icon:<IcCourses/>},
];

function SidebarContent({active,setActive,collapsed,admin,onClose}){
  return(
    <aside style={{width:collapsed?64:240,background:C.navy,minHeight:"100vh",display:"flex",flexDirection:"column",transition:"width .3s",overflow:"hidden",flexShrink:0}}>
      <div style={{padding:collapsed?"16px 14px":"16px 20px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:12,minHeight:64}}>
        <div style={{width:34,height:34,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"white",fontWeight:700,fontSize:16}}>B</div>
        {!collapsed&&<div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:12.5,lineHeight:1.2}}>Babylon National</div>
          <div style={{color:"rgba(255,255,255,.4)",fontSize:11,marginTop:2}}>Admin Panel</div>
        </div>}
        {!collapsed&&onClose&&<button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)",padding:4,display:"flex"}}><IcClose/></button>}
      </div>
      <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
        {NAVS.map(item=>{
          const isActive=active===item.id;
          return(
            <button key={item.id} onClick={()=>{setActive(item.id);onClose&&onClose();}} title={collapsed?item.label:undefined}
              style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:collapsed?"10px 0":"10px 12px",justifyContent:collapsed?"center":"flex-start",borderRadius:8,border:"none",cursor:"pointer",marginBottom:2,background:isActive?"rgba(18,165,191,.2)":"transparent",color:isActive?C.tealLight:"rgba(255,255,255,.55)",fontFamily:"inherit",fontSize:13,fontWeight:isActive?600:400,transition:"all .15s"}}
              onMouseOver={e=>{if(!isActive){e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="white";}}}
              onMouseOut={e=>{if(!isActive){e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.55)";}}}
            >
              <span style={{flexShrink:0}}>{item.icon}</span>
              {!collapsed&&<span>{item.label}</span>}
              {!collapsed&&isActive&&<span style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:C.teal}}/>}
            </button>
          );
        })}
      </nav>
      {!collapsed&&(
        <div style={{padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,fontWeight:700}}>{admin?.name?.charAt(0)||"A"}</div>
            <div>
              <div style={{color:"white",fontSize:12.5,fontWeight:600}}>{admin?.name||"Admin"}</div>
              <div style={{color:"rgba(255,255,255,.35)",fontSize:11,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{admin?.email}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function Admindashboard(){
  const[admin,setAdmin]=useState(()=>{try{return JSON.parse(sessionStorage.getItem("bns_admin"));}catch{return null;}});
  const[page,setPage]=useState("dashboard");
  const[collapsed,setCollapsed]=useState(false);
  const[mobileOpen,setMobileOpen]=useState(false);
  const{isMobile,isTablet}=useBreakpoint();
  const isNarrow=isMobile||isTablet;

  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    link.rel="stylesheet";
    document.head.appendChild(link);
  },[]);

  // close mobile drawer when switching to desktop
  useEffect(()=>{ if(!isNarrow)setMobileOpen(false); },[isNarrow]);

  const logout=()=>{sessionStorage.removeItem("bns_admin");setAdmin(null);};
  if(!admin)return<LoginPage onLogin={setAdmin}/>;
  const pages={dashboard:<Dashboard onNav={setPage}/>,students:<Students/>,staff:<Staff/>,events:<Events/>,blog:<Blog/>,syllabus:<Syllabus/>,hero:<HeroSlides/>,services:<Services/>,gallery:<Gallery/>,testimonials:<Testimonials/>,messages:<Messages/>,courses:<Courses/>};
  const currentNav=NAVS.find(n=>n.id===page);

  return(
    <div style={{display:"flex",minHeight:"100vh",background:C.off,fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif"}}>

      {/* Desktop sidebar */}
      {!isNarrow&&(
        <SidebarContent active={page} setActive={setPage} collapsed={collapsed} admin={admin}/>
      )}

      {/* Mobile drawer overlay */}
      {isNarrow&&mobileOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.5)"}} onClick={()=>setMobileOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{position:"absolute",left:0,top:0,bottom:0,width:260}}>
            <SidebarContent active={page} setActive={p=>{setPage(p);setMobileOpen(false);}} collapsed={false} admin={admin} onClose={()=>setMobileOpen(false)}/>
          </div>
        </div>
      )}

      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <header style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:isMobile?"0 14px":"0 28px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"sticky",top:0,zIndex:100}}>
          <div style={{display:"flex",alignItems:"center",gap:isMobile?10:16}}>
            <button onClick={()=>isNarrow?setMobileOpen(v=>!v):setCollapsed(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",color:C.mid,padding:6,borderRadius:7,display:"flex"}}><IcMenu/></button>
            <span style={{fontSize:isMobile?13:14.5,fontWeight:600,color:C.dark}}>{currentNav?.label}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:isMobile?6:10}}>
            <a href="/" style={{display:"flex",alignItems:"center",gap:5,fontSize:isMobile?12:13,color:C.teal,textDecoration:"none",fontWeight:600,padding:isMobile?"6px 10px":"7px 14px",borderRadius:8,border:`1.5px solid ${C.teal}20`,background:C.teal+"10"}}>
              <IcLink/>{!isMobile&&" View Site"}
            </a>
            <button onClick={logout} style={{display:"flex",alignItems:"center",gap:5,fontSize:isMobile?12:13,color:C.red,background:C.dangerBg,border:"none",borderRadius:8,padding:isMobile?"6px 10px":"7px 14px",cursor:"pointer",fontWeight:600}}>
              <IcLogout/>{!isMobile&&" Logout"}
            </button>
          </div>
        </header>
        <main style={{flex:1,padding:isMobile?14:isTablet?20:28,overflowY:"auto"}}>{pages[page]||<Dashboard onNav={setPage}/>}</main>
      </div>
    </div>
  );
}