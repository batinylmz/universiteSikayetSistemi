import React, { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [lang, setLang] = useState('Türkçe');

  const [sikayetler, setSikayetler] = useState([
    { id: 1, baslik: 'Kütüphane Isınma Sorunu', kategori: 'Altyapı', mesaj: '3. kat çok soğuk, ders çalışamıyoruz.', durum: 'Beklemede', tarih: '02.03.2026', oncelik: 'Yüksek' },
    { id: 2, baslik: 'Ring Sefer Saatleri', kategori: 'Ulaşım', mesaj: 'Sabah 08:00 ringi çok dolu.', durum: 'İnceleniyor', tarih: '01.03.2026', oncelik: 'Orta' },
    { id: 3, baslik: 'Yemekhane Menü Çeşitliliği', kategori: 'Yemekhane', mesaj: 'Vejetaryen seçenekler artırılmalı.', durum: 'Çözüldü', tarih: '28.02.2026', oncelik: 'Düşük' },
  ]);

  const [form, setForm] = useState({ baslik: '', mesaj: '', kategori: 'Eğitim', oncelik: 'Orta' });
  const [settings, setSettings] = useState({ email: '', emailNotify: false, studentNo: '2026044072' });

  const t = {
    'Türkçe': { dash: "Genel Bakış", arch: "Talep Arşivi", sett: "Yapılandırma", act: "AKTİF DOSYA", pend: "BEKLEYEN", succ: "BAŞARI YÜZDESİ", status: "SİSTEM AKTİF" },
    'English': { dash: "Overview", arch: "Archive", sett: "Settings", act: "ACTIVE FILES", pend: "PENDING", succ: "SUCCESS RATE", status: "SYSTEM ACTIVE" }
  }[lang];

  const stats = {
    toplam: sikayetler.length,
    beklemede: sikayetler.filter(s => s.durum !== 'Çözüldü').length,
    yuzde: Math.round((sikayetler.filter(s => s.durum === 'Çözüldü').length / sikayetler.length) * 100) || 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.baslik || !form.mesaj) return alert("Alanları doldurun.");
    const yeni = { id: Date.now(), ...form, durum: 'Beklemede', tarih: new Date().toLocaleDateString('tr-TR') };
    setSikayetler([yeni, ...sikayetler]);
    setForm({ baslik: '', mesaj: '', kategori: 'Eğitim', oncelik: 'Orta' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div style={styles.grid}>
            <section style={styles.glassCard}>
              <h3>⚡  Hızlı Talep Girişi</h3>
              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Talep Başlığı</label>
                <input style={styles.input} value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Kategori</label>
                    <select style={styles.input} value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}>
                      <option>Eğitim</option><option>Ulaşım</option><option>Yemekhane</option>
                      <option>Akademik</option><option>Yurt</option><option>Teknik</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Öncelik</label>
                    <select style={styles.input} value={form.oncelik} onChange={(e) => setForm({ ...form, oncelik: e.target.value })}>
                      <option>Düşük</option><option>Orta</option><option>Yüksek</option>
                    </select>
                  </div>
                </div>
                <label style={styles.label}>Açıklama</label>
                <textarea style={{ ...styles.input, height: '80px' }} value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} />
                <button type="submit" style={styles.mainBtn}>Sisteme Kaydet</button>
              </form>
            </section>
            <section style={styles.glassCard}>
              <h3>📋 Canlı Takip Çizelgesi</h3>
              <div style={styles.scrollArea}>
                {sikayetler.map(s => (
                  <div key={s.id} style={styles.item}>
                    <div><strong>{s.baslik}</strong><p style={styles.itemSub}>{s.mesaj}</p></div>
                    <div style={{ textAlign: 'right' }}><span style={{ color: getStatusColor(s.durum), fontWeight: 'bold' }}>{s.durum}</span></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'Arşiv':
        return (
          <div style={styles.glassCard}>
            <h3>📁 {t.arch}</h3>
            <table style={styles.table}>
              <thead>
                <tr style={styles.th}>
                  <th>ID</th><th>Başlık</th><th>Kategori</th><th>Tarih</th><th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {sikayetler.map(s => (
                  <tr key={s.id} style={styles.tr}>
                    <td>#{s.id.toString().slice(-4)}</td><td>{s.baslik}</td><td>{s.kategori}</td><td>{s.tarih}</td><td>{s.durum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Ayarlar':
        return (
          <div style={styles.glassCard}>
            <h3>⚙️ {t.sett}</h3>
            <div style={styles.settingsBox}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>E-Posta Adresi (Gerekli)</label>
                <input style={styles.input} placeholder="ornek@univ.edu.tr" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />

              </div>

              <div style={{ ...styles.settingRow, opacity: settings.email ? 1 : 0.5 }}>
                <div><b>E-Posta Bildirimleri</b><p style={styles.itemSub}>E-posta adresinize bildirim gönderilecektir.</p></div>
                <input type="checkbox" disabled={!settings.email} checked={settings.emailNotify} onChange={() => setSettings({ ...settings, emailNotify: !settings.emailNotify })} />
              </div>

              {/* Dil seçeneği artık her zaman aktif */}
              <div style={{ ...styles.settingRow, marginTop: '20px' }}>
                <div><b>Sistem Dili Seçimi</b><p style={styles.itemSub}>Arayüz dilini belirleyin.</p></div>
                <select style={styles.miniSelect} value={lang} onChange={(e) => setLang(e.target.value)}>
                  <option>Türkçe</option>
                  <option>English</option>
                </select>
              </div>
              <button style={{ ...styles.mainBtn, backgroundColor: '#0f172a', marginTop: '30px' }}>Ayarları Kaydet</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={styles.dashboard}>
      <aside style={{ ...styles.sidebar, width: isSidebarOpen ? '260px' : '80px' }}>
        <div style={styles.sidebarHeader}>
          {isSidebarOpen && <span style={styles.logoText}>🛡️ Üniversite Şikayet Sistemi</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleBtn}>{isSidebarOpen ? '❮' : '❯'}</button>
        </div>
        {isSidebarOpen && (
          <div style={styles.profileBox}>
            <div style={styles.avatar}>ID</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Ögrenci: #072</div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>No: {settings.studentNo}</div>
              <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px' }}>● {t.status}</div>
            </div>
          </div>
        )}
        <nav>
          <div onClick={() => setActiveTab('Dashboard')} style={activeTab === 'Dashboard' ? styles.navActive : styles.navItem}>📊 {isSidebarOpen && t.dash}</div>
          <div onClick={() => setActiveTab('Arşiv')} style={activeTab === 'Arşiv' ? styles.navActive : styles.navItem}>📁 {isSidebarOpen && t.arch}</div>
          <div onClick={() => setActiveTab('Ayarlar')} style={activeTab === 'Ayarlar' ? styles.navActive : styles.navItem}>⚙️ {isSidebarOpen && t.sett}</div>
        </nav>
      </aside>

      <main style={styles.main}>
        <div style={styles.statsRow}>
          <div style={styles.statCard}><span>{t.act}</span><h3>{stats.toplam}</h3></div>
          <div style={styles.statCard}><span>{t.pend}</span><h3>{stats.beklemede}</h3></div>
          <div style={{ ...styles.statCard, borderBottomColor: '#10b981' }}><span>{t.succ}</span><h3 style={{ color: '#10b981' }}>%{stats.yuzde}</h3></div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

const getStatusColor = (s) => s === 'Çözüldü' ? '#10b981' : s === 'İnceleniyor' ? '#f59e0b' : '#ef4444';

const styles = {
  dashboard: { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Inter', sans-serif" },
  sidebar: { backgroundColor: '#0f172a', color: '#fff', transition: '0.4s', padding: '20px' },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  logoText: { fontWeight: 'bold', color: '#38bdf8' },
  toggleBtn: { background: '#1e293b', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '5px' },
  profileBox: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#1e293b', borderRadius: '12px', marginBottom: '25px' },
  avatar: { minWidth: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px' },
  navItem: { padding: '12px', cursor: 'pointer', color: '#94a3b8', borderRadius: '10px', marginBottom: '5px' },
  navActive: { padding: '12px', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '10px', marginBottom: '5px', fontWeight: 'bold' },
  main: { flex: 1, padding: '40px', overflowY: 'auto' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '30px' },
  statCard: { flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderBottom: '4px solid #3b82f6' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  glassCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  emailFeedback: { fontSize: '12px', color: '#3b82f6', marginTop: '5px', paddingLeft: '5px' },
  label: { fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', display: 'block', color: '#64748b' },
  mainBtn: { width: '100%', padding: '15px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' },
  scrollArea: { maxHeight: '350px', overflowY: 'auto' },
  item: { padding: '15px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' },
  itemSub: { fontSize: '11px', color: '#64748b' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  th: { textAlign: 'left', borderBottom: '2px solid #f1f5f9', padding: '10px', color: '#64748b' },
  tr: { borderBottom: '1px solid #f1f5f9', fontSize: '14px' },
  settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #f1f5f9' },
  miniSelect: { padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  settingsBox: { marginTop: '10px' }
};

export default App;