import { useState, useEffect } from 'react';
import {
  ArrowRight, BellRing, Bell, BrainCircuit, Calculator,
  CalendarClock, Camera, ChevronRight, CircleCheck,
  CircleSlash, Cpu, DatabaseZap, Database, EyeOff, FileCode2, FilePlus,
  FlagTriangleRight, Fuel, Gauge, GitBranch, GitCompareArrows,
  Headset, Layers, Lock, MapPin, Map, Maximize2, Menu,
  MonitorSmartphone, Moon, Network, PackageCheck, Radio,
  RotateCcw, Route, Save, Search, ShieldCheck, Smartphone, TrendingDown,
  TriangleAlert, Truck, Users, Wrench, X, ZoomIn, ZoomOut,
  type LucideIcon,
} from 'lucide-react';

type SectionId = 'architecture' | 'modules' | 'ai' | 'backlog';

interface NavItem {
  id: SectionId;
  label: string;
  short: string;
  icon: LucideIcon;
  tone: string;
}

const navItems: NavItem[] = [
  { id: 'architecture', label: 'Architecture & Flux Métiers', short: 'Architecture', icon: Network, tone: 'from-success-500 to-success-700' },
  { id: 'modules', label: 'Modules UI & Garde-fous', short: 'Modules UI', icon: MonitorSmartphone, tone: 'from-accent-500 to-accent-700' },
  { id: 'ai', label: 'Moteurs IA Python (PoC)', short: 'Moteurs IA', icon: BrainCircuit, tone: 'from-warning-500 to-warning-700' },
  { id: 'backlog', label: 'Etat des lieux & Backlog', short: 'Etat des lieux', icon: FlagTriangleRight, tone: 'from-ink-500 to-ink-700' },
];

const sectionTitles: Record<SectionId, { eyebrow: string; title: string }> = {
  architecture: { eyebrow: 'Section 01', title: 'Architecture Système & BPMN' },
  modules: { eyebrow: 'Section 02', title: 'Interfaces Cibles & Spécifications' },
  ai: { eyebrow: 'Section 03', title: 'Algorithmes & Tableaux de Bord' },
  backlog: { eyebrow: 'Section 04', title: 'Limites Assumées & Backlog Futur' },
};

const badgeTones: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
  success: 'bg-success-50 text-success-700 ring-1 ring-success-200',
  warning: 'bg-warning-50 text-warning-700 ring-1 ring-warning-200',
  danger: 'bg-danger-50 text-danger-700 ring-1 ring-danger-200',
  neutral: 'bg-ink-100 text-ink-700 ring-1 ring-ink-200',
  accent: 'bg-accent-50 text-accent-700 ring-1 ring-accent-200',
};

