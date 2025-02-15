import type { ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--easyui-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--easyui-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--easyui-elements-terminal-textColor'),
    background: cssVar('--easyui-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--easyui-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--easyui-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--easyui-elements-terminal-selection-backgroundColorInactive'),

    // ansi escape code colors
    black: cssVar('--easyui-elements-terminal-color-black'),
    red: cssVar('--easyui-elements-terminal-color-red'),
    green: cssVar('--easyui-elements-terminal-color-green'),
    yellow: cssVar('--easyui-elements-terminal-color-yellow'),
    blue: cssVar('--easyui-elements-terminal-color-blue'),
    magenta: cssVar('--easyui-elements-terminal-color-magenta'),
    cyan: cssVar('--easyui-elements-terminal-color-cyan'),
    white: cssVar('--easyui-elements-terminal-color-white'),
    brightBlack: cssVar('--easyui-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--easyui-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--easyui-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--easyui-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--easyui-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--easyui-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--easyui-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--easyui-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
