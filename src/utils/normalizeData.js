/*
 * Keep transformations from the legacy portal isolated here.
 * Add mappings only after inspecting real upstream response samples.
 */

function normalizeMeter(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new TypeError('Expected a meter object from the legacy portal.');
  }

  // TODO: map the portal's actual fields to a stable public API schema.
  return { ...raw };
}

module.exports = { normalizeMeter };
