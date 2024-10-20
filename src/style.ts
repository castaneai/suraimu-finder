import { css } from 'npm:hono/css'

export const global = css`
// https://hono.dev/helpers/css#global-styles
:-hono-global {
  * {
      box-sizing: border-box;
  }

  html {
    background: #fafafa;
  }

  body {
    color: #444;
    margin: 0 auto;
    padding: 0;
    font-family: 'Lato', 'Noto Sans Japanese', '游ゴシック Medium', '游ゴシック体', 'Yu Gothic Medium', YuGothic, 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-wrap: break-word;
  }

  h1 {
    font-size: 1.6em;
  }

  p, ul, li {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    color: #2196F3;
    text-decoration: none;
  }
}
`

export const containerClass = css`
    h1 img {
        width: auto;
        height: 1.6em;
        vertical-align: middle;
    }
    max-width: 960px;
    margin: 0 auto;
`

export const footerClass= css`
text-align: center;
margin: 1.5em 0;
line-height: 24px;

img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 0.5em;
}
`