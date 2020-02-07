import withReplacer from './src/wrapWithReplacer';
import styled, {createGlobalStyle as createGlobal} from 'styled-components';

const createAddon = ({
  allowCache = false,
  regex = /\$.+?(?=(\s|;|$|\n))/g,
  ...params
}) => {
  const cache = allowCache ? {} : null;
  return {
    styled: withReplacer ({
      ...params,
      cache,
      regex,
      base: styled,
    }),
    createGlobalStyle: withReplacer ({
      ...params,
      cache,
      regex,
      base: () => createGlobal,
    }) (),
  };
};

const {styled: styledProps, createGlobalStyle} = createAddon ({
  allowCache: true,
  replace: varname => {
    const parts = varname.substring (1).split ('.');
    return props => {
      let value = props;
      for (let i = 0; i < parts.length; i++)
        value = value[parts[i]];
      return value;
    };
  },
});

export default styledProps;
export {createGlobalStyle, createAddon};
