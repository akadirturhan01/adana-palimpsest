import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Database, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-content glass-panel">
          <h1>Kentsel Palimpsest</h1>
          <h2>Adana Etkileşimli Hafıza Haritası</h2>
          <p>
            Kentsel mekan yalnızca inşa edilen yapılardan ibaret değildir; tarihsel, 
            sosyolojik ve kültürel katmanların üst üste bindiği devasa bir şifreli anıt-metindir. 
            Adana'nın yıkılıp yeniden yazılan hafızasını dijital dünyada keşfedin.
          </p>
          
          <button className="cta-btn" onClick={() => navigate('/simulation')}>
            Simülasyona Başla <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="purpose-section">
        <div className="purpose-content glass-panel">
          <div className="purpose-grid">
            <div className="purpose-item">
              <h3>Projenin Amacı</h3>
              <p>
                Adana'nın kentsel dönüşüm ve sanayileşme süreçlerinde fiziksel olarak silinen, 
                ancak kolektif bellekte yaşamaya devam eden katmanlarını dijital bir "palimpsest" 
                mantığıyla yeniden kurgulamak. Amacımız, kentsel amneziye karşı dijital bir 
                direniş alanı oluşturarak, kentin kayıp hafızasını interaktif bir deneyime dönüştürmektir.
              </p>
            </div>
            <div className="purpose-divider"></div>
            <div className="purpose-item">
              <h3>Kapsam ve Yöntem</h3>
              <p>
                19. yüzyıl sonundan günümüze kadar uzanan süreçte; Adana'nın seçili mimari yapıları, 
                tarihsel olayları ve edebi anlatıları CBS (Coğrafi Bilgi Sistemleri) tabanlı bir 
                zaman çizelgesi üzerinde birleştirilmiştir. Proje, hem akademik bir "Tasarıma Dayalı 
                Araştırma" ürünü hem de bir kentsel arşiv niteliği taşımaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card glass-panel">
          <BookOpen className="feature-icon" size={32} />
          <h3>Pierre Nora & Hafıza</h3>
          <p>Yitirilen organik mekanların yerine, dijital dünyada kurulan etkileşimli Bellek Mekanları (Lieux de Mémoire).</p>
        </div>
        <div className="feature-card glass-panel">
          <MapPin className="feature-icon" size={32} />
          <h3>Certeau ve Yürüyüş</h3>
          <p>Şehri rasyonel sivil planların dayatmasıyla değil, aşağıdan yukarıya "Taktiksel Yaya" kültürüyle okumak.</p>
        </div>
        <div className="feature-card glass-panel">
          <Database className="feature-icon" size={32} />
          <h3>Flâneur ve Simülasyon</h3>
          <p>Geçmişin imgeleriyle bugünü karşılaştıran bir Siber-Aylak olarak kendi kent anlatınızı/koleksiyonunuzu inşa edin.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
