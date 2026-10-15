/* =====================================================================
   RS Software — "Ask AI" assistant.
   Answers come from the built-in knowledge base below, or from Chatbase when
   askAI.provider = 'chatbase' in config.js (see CHATBASE.md).
   ===================================================================== */
(function(){
var NA={billedge:{name:"Bill@Edge",hash:"billedge",color:"#E07B1F",body:`Bill@Edge is RS Software's unified bill payment platform built for banks and billers operating under the BBPS framework.

It handles real-time collection across 20+ categories — electricity, gas, water, telecom, DTH, insurance, loan repayments — with full scheme compliance out of the box. The platform is multi-channel by design: mobile app, internet banking, agent networks, ATMs, and physical PoS all supported from a single integration.

For banks it means rapid BBPS onboarding without rebuilding core systems. For billers it means a direct, certified channel to reach every payment touchpoint in the ecosystem.`,chips:["Who typically uses Bill@Edge?","Tell me about Payabbhi","What is DigitalEdge?"]},payabbhi:{name:"Payabbhi",hash:"payabbhi",color:"#B5388A",body:`Payabbhi is RS Software's end-to-end merchant payment infrastructure — everything a business needs to accept, manage, and reconcile payments across channels.

The stack covers online checkout (cards, UPI, wallets, net banking), QR code payments, in-store POS terminals, payment links, and recurring billing. It's PCI-DSS compliant with a tokenised vault, and comes with a real-time analytics dashboard so merchants can track every transaction as it happens.

It's designed for platforms and PSPs that want to move fast without compromising on compliance or reliability.`,chips:["How is Payabbhi different from Bill@Edge?","Tell me about DigitalEdge","Who is RS Software?"]},digitaledge:{name:"DigitalEdge",hash:"digitaledge",color:"#0A7C74",body:`DigitalEdge is RS Software's digital banking modernisation platform — it lets banks launch modern digital products without tearing out their existing core banking systems.

The architecture is microservices-based and cloud-native, exposing an open banking API layer that sits alongside legacy infrastructure. Banks can roll out new mobile and internet banking experiences, automate account opening and KYC, and enable third-party fintech integrations — all without a big-bang core replacement.

The result is a bank that looks and works like a digital-first institution, built on whatever core it already has.`,chips:["Tell me about IntelliEdge","How does the legacy integration work?","What is Bill@Edge?"]},intelliedge:{name:"IntelliEdge",hash:"intelliedge",color:"#6830CC",body:`IntelliEdge is RS Software's AI-native risk and analytics platform — purpose-built for payment ecosystems that need real-time intelligence on every transaction.

It applies ensemble ML models (gradient-boosted trees for structured data, deep learning for sequential patterns) to flag fraud, score AML risk, and automate regulatory reporting. Every decision is fully explainable: the platform surfaces the specific features, thresholds, and historical patterns that drove each score, so compliance teams can audit any decision without needing to trust a black box.

There are also chargeback intelligence and dispute management modules for schemes and issuers who need to automate the back-office side of risk.`,chips:["How is the AI explainable?","What products do you have?","How do I get started?"]}};function _A(i,Q){return Q.some(g=>i.includes(g))}function GM(i){const Q=i.toLowerCase().trim();if(_A(Q,["hello","hi ","hey","start","help me","what can you","greet","good morning","good afternoon"]))return{text:`Hello! I'm RS AI — I know everything about RS Software's payment ecosystem solutions and can help you find the right one for your use case.

Feel free to ask me about any of our products, how we work with different types of organisations, or what problem you're trying to solve and I'll point you in the right direction.`,chips:["What products do you offer?","I need to reduce payment fraud","We want to modernise our bank's digital channels","I'm a biller looking for BBPS onboarding"]};if(_A(Q,["product","solution","offer","suite","portfolio","all of","overview","what do you"]))return{text:`RS Software has four flagship products that together cover the entire payment value chain — from national infrastructure to merchant acceptance to AI-driven risk:

• **Bill@Edge** — BBPS-native bill payment platform for banks and billers
• **Payabbhi** — Full-stack merchant payment infrastructure
• **DigitalEdge** — Digital banking modernisation platform
• **IntelliEdge** — AI fraud detection and risk analytics

Each one can be deployed independently or combined depending on your stack. Which area is most relevant to you?`,links:[{label:"Bill@Edge",hash:"billedge",color:NA.billedge.color},{label:"Payabbhi",hash:"payabbhi",color:NA.payabbhi.color},{label:"DigitalEdge",hash:"digitaledge",color:NA.digitaledge.color},{label:"IntelliEdge",hash:"intelliedge",color:NA.intelliedge.color}],chips:["Which is right for me?","Tell me about national payment rails","Who are your clients?"]};if(_A(Q,["billedge","bill@edge","bill payment","bbps","biller","utility bill","electricity bill","gas bill","water bill","telecom bill"])){const g=NA.billedge;return{text:g.body,links:[{label:`Open ${g.name} →`,hash:g.hash,color:g.color}],chips:g.chips}}if(_A(Q,["payabbhi","merchant","payment gateway","checkout","pos terminal","qr code","card acceptance","upi merchant","pci"])){const g=NA.payabbhi;return{text:g.body,links:[{label:`Open ${g.name} →`,hash:g.hash,color:g.color}],chips:g.chips}}if(_A(Q,["digitaledge","digital banking","banking platform","core banking","mobile banking","open banking","neobank","bank modernis","bank modern","digital channel","internet banking"])){const g=NA.digitaledge;return{text:g.body,links:[{label:`Open ${g.name} →`,hash:g.hash,color:g.color}],chips:g.chips}}if(_A(Q,["intelliedge","fraud","risk","aml","anti-money","analytics","machine learning","ml model","ai model","chargeback","dispute","compliance reporting","explainable","explainability","real-time risk"])){const g=NA.intelliedge;return{text:g.body,links:[{label:`Open ${g.name} →`,hash:g.hash,color:g.color}],chips:g.chips}}return _A(Q,["upi","imps","neft","rtgs","bbps","national rail","payment scheme","payment infrastructure","india payment","central bank"])?{text:`RS Software has been a core technology partner for India's national payment rails for decades — including UPI and BBPS.

We work with central banks and payment schemes to build and operate the infrastructure that sits underneath billions of daily transactions. That experience in high-throughput, zero-downtime systems is what we bring to every client engagement.

For scheme-level infrastructure, Bill@Edge (BBPS) and IntelliEdge (real-time risk on rails) are the most relevant products.`,links:[{label:"Bill@Edge (BBPS native)",hash:"billedge",color:NA.billedge.color},{label:"IntelliEdge (risk on rails)",hash:"intelliedge",color:NA.intelliedge.color}],chips:["Tell me about BBPS onboarding","What industries do you serve?","Who are your clients?"]}:_A(Q,["who are you","about rs","rs software","your company","founded","history","how long","about you"])?{text:`RS Software is a global payment technology company founded in 1987. We design, build, and run mission-critical payment ecosystems — from national rails like UPI and BBPS to AI-native fraud platforms used by some of the world's largest financial institutions.

We've processed hundreds of billions of transactions and serve central banks, payment schemes, major banks, PSPs, and fintechs across India, North America, and globally.

Our four product lines (Bill@Edge, Payabbhi, DigitalEdge, IntelliEdge) are all built on that same deep payments domain knowledge — not generic fintech tooling.`,chips:["What products do you offer?","Which industries do you serve?","Talk to a human"]}:_A(Q,["who do you serve","which industri","industry","client","customers","who uses","who is it for","target"])?{text:`We work with organisations at every layer of the payment ecosystem:

**Central banks & regulators** — national infrastructure, oversight tooling, real-time monitoring

**Payment schemes** — scheme operations, settlement, participant management (UPI, BBPS, card networks)

**Banks & NBFCs** — digital banking, bill payment, compliance, fraud

**PSPs & fintechs** — merchant infrastructure, gateway, analytics

**Large enterprise billers** — utility, telecom, insurance, BBPS onboarding

If you tell me what type of organisation you are, I can give you a much more targeted answer.`,chips:["I'm a bank","I'm a fintech or PSP","I'm an enterprise biller","I'm a payment scheme"]}:_A(Q,["i'm a bank","im a bank","we are a bank","work for a bank","banking institution","commercial bank"])?{text:`For banks, the most impactful combination is typically **DigitalEdge** and **IntelliEdge**.

DigitalEdge modernises your customer-facing digital channels — mobile and internet banking, account origination, open banking APIs — without requiring a core banking replacement. It sits as a digital layer above whatever core you're running.

IntelliEdge plugs into your transaction streams to deliver real-time fraud scoring, AML monitoring, and explainable regulatory reporting. Both platforms are designed to integrate with legacy infrastructure — no big-bang migration required.`,links:[{label:"DigitalEdge →",hash:"digitaledge",color:NA.digitaledge.color},{label:"IntelliEdge →",hash:"intelliedge",color:NA.intelliedge.color}],chips:["How long does DigitalEdge take to deploy?","What about BBPS for banks?","Request a demo"]}:_A(Q,["i'm a fintech","im a fintech","i'm a psp","im a psp","payment provider","we're a psp","fintech company"])?{text:`For fintechs and PSPs the answer is almost always **Payabbhi**.

It gives you a fully compliant, production-grade merchant payment stack — UPI, cards, wallets, QR, POS, payment links — without the years it takes to build and certify it yourself. PCI-DSS compliance and tokenisation are included.

**IntelliEdge** can layer on top to give your merchants real-time fraud scoring and chargeback intelligence, which is increasingly a competitive differentiator for payment platforms.`,links:[{label:"Payabbhi →",hash:"payabbhi",color:NA.payabbhi.color},{label:"IntelliEdge →",hash:"intelliedge",color:NA.intelliedge.color}],chips:["Is Payabbhi white-labelable?","How fast can we go live?","Talk to sales"]}:_A(Q,["i'm a biller","im a biller","enterprise biller","utility company","we bill","biller company"])?{text:`If you're an enterprise biller — utility, telecom, insurance, or financial services — **Bill@Edge** is the most direct fit.

It's BBPS-certified, which means your customers can pay through any BBPS-enabled channel (bank apps, UPI apps, physical agents, ATMs) without you needing separate integrations for each. The platform connects to your existing billing system via standard APIs and handles settlement, reconciliation, and dispute management.

We also handle the BBPS onboarding process, which can be complex — our team has done it many times.`,links:[{label:"Bill@Edge →",hash:"billedge",color:NA.billedge.color}],chips:["What categories does BBPS support?","How long does onboarding take?","Talk to our team"]}:_A(Q,["demo","talk to","contact","speak to","sales","get in touch","pricing","cost","how much","trial","get started","reach you"])?{text:`The best way to get started is to speak with one of our regional teams — they'll understand your specific context and set up a tailored demo.

You can reach us via the **Talk To Expert** dropdown in the top navigation and select your region (India, Canada, USA, or Global), or email us directly at **contact@rssoftware.com**.

Expect a response within one business day.`,chips:["Tell me more about your products first","Which product is right for me?"]}:_A(Q,["explainable","black box","explain the ai","how does the ai work","ai transparency","audit","xai"])?{text:`Explainability is a core design principle in **IntelliEdge**, not an afterthought.

Every risk score comes with a breakdown of the top contributing features — transaction velocity, counterparty history, geographic patterns, time-of-day signals — ranked by their contribution to that specific decision. Compliance officers can drill into any flagged transaction and see exactly why it was scored the way it was, with historical comparables surfaced alongside.

This matters for two reasons: regulatory audits (regulators increasingly require explainable AI in financial services), and operational trust — your risk team won't act on signals they can't understand.`,links:[{label:"Explore IntelliEdge →",hash:"intelliedge",color:NA.intelliedge.color}],chips:["What ML models are used?","Is it real-time?","How accurate is the fraud detection?"]}:_A(Q,["which","right for me","recommend","best product","which product","which one","suitable","fit"])?{text:`To give you a useful recommendation, it helps to know a bit more about your situation. A few quick questions:

1. What type of organisation are you — bank, fintech/PSP, biller, or payment scheme?
2. What's the core problem you're trying to solve — acceptance, compliance, fraud, digital channels?
3. Roughly what scale — startup, mid-market, or large enterprise?

Even a one-line answer will help me point you to the right product and the right team to talk to.`,chips:["I'm a bank","I'm a fintech or PSP","I'm an enterprise biller","Show all products"]}:{text:`That's an interesting question — let me make sure I give you a useful answer rather than a generic one.

Could you tell me a bit more about your context? For example, what type of organisation you're with and what problem you're trying to solve. That way I can connect you directly to the right RS Software product or team.`,chips:["What products do you offer?","I'm a bank","I need fraud detection","Tell me about RS Software"]}}
window.__rsGM=GM;})();

