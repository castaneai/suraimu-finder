import { PropsWithChildren } from 'npm:hono/jsx'
import { Style } from 'npm:hono/css'
import { containerClass, footerClass, global } from './style.ts'

export const Layout = ({ children }: PropsWithChildren) => 
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex,nofollow" />
        <title>SURAIMU FINDER</title>
        <Style />
      </head>
      <body class={global}>{children}</body>
    </html>
  
export const View = () => <div class={containerClass}>
    <h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f606.svg/96px-Noto_Emoji_KitKat_1f606.svg.png" />SURAIMU FINDER
    </h1>

    <p>Android 4.4 KitKat の絵文字をキーワードからすばやく検索できるサービスです。
    <br/ >提供元：
    <a href="https://commons.wikimedia.org/wiki/Emoji">Emoji - Wikimedia Commons</a>
  </p>

  <footer class={footerClass}>
    <a href="https://github.com/castaneai/suraimu-finder" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />castaneai/suraimu-finder</a>
  </footer>
</div>
