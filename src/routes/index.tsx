import SearchField from "../islands/SearchFIeld.tsx";

export default function Home() {
  return <div class="container">
    <h1>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f606.svg/96px-Noto_Emoji_KitKat_1f606.svg.png" />SURAIMU FINDER
    </h1>

    <p>Android 4.4 KitKat の絵文字をキーワードからすばやく検索できるサービスです。
      <br />提供元：
      <a href="https://commons.wikimedia.org/wiki/Emoji">Emoji - Wikimedia Commons</a>
    </p>

    <SearchField />

    <footer class="footer">
      <a href="https://github.com/castaneai/suraimu-finder" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />castaneai/suraimu-finder</a>
    </footer>
</div>
}