function Badge({ tone = 'neutral', children, className = '' }: { tone?: string; children: React.ReactNode; className?: string }) {
  return <span className={`badge ${badgeTones[tone]} ${className}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, subtitle, icon: Icon, actions }: {
  eyebrow?: string; title: string; subtitle?: string; icon?: LucideIcon; actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
        )}
        <div>
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>}
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

function ZoomableImage({ src, alt, className = '', imgClassName = '', caption }: {
  src: string; alt: string; className?: string; imgClassName?: string; caption?: string;
}) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const zoomIn = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(z => Math.min(z + 0.5, 4)); };
  const zoomOut = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(z => Math.max(z - 0.5, 0.5)); };
  const reset = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(1); };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className={`relative group cursor-zoom-in overflow-hidden rounded-xl border border-ink-200 bg-ink-50 flex items-center justify-center ${className}`} onClick={() => { setOpen(true); setZoom(1); }}>
          <img src={src} alt={alt} className={`w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${imgClassName}`} />
          <div className="absolute inset-0 bg-ink-900/0 transition-colors duration-300 group-hover:bg-ink-900/10 flex items-center justify-center">
            <div className="opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full bg-white p-3 shadow-lg text-ink-700 flex items-center gap-2 font-medium text-sm">
              <Maximize2 className="w-4 h-4" /> Agrandir
            </div>
          </div>
        </div>
        {caption && <p className="text-sm text-ink-500 text-center italic px-4">{caption}</p>}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 backdrop-blur-md" onClick={() => setOpen(false)}>
          <div className="flex items-center justify-between p-4 bg-ink-900/50 border-b border-white/10" onClick={e => e.stopPropagation()}>
            <span className="text-white/70 text-sm font-medium">{alt}</span>
            <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
              <button onClick={zoomOut} className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Dézoomer"><ZoomOut className="w-5 h-5" /></button>
              <button onClick={reset} className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium" title="Taille originale"><RotateCcw className="w-5 h-5" /></button>
              <button onClick={zoomIn} className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Zoomer"><ZoomIn className="w-5 h-5" /></button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              <button onClick={() => setOpen(false)} className="p-2 rounded-md text-danger-400 hover:text-danger-300 hover:bg-danger-400/20 transition-colors" title="Fermer"><X className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-8">
            <img src={src} alt={alt} className="max-w-none transition-transform duration-200 shadow-2xl" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }} onClick={e => { e.stopPropagation(); setZoom(z => z === 1 ? 2 : 1); }} />
          </div>
        </div>
      )}
    </>
  );
}

// --- Architecture Section ---
function ArchitectureSection() {
  const [tab, setTab] = useState<'before' | 'after'>('before');
  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Section 01" title="Architecture Système & BPMN" subtitle="La priorité n'était pas de redessiner les flux humains, mais de détruire les silos de données (Excel personnels, WhatsApp) par une base de données relationnelle unique." icon={Network} actions={<Badge tone="brand"><Layers className="h-3.5 w-3.5" /> MCD V18</Badge>} />
      <section className="card flex flex-col gap-6 p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-4 ring-brand-100"><GitCompareArrows className="h-6 w-6" /></span>
          <div>
            <h3 className="text-lg font-semibold text-ink-900">Démarche : détruire les silos, pas les métiers</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
              La priorité n'était pas de redessiner les flux humains, mais de <strong className="font-semibold text-ink-900">détruire les silos de données</strong> (Excel personnels, WhatsApp) par une base de données relationnelle unique. Les processus restent pilotés par les équipes, mais la donnée devient unique, traçable et exploitable.
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-ink-200 pt-6">
          <h4 className="mb-4 text-sm font-semibold text-ink-900">Vue Macro : Du fonctionnement en silos au système unifié</h4>
          <div className="rounded-xl bg-ink-50/50 p-4 border border-ink-200">
            <ZoomableImage src="/architecture_avant_apres.png" alt="Architecture Macro Avant/Après" imgClassName="max-h-[400px]" />
          </div>
        </div>
      </section>
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-ink-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-600"><GitCompareArrows className="h-5 w-5" /></span>
            <div>
              <h3 className="text-base font-semibold text-ink-900">Comparaison des flux (BPMN)</h3>
              <p className="text-xs text-ink-500">As-Is vs To-Be — bascule de la complexité vers le logiciel</p>
            </div>
          </div>
          <div className="inline-flex rounded-xl bg-ink-100 p-1">
            <button onClick={() => setTab('before')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === 'before' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500 hover:text-ink-700'}`}>
              Le Constat <span className="text-ink-400">(As-Is)</span>
            </button>
            <button onClick={() => setTab('after')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === 'after' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500 hover:text-ink-700'}`}>
              La Cible <span className="text-ink-400">(To-Be)</span>
            </button>
          </div>
        </div>
        <div className="p-5 sm:p-7">
          {tab === 'before' ? (
            <div className="animate-fade-in">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge tone="danger"><TriangleAlert className="h-3.5 w-3.5" /> As-Is</Badge>
                <Badge tone="neutral">BPMN V10</Badge>
              </div>
              <ZoomableImage src="/diagram_V10.png" alt="BPMN V10" caption="Processus spaghetti où l'Opérateur de Saisie fait le travail d'un ordinateur (contrôles manuels, vérifications d'expiration)." imgClassName="max-h-[560px]" />
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge tone="success">To-Be</Badge>
                <Badge tone="brand">BPMN V2</Badge>
              </div>
              <ZoomableImage src="/diagram_v2.png" alt="BPMN V2" caption="La complexité est absorbée par les garde-fous logiciels. Les humains valident une donnée déjà épurée." imgClassName="max-h-[560px]" />
            </div>
          )}
        </div>
      </section>
      <section className="card overflow-hidden">
        <div className="flex items-center gap-4 border-b border-ink-200 bg-gradient-to-r from-brand-50 to-transparent p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft"><Layers className="h-6 w-6" /></span>
          <div>
            <h3 className="text-lg font-semibold text-ink-900">Le Cœur du Réacteur</h3>
            <p className="text-sm text-ink-500">Modèle Conceptuel de Données — version 18</p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-600">
            <strong className="font-semibold text-ink-900">MCD V18 à 23 entités</strong> unifiant tous les métiers : Facturation, Garage, Carburant. Un référentiel unique supprimant la dépendance aux fichiers Excel personnels et à la collecte WhatsApp.
          </p>
          <ZoomableImage src="/schema_ea_id_rental_v18.png" alt="MCD V18" caption="Schéma Entity-Association ID Rental V18 — 23 entités couvrant l'ensemble du périmètre métier." imgClassName="max-h-[640px]" />
        </div>
      </section>
    </div>
  );
}

