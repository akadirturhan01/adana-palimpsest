import React from 'react';
import Navbar from '../components/Navbar';

function Methodology() {
  return (
    <div className="methodology-container">
      <Navbar />
      <div className="methodology-content glass-panel">
        <h1>Proje Hakkında ve Metodoloji</h1>
        
        <h2>Tasarıma Dayalı Araştırma (DBR) ve Nitel Yaklaşım</h2>
        <p>
          Bu proje, geleneksel akademik araştırmaların dışına çıkarak kentsel amnezi (hafıza kaybı) 
          sorununu pasif kitap sayfalarında değil, etkileşimli bir simülasyon ortamında tartışmayı hedefler. 
          Çalışma "Tasarıma Dayalı Araştırma" mantığı ile yürütülerek, teorik tespitlerin sahada test edildiği 
          ve kullanıcıların deneyimine sunulduğu pragmatik bir sistem (artefakt) üretmiştir.
        </p>

        <h2>Neden Adana?</h2>
        <p>
          Türkiye'deki dijital beşeri bilimler çalışmaları çoğunlukla İstanbul Tarihi Yarımada 
          gibi bilindik mekanlara sıkışmıştır. Ancak Adana, tarımdan sanayileşmeye ve ardından hiper-modern 
          bir apartmanlaşmaya evrilirken geçirdiği şiddetli demografik şoklar ile kentsel palimpsest çalışmaları 
          için dünya çapında bir örneklem niteliğindedir. Orhan Kemal ve Yaşar Kemal edebiyatının işçi sınıfı 
          kokan Adana'sının, dijital uzamda yeniden diriltilmesi bu sistemin varlık sebebidir.
        </p>

        <h2>Teknolojik Altyapı</h2>
        <p>
          Harita vizualizasyonunda standart, açık ve gürültülü Google Maps tasarımları yerine 
          Certeau'nun "Taktiksel Yaya" pratiğine daha uygun olan izometrik ve oldukça karanlık 
          <code>CartoDB Dark Matter</code> tasarımı tercih edilmiştir. Elde edilen mekânsal bellek 
          JSON formunda dinamik olarak haritaya işlenmiş ve bir zaman sürgüsü ile geçmiş zamanlar katmanlandırılmıştır.
        </p>
      </div>
    </div>
  );
}

export default Methodology;