/* ---------- UI ---------- */
(function(){
  'use strict';
  var CFG=(window.RS_CONFIG||{}).askAI||{enabled:true};
  if(CFG.enabled===false) return;
  var BASE=document.body.getAttribute('data-base')||'';
  var ROUTES={billedge:'products/bill-edge/',payabbhi:'products/payabbhi/',digitaledge:'products/digitaledge/',intelliedge:'products/intelliedge/',
    contact:'contact/',insights:'insights/',careers:'careers/',about:'about/','request-demo':'request-demo/','access-sandbox':'sandbox/'};
  var STARTERS=[{i:'🏦',l:'Digital banking transformation',q:"We want to modernise our bank's digital channels"},
    {i:'🛡️',l:'Fraud & risk AI',q:'I need a real-time fraud detection solution'},
    {i:'🧾',l:'Bill payment & BBPS',q:'Tell me about Bill@Edge and BBPS onboarding'},
    {i:'⚡',l:'Merchant payments',q:'What merchant payment infrastructure do you offer?'}];
  var I={spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9z"/><path d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9z" opacity=".7"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'};
  function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function md(t){
    var blocks=esc(t).split(/\n{2,}/);
    return blocks.map(function(b){
      b=b.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|[\w.\/#?=&-]+)\)/g,function(m,t,u){var ext=/^https?:/.test(u);if(!ext&&!/^[\/#]/.test(u))u=BASE+u;return '<a href="'+u+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+t+'</a>';});
      var ls=b.split('\n');
      if(ls.every(function(l){return /^\s*(•|-|\d+\.)\s/.test(l);})) return '<ul>'+ls.map(function(l){return '<li>'+l.replace(/^\s*(•|-|\d+\.)\s/,'')+'</li>';}).join('')+'</ul>';
      return '<p>'+ls.join('<br>')+'</p>';
    }).join('');
  }
  var fab=document.createElement('button');
  fab.className='ai-fab';fab.type='button';fab.setAttribute('aria-label','Ask AI');fab.setAttribute('aria-haspopup','dialog');fab.setAttribute('aria-controls','rs-ai');
  fab.innerHTML=I.spark+'<span>Ask AI</span>';
  var box=document.createElement('section');
  box.className='ai';box.id='rs-ai';box.setAttribute('role','dialog');box.setAttribute('aria-label','RS AI assistant');
  box.innerHTML='<div class="ai__head"><div class="ai__avatar">'+I.spark+'</div><div><b>RS AI</b><small>Payments guide · answers from RS Software content</small></div><button class="ai__close" type="button" aria-label="Close assistant">'+I.x+'</button></div>'+
    '<div class="ai__log" aria-live="polite"><div class="ai__welcome"><h3>How can I help?</h3><p>Ask about our products, who we work with, or the problem you’re solving.</p><div class="ai__starters">'+
    STARTERS.map(function(s){return '<button type="button" data-q="'+esc(s.q)+'"><span>'+s.i+'</span>'+s.l+'</button>';}).join('')+'</div></div></div>'+
    '<form class="ai__form"><label class="sr-only" for="rs-ai-input">Your question</label><input id="rs-ai-input" autocomplete="off" placeholder="Ask about products, fraud, BBPS…"><button type="submit" aria-label="Send">'+I.send+'</button></form>'+
    '<p class="ai__note">Automated guide. For specifics, <a href="'+BASE+'contact/">talk to our team</a>.</p>';
  document.body.appendChild(fab);document.body.appendChild(box);
  var log=box.querySelector('.ai__log'),input=box.querySelector('input'),busy=false;
  function open(){box.classList.add('is-open');fab.setAttribute('aria-expanded','true');setTimeout(function(){input.focus();},150);}
  function close(){box.classList.remove('is-open');fab.setAttribute('aria-expanded','false');}
  window.RSAskAI={open:open,close:close};
  fab.addEventListener('click',function(){box.classList.contains('is-open')?close():open();});
  box.querySelector('.ai__close').addEventListener('click',close);
  function add(html,cls){var d=document.createElement('div');d.className='msg '+cls;d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;return d;}
  /* ===================================================================
     ANSWER PROVIDERS — the only place a developer needs to touch.
     getAnswer(question) must resolve to { text, links?, chips? }.
       text  : answer (plain text; **bold**, "- " bullet lines and blank-line paragraphs are formatted)
       links : optional [{hash:'intelliedge', label:'RS IntelliEdge™', color:'#6D28D9'}] (keys of ROUTES)
       chips : optional ['Follow-up question', …]
     Provider is chosen in assets/js/config.js → askAI.provider. See CHATBASE.md.
     =================================================================== */
  var history=[];                       // [{role:'user'|'assistant', content:'…'}] — sent to Chatbase for context
  var conversationId=(function(){       // one id per browser tab, so Chatbase keeps the thread together
    var k='rs-ai-conv'; try{var v=sessionStorage.getItem(k); if(v) return v;}catch(e){}
    var id='rs-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
    try{sessionStorage.setItem(k,id);}catch(e){} return id;
  })();

  function builtinAnswer(q){
    try{ return window.__rsGM(' '+q+' '); }catch(e){ return {text:"Sorry — I couldn't process that. Try asking about one of our products."}; }
  }

  function chatbaseAnswer(q){
    var cb=CFG.chatbase||{};
    var url=cb.endpoint||'/.netlify/functions/ask';
    if(!/^(https?:)?\/\//.test(url) && url.charAt(0)!=='/') url=BASE+url;   // 'api/ask.php' → works at any page depth
    var ctrl=('AbortController' in window)?new AbortController():null;
    var timer=setTimeout(function(){ if(ctrl) ctrl.abort(); }, cb.timeoutMs||25000);
    return fetch(url,{
      method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({ messages:history.slice(-12), conversationId:conversationId, page:location.pathname }),
      signal:ctrl?ctrl.signal:undefined
    }).then(function(res){
      clearTimeout(timer);
      if(!res.ok) throw new Error('HTTP '+res.status);
      return res.json();
    }).then(function(data){
      var text=data&&(data.text||data.answer||data.message);
      if(!text) throw new Error('Empty answer');
      return { text:String(text), links:data.links||[], chips:data.chips||[] };
    });
  }

  function getAnswer(q){
    if(CFG.provider==='chatbase'){
      return chatbaseAnswer(q).catch(function(err){
        if(window.console) console.warn('[Ask RS] Chatbase unavailable, using built-in answers:', err&&err.message);
        if((CFG.chatbase||{}).fallbackToBuiltin===false) return {text:"Sorry — the assistant is unavailable right now. Please [talk to our team]("+BASE+"contact/)."};
        return builtinAnswer(q);
      });
    }
    // built-in: keep the short "typing" pause so it feels like the Chatbase version
    var r=builtinAnswer(q);
    return new Promise(function(done){ setTimeout(function(){ done(r); }, 650+Math.min(900,(r.text||'').length*1.2)); });
  }

  function ask(q){
    q=q.trim(); if(!q||busy) return; busy=true;
    var w=log.querySelector('.ai__welcome'); if(w) w.remove();
    add('<div class="bubble">'+esc(q)+'</div>','msg--user');
    var t=add('<div class="bubble"><span class="typing"><i></i><i></i><i></i></span></div>','msg--bot');
    history.push({role:'user',content:q});
    getAnswer(q).then(function(r){
      r=r||{}; history.push({role:'assistant',content:r.text||''});
      var h='<div class="bubble">'+md(r.text||'');
      if(r.links&&r.links.length) h+='<div class="msg__links">'+r.links.map(function(l){var href=ROUTES[l.hash]?BASE+ROUTES[l.hash]:(l.href||'#');return '<a style="--lc:'+(l.color||'#0075b7')+'" href="'+esc(href)+'">'+esc(l.label||'')+'</a>';}).join('')+'</div>';
      if(r.chips&&r.chips.length) h+='<div class="msg__chips">'+r.chips.map(function(c){return '<button type="button" data-q="'+esc(c)+'">'+esc(c)+'</button>';}).join('')+'</div>';
      t.innerHTML=h+'</div>';
    }).catch(function(){
      t.innerHTML='<div class="bubble"><p>Sorry — something went wrong. Please try again, or <a href="'+BASE+'contact/">talk to our team</a>.</p></div>';
    }).then(function(){ log.scrollTop=log.scrollHeight; busy=false; });
  }
  box.addEventListener('click',function(e){var b=e.target.closest('[data-q]');if(b) ask(b.getAttribute('data-q'));});
  box.querySelector('form').addEventListener('submit',function(e){e.preventDefault();var v=input.value;input.value='';ask(v);});
  document.querySelectorAll('[data-open-ai]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open();});});
})();
