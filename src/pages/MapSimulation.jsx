import React, { useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Check, Clock, Info, Download, Filter } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ADANA_NODES } from '../data';
import Navbar from '../components/Navbar';

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapSimulation() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [memoryCollection, setMemoryCollection] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Hepsi');
  const pdfRef = useRef(null);

  // Filter nodes based on time slider and category
  const visibleNodes = ADANA_NODES.filter(node => node.baseYear <= currentYear)
    .filter(node => activeFilter === 'Hepsi' || node.category.includes(activeFilter));

  const toggleMemory = (node) => {
    if (memoryCollection.find(m => m.id === node.id)) {
      setMemoryCollection(memoryCollection.filter(m => m.id !== node.id));
    } else {
      setMemoryCollection([...memoryCollection, node]);
    }
  };

  const simOutput = useMemo(() => {
    if (memoryCollection.length === 0) return null;
    let totals = { kultural: 0, ekonomik: 0, sosyal: 0 };
    memoryCollection.forEach(node => {
      totals.kultural += node.simulationImpact.kultural;
      totals.ekonomik += node.simulationImpact.ekonomik;
      totals.sosyal += node.simulationImpact.sosyal;
    });
    
    let dominant = "Sosyal";
    let max = totals.sosyal;
    if (totals.kultural > max) { dominant = "Kültürel"; max = totals.kultural; }
    if (totals.ekonomik > max) { dominant = "Ekonomik"; max = totals.ekonomik; }

    return { totals, dominant };
  }, [memoryCollection]);

  // Export to PDF
  const downloadPDF = async () => {
    if(!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { backgroundColor: '#111' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('Kisisel_Kent_Profili.pdf');
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="map-section">
        <MapContainer 
          center={[36.991, 35.326]} 
          zoom={13} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {visibleNodes.map((node) => {
            const isAdded = memoryCollection.some(m => m.id === node.id);
            return (
              <Marker key={node.id} position={node.coordinates} icon={customIcon}>
                <Popup className="custom-popup" closeButton={false}>
                  <img src={node.image} alt={node.title} className="popup-img" />
                  <div className="popup-content">
                    <div className="popup-title">{node.title}</div>
                    <div className="popup-meta">{node.baseYear} • {node.category}</div>
                    <div className="popup-desc">{node.description}</div>
                    <button 
                      className={`add-memory-btn ${isAdded ? 'added' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMemory(node);
                      }}
                    >
                      {isAdded ? (
                        <><Check size={16} /> Hafızaya Eklendi</>
                      ) : (
                        <><Plus size={16} /> Hafızaya Ekle</>
                      )}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="sidebar glass-panel" ref={pdfRef}>
        <div className="sidebar-header">
          <h2>Kişisel Hafıza</h2>
          <p>Kentin farklı zaman katmanlarından toplayarak oluşturduğunuz kişisel anlatı koleksiyonunuz.</p>
        </div>

        {/* Filter Section */}
        <div style={{ marginBottom: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {['Hepsi', 'Sosyal', 'Ekonomi', 'Kültür'].map(ft => (
            <button 
               key={ft} 
               onClick={() => setActiveFilter(ft)}
               style={{ 
                 background: activeFilter === ft ? "var(--primary-color)" : "rgba(255,255,255,0.1)",
                 border: "none", color: "white", padding: "5px 10px", borderRadius: "8px", fontSize: "12px", cursor: "pointer"
               }}
            >
              {ft === 'Hepsi' ? <Filter size={12}/> : null} {ft}
            </button>
          ))}
        </div>

        <div className="memory-list">
          {memoryCollection.length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", marginTop: "20px" }}>
              Haritadan mekanları keşfedip hafızanıza ekleyin.
            </div>
          ) : (
            memoryCollection.map(m => (
              <div key={m.id} className="memory-item">
                <h3>{m.title}</h3>
                <div className="memory-item-meta">
                  <span>{m.baseYear}</span>
                  <span>{m.category}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {simOutput && (
          <div className="sim-output glass-panel">
            <h3><Info size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Simülasyon Analizi</h3>
            <p>
              Haritadan yaptığınız seçimler kenti daha çok <strong>{simOutput.dominant}</strong> bir bağlamda deneyimlediğinizi gösteriyor. 
              {simOutput.dominant === "Kültürel" && " Eski sinemalar, tarihi sokaklar ve kültürel pratikler kent algınızın merkezinde yer alıyor."}
              {simOutput.dominant === "Ekonomik" && " Çarşılar, fabrikalar ve üretim mekanları üzerinden kent okuması yapıyorsunuz."}
              {simOutput.dominant === "Sosyal" && " Köprüler, parklar ve toplumsal birleşme alanları sizin için daha baskın."}
            </p>
            <button 
              onClick={downloadPDF} 
              style={{ marginTop: "15px", background: "rgba(255, 255, 255, 0.2)", width: "100%", padding: "10px", border: "1px solid rgba(255,255,255,0.3)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", borderRadius: "10px", cursor: "pointer" }}
            >
              <Download size={18} /> Profili İndir (PDF)
            </button>
          </div>
        )}
      </div>

      <div className="time-slider-container glass-panel">
        <div className="time-slider-header">
          <span><Clock size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Zaman Sürgüsü (Palimpsest)</span>
          <span className="current-year">{currentYear}</span>
        </div>
        <input 
          type="range" 
          min="1500" 
          max="2026" 
          step="1"
          value={currentYear} 
          onChange={(e) => setCurrentYear(Number(e.target.value))} 
        />
      </div>

    </div>
  );
}

export default MapSimulation;
