/* Design note: Editorial Field Manual. The page prioritizes fast discovery, classifying hooks in a dark-green reference-desk layout. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";

type HookRecord = {
  id: number;
  sourceCategory: string;
  style: string;
  niches: string[];
  hook: string;
  examples: Record<string, string>;
  inspirationUrls: string[];
  sourceStatus: string;
};

const DATA_URL = "/data/hooks.json";
const PAGE_SIZE = 18;

function countBy<T>(items: T[], key: (item: T) => string) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const value = key(item);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

export default function Home() {
  const [hooks, setHooks] = useState<HookRecord[]>([]);
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("All styles");
  const [niche, setNiche] = useState("All niches");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [copied, setCopied] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load hook data");
        return response.json();
      })
      .then((data: HookRecord[]) => {
        setHooks(data);
        setSelectedId(data[0]?.id ?? null);
      })
      .catch(() => setLoadError(true));
  }, []);

  const styles = useMemo(() => Object.keys(countBy(hooks, (hook) => hook.style)).sort(), [hooks]);
  const niches = useMemo(
    () => Array.from(new Set(hooks.flatMap((hook) => hook.niches))).sort(),
    [hooks],
  );
  const filteredHooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return hooks.filter((hook) => {
      const matchesStyle = style === "All styles" || hook.style === style;
      const matchesNiche = niche === "All niches" || hook.niches.includes(niche);
      const matchesSearch = !query || [hook.hook, hook.style, hook.sourceCategory, ...hook.niches]
        .join(" ")
        .toLowerCase()
        .includes(query);
      return matchesStyle && matchesNiche && matchesSearch;
    });
  }, [hooks, search, style, niche]);
  const visibleHooks = filteredHooks.slice(0, visibleCount);
  const selectedHook = filteredHooks.find((hook) => hook.id === selectedId) || filteredHooks[0] || null;
  const styleCounts = useMemo(() => countBy(hooks, (hook) => hook.style), [hooks]);
  const nicheCounts = useMemo(
    () => hooks.flatMap((hook) => hook.niches).reduce<Record<string, number>>((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {}),
    [hooks],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, style, niche]);

  useEffect(() => {
    if (filteredHooks.length && !filteredHooks.some((hook) => hook.id === selectedId)) {
      setSelectedId(filteredHooks[0].id);
    }
  }, [filteredHooks, selectedId]);

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("Copy unavailable");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStyle("All styles");
    setNiche("All niches");
  };

  const jumpToLibrary = () => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="app-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="brand-lockup" aria-label="Sifu Yik Hook Library home">
          <span className="brand-seal"><img className="brand-mark" src="/assets/sifu-yik-monogram.png" alt="Sifu Yik monogram" /></span>
          <span className="brand-word">SIFU YIK</span>
        </a>
        <div className="nav-meta">
          <span>Hook Library</span>
          <span className="nav-count">{hooks.length || "1,000"} curated openings</span>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-content">
          <div className="eyebrow">Created by Sifu Yik</div>
          <h1>Find the opening line<br />your next post <em>needs.</em></h1>
          <p className="hero-sub">A structured library of 1,000 hooks, sorted by the content styles and niches that make them useful. Browse the format, see a working example, then make it your own.</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={jumpToLibrary}>
              Browse the library <ArrowDownRight size={15} />
            </button>
            <a className="button-quiet" href="#how-it-works">How to use it <ArrowDownRight size={14} /></a>
          </div>
          <div className="hero-workflow" aria-label="Quick browse paths">
            <button className="workflow-chip" onClick={() => { setStyle("How-to / Tutorial"); jumpToLibrary(); }}><span className="workflow-index">01</span><strong>Pick a style</strong> How-to</button>
            <button className="workflow-chip" onClick={() => { setNiche("Business & Marketing"); jumpToLibrary(); }}><span className="workflow-index">02</span><strong>Find a niche</strong> Business</button>
            <button className="workflow-chip" onClick={() => { setStyle("Personal Story"); jumpToLibrary(); }}><span className="workflow-index">03</span><strong>Use a format</strong> Story</button>
          </div>
          <div className="hero-ledger" aria-label="Library statistics">
            <div className="ledger-item"><span className="ledger-value">1,000</span><span className="ledger-label">Hook templates</span></div>
            <div className="ledger-item"><span className="ledger-value">15</span><span className="ledger-label">Content styles</span></div>
            <div className="ledger-item"><span className="ledger-value">5,000</span><span className="ledger-label">Niche examples</span></div>
          </div>
        </div>
      </header>

      <main className="library-section" id="library">
        <div className="library-frame">
          <aside className={`filter-rail ${filtersOpen ? "" : "collapsed"}`} aria-label="Library filters">
            <div className="filter-head">
              <span className="panel-label">Browse the archive</span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {(search || style !== "All styles" || niche !== "All niches") && <button className="clear-button" onClick={clearFilters}>Reset</button>}
                <button className="mobile-filter-toggle" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
                  <Filter size={13} /> Filters {filtersOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
            </div>
            <div className="filter-content">
              <div className="search-wrap">
                <Search size={15} />
                <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search hooks, styles, niches" aria-label="Search the library" />
              </div>
              <section className="filter-group">
                <h3>Content style</h3>
                <div className="filter-options">
                  <button className={`filter-chip ${style === "All styles" ? "active" : ""}`} onClick={() => setStyle("All styles")}>All styles</button>
                  {styles.map((item) => <button key={item} className={`filter-chip ${style === item ? "active" : ""}`} onClick={() => setStyle(item)}>{item} · {styleCounts[item]}</button>)}
                </div>
              </section>
              <section className="filter-group">
                <h3>Recommended niche</h3>
                <div className="filter-options">
                  <button className={`filter-chip ${niche === "All niches" ? "active" : ""}`} onClick={() => setNiche("All niches")}>All niches</button>
                  {niches.map((item) => <button key={item} className={`filter-chip ${niche === item ? "active" : ""}`} onClick={() => setNiche(item)}>{item} · {nicheCounts[item]}</button>)}
                </div>
              </section>
            </div>
          </aside>

          <section className="results-panel" aria-live="polite">
            <div className="results-head">
              <div><span className="panel-label">The full reference</span><h2>{style === "All styles" ? "Every opening line" : style}</h2></div>
              <div className="match-count">{loadError ? "Dataset unavailable" : `${filteredHooks.length.toLocaleString()} matching hooks`}<br />Showing {Math.min(visibleHooks.length, filteredHooks.length)} of {filteredHooks.length.toLocaleString()}</div>
            </div>
            {!hooks.length && !loadError && <div className="loading-grid">{Array.from({ length: 8 }).map((_, index) => <div className="skeleton" key={index} />)}</div>}
            {loadError && <div className="empty-state">The hook archive could not be loaded. Refresh the page and try again.</div>}
            {!!hooks.length && !filteredHooks.length && <div className="empty-state">No hook fits those filters yet. Try a broader niche, a different content style, or a shorter search.</div>}
            <div className="result-list">
              {visibleHooks.map((hook) => <button key={hook.id} className={`hook-row ${selectedHook?.id === hook.id ? "selected" : ""}`} onClick={() => setSelectedId(hook.id)}>
                <span className="hook-id">{String(hook.id).padStart(3, "0")}</span>
                <span className="hook-copy">{hook.hook}</span>
                <span className="style-stamp">{hook.style}</span>
              </button>)}
            </div>
            {visibleCount < filteredHooks.length && <button className="load-more" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, filteredHooks.length - visibleCount)} more hooks</button>}
          </section>

          <aside className="detail-panel" aria-label="Selected hook details">
            <div className="detail-accent" />
            {!selectedHook ? <div className="detail-inner"><span className="panel-label">Select a hook</span><p className="empty-state">Choose an opening line to view ready-to-use examples.</p></div> : <div className="detail-inner">
              <div className="detail-top"><span className="detail-number">HOOK {String(selectedHook.id).padStart(3, "0")}</span><button className="copy-button" onClick={() => copyText(selectedHook.hook, "Hook copied")}>{copied === "Hook copied" ? <Check size={13} /> : <Clipboard size={13} />}{copied === "Hook copied" ? "Copied" : "Copy hook"}</button></div>
              <h2 className="detail-title">{selectedHook.hook}</h2>
              <div className="detail-tags"><span className="detail-tag">{selectedHook.style}</span>{selectedHook.niches.map((item) => <span className="detail-tag" key={item}>{item}</span>)}</div>
              {selectedHook.inspirationUrls[0] ? <a className="source-link" href={selectedHook.inspirationUrls[0]} target="_blank" rel="noreferrer">View original inspiration <ExternalLink size={13} /></a> : <div className="source-muted">No external inspiration URL is available for this entry.</div>}
              <div className="detail-rule" />
              <h3 className="examples-title"><Sparkles size={12} style={{ verticalAlign: "-2px", marginRight: 6 }} /> Five ways to make it yours</h3>
              <div className="example-stack">
                {Object.entries(selectedHook.examples).map(([exampleNiche, example]) => <div className="example-card" key={exampleNiche}><span className="example-niche">{exampleNiche}</span><div className="example-copy">{example}</div><button className="example-copy-button" title={`Copy ${exampleNiche} example`} aria-label={`Copy ${exampleNiche} example`} onClick={() => copyText(example, `Example ${exampleNiche}`)}>{copied === `Example ${exampleNiche}` ? <Check size={13} /> : <Clipboard size={13} />}</button></div>)}
              </div>
              <div className="source-status">{selectedHook.sourceStatus}</div>
            </div>}
          </aside>
        </div>

        <section id="how-it-works" style={{ maxWidth: 1640, margin: "40px auto 0", borderTop: "1px solid rgba(232,239,214,.13)", paddingTop: 28 }}>
          <span className="panel-label">A working system, not just a list</span>
          <p style={{ maxWidth: 770, margin: "10px 0 0", color: "#cbd6c4", fontSize: 14, lineHeight: 1.8 }}>Start with the way you want to communicate, then narrow by the audience you want to reach. Each detail panel gives you a clean template plus five ready-to-adapt examples, so you can move from a strong opening to an actual post without losing momentum.</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-cta">
          <div><span className="eyebrow">Field notes for creators</span><h2>Follow Sifu Yik for more<br /><em style={{ color: "#c4dc7f" }}>AI Tips and News.</em></h2><p className="footer-description">Practical creator workflows, useful AI context, and the systems that help turn a strong idea into a published post.</p></div>
          <a className="button-primary" href="https://sifuyik.substack.com/subscribe" target="_blank" rel="noreferrer">Follow on Substack <ExternalLink size={15} /></a>
        </div>
        <div className="footer-bottom"><span className="footer-bottom-left"><span className="footer-rule" /> Created by Sifu Yik · 2026</span><span>1,000 hooks · Search, adapt, publish</span></div>
      </footer>
    </div>
  );
}
