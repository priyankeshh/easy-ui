import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'easyui';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#F8F5FF',
    100: '#F0EBFF',
    200: '#E1D6FF',
    300: '#CEBEFF',
    400: '#B69EFF',
    500: '#9C7DFF',
    600: '#8A5FFF',
    700: '#7645E8',
    800: '#6234BB',
    900: '#502D93',
    950: '#2D1959',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  safelist: [
    ...Object.keys(customIconCollection[collectionName]||{}).map(x=>`i-easyui:${x}`)    
  ],
  shortcuts: {
    'easyui-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 easyui-ease-cubic-bezier',
    kdb: 'bg-easyui-elements-code-background text-easyui-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      easyui: {
        elements: {
          borderColor: 'var(--easyui-elements-borderColor)',
          borderColorActive: 'var(--easyui-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--easyui-elements-bg-depth-1)',
              2: 'var(--easyui-elements-bg-depth-2)',
              3: 'var(--easyui-elements-bg-depth-3)',
              4: 'var(--easyui-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--easyui-elements-textPrimary)',
          textSecondary: 'var(--easyui-elements-textSecondary)',
          textTertiary: 'var(--easyui-elements-textTertiary)',
          code: {
            background: 'var(--easyui-elements-code-background)',
            text: 'var(--easyui-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--easyui-elements-button-primary-background)',
              backgroundHover: 'var(--easyui-elements-button-primary-backgroundHover)',
              text: 'var(--easyui-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--easyui-elements-button-secondary-background)',
              backgroundHover: 'var(--easyui-elements-button-secondary-backgroundHover)',
              text: 'var(--easyui-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--easyui-elements-button-danger-background)',
              backgroundHover: 'var(--easyui-elements-button-danger-backgroundHover)',
              text: 'var(--easyui-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--easyui-elements-item-contentDefault)',
            contentActive: 'var(--easyui-elements-item-contentActive)',
            contentAccent: 'var(--easyui-elements-item-contentAccent)',
            contentDanger: 'var(--easyui-elements-item-contentDanger)',
            backgroundDefault: 'var(--easyui-elements-item-backgroundDefault)',
            backgroundActive: 'var(--easyui-elements-item-backgroundActive)',
            backgroundAccent: 'var(--easyui-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--easyui-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--easyui-elements-actions-background)',
            code: {
              background: 'var(--easyui-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--easyui-elements-artifacts-background)',
            backgroundHover: 'var(--easyui-elements-artifacts-backgroundHover)',
            borderColor: 'var(--easyui-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--easyui-elements-artifacts-inlineCode-background)',
              text: 'var(--easyui-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--easyui-elements-messages-background)',
            linkColor: 'var(--easyui-elements-messages-linkColor)',
            code: {
              background: 'var(--easyui-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--easyui-elements-messages-inlineCode-background)',
              text: 'var(--easyui-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--easyui-elements-icon-success)',
            error: 'var(--easyui-elements-icon-error)',
            primary: 'var(--easyui-elements-icon-primary)',
            secondary: 'var(--easyui-elements-icon-secondary)',
            tertiary: 'var(--easyui-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--easyui-elements-preview-addressBar-background)',
              backgroundHover: 'var(--easyui-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--easyui-elements-preview-addressBar-backgroundActive)',
              text: 'var(--easyui-elements-preview-addressBar-text)',
              textActive: 'var(--easyui-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--easyui-elements-terminals-background)',
            buttonBackground: 'var(--easyui-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--easyui-elements-dividerColor)',
          loader: {
            background: 'var(--easyui-elements-loader-background)',
            progress: 'var(--easyui-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--easyui-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--easyui-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--easyui-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--easyui-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--easyui-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--easyui-elements-cta-background)',
            text: 'var(--easyui-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
      unit: 'em',
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