// --- Modules Section ---
interface ModuleDef {
  id: string;
  index: string;
  name: string;
  icon: LucideIcon;
  tone: string;
  image: string;
  imageAlt: string;
  flowImage?: string;
  description: string;
  rules?: string;
  safeguards: { label: string; detail: string; icon: LucideIcon }[];
}

const moduleDefs: ModuleDef[] = [
  {
    id: 'os', index: '01', name: 'Opérateur de Saisie', icon: MonitorSmartphone, tone: 'brand',
    image: '/wireframe_os_exploitation_multiclient.png', imageAlt: 'OS Exploitation Multi-Client',
    flowImage: '/chaine_avant_apres_exploitation.png',
    description: 'Formulaire adaptatif remplaçant 4 fichiers Excel.',
    rules: 'STAR (Poids x KM, 2 Titres obligatoires), COLAS (LLD au mois vs LCD au barème horaire), VITOGAZ (Poids BL + Index Gasoil à 2.5%), ATS (Litrage).',
    safeguards: [
      { label: 'Hard Block sur transmission', detail: "Bouton de transmission au RO bloqué si le dossier n'est pas 100% complet.", icon: Lock },
      { label: 'Sauvegarde Brouillon', detail: 'Mode brouillon intégré permettant la reprise de saisie sans perte.', icon: Save },
    ],
  },
  {
    id: 'terrain', index: '02', name: 'Application Terrain (SE Fuel)', icon: Smartphone, tone: 'success',
    image: '/wireframe_app_terrain_carburant.png', imageAlt: 'App Terrain Carburant',
    flowImage: '/chaine_avant_apres_collecte_carburant.png',
    description: 'Remplace la collecte chaotique par WhatsApp.',
    safeguards: [
      { label: '5 photos obligatoires', detail: 'Plaque, Pompe, Ticket, BL, Réservoir — obligatoires avant synchronisation en base.', icon: Camera },
    ],
  },
  {
    id: 'atelier', index: '03', name: 'Atelier Technique (Garage IDR)', icon: Wrench, tone: 'warning',
    image: '/wireframe_atelier_technique.png', imageAlt: 'Atelier Technique',
    description: "Fermeture de la faille anti-fraude : liaison informatique stricte entre la pièce/pneu commandé et l'intervention physique.",
    safeguards: [
      { label: 'Champ « Origine » masqué', detail: "Masqué pour les mécaniciens, visible pour le Directeur Technique (DT) qui arbitre entre l'Interne et ID Motors.", icon: EyeOff },
    ],
  },
  {
    id: 'so', index: '04', name: 'Planification & Flotte (SO)', icon: CalendarClock, tone: 'accent',
    image: '/wireframe_entretien_planification.png', imageAlt: 'Planification SO',
    flowImage: '/chaine_avant_apres_entretien_planification.png',
    description: 'Destruction du Shadow IT (fichier Excel personnel du SO supprimé par le passé). Gestion centralisée des véhicules de remplacement.',
    safeguards: [
      { label: 'Référentiel centralisé', detail: 'Fin du Shadow IT : la planification des véhicules de remplacement passe dans le système unique.', icon: ShieldCheck },
    ],
  },
];

const moduleTones: Record<string, { chip: string; dot: string; ring: string }> = {
  brand: { chip: 'bg-brand-50 text-brand-700 ring-brand-200', dot: 'bg-brand-500', ring: 'ring-brand-200' },
  success: { chip: 'bg-success-50 text-success-700 ring-success-200', dot: 'bg-success-500', ring: 'ring-success-200' },
  warning: { chip: 'bg-warning-50 text-warning-700 ring-warning-200', dot: 'bg-warning-500', ring: 'ring-warning-200' },
  accent: { chip: 'bg-accent-50 text-accent-700 ring-accent-200', dot: 'bg-accent-500', ring: 'ring-accent-200' },
};

