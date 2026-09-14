const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('app/TrackedCtaLink.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function render(props, tracker = () => {}) {
  const states = [], events = [], exports = {};
  vm.runInNewContext(source, { exports, URL, window: { location: { pathname: '/' + props.locale }, gtag: (...args) => { events.push(args); tracker(...args); } }, require(name) {
    if (name === 'react') return { useState: initial => [initial, value => states.push(value)], useEffect: () => {} };
    if (name === '../lib/appDestination') {
      const moduleExports = {};
      vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/appDestination.ts','utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: moduleExports, URL });
      return moduleExports;
    }
    if (name === '../lib/googleTag') return {
      GOOGLE_CTA_EVENTS: { customerRequest: 'customer_request_click', providerSignup: 'provider_signup_click', providerSearch: 'provider_search_click' },
      getLegacyGoogleCtaEventName: () => '', getLegacyGoogleCtaParams: () => null, getGoogleAdsSendTo: () => 'AW-test/conversion',
    };
    return require(name);
  } });
  const result = exports.TrackedCtaLink({ href: 'https://app.gruntwrk.com/jobs/new?category=cleaning', ctaLocation: 'home_category_cleaning', pageKind: 'home', ...props });
  return { anchor: result.props.children[0], states, events };
}
function click(overrides = {}) {
  return { defaultPrevented: false, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false,
    preventDefault() { throw new Error('Navigation must not be intercepted for analytics'); }, ...overrides };
}
for (const locale of ['en', 'pt', 'de']) {
  // Simulate a tag queue that never calls back, including an ad blocker.
  for (const tracker of [() => {}, () => { throw new Error('blocked tag'); }]) {
    const { anchor, states, events } = render({ locale }, tracker);
    const url = new URL(anchor.props.href);
    assert.equal(url.searchParams.get('lang'), locale);
    assert.equal(url.searchParams.get('category'), 'cleaning');
    anchor.props.onClick(click());
    assert.deepEqual(states, [true]);
    assert.equal(events[0][1], 'customer_request_click');
    for (const event of events) assert.equal(event[2].event_callback, undefined);
  }
  for (const overrides of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }]) {
    const result = render({ locale }); result.anchor.props.onClick(click(overrides)); assert.deepEqual(result.states, []);
  }
  for (const props of [{ target: '_blank' }, { download: '' }]) {
    const result = render({ locale, ...props }); result.anchor.props.onClick(click()); assert.deepEqual(result.states, []);
  }
  const cancelled = render({ locale, onClick: e => { e.defaultPrevented = true; } });
  cancelled.anchor.props.onClick(click());
  assert.deepEqual(cancelled.states, []); assert.deepEqual(cancelled.events, []);
  console.log('PASS ' + locale + ': normal/keyboard navigation never waits for tracking; modified, download and cancelled clicks preserved');
}

const destinationModule = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/appDestination.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: destinationModule, URL });
for (const locale of ['en', 'pt', 'de']) {
  const url = new URL(destinationModule.appDestination('https://app.gruntwrk.com/jobs/new?category=cleaning', locale, 'gw_service_country=DE'));
  assert.equal(url.searchParams.get('countryCode'), 'DE'); assert.equal(url.searchParams.get('lang'), locale);
  const explicit = new URL(destinationModule.appDestination('https://app.gruntwrk.com/jobs/new?countryCode=PT', locale, 'gw_service_country=DE'));
  assert.equal(explicit.searchParams.get('countryCode'), 'PT');
}
console.log('PASS service country persists independently of all three interface languages');
