const interpolate = (cache, text, regex, submit, replace) => {
  regex.lastIndex = 0;

  let index = 0, match;

  while ((match = regex.exec (text)) != null) {
    const slot = match[0];

    if (!cache.hasOwnProperty (slot)) cache[slot] = replace (slot);

    submit (text.substring (index, match.index), cache[slot]);

    index = match.index + slot.length;
  }

  return text.substring (index);
};

const wrapWithReplacer = ({replace, regex, cache = {}, base}) => {
  return Component => (prevLiterals = [], ...prevTags) => {
    const literals = [], tags = [];
    const submit = (a, b) => {
      literals.push (a);
      tags.push (b);
    };

    for (let i = 0; i < prevLiterals.length; i++) {
      const text = prevLiterals[i];
      const remainder = interpolate (cache, text, regex, submit, replace);
      submit (remainder, prevTags[i]);
    }
    return base (Component) (literals, ...tags);
  };
};

export default wrapWithReplacer;
