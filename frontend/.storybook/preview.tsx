import React from 'react';
import themesConf from '../src/lib/themes';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { rest } from 'msw';

// https://github.com/mswjs/msw-storybook-addon
initialize();

const darkTheme = themesConf['dark'];
const lightTheme = themesConf['light'];

const withThemeProvider = (Story, context) => {
  const backgroundColor = context.globals.backgrounds ? context.globals.backgrounds.value : 'light';
  const theme = backgroundColor !== 'dark' ? lightTheme : darkTheme;

  const ourThemeProvider = (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Story {...context} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
  return ourThemeProvider;
};
export const decorators = [withThemeProvider, mswDecorator];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  backgrounds: {
    values: [
      { name: 'light', value: 'light' },
      { name: 'dark', value: 'dark' },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },

  // https://github.com/mswjs/msw-storybook-addon#composing-request-handlers
  msw: {
    handlers: [
      rest.get('https://api.iconify.design/mdi.json', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
      rest.get('http://localhost/api/v1/namespaces', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
      rest.get('http://localhost/api/v1/events', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
      rest.post(
        'http://localhost/apis/authorization.k8s.io/v1/selfsubjectaccessreviews',
        (_req, res, ctx) => {
          return res(ctx.json({ status: 200 }));
        }
      ),
      rest.get('http://localhost:4466/api/v1/namespaces', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
      rest.get('http://localhost:4466/api/v1/events', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
      rest.post(
        'http://localhost:4466/apis/authorization.k8s.io/v1/selfsubjectaccessreviews',
        (_req, res, ctx) => {
          return res(ctx.json({ status: 200 }));
        }
      ),
    ],
  },
};
