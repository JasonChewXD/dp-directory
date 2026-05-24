'use client';

import React, { useState } from 'react';
import { X, Award, Plus } from 'lucide-react';
import { dps } from '../data/dps.js';

export default function Page() {
  const [selectedDP, setSelectedDP] = useState(null);
  const [hoveredYear, setHoveredYear] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === 'all' ? dps : dps.filter(d => d.status === filter);
  const sortedByYear = [...filtered].sort((a, b) => a.born - b.born);

  const minYear = 1890;
  const maxYear = 2030;
  const yearToPercent = (year) => ((year - minYear) / (maxYear - minYear)) * 100;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#f4f1ea', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f1ea; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .entry-card { transition: all 0.3s ease; cursor: pointer; }
        .entry-card:hover { background: #1a1a1a; color: #f4f1ea; }
        .entry-card:hover .card-meta { color: #a8a39a; }
        .entry-card:hover .card-divider { background: #a8a39a; }
        .filter-btn { transition: all 0.2s ease; cursor: pointer; }
        button:focus, input:focus, textarea:focus, select:focus { outline: none; }
        input[type="text"], input[type="email"], input[type="url"], textarea, select {
          width: 100%; padding: 10px 0; background: transparent; border: none;
          border-bottom: 1px solid #1a1a1a; font-size: 16px; font-style: italic;
          font-family: 'Cormorant Garamond', Georgia, serif; color: #1a1a1a;
        }
      `}</style>

      <header style={{ borderBottom: '1px solid #1a1a1a', padding: '32px 48px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>
            An A-Cam Project · The Canon
          </div>
          <h1 className="serif" style={{ fontSize: '56px', fontWeight: 500, margin: 0, lineHeight: 0.95, letterSpacing: '-0.025em', maxWidth: '900px' }}>
            Asian American <em style={{ fontWeight: 400 }}>Cinematographers</em>
          </h1>
        </div>
        <button onClick={() => { setShowSubmit(true); setSubmitted(false); }} className="mono" style={{ background: '#1a1a1a', color: '#f4f1ea', border: 'none', padding: '14px 22px', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={14} /> Nominate
        </button>
      </header>

      <section style={{ padding: '24px 48px', borderBottom: '1px solid rgba(26,26,26,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', border: '1px solid #1a1a1a', padding: '4px' }}>
          {[
            { id: 'all', label: 'All entries' },
            { id: 'historical', label: 'Historical' },
            { id: 'active', label: 'Working today' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className="mono filter-btn" style={{ padding: '8px 14px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', background: filter === f.id ? '#1a1a1a' : 'transparent', color: filter === f.id ? '#f4f1ea' : '#1a1a1a', cursor: 'pointer' }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>
          {filtered.length} of {dps.length} listed
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '64px 48px 32px' }}>
        <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '32px' }}>
          § 01 / The Timeline
        </div>
        {(() => {
          // Assign each DP to a side (above/below) alternating, then stack into rows
          // within each side to avoid horizontal label collisions.
          const MIN_GAP_PCT = 11; // minimum horizontal gap (in % of timeline width) before two labels stack
          const ROW_HEIGHT = 40; // vertical px between stacked label rows
          const LABEL_OFFSET = 22; // px from the dot to the nearest label row

          const items = sortedByYear.map((dp, i) => ({
            dp,
            x: yearToPercent(dp.born),
            side: (i % 2 === 0 ? 'above' : 'below') as 'above' | 'below',
          }));

          const placeRows = (group: typeof items) => {
            const sorted = [...group].sort((a, b) => a.x - b.x);
            const rowsLastX: number[] = [];
            return sorted.map(item => {
              let row = rowsLastX.findIndex(lastX => item.x - lastX >= MIN_GAP_PCT);
              if (row === -1) {
                rowsLastX.push(item.x);
                row = rowsLastX.length - 1;
              } else {
                rowsLastX[row] = item.x;
              }
              return { ...item, row };
            });
          };

          const above = placeRows(items.filter(it => it.side === 'above'));
          const below = placeRows(items.filter(it => it.side === 'below'));
          const placed = [...above, ...below];

          const aboveRows = above.reduce((m, it) => Math.max(m, it.row + 1), 1);
          const belowRows = below.reduce((m, it) => Math.max(m, it.row + 1), 1);
          const topPad = LABEL_OFFSET + aboveRows * ROW_HEIGHT + 20;
          const bottomPad = LABEL_OFFSET + belowRows * ROW_HEIGHT + 20;

          return (
            <div style={{ position: 'relative', padding: `${topPad}px 0 ${bottomPad}px 0` }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: `${topPad}px`, height: '1px', background: '#1a1a1a' }}></div>
              <div style={{ position: 'absolute', left: 0, right: 0, top: `${topPad}px` }}>
                {[1900, 1920, 1940, 1960, 1980, 2000, 2020].map(year => (
                  <div key={year} style={{ position: 'absolute', left: `${yearToPercent(year)}%`, transform: 'translateX(-50%)' }}>
                    <div style={{ width: '1px', height: '8px', background: '#1a1a1a', marginTop: '-4px' }}></div>
                    <div className="mono" style={{ fontSize: '10px', opacity: 0.4, marginTop: '6px' }}>{year}</div>
                  </div>
                ))}
              </div>
              {placed.map(({ dp, x, side, row }) => {
                const labelOffset = LABEL_OFFSET + row * ROW_HEIGHT;
                return (
                  <div key={dp.id} onClick={() => setSelectedDP(dp)} onMouseEnter={() => setHoveredYear(dp.id)} onMouseLeave={() => setHoveredYear(null)} style={{ position: 'absolute', left: `${x}%`, top: `${topPad}px`, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 5 }}>
                    <div style={{ width: dp.highlight ? '14px' : '10px', height: dp.highlight ? '14px' : '10px', borderRadius: '50%', background: dp.highlight ? '#a02020' : '#1a1a1a', border: '3px solid #f4f1ea', boxShadow: hoveredYear === dp.id ? '0 0 0 6px rgba(26,26,26,0.15)' : 'none', transition: 'box-shadow 0.2s ease' }}></div>
                    {row > 0 && (
                      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', [side === 'above' ? 'bottom' : 'top']: '12px', width: '1px', height: `${row * ROW_HEIGHT - 4}px`, background: 'rgba(26,26,26,0.25)', pointerEvents: 'none' }}></div>
                    )}
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', [side === 'above' ? 'bottom' : 'top']: `${labelOffset}px`, whiteSpace: 'nowrap', textAlign: 'center', pointerEvents: 'none' }}>
                      <div className="serif" style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.1 }}>{dp.name}</div>
                      <div className="mono" style={{ fontSize: '9px', opacity: 0.5, marginTop: '2px' }}>{dp.lifespan}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* Entries grid */}
      <section style={{ padding: '32px 48px 48px' }}>
        <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '32px' }}>
          § 02 / Entries
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1px', background: 'rgba(26,26,26,0.15)', border: '1px solid rgba(26,26,26,0.15)' }}>
          {sortedByYear.map((dp, i) => (
            <div key={dp.id} className="entry-card fade-up" onClick={() => setSelectedDP(dp)} style={{ background: '#f4f1ea', padding: '28px', animationDelay: `${i * 0.05}s`, opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div className="mono card-meta" style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '0.1em' }}>
                  № {String(dp.id).padStart(3, '0')} · {dp.era.toUpperCase()}
                </div>
                <div className="mono card-meta" style={{ fontSize: '10px', opacity: 0.5 }}>{dp.lifespan}</div>
              </div>
              <h3 className="serif" style={{ fontSize: '30px', fontWeight: 500, margin: '0 0 4px 0', lineHeight: 1, letterSpacing: '-0.015em' }}>{dp.name}</h3>
              <div className="serif card-meta" style={{ fontSize: '15px', fontStyle: 'italic', opacity: 0.7, marginBottom: '8px' }}>{dp.heritage}</div>
              <div className="mono card-meta" style={{ fontSize: '10px', opacity: 0.5 }}>{dp.origin}</div>
              <div className="card-divider" style={{ height: '1px', background: 'rgba(26,26,26,0.2)', margin: '20px 0' }}></div>
              {dp.awards && dp.awards.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div className="mono card-meta" style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Recognition</div>
                  <div className="serif card-meta" style={{ fontSize: '14px', lineHeight: 1.5, opacity: 0.85 }}>{dp.awards[0]}</div>
                </div>
              )}
              <div>
                <div className="mono card-meta" style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Selected work</div>
                <div className="serif card-meta" style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: 1.5, opacity: 0.85 }}>{dp.notable.slice(0, 3).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>acamcrew.com · The Canon</div>
        <div className="serif" style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.7 }}>A lineage, not a hierarchy.</div>
      </footer>

      {/* Hidden form for Netlify to detect at build time */}
      <form name="dp-nomination" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="submitted-name" />
        <input type="email" name="submitter-email" />
        <input type="text" name="submitter-name" />
        <input type="url" name="reel-url" />
        <select name="relationship"><option></option></select>
        <textarea name="notes"></textarea>
        <input name="bot-field" />
      </form>

      {/* Profile modal */}
      {selectedDP && (
        <div onClick={() => setSelectedDP(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '40px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#f4f1ea', maxWidth: '760px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setSelectedDP(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', zIndex: 2 }}><X size={20} /></button>
            <div style={{ padding: '56px' }}>
              <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '16px' }}>№ {String(selectedDP.id).padStart(3, '0')} · {selectedDP.status.toUpperCase()}</div>
              <h2 className="serif" style={{ fontSize: '52px', fontWeight: 500, margin: '0 0 8px 0', lineHeight: 0.95, letterSpacing: '-0.02em' }}>{selectedDP.name}</h2>
              <p className="serif" style={{ fontSize: '20px', fontStyle: 'italic', opacity: 0.7, margin: '0 0 8px 0' }}>{selectedDP.heritage}</p>
              <p className="mono" style={{ fontSize: '11px', opacity: 0.5, margin: '0 0 32px 0' }}>{selectedDP.lifespan} · {selectedDP.origin} · {selectedDP.society}</p>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '32px 0' }}></div>
              <p className="serif" style={{ fontSize: '17px', lineHeight: 1.55, margin: '0 0 32px 0' }}>{selectedDP.contribution}</p>
              <div style={{ marginBottom: '28px' }}>
                <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>Recognition</div>
                {selectedDP.awards.map((a, i) => (
                  <div key={i} className="serif" style={{ fontSize: '15px', display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}><Award size={12} style={{ opacity: 0.5, flexShrink: 0 }} /> {a}</div>
                ))}
              </div>
              <div style={{ marginBottom: '28px' }}>
                <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>Selected filmography</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedDP.notable.map(n => (
                    <div key={n} className="serif" style={{ padding: '6px 12px', border: '1px solid #1a1a1a', fontSize: '14px', fontStyle: 'italic' }}>{n}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission modal */}
      {showSubmit && (
        <div onClick={() => setShowSubmit(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '40px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#f4f1ea', maxWidth: '560px', width: '100%', position: 'relative' }}>
            <button onClick={() => setShowSubmit(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}><X size={20} /></button>
            <div style={{ padding: '48px' }}>
              {!submitted ? (
                <>
                  <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '12px' }}>§ Contribute</div>
                  <h2 className="serif" style={{ fontSize: '40px', fontWeight: 500, margin: '0 0 16px 0', lineHeight: 1.05 }}>Nominate a cinematographer</h2>
                  <p className="serif" style={{ fontSize: '15px', fontStyle: 'italic', opacity: 0.7, margin: '0 0 32px 0', lineHeight: 1.5 }}>
                    Nominate yourself or a peer. The subject will be contacted to confirm before listing. No one is published without consent.
                  </p>
                  <form name="dp-nomination" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="hidden" name="form-name" value="dp-nomination" />
                    <p hidden><label>Don't fill this: <input name="bot-field" /></label></p>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Cinematographer's name *</div>
                      <input type="text" name="submitted-name" placeholder="Full name" required />
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Reel or IMDb link</div>
                      <input type="url" name="reel-url" placeholder="https://…" />
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Your relationship</div>
                      <select name="relationship" required>
                        <option value="">Select one…</option>
                        <option>This is me</option>
                        <option>I've worked with them</option>
                        <option>I'm familiar with their work</option>
                      </select>
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Your email *</div>
                      <input type="email" name="submitter-email" placeholder="So we can follow up" required />
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '6px' }}>Notes</div>
                      <textarea name="notes" rows={3} placeholder="Anything else worth knowing?" />
                    </div>
                    <button type="submit" className="mono" style={{ background: '#1a1a1a', color: '#f4f1ea', border: 'none', padding: '16px', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '12px' }}>Submit nomination</button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <h2 className="serif" style={{ fontSize: '36px', fontWeight: 500, margin: '0 0 12px 0' }}>Received.</h2>
                  <p className="serif" style={{ fontSize: '16px', fontStyle: 'italic', opacity: 0.7, margin: 0 }}>Thank you. We'll follow up by email.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
