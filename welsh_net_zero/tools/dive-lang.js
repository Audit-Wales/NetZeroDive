(function (global) {
  const COPY = {
    en: {
      titleCardKicker: 'Audit Wales \u2022 Net Zero 2025',
      titleCardTitle: 'Zeroing in',

      keyMessageKicker: 'Audit Wales',
      keyMessagePre: 'Wales is unlikely to achieve',
      keyMessageHighlight: 'the 2030 ambition',
      keyMessageTip: 'Confirmed by our 2026 review',

      priorityKicker: 'Audit Wales',
      priorityPre: 'Decarbonisation has become a',
      priorityHighlight: 'lower priority',
      priorityTip: 'Competing pressures are squeezing it out',
      prioritySuffix: 'for public bodies',

      actionKicker: 'Audit Wales',
      actionPre: 'Action has',
      actionHighlight: 'happened',
      actionTip: 'Public bodies have taken steps forward',

      measureKicker: 'Audit Wales',
      measurePre: 'Progress is',
      measureHighlight: 'difficult to measure and deliver',
      measureTip: 'Data gaps and complex supply chains make it hard to track',

      timelineHint: 'Hover the icons for detail',
      timelineLine1: '<strong>2021</strong> &mdash; an ambition was set: net zero by 2030.',
      timelineLine2: '<strong>2022</strong> &mdash; we found <span class="quote">&lsquo;clear uncertainty&rsquo;</span> it would be met.',
      timelineLine3: '<strong>Now</strong> &mdash; it is highly unlikely that the public sector will achieve the collective ambition.',
      timelineN1Desc: 'Ambition set',
      timelineN1Tip: 'Net zero by 2030 announced',
      timelineN2Desc: 'Previous report',
      timelineN2Tip: 'Flagged as uncertain early on',
      timelineN3Desc: 'This review',
      timelineN3Tip: 'Still unlikely to be met',
      timelineN4Desc: 'Net Zero Ambition',
      timelineN4Tip: 'Target year for net zero',

      bodiesGrowthOverlay: 'Reporting bodies have increased from <strong>69 to 82</strong> between 2021-22 and 2024-25.',
      bodiesGrowthDeltaLabel: 'more bodies',
      bodiesGrowthSubtitle: 'Number of reporting bodies',
      bodiesGrowthTitle: 'Welsh public sector, 2020-21 to 2024-25',

      balanceKicker: 'Progress vs. pressure',
      balancePositive1: 'Better understanding',
      balancePositive2: 'More reporting',
      balancePositive3: 'More plans',
      balancePressure1: 'Financial pressures',
      balancePressure2: 'Political pressures',
      balancePressure3: 'Reticence about delivery',
      balanceVerdict: 'The ambition is losing traction.',

      quotesKicker: 'In their words',
      quote1: 'Decarbonisation is a discretionary priority.',
      quote2: 'Finance is just the overwhelming problem for everyone at the moment.',
      quote3: 'There&rsquo;s definitely a better understanding of the scale of the challenge&hellip;but&hellip;there&rsquo;s a little bit of reticence around what it&rsquo;s going to take.',
      quote4: '(Net zero has) become this kind of political hot potato.',

      donutHeadline1: 'Not all emissions are created equal.',
      donutHeadline2Highlight: 'Scope 3',
      donutHeadline2Mid: 'alone makes up',
      donutHeadline2Suffix: 'of the total — compared with just 16% for Scopes 1 and 2 combined.',
      donutBody: 'Scope 3 emissions are indirect emissions, such as those generated in the production of goods purchased by public bodies. Scope 3 accounts for the bulk of emissions, but there is wide agreement that the data is not accurate enough to inform meaningful action.',
      donutCenterShareLabel: 'scope 3',

      financeKicker: 'Finance & Skills',
      financeHeadline: 'Finance and skills remain major barriers',
      financeCostLabel: 'Estimated cost to decarbonise Welsh council buildings alone',
      financeFundingLabel: 'Funding to support public bodies’ decarbonisation since our last report (2022–23 to 2025–26)',
      financeFundingLineLabel: '£228m funding level',
      financeGapPre: 'That’s over',
      financeGapHighlight: '12×',
      financeGapSuffix: 'the funding actually provided.',

      whatCanBeDoneKicker: 'Audit Wales',
      whatCanBeDonePre: 'So what can be',
      whatCanBeDoneHighlight: 'done',
      whatCanBeDoneTip: 'Four clear priorities can close the gap',

      recommendationsKicker: 'Recommendations',
      recommendationsHeadline: 'Four priorities to close the gap',
      recDirectionTitle: 'Clearer Direction',
      recDirection1: 'Set clear, measurable expectations, and monitor progress consistently.',
      recDataTitle: 'Better Data',
      recData1: 'Build a stable, verified emissions baseline, including Scope 3.',
      recFinanceTitle: 'Better Financial Planning',
      recFinance1: 'Understand the true cost of decarbonisation and provide funding certainty.',
      recSkillsTitle: 'Stronger Skills and Capacity',
      recSkills1: 'Build workforce capability and awareness across the public sector.',
    },
    cy: {
      titleCardKicker: 'Archwilio Cymru \u2022 Sero Net 2025',
      titleCardTitle: 'Anelu am sero',

      keyMessageKicker: 'Archwilio Cymru',
      keyMessagePre: 'Mae\u2019n annhebygol y bydd Cymru\u2019n cyflawni',
      keyMessageHighlight: 'uchelgais 2030',
      keyMessageTip: 'Cadarnhawyd gan ein hadolygiad yn 2026',

      priorityKicker: 'Archwilio Cymru',
      priorityPre: 'Mae datgarboneiddio wedi dod yn',
      priorityHighlight: 'flaenoriaeth is',
      priorityTip: 'Mae pwysau cystadleuol yn ei wasgu allan',
      prioritySuffix: 'i gyrff cyhoeddus',

      actionKicker: 'Archwilio Cymru',
      actionPre: 'Mae camau wedi\u2019u',
      actionHighlight: 'cymryd',
      actionTip: 'Mae cyrff cyhoeddus wedi cymryd camau ymlaen',

      measureKicker: 'Archwilio Cymru',
      measurePre: 'Mae cynnydd yn',
      measureHighlight: 'anodd ei fesur a\u2019i gyflawni',
      measureTip: 'Mae bylchau data a chadwyni cyflenwi cymhleth yn ei gwneud yn anodd olrhain',

      timelineHint: 'Hofrwch dros yr eiconau am fanylion',
      timelineLine1: '<strong>2021</strong> &mdash; gosodwyd uchelgais: sero net erbyn 2030.',
      timelineLine2: '<strong>2022</strong> &mdash; canfuwyd <span class="quote">&lsquo;ansicrwydd clir&rsquo;</span> y byddai\u2019n cael ei gyflawni.',
      timelineLine3: '<strong>Nawr</strong> &mdash; mae\u2019n hynod annhebygol y bydd y sector cyhoeddus yn cyflawni\u2019r uchelgais ar y cyd.',
      timelineN1Desc: 'Gosod uchelgais',
      timelineN1Tip: 'Cyhoeddwyd sero net erbyn 2030',
      timelineN2Desc: 'Adroddiad blaenorol',
      timelineN2Tip: 'Nodwyd yn ansicr yn gynnar',
      timelineN3Desc: 'Yr adolygiad hwn',
      timelineN3Tip: 'Dal yn annhebygol o gael ei gyflawni',
      timelineN4Desc: 'Uchelgais Sero Net',
      timelineN4Tip: 'Blwyddyn darged ar gyfer sero net',

      bodiesGrowthOverlay: 'Mae nifer y cyrff adrodd wedi cynyddu o <strong>69 i 82</strong> rhwng 2021-22 a 2024-25.',
      bodiesGrowthDeltaLabel: 'mwy o gyrff',
      bodiesGrowthSubtitle: 'Nifer y cyrff adrodd',
      bodiesGrowthTitle: 'Sector cyhoeddus Cymru, 2020-21 i 2024-25',

      balanceKicker: 'Cynnydd yn erbyn pwysau',
      balancePositive1: 'Gwell dealltwriaeth',
      balancePositive2: 'Mwy o adrodd',
      balancePositive3: 'Mwy o gynlluniau',
      balancePressure1: 'Pwysau ariannol',
      balancePressure2: 'Pwysau gwleidyddol',
      balancePressure3: 'Amharodrwydd ynghylch cyflawni',
      balanceVerdict: 'Mae’r uchelgais yn colli tir.',

      quotesKicker: 'Yn eu geiriau eu hunain',
      quote1: 'Blaenoriaeth ddewisol yw datgarboneiddio.',
      quote2: 'Cyllid yw\u2019r broblem sy\u2019n llethu pawb ar hyn o bryd.',
      quote3: 'Yn sicr mae gwell dealltwriaeth o faint yr her&hellip;ond&hellip;mae rhywfaint o amharodrwydd ynghylch beth fydd ei angen.',
      quote4: '(Mae sero net wedi) dod yn fath o daten boeth wleidyddol.',

      donutHeadline1: 'Nid yw pob allyriad yn gyfartal.',
      donutHeadline2Highlight: 'Cwmpas 3',
      donutHeadline2Mid: 'ar ei ben ei hun sy’n gyfrifol am',
      donutHeadline2Suffix: 'o’r cyfanswm — o gymharu ag ond 16% ar gyfer Cwmpasau 1 a 2 gyda’i gilydd.',
      donutBody: 'Allyriadau anuniongyrchol yw allyriadau Cwmpas 3, megis y rhai a gynhyrchir wrth gynhyrchu nwyddau a brynir gan gyrff cyhoeddus. Cwmpas 3 sy’n gyfrifol am y rhan fwyaf o’r allyriadau, ond cytunir yn eang nad yw’r data’n ddigon cywir i lywio camau ystyrlon.',
      donutCenterShareLabel: 'cwmpas 3',

      financeKicker: 'Cyllid a Sgiliau',
      financeHeadline: 'Mae cyllid a sgiliau yn parhau i fod yn rhwystrau mawr',
      financeCostLabel: 'Cost amcangyfrifedig i ddatgarboneiddio adeiladau cynghorau Cymru yn unig',
      financeFundingLabel: 'Cyllid i gefnogi datgarboneiddio cyrff cyhoeddus ers ein hadroddiad diwethaf (2022–23 i 2025–26)',
      financeFundingLineLabel: 'Lefel cyllid £228m',
      financeGapPre: 'Mae hynny dros',
      financeGapHighlight: '12×',
      financeGapSuffix: 'y cyllid a ddarparwyd mewn gwirionedd.',

      recommendationsKicker: 'Argymhellion',
      recommendationsHeadline: 'Pedair blaenoriaeth i gau’r bwlch',
      whatCanBeDoneKicker: 'Archwilio Cymru',
      whatCanBeDonePre: 'Felly beth all gael ei',
      whatCanBeDoneHighlight: 'wneud',
      whatCanBeDoneTip: "Gall pedair blaenoriaeth glir gau'r bwlch",

      recDirectionTitle: 'Cyfeiriad Cliriach',
      recDirection1: 'Gosod disgwyliadau clir, mesuradwy, a monitro cynnydd yn gyson.',
      recDataTitle: 'Data Gwell',
      recData1: 'Adeiladu llinell sylfaen allyriadau sefydlog a ddilyswyd, gan gynnwys Cwmpas 3.',
      recFinanceTitle: 'Cynllunio Ariannol Gwell',
      recFinance1: 'Deall gwir gost datgarboneiddio a darparu sicrwydd cyllid.',
      recSkillsTitle: 'Sgiliau a Chapasiti Cryfach',
      recSkills1: 'Adeiladu gallu ac ymwybyddiaeth y gweithlu ar draws y sector cyhoeddus.',
    },
  };

  let lang = 'en';

  function t(key) {
    return (COPY[lang] && COPY[lang][key]) || COPY.en[key] || key;
  }

  function applyDiveI18n(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
  }

  function setLang(next) {
    const resolved = COPY[next] ? next : 'en';
    lang = resolved;
    document.documentElement.lang = resolved;
    applyDiveI18n(document);
    renderLangToggle();
    global.dispatchEvent(new CustomEvent('dive-lang', { detail: { lang: resolved } }));
  }

  function postLang(next) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'DIVE_LANG', lang: next }, '*');
    }
    setLang(next);
  }

  function renderLangToggle() {
    // The DIVE player shows its own persistent top-right language toggle;
    // only draw this one when the tool is opened standalone (outside the iframe).
    if (window.parent && window.parent !== window) {
      return;
    }
    let toggle = document.getElementById('dive-lang-toggle');
    if (!toggle) {
      const style = document.createElement('style');
      style.textContent = `
        #dive-lang-toggle {
          position: absolute;
          bottom: 14px;
          left: 14px;
          z-index: 9999;
          display: flex;
          gap: 2px;
          padding: 3px;
          border-radius: 999px;
          background: rgba(20, 20, 22, 0.55);
          backdrop-filter: blur(4px);
          font-family: Arial, "Segoe UI", sans-serif;
        }
        #dive-lang-toggle button {
          border: none;
          cursor: pointer;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 999px;
          background: transparent;
          color: rgba(255, 255, 255, 0.65);
        }
        #dive-lang-toggle button.active {
          background: #F4633A;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);

      toggle = document.createElement('div');
      toggle.id = 'dive-lang-toggle';
      const en = document.createElement('button');
      en.type = 'button';
      en.textContent = 'EN';
      en.addEventListener('click', () => postLang('en'));
      const cy = document.createElement('button');
      cy.type = 'button';
      cy.textContent = 'CY';
      cy.addEventListener('click', () => postLang('cy'));
      toggle.appendChild(en);
      toggle.appendChild(cy);
      document.body.appendChild(toggle);
    }
    toggle.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
  }

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if ((data.type === 'DIVE_INIT' || data.type === 'DIVE_LANG') && typeof data.lang === 'string') {
      setLang(data.lang);
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    applyDiveI18n(document);
    renderLangToggle();
    // Tell the DIVE player this scene has finished its initial render so it can
    // hide the loading spinner instead of waiting on the fallback timeout.
    // Tools that load data asynchronously set window.__diveReadyManual and
    // post DIVE_READY themselves once their real content is drawn.
    if (!window.__diveReadyManual && window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'DIVE_READY', source: 'dive-lang' }, '*');
    }
  });

  global.diveT = t;
  global.diveApplyI18n = applyDiveI18n;
  global.diveSetLang = setLang;
  global.divePostLang = postLang;
  global.diveGetLang = () => lang;
})(window);