function ModulesSection() {
  const [active, setActive] = useState(moduleDefs[0].id);
  const mod = moduleDefs.find(m => m.id === active)!;
  const tc = moduleTones[mod.tone];
  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Section 02" title="Interfaces Cibles & Spécifications" subtitle="Maquettes des 4 modules fonctionnels et garde-fous logiciels associés. Chaque interface remplace un mode opératoire manuel à risque (Excel, WhatsApp, Shadow IT)." icon={MonitorSmartphone} actions={<Badge tone="accent">6 modules maquettés</Badge>} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <nav className="flex flex-col gap-2.5">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400">Modules</p>
          {moduleDefs.map(m => {
            const isActive = m.id === active;
            const s = moduleTones[m.tone];
            const Icon = m.icon;
            return (
              <button key={m.id} onClick={() => setActive(m.id)} className={`group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${isActive ? 'border-ink-300 bg-white shadow-card' : 'border-transparent bg-ink-50/60 hover:border-ink-200 hover:bg-white'}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition-transform ${isActive ? `${s.chip} scale-105` : 'bg-white text-ink-400 ring-ink-200 group-hover:text-ink-600'}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-ink-400">{m.index}</span>
                    <span className={`text-sm font-semibold ${isActive ? 'text-ink-900' : 'text-ink-600'}`}>{m.name}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-400">{m.description}</span>
                </span>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-all ${isActive ? 'text-ink-700 translate-x-0' : 'text-ink-300 -translate-x-1 opacity-0 group-hover:opacity-100'}`} />
              </button>
            );
          })}
        </nav>
        <div className="card overflow-hidden animate-scale-in">
          <div className="flex flex-col gap-4 border-b border-ink-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${tc.chip}`}>
                <mod.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-400">{mod.index}</span>
                  <h3 className="text-lg font-semibold text-ink-900">{mod.name}</h3>
                </div>
                <p className="mt-0.5 text-sm text-ink-500">{mod.description}</p>
              </div>
            </div>
            <Badge tone={mod.tone}><span className={`h-1.5 w-1.5 rounded-full ${tc.dot}`} /> Wireframe</Badge>
          </div>
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="border-b border-ink-200 bg-ink-50/10 p-0 lg:border-b-0 lg:border-r h-[600px] relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse" /> Interactif</Badge>
              </div>
              <iframe src={mod.image.replace('.png', '.html')} title={mod.imageAlt} className="w-full h-full border-0 bg-white" />
            </div>
            <div className="space-y-6 p-6 flex flex-col h-[600px] overflow-y-auto">
              {mod.flowImage && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Contexte : Chaîne de valeur</h4>
                  <div className="rounded-xl border border-ink-200 bg-white p-2">
                    <ZoomableImage src={mod.flowImage} alt={`Chaîne avant/après ${mod.name}`} imgClassName="rounded-lg" />
                  </div>
                </div>
              )}
              {mod.rules && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Règles métier</h4>
                  <p className="rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">{mod.rules}</p>
                </div>
              )}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Garde-fous logiciels</h4>
                <div className="space-y-3">
                  {mod.safeguards.map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-4 transition hover:border-ink-300 hover:shadow-soft">
                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tc.chip}`}>
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{s.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-500">{s.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-success-50 p-3 text-success-700 ring-1 ring-success-200 mt-auto">
                <CircleCheck className="h-4 w-4 shrink-0" />
                <p className="text-xs font-medium">La complexité est absorbée par le logiciel, pas par l'humain.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- AI Section ---
interface AiDef {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  flowImage: string;
  icon: LucideIcon;
  tone: string;
  algorithm: string;
  signals: { label: string; icon: LucideIcon }[];
  audience: string;
  audienceNote: string;
  routingRules?: { signal: string; target: string; icon: LucideIcon; tone: string }[];
}

const aiDefs: AiDef[] = [
  {
    id: 'anomalies', title: 'TBD Anomalies Carburant', subtitle: 'Détection d\'anomalies avant facturation',
    image: '/wireframe_anomalies_carburant.png', imageAlt: 'Anomalies Carburant',
    flowImage: '/chaine_avant_apres_detection_carburant.png',
    icon: Fuel, tone: 'brand',
    algorithm: 'Croisement de 3 signaux : Écart Déclaré vs Réel, Surconsommation vs Barème Théorique du trajet, et Analyse du Fond de cuve.',
    signals: [
      { label: 'Écart Déclaré vs Réel', icon: TrendingDown },
      { label: 'Surconsommation vs Barème', icon: Gauge },
      { label: 'Fond de cuve', icon: Fuel },
    ],
    audience: 'Mono-équipe (SE Fuel uniquement)',
    audienceNote: 'Investigation avant facturation.',
  },
  {
    id: 'gps', title: 'TBD Alertes GPS (Routage IA)', subtitle: 'Routage automatique contextuel',
    image: '/wireframe_alertes_gps.png', imageAlt: 'Alertes GPS',
    flowImage: '/chaine_avant_apres_alertes_gps.png',
    icon: MapPin, tone: 'warning',
    algorithm: 'Calcul de gravité contextuelle basé sur la récurrence des événements sur 24h par véhicule.',
    signals: [
      { label: 'Gravité contextuelle', icon: Cpu },
      { label: 'Récurrence 24h / véhicule', icon: Gauge },
    ],
    audience: 'Routage automatique multi-équipes',
    audienceNote: 'Supprime les appels téléphoniques manuels.',
    routingRules: [
      { signal: 'Vitesse pure', target: 'QHSE', icon: Gauge, tone: 'danger' },
      { signal: 'Déviation d\'itinéraire', target: 'RO', icon: Route, tone: 'brand' },
      { signal: 'Arrêt suspect de nuit', target: 'SO', icon: Moon, tone: 'warning' },
    ],
  },
];

const aiTones: Record<string, { chip: string; dot: string; header?: string }> = {
  brand: { chip: 'bg-brand-50 text-brand-700 ring-brand-200', dot: 'bg-brand-500', header: 'from-brand-50' },
  warning: { chip: 'bg-warning-50 text-warning-700 ring-warning-200', dot: 'bg-warning-500', header: 'from-warning-50' },
  success: { chip: 'bg-success-50 text-success-700 ring-success-200', dot: 'bg-success-500' },
  danger: { chip: 'bg-danger-50 text-danger-700 ring-danger-200', dot: 'bg-danger-500' },
};

function AiSection() {
  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Section 03" title="Algorithmes & Tableaux de Bord" subtitle="Deux moteurs IA Python en preuve de concept (PoC), conçus pour fiabiliser la donnée et automatiser le routage des alertes vers les bonnes équipes." icon={BrainCircuit} actions={<Badge tone="warning"><Cpu className="h-3.5 w-3.5" /> PoC Python</Badge>} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {aiDefs.map((item, i) => {
          const tc = aiTones[item.tone];
          const Icon = item.icon;
          return (
            <article key={item.id} className="card overflow-hidden animate-fade-in flex flex-col" style={{ animationDelay: `${i * 120}ms` }}>
              <div className={`flex items-center gap-4 border-b border-ink-200 bg-gradient-to-r ${tc.header} to-transparent p-6 shrink-0`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${tc.chip}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
                  <p className="text-sm text-ink-500">{item.subtitle}</p>
                </div>
                <span className={`hidden h-2 w-2 rounded-full ${tc.dot} animate-pulse-soft sm:block`} />
              </div>
              <div className="relative bg-ink-50/10 p-0 h-[500px] border-b border-ink-200 shrink-0">
                <div className="absolute top-2 right-2 z-10">
                  <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse" /> Interactif</Badge>
                </div>
                <iframe src={item.image.replace('.png', '.html')} title={item.imageAlt} className="w-full h-full border-0 bg-white" />
              </div>
              <div className="space-y-6 p-6 flex-1 bg-white">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Contexte : Chaîne de valeur</h4>
                  <div className="rounded-xl border border-ink-200 p-2">
                    <ZoomableImage src={item.flowImage} alt={`Chaîne avant/après ${item.title}`} imgClassName="rounded-lg" />
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Algorithme</h4>
                  <p className="rounded-xl bg-ink-900 p-4 text-sm leading-relaxed text-ink-100">
                    <span className="mr-2 font-mono text-brand-400">{">"}</span>{item.algorithm}
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Signaux croisés</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.signals.map(sig => {
                      const Icon = sig.icon;
                      return (
                        <span key={sig.label} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ring-1 ${tc.chip}`}>
                          <Icon className="h-3.5 w-3.5" />{sig.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {item.routingRules && (
                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Routage automatique</h4>
                    <div className="space-y-2.5">
                      {item.routingRules.map(rule => {
                        const Icon = rule.icon;
                        const s = aiTones[rule.tone];
                        return (
                          <div key={rule.signal} className="group flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-3 transition hover:border-ink-300 hover:shadow-soft">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${s.chip}`}>
                              <Icon className="h-4 w-4" strokeWidth={1.75} />
                            </span>
                            <span className="flex-1 text-sm font-medium text-ink-700">{rule.signal}</span>
                            <ArrowRight className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1" />
                            <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ${s.chip}`}>
                              <Radio className="h-3 w-3" />{rule.target}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 rounded-xl bg-ink-50 p-4 mt-auto">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-ink-600 ring-1 ring-ink-200">
                    <Users className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{item.audience}</p>
                    <p className="mt-0.5 text-xs text-ink-500">{item.audienceNote}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// --- Backlog Section ---
interface BacklogItem {
  title: string;
  team: string;
  dbReady: boolean;
  dbNote: string;
  detail: string;
  optimization: string;
  icon: LucideIcon;
}

const uiDebtItems: BacklogItem[] = [
  { title: 'Facturation Périodique (GROUPE & LLD)', team: 'Responsable Opérationnel (RO)', dbReady: true, dbNote: "Géré par l'entité FACTURE (périodes) et REGLE_FACTURATION.", detail: "Le RO déclenche la facturation du GROUPE (INVISO) et les LLD le 15 du mois, contournant la saisie OS classique. Pas d'écran dédié maquetté.", optimization: "Créer un espace « Validation & Contrats » pour le RO permettant de déclencher ces factures en lot d'un seul clic.", icon: FilePlus },
  { title: 'Module Facturation & Impression', team: 'Facturation', dbReady: true, dbNote: 'Entités FACTURE et REGLE_FACTURATION existantes.', detail: "Aucun wireframe réalisé. L'équipe a besoin d'un écran de vérification finale avant facturation.", optimization: "Génération automatique des PDF avec les 3 à 5 exemplaires requis et intégration directe à l'ERP comptable.", icon: Calculator },
  { title: 'Logistique & Stocks (Sangles)', team: 'Opérateur de Saisie', dbReady: true, dbNote: 'Géré nativement par la table générique ARTICLE.', detail: "L'OS gère le suivi des sangles et fournitures sur Excel. Aucune maquette de suivi de stock n'a été designée.", optimization: "Intégrer un sous-onglet « Fournitures » directement dans l'outil OS Exploitation pour un suivi en un clic.", icon: Truck },
  { title: 'Contrôles & Alertes (KM / Expiration)', team: 'Opérateur de Saisie', dbReady: true, dbNote: 'Les dates et KM sont tracés dans DOCUMENT_ADMINISTRATIF.', detail: "L'OS doit aujourd'hui surveiller manuellement les seuils kilométriques (ex: 5000km) et les dates d'expiration.", optimization: "Mettre en place un script CRON nocturne et un widget « Centre de Notifications » (cloche) en haut de l'écran OS.", icon: BellRing },
  { title: 'Traitement Admin SAV', team: 'Opérateur de Saisie', dbReady: true, dbNote: 'Relié via INTERVENTION_SAV et COMMANDE_APPRO.', detail: "La saisie des factures de réparation ID Motors et les relances SAV sont encore gérées hors système.", optimization: "Créer un tunnel de saisie de factures SAV lié automatiquement à l'historique du véhicule.", icon: Headset },
  { title: 'Contrôle Qualité & Circuit Garage', team: 'Atelier Technique', dbReady: true, dbNote: 'Statuts d\'intervention gérés dans la BDD V18.', detail: "Le circuit de facturation interne avec l'Assistante Technique et la validation mécanique post-réparation ne sont pas maquettés.", optimization: "Ajout d'une signature numérique (workflow de validation) par le DT pour attester du contrôle qualité.", icon: Wrench },
];

const v3Items: BacklogItem[] = [
  { title: 'Import/Export & Douanes (Galana)', team: 'RO Digue Admin', dbReady: false, dbNote: 'Tables EIR, Gate Pass et Dossier Douane manquantes.', detail: "Le circuit lourd du port avec la gestion documentaire douanière n'a pas été modélisé.", optimization: "Créer un portail connecté avec les autorités portuaires pour dématérialiser les Gate Pass.", icon: PackageCheck },
  { title: 'Cycle Citerne (Jovena)', team: 'RO Jovena', dbReady: false, dbNote: 'Champs de Jaugeage, Plombs et Cartes Carburant manquants.', detail: "Processus spécifique en 5 étapes géré par le RO seul. Incompatible avec la table MISSION classique.", optimization: "Développer un module métier spécifique 'Hydrocarbures' avec suivi des plombs de sécurité.", icon: Fuel },
  { title: 'Scripts ETL Fournisseurs', team: 'SE Fuel / SE GPS', dbReady: false, dbNote: 'Architecture logicielle externe requise (Middleware).', detail: "Le format brut des données Camtrack, Galana ou SLMI nécessite des scripts de nettoyage avant injection IA.", optimization: "Automatiser des pipelines de données (Python/Airflow) branchés sur les API des fournisseurs.", icon: DatabaseZap },
  { title: 'Référentiel Géographique (STAR)', team: 'Exploitation', dbReady: false, dbNote: 'Table des matrices de distances manquante.', detail: "Impossible d'automatiser le calcul tarifaire STAR (Poids x KM) sans une base de données des trajets.", optimization: "Brancher l'API Google Maps Distance Matrix pour auto-compléter le kilométrage exact.", icon: Map },
];

function BacklogSection() {
  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Section 04" title="Etat des lieux" subtitle="Analyse chirurgicale du reste à faire : distinction entre les modules où la base de données est déjà prête (Dette UI) et les nouveaux périmètres métiers (V3)." icon={FlagTriangleRight} actions={<Badge tone="neutral">Etat des lieux</Badge>} />
      <section>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-100 text-success-700 ring-1 ring-success-200"><Database className="h-5 w-5" /></span>
          <div>
            <h3 className="text-lg font-semibold text-ink-900">Dette UI : La Base de Données est prête</h3>
            <p className="text-sm text-ink-500">Fonctionnalités supportées par le MCD V18, nécessitant uniquement le développement des écrans (Front-end).</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {uiDebtItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-success-300 hover:shadow-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-600 ring-1 ring-ink-200 transition-colors group-hover:bg-success-50 group-hover:text-success-600 group-hover:ring-success-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-ink-900">{item.title}</h4>
                      <span className="mt-0.5 inline-flex items-center rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-600">Équipe : {item.team}</span>
                    </div>
                  </div>
                  <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success-500" /> BDD OK</Badge>
                </div>
                <div className="mb-4 flex-1 space-y-3">
                  <p className="text-sm text-ink-600"><strong className="text-ink-900">Statut métier :</strong> {item.detail}</p>
                  <p className="text-xs text-ink-500 bg-ink-50 p-2 rounded-lg border border-ink-100"><strong className="text-ink-700">Architecture :</strong> {item.dbNote}</p>
                </div>
                <div className="mt-auto border-t border-ink-100 pt-4">
                  <div className="flex items-start gap-2 text-sm">
                    <GitBranch className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
                    <p className="text-brand-700 font-medium leading-relaxed">
                      <span className="uppercase text-[10px] font-bold tracking-wider text-brand-500 block mb-0.5">Idée d'optimisation UI</span>
                      {item.optimization}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-100 text-warning-700 ring-1 ring-warning-200"><CircleSlash className="h-5 w-5" /></span>
          <div>
            <h3 className="text-lg font-semibold text-ink-900">Angles Morts & Backlog</h3>
            <p className="text-sm text-ink-500">Périmètres hors V1 nécessitant une évolution du modèle de données (BDD) avant création d'interface.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {v3Items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group flex flex-col gap-4 rounded-2xl border border-warning-200 bg-warning-50/30 p-6 transition-all duration-300 hover:border-warning-300 hover:bg-white hover:shadow-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-warning-600 shadow-soft ring-1 ring-warning-200 transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-ink-900">{item.title}</h4>
                      <span className="mt-0.5 inline-flex items-center rounded-md bg-warning-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning-700">Équipe : {item.team}</span>
                    </div>
                  </div>
                  <Badge tone="warning">BDD à modéliser</Badge>
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-ink-600"><strong className="text-ink-900">Statut métier :</strong> {item.detail}</p>
                  <p className="text-xs text-warning-700 bg-warning-100/50 p-2 rounded-lg border border-warning-200"><strong className="text-warning-900">Bloquant technique :</strong> {item.dbNote}</p>
                </div>
                <div className="mt-auto border-t border-warning-200/50 pt-4">
                  <div className="flex items-start gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-400 mt-0.5 group-hover:text-ink-900 transition-colors" />
                    <p className="text-ink-700 font-medium leading-relaxed">
                      <span className="uppercase text-[10px] font-bold tracking-wider text-ink-500 block mb-0.5">Vision Cible (V3)</span>
                      {item.optimization}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// --- Sidebar ---
function Sidebar({ active, onSelect, open, onClose }: { active: SectionId; onSelect: (id: SectionId) => void; open: boolean; onClose: () => void }) {
  const idx = navItems.findIndex(i => i.id === active);
  return (
    <>
      <div className={`fixed inset-0 z-30 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} aria-hidden="true" />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-ink-950 text-white transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="relative flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-900/40">
            <GitBranch className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold tracking-tight">Architecture Digitale ID RENTAL</p>
            <p className="truncate text-xs text-white/50">ID Rental</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden" aria-label="Fermer la navigation">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Sections</p>
          <ul className="space-y-1">
            {navItems.map((item, i) => {
              const isActive = item.id === active;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button onClick={() => onSelect(item.id)} className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                    {isActive && <span className={`absolute inset-y-2 left-0 w-1 rounded-full bg-gradient-to-b ${item.tone}`} />}
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isActive ? `bg-gradient-to-br ${item.tone} text-white shadow-md` : 'bg-white/5 text-white/60 group-hover:text-white'}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{item.short}</span>
                      <span className={`block truncate text-[11px] ${isActive ? 'text-white/60' : 'text-white/35'}`}>{`0${i + 1}`} · {item.label.split(' ')[0]}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-white/10 px-6 py-5">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/80">Rapport V8</p>
              <span className="badge bg-success-500/20 text-success-300 ring-1 ring-success-500/30">Finalisé</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/40">Présentation destinée au Directeur de la Transformation Digitale.</p>
          </div>
        </div>
        <div className="hidden px-6 pb-5 lg:block">
          <div className="flex items-center gap-2 text-[11px] text-white/30">
            <span className="font-mono">{`0${idx + 1} / 0${navItems.length}`}</span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono">v18 · MCD</span>
          </div>
        </div>
      </aside>
    </>
  );
}

// --- Topbar ---
function Topbar({ section, onMenu }: { section: SectionId; onMenu: () => void }) {
  const { eyebrow, title } = sectionTitles[section];
  return (
    <header className="sticky top-0 z-20 border-b border-ink-200 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={onMenu} className="rounded-lg p-2 text-ink-600 transition hover:bg-ink-100 lg:hidden" aria-label="Ouvrir la navigation">
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 sm:block">{eyebrow}</p>
          <h2 className="truncate text-base font-semibold text-ink-900 sm:text-lg">{title}</h2>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-ink-400" />
          <input type="text" placeholder="Rechercher un livrable, un module…" className="w-56 bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none" />
          <kbd className="rounded bg-ink-200 px-1.5 py-0.5 text-[10px] font-semibold text-ink-500">⌘K</kbd>
        </div>
        <button className="relative rounded-lg p-2 text-ink-600 transition hover:bg-ink-100" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-3 border-l border-ink-200 pl-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-ink-900">Architecture Digitale</p>
            <p className="text-[11px] text-ink-400">ID RENTAL</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">EA</div>
        </div>
      </div>
    </header>
  );
}

// --- Main App ---
export default function App() {
  const [section, setSection] = useState<SectionId>('architecture');
  const [navOpen, setNavOpen] = useState(false);

  const handleSelect = (id: SectionId) => {
    setSection(id);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { document.title = 'Transformation Digitale — ID Rental'; }, []);

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar active={section} onSelect={handleSelect} open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar section={section} onMenu={() => setNavOpen(true)} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl" key={section}>
            {section === 'architecture' && <ArchitectureSection />}
            {section === 'modules' && <ModulesSection />}
            {section === 'ai' && <AiSection />}
            {section === 'backlog' && <BacklogSection />}
          </div>
        </main>
        <footer className="border-t border-ink-200 px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 text-xs text-ink-400 sm:flex-row sm:items-center">
            <p>Transformation Digitale — ID Rental</p>
            <p>Direction Transformation Digitale</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
