import React, { useState, useEffect } from "react";
import { VOICES } from "./data/bureauData";
import { getDestinationProfile, buildSynthesizedBrief } from "./data/destinations";
import { MiniGoose } from "./components/geese";
import { supabase } from "./lib/supabase";
import {
  useTweaks, TweaksPanel, TweakSection, TweakSelect,
  TweakToggle, TweakRadio, TweakText
} from "./components/tweaks-panel";
import {
  WorldBackground, GroundBand, TopBar,
  LandingView, LoadingView, BriefView,
  SettingsView, HistoryView, AuthView,
} from "./components/views";
/* eslint-disable */
// Anxious Traveller — main app shell



// Demo briefs live with the server (so they're bundled into its Function).
// Lazily imported here only for the offline fallback when the API is down.
const DEMO_BRIEF_FILES = import.meta.glob('../server/demo-briefs/*.json');

function voiceLabel(id) {
  const v = (typeof VOICES !== 'undefined' ? VOICES : []).find(v => v.id === id);
  return v ? v.name : id;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "voice": "jarvis",
  "dontGo": false,
  "viewport": "desktop",
  "heroHeadline": "Let the goose\nplan your trip.",
  "signedIn": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace('#','');
    return h && ['landing','loading','brief','settings','history','auth'].includes(h) ? h : 'landing';
  });

  const [state, setState] = useState({
    voiceId: t.voice || 'jarvis',
    query: '',
    destination: 'Rome',
    trip: 'Jun 18–25',
    dontGo: t.dontGo,
    signedIn: t.signedIn,
    scenario: 'default',
    purpose: 'normal',
    customPurpose: '',
    lang: 'en',
  });

  // Supabase session (email/password or Google). null when signed out.
  const [user, setUser] = useState(null);
  const [recovery, setRecovery] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Password-reset link → show "pick a new password" on the auth page.
      if (event === 'PASSWORD_RECOVERY') { setRecovery(true); nav('auth'); }
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  useEffect(() => { setState(s => ({ ...s, signedIn: Boolean(user) || t.signedIn })); }, [user]);

  const toggleLang = () => {
    setState(s => ({ ...s, lang: s.lang === 'en' ? 'hi' : 'en' }));
  };

  useEffect(() => {
    setState(s => ({ ...s, voiceId: t.voice, dontGo: t.dontGo, signedIn: t.signedIn }));
  }, [t.voice, t.dontGo, t.signedIn]);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#','');
      if (h && ['landing','loading','brief','settings','history','auth'].includes(h)) setRoute(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const nav = (r) => {
    setRoute(r);
    window.location.hash = r;
    window.scrollTo({ top: 0 });
  };

  // Phase 11 design integration — wire onSubmit/onRuiner to backend.
  // Flow: POST /api/brief (destination + voice) → returns { result_id }
  // → poll GET /api/brief/{id} every 2.5s → when status='complete', render brief.
  //
  // ruiner toggle → voice='dont_go' on backend (backend keeps underscore form).
  //
  // Demo cities locked to specific voices (matches pre-rendered audio matrix):
  //   Rome → bro, New York → jarvis, Tokyo → bestie,
  //   Reykjavik → pet_parent, Bangkok → family, Cairo → dont_go
  // If user picks different voice for a demo city, force-swap + show notice.
  const DEMO_CITY_VOICE_LOCKS = {
    rome: 'bro',
    'new york': 'jarvis',
    'new-york': 'jarvis',
    newyork: 'jarvis',
    nyc: 'jarvis',
    tokyo: 'bestie',
    reykjavik: 'pet_parent',
    bangkok: 'family',
    cairo: 'dont_go',
  };

  // Builds an instant local brief — no server, no API key needed.
  // Used as fallback when the backend is down or Muse Spark isn't configured.
  const runLocalFallback = (query, voice) => {
    const profile = getDestinationProfile(query, voice);
    const synth = buildSynthesizedBrief(profile, query, voice);
    setState(s => ({
      ...s,
      brief: { status: 'complete', brief: synth, audio_url: null },
      briefStatus: 'complete',
      voiceId: voice,
    }));
    nav('brief');
  };

  const submitBrief = async (q, scenario) => {
    const destination = q.split(/[\s,]/)[0] || 'Rome';

    // Demo voice lock — find first demo city match in the query text
    const lowerQ = q.toLowerCase();
    let lockedVoice = null;
    let lockedCity = null;
    let isDemoCity = false;
    for (const [city, voice] of Object.entries(DEMO_CITY_VOICE_LOCKS)) {
      if (lowerQ.includes(city)) {
        lockedVoice = voice;
        lockedCity = city;
        isDemoCity = true;
        break;
      }
    }

    const userPickedVoice = scenario === 'ruiner' ? 'dont_go' : (state.voiceId || 'jarvis');
    const backendVoice = lockedVoice ?? userPickedVoice;
    const voiceWasSwapped = lockedVoice && lockedVoice !== userPickedVoice && scenario !== 'ruiner';
    const voiceSwapNotice = voiceWasSwapped
      ? `${destination} runs in ${voiceLabel(lockedVoice)} voice for this demo (only voice with audio for this city).`
      : null;

    // Pick a session-stable random "saved hours" value so loading counter
    // and brief meta pill stay in sync. 3.8h..6.5h in minute granularity.
    const savedMinutes = Math.floor(230 + Math.random() * 160);
    const submitStartedAt = Date.now();

    setState(s => ({
      ...s,
      query: q,
      destination,
      scenario,
      voiceId: backendVoice,
      query_id: null,
      brief: null,
      briefStatus: 'submitting',
      voiceSwapNotice,
      queryStartedAt: submitStartedAt,
      isDemoCity,
      localBrief: !isDemoCity,
      savedMinutes,
    }));
    nav('loading');

    // ── Any city on Earth ────────────────────────────────────────────────
    // Demo cities (Rome, NYC, Tokyo…) use pre-rendered briefs with audio.
    // Every other city (Ujjain, Varanasi, Jaipur, Paris, anywhere) goes to
    // the backend, which generates a live brief with Muse Spark. If the server
    // is down or no API key is configured (503), we fall back to the local
    // synthesizer: curated profiles for popular Indian destinations plus a
    // universal generator for the rest.
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: q,
          voice: backendVoice,
        }),
      });
      if (!res.ok) throw new Error(`POST /api/brief ${res.status}`);
      const data = await res.json();
      // The server returns the finished brief in the POST response (needed on
      // serverless, where a later poll may hit an instance that never saw it).
      if (data.status === 'complete') {
        const remaining = Math.max(0, MIN_LOAD_MS - (Date.now() - submitStartedAt));
        setTimeout(() => {
          setState(s => ({ ...s, query_id: data.result_id, brief: data, briefStatus: 'complete', voiceId: data.voice || backendVoice }));
          nav('brief');
        }, remaining);
        return;
      }
      if (data.status === 'failed') {
        if (!isDemoCity) { runLocalFallback(q, backendVoice); return; }
        setState(s => ({ ...s, briefStatus: 'failed', briefError: data.error ?? 'failed' }));
        return;
      }
      setState(s => ({ ...s, query_id: data.result_id, briefStatus: 'pending' }));
    } catch (e) {
      // Non-demo city → local synthesizer fallback (curated + universal)
      if (!isDemoCity) {
        setTimeout(() => runLocalFallback(q, backendVoice), 3000);
        return;
      }
      // Demo city → client-side resilient fallback to local demo brief file
      const cityKey = (lockedCity || 'rome').replace(/[\s-]+/g, '_').replace(/^(newyork|nyc)$/, 'new_york');
      try {
        const loader = DEMO_BRIEF_FILES[`../server/demo-briefs/${cityKey}.json`];
        if (loader) {
          const localData = (await loader()).default;
          setTimeout(() => {
            setState(s => ({ ...s, brief: localData, briefStatus: 'complete', voiceId: localData.voice || backendVoice }));
            nav('brief');
          }, 4000);
          return;
        }
      } catch (err) {}
      setState(s => ({ ...s, briefStatus: 'failed', briefError: String(e.message ?? e) }));
    }
  };

  const onSubmit = (q) => submitBrief(q, 'default');
  const onRuiner = (q) => submitBrief(q, 'ruiner');

  // Poll briefs table while query_id pending. Stops on complete/failed.
  const MIN_LOAD_MS = 20000;
  useEffect(() => {
    if (!state.query_id || state.briefStatus === 'complete' || state.briefStatus === 'failed') return;
    const POLL_MS = 2500;
    const POLL_MAX = 96; // 4 min total wall ceiling
    let attempts = 0;
    const submitStart = state.queryStartedAt || Date.now();
    const tick = async () => {
      attempts++;
      try {
        const res = await fetch(`/api/brief/${state.query_id}`);
        // Server restarted / unknown id → local fallback for non-demo cities
        if (res.status === 404 && state.localBrief) {
          runLocalFallback(state.query, state.voiceId);
          return;
        }
        if (!res.ok) throw new Error(`GET /api/brief/${state.query_id} ${res.status}`);
        const data = await res.json();
        if (data.status === 'complete') {
          const elapsed = Date.now() - submitStart;
          const remaining = Math.max(0, MIN_LOAD_MS - elapsed);
          setTimeout(() => {
            setState(s => ({ ...s, brief: data, briefStatus: 'complete', voiceId: data.voice }));
            nav('brief');
          }, remaining);
          return;
        }
        if (data.status === 'failed') {
          // Muse Spark call failed → local fallback for non-demo cities
          if (state.localBrief) {
            runLocalFallback(state.query, state.voiceId);
            return;
          }
          setState(s => ({ ...s, briefStatus: 'failed', briefError: data.error ?? 'failed' }));
          return;
        }
      } catch (e) {
        if (attempts >= POLL_MAX) {
          if (state.localBrief) {
            runLocalFallback(state.query, state.voiceId);
            return;
          }
          setState(s => ({ ...s, briefStatus: 'failed', briefError: 'timeout' }));
          return;
        }
      }
      if (attempts < POLL_MAX) setTimeout(tick, POLL_MS);
      else if (state.localBrief) runLocalFallback(state.query, state.voiceId);
      else setState(s => ({ ...s, briefStatus: 'failed', briefError: 'timeout' }));
    };
    setTimeout(tick, POLL_MS);
  }, [state.query_id, state.briefStatus]);

  const isMobile = t.viewport === 'mobile';

  // Tweaks panel gated behind localStorage.tweaks='1' (sticky across sessions).
  // Enable in browser console: localStorage.setItem('tweaks','1');location.reload();
  // Disable:                   localStorage.removeItem('tweaks');location.reload();
  // Also accepts ?tweaks=1 query param as one-shot enable.
  const [tweaksVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (new URLSearchParams(window.location.search).get('tweaks') === '1') {
      window.localStorage.setItem('tweaks', '1');
      return true;
    }
    return window.localStorage.getItem('tweaks') === '1';
  });

  return (
    <div className={isMobile ? 'viewport-mobile' : ''} data-screen-label={route}>
      <WorldBackground />
      <div className="app-frame">
        <TopBar route={route} onNav={nav} lang={state.lang} onToggleLang={toggleLang} user={user} />
        <main style={{flex:1,position:'relative'}}>
          {route === 'landing'  && <LandingView state={state} setState={setState} onSubmit={onSubmit} onRuiner={onRuiner} tweaks={t} />}
          {route === 'loading'  && <LoadingView state={state} onDone={() => nav('brief')} />}
          {route === 'brief'    && <BriefView state={state} setState={setState} onNav={nav} />}
          {route === 'settings' && <SettingsView state={state} setState={setState} />}
          {route === 'history'  && <HistoryView state={state} onNav={nav} onOpen={(h)=>{setState(s=>({...s,destination:h.dest,trip:h.when,voiceId:h.outfit}));nav('brief');}} />}
          {route === 'auth'     && <AuthView onNav={nav} lang={state.lang} user={user} recovery={recovery} onRecoveryDone={() => setRecovery(false)} />}
        </main>
        <GroundBand />
        <footer style={{
          borderTop:'1px solid var(--hairline)',
          padding:'24px 28px',
          display:'flex',justifyContent:'space-between',alignItems:'center',
          color:'var(--muted)',fontSize:12.5,
          marginTop: route === 'auth' ? 0 : 'auto',
        }}>
          <span style={{display:'flex',alignItems:'center',gap:8}}>
            <MiniGoose size={26} />
            {state.lang === 'hi' ? '© चिंतित यात्री — पिक्सेल-हंस प्री-ट्रिप ब्यूरो' : '© Anxious Traveller — pixel-goose pre-trip bureau'}
          </span>
          <span style={{fontFamily:'var(--font-pixel)',letterSpacing:2,textTransform:'uppercase',fontSize:11}}>
            {state.lang === 'hi' ? 'प्यार से निर्मित · हंस द्वारा सत्यापित' : 'built with care · honked locally'}
          </span>
        </footer>
      </div>

      {tweaksVisible && <TweaksPanel>
        <TweakSection label="Voice" />
        <TweakSelect
          label="Default persona"
          value={t.voice}
          options={VOICES.map(v => ({ value: v.id, label: v.name + ' — ' + v.tag }))}
          onChange={(v) => setTweak('voice', v)}
        />

        <TweakSection label="Brief variant" />
        <TweakToggle
          label="Don't-Go banner"
          value={t.dontGo}
          onChange={(v) => setTweak('dontGo', v)}
        />
        <TweakToggle
          label="Signed-in mode"
          value={t.signedIn}
          onChange={(v) => setTweak('signedIn', v)}
        />

        <TweakSection label="Viewport" />
        <TweakRadio
          label="Render at"
          value={t.viewport}
          options={['desktop', 'mobile']}
          onChange={(v) => setTweak('viewport', v)}
        />

        <TweakSection label="Hero copy" />
        <TweakText
          label="Headline"
          value={t.heroHeadline}
          onChange={(v) => setTweak('heroHeadline', v)}
        />

        <TweakSection label="Jump to view" />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,padding:'0 4px'}}>
          {['landing','loading','brief','settings','history','auth'].map(r => (
            <button key={r} onClick={()=>nav(r)} className="ghost-btn" style={{padding:'6px 8px',fontSize:12,textTransform:'capitalize'}}>{r}</button>
          ))}
        </div>
      </TweaksPanel>}
    </div>
  );
}



export default App;
