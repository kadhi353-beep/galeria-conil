import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { ShoppingBag, X, Globe, Menu, ChevronRight, MapPin, Phone, Mail, Instagram, Facebook, Upload, Lock, Check, Loader2 } from 'lucide-react';

// --- CONFIGURACIÓN SANITY ---
const projectId = 'oj4ng9ri';
const dataset = 'production';
const token = 'SkNCFmXWp0QJFzp1iV1xGFDaI11JyonNvydiqP7fK8ycnJNg1uxK6HHrQYg95eFSzxMve0v3fGImAxlqVVIC90GgeZfFPavpRebUvXM20OSVtm8i6hRuikPugR7EZAI2c1gQ9l0SSbSSge9nC5xCBNQ5ypgJmFtpLqo1nxtZNYooJWjlqt2v';

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: token,
  ignoreBrowserTokenWarning: true
});

// --- COMPONENTES ---

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Detectar URL /admin
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setIsAdmin(true);
    }
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return <PublicWebsite />;
}

// --- WEB PÚBLICA (DISEÑO GALERÍA CONIL) ---
function PublicWebsite() {
  const [lang, setLang] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = {
    es: {
      title: 'Galería Conil',
      nav: { home: 'Inicio', works: 'Colección', contact: 'Contacto' },
      hero: { title: 'Descubre el Arte de Conil', subtitle: 'Una selección exclusiva de obras contemporáneas inspiradas en la luz del sur.', cta: 'Explorar Colección' },
      works: { title: 'Obras Destacadas', filter: 'Filtrar', buy: 'Me interesa' },
      contact: { title: 'Visítanos', address: 'Calle del Arte 12, Conil de la Frontera, Cádiz', phone: '+34 956 00 00 00', email: 'hola@galeriaconil.com' }
    },
    en: {
      title: 'Conil Gallery',
      nav: { home: 'Home', works: 'Collection', contact: 'Contact' },
      hero: { title: 'Discover the Art of Conil', subtitle: 'An exclusive selection of contemporary works inspired by southern light.', cta: 'Explore Collection' },
      works: { title: 'Featured Works', filter: 'Filter', buy: 'Inquire' },
      contact: { title: 'Visit Us', address: '12 Art Street, Conil de la Frontera, Cadiz', phone: '+34 956 00 00 00', email: 'hello@galeriaconil.com' }
    },
    fr: {
      title: 'Galerie Conil',
      nav: { home: 'Accueil', works: 'Collection', contact: 'Contact' },
      hero: { title: 'Découvrez l\'Art de Conil', subtitle: 'Une sélection exclusive d\'œuvres contemporaines inspirées par la lumière du sud.', cta: 'Explorer la Collection' },
      works: { title: 'Œuvres en Vedette', filter: 'Filtrer', buy: 'Intéressé' },
      contact: { title: 'Visitez-nous', address: 'Rue de l\'Art 12, Conil de la Frontera, Cadix', phone: '+34 956 00 00 00', email: 'bonjour@galeriaconil.com' }
    }
  };

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const query = `*[_type == "artwork"]{
          _id,
          title,
          price,
          currency,
          "imageUrl": image.asset->url,
          category,
          artist->{name}
        }`;
        const data = await client.fetch(query);
        setWorks(data.length > 0 ? data : getFallbackWorks());
      } catch (error) {
        console.error("Error fetching works:", error);
        setWorks(getFallbackWorks());
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const getFallbackWorks = () => [
    { _id: '1', title: { es: 'Luz de la Tarde' }, price: 1200, currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb39279623?auto=format&fit=crop&q=80', artist: { name: 'Elena Ruiz' }, category: 'painting' },
    { _id: '2', title: { es: 'Mar del Sur' }, price: 950, currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7b454989e5?auto=format&fit=crop&q=80', artist: { name: 'Pablo M.' }, category: 'photography' },
    { _id: '3', title: { es: 'Abstracción Azul' }, price: 2100, currency: 'EUR', imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80', artist: { name: 'Sofia K.' }, category: 'painting' },
  ];

  const handleBuy = (work) => {
    const title = work.title[lang] || work.title.es || 'Obra';
    const artist = work.artist?.name || 'Artista';
    const msg = lang === 'es' ? `Hola, me interesa comprar "${title}" de ${artist}.` :
                lang === 'en' ? `Hello, I am interested in buying "${title}" by ${artist}.` :
                                `Bonjour, je suis intéressé par l'achat de "${title}" de ${artist}.`;
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
            if (textarea) textarea.value = msg;
        }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      {/* HEADER */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-[#1a365d] tracking-wide">{t[lang].title}</h1>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#home" className="hover:text-[#1a365d] transition-colors">{t[lang].nav.home}</a>
            <a href="#collection" className="hover:text-[#1a365d] transition-colors">{t[lang].nav.works}</a>
            <a href="#contact" className="hover:text-[#1a365d] transition-colors">{t[lang].nav.contact}</a>
            <div className="flex items-center space-x-2 border-l pl-6 border-gray-200">
              <button onClick={() => setLang('es')} className={`text-xs ${lang === 'es' ? 'font-bold text-[#1a365d]' : 'text-gray-400'}`}>ES</button>
              <button onClick={() => setLang('en')} className={`text-xs ${lang === 'en' ? 'font-bold text-[#1a365d]' : 'text-gray-400'}`}>EN</button>
              <button onClick={() => setLang('fr')} className={`text-xs ${lang === 'fr' ? 'font-bold text-[#1a365d]' : 'text-gray-400'}`}>FR</button>
            </div>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-800">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80" 
            alt="Art Gallery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-tight">
            {t[lang].hero.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-10 font-light max-w-2xl mx-auto">
            {t[lang].hero.subtitle}
          </p>
          <a 
            href="#collection" 
            className="inline-block bg-[#3182ce] hover:bg-[#2c5282] text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium transition-all duration-300 transform hover:-translate-y-1"
          >
            {t[lang].hero.cta}
          </a>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-6">
            <h3 className="text-3xl md:text-4xl font-serif text-[#1a365d]">{t[lang].works.title}</h3>
            <span className="text-sm text-gray-400 font-serif italic">{works.length} obras</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-300" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {works.map((work: any) => (
                <div key={work._id} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={work.imageUrl} 
                      alt={work.title?.[lang] || work.title?.es} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleBuy(work); }}
                      className="absolute bottom-6 right-6 bg-white text-[#1a365d] p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1a365d] hover:text-white"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{work.artist?.name}</p>
                    <h4 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-[#3182ce] transition-colors">
                      {work.title?.[lang] || work.title?.es}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{work.price} {work.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#f8fafc] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif text-[#1a365d] mb-12">{t[lang].contact.title}</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <MapPin className="mx-auto text-[#3182ce] mb-4" size={24} />
              <p className="text-sm text-gray-600">{t[lang].contact.address}</p>
            </div>
            <div className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Phone className="mx-auto text-[#3182ce] mb-4" size={24} />
              <p className="text-sm text-gray-600">{t[lang].contact.phone}</p>
            </div>
            <div className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Mail className="mx-auto text-[#3182ce] mb-4" size={24} />
              <p className="text-sm text-gray-600">{t[lang].contact.email}</p>
            </div>
          </div>

          <form className="max-w-xl mx-auto space-y-4 text-left">
            <input type="text" placeholder="Nombre" className="w-full p-4 bg-white border border-gray-200 focus:border-[#3182ce] focus:ring-0 transition-colors text-sm outline-none" />
            <input type="email" placeholder="Email" className="w-full p-4 bg-white border border-gray-200 focus:border-[#3182ce] focus:ring-0 transition-colors text-sm outline-none" />
            <textarea name="message" rows={4} placeholder="Mensaje" className="w-full p-4 bg-white border border-gray-200 focus:border-[#3182ce] focus:ring-0 transition-colors text-sm outline-none"></textarea>
            <button className="w-full bg-[#1a365d] text-white py-4 text-sm uppercase tracking-widest hover:bg-[#2c5282] transition-colors">Enviar Mensaje</button>
          </form>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-[#1a365d] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-60 text-sm">
          <p>© 2024 Galería Conil. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
            <Facebook size={18} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- PANEL ADMIN (INTEGRADO) ---
function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    titleEs: '', titleEn: '', titleFr: '',
    price: '', currency: 'EUR', category: 'painting',
    artistName: '', year: '2024', description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Crear Artista
      const artistDoc = {
        _type: 'artist',
        name: formData.artistName,
        slug: { _type: 'slug', current: formData.artistName.toLowerCase().replace(/\s+/g, '-') }
      };
      const artist = await client.create(artistDoc);

      // 2. Crear Obra
      const artworkDoc = {
        _type: 'artwork',
        title: { es: formData.titleEs, en: formData.titleEn, fr: formData.titleFr },
        price: Number(formData.price),
        currency: formData.currency,
        category: formData.category,
        year: Number(formData.year),
        artist: { _type: 'reference', _ref: artist._id },
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-1579783902614-a3fb39279623-unsplash' } } // Placeholder si no suben imagen real
      };
      await client.create(artworkDoc);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error: Asegúrate de tener el token de escritura configurado en src/App.tsx');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white max-w-2xl w-full p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-serif text-[#1a365d]">Panel de Gestión - Galería Conil</h2>
          <Lock className="text-gray-300" />
        </div>
        
        {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-center"><Check className="mr-2" /> Obra publicada con éxito</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required placeholder="Título (ES)" className="p-3 border rounded-lg" onChange={e => setFormData({...formData, titleEs: e.target.value})} />
            <input placeholder="Title (EN)" className="p-3 border rounded-lg" onChange={e => setFormData({...formData, titleEn: e.target.value})} />
            <input placeholder="Titre (FR)" className="p-3 border rounded-lg" onChange={e => setFormData({...formData, titleFr: e.target.value})} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Nombre del Artista" className="p-3 border rounded-lg" onChange={e => setFormData({...formData, artistName: e.target.value})} />
            <select className="p-3 border rounded-lg" onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="painting">Pintura</option>
              <option value="sculpture">Escultura</option>
              <option value="photography">Fotografía</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input required type="number" placeholder="Precio" className="p-3 border rounded-lg col-span-2" onChange={e => setFormData({...formData, price: e.target.value})} />
            <select className="p-3 border rounded-lg" onChange={e => setFormData({...formData, currency: e.target.value})}>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <button disabled={loading} className="w-full bg-[#1a365d] text-white py-4 rounded-lg font-medium hover:bg-[#2c5282] transition-colors flex justify-center">
            {loading ? <Loader2 className="animate-spin" /> : 'Publicar Obra en Sanity'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
