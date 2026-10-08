/* =====================================================================
   RS Software website — SITE CONFIGURATION
   This is the one file you edit to "connect" the site.
   ===================================================================== */
window.RS_CONFIG = {

  /* ---------- FORMS ----------
     Where submissions go is decided by the adapter in src/lib/forms (docs/forms.md), not here: main.js validates
     the form and hands it to that adapter. `provider` and `endpoint` are only used if the adapter is absent.
     These settings still apply: `fallbackEmail` (offered when a submission fails) and `maxUploadMB` (CV size limit).
  */
  forms: {
    provider: 'mailto',            // fallback only; see src/lib/forms
    endpoint: '',                    // for 'formspree' or 'endpoint'
    phpEndpoint: 'api/submit.php',   // for 'php' (relative to site root)
    fallbackEmail: 'india@rssoftware.com', // shown if a submission fails
    maxUploadMB: 8
  },

  /* ---------- REGIONS ----------
     Drives the region picker in the header and the "Prefer email?" lines.
     RS-PLACEHOLDER: regional phone numbers. Owner: marketing.
     (Contact-page offices are fixed text, not tied to this.) IMPORTANT: the phone numbers below are placeholders
     carried over from the design file — replace them with real numbers.
  */
  defaultRegion: 'india',
  regions: {
    global: { label: 'Global',  flag: '🌐', tagline: 'Payments infrastructure for a real-time world.',
              office: 'Global HQ',        email: 'hello@rssoftware.com',  phone: '+1 000 000 0000' },
    india:  { label: 'India',   flag: '🇮🇳', tagline: "Powering India's real-time payments at national scale.",
              office: 'Kolkata, India',   email: 'india@rssoftware.com',  phone: '+91 33 0000 0000' },
    canada: { label: 'Canada',  flag: '🇨🇦', tagline: 'Modernising Canadian payment rails, end to end.',
              office: 'Toronto, Canada',  email: 'canada@rssoftware.com', phone: '+1 000 000 0000' },
    usa:    { label: 'America', flag: '🇺🇸', tagline: 'Real-time fraud and acquiring for the FedNow era.',
              office: 'New York, USA',    email: 'usa@rssoftware.com',    phone: '+1 000 000 0000' },
    nordic: { label: 'Nordic',  flag: '🇪🇺', tagline: 'Instant, interoperable payments across the Nordic region.',
              office: 'Copenhagen, Denmark', email: 'europe@rssoftware.com', phone: '+45 00 00 00 00' }
  },

  // ---------- "Ask RS" assistant ----------  (enabled:false hides the button site-wide)
  // provider: 'builtin'  → answers from the built-in RS knowledge base (works today, no setup)
  //           'chatbase' → answers from your Chatbase chatbot, through a small server proxy that
  //                        keeps the Chatbase API key secret. Developer guide: CHATBASE.md
  // If Chatbase is unreachable, the assistant falls back to the built-in answers automatically.
  askAI: {
    enabled: true,
    provider: 'builtin',
    chatbase: {
      // Where the proxy lives. Netlify (Git deploy): '/.netlify/functions/ask'   PHP host: 'api/ask.php'
      endpoint: '/.netlify/functions/ask',
      timeoutMs: 25000,
      fallbackToBuiltin: true
    }
  }
};
