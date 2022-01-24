import React, {useState, useEffect} from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html, setHtml]=useLocalStorage('html','');
  const [css, setCss]=useLocalStorage('css','');
  const [js, setJs]=useLocalStorage('js','');
  const [srcDoc, setSrcDoc]=useState('');

  useEffect(() => {
    const timout=setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
    }, 500);
    return () => clearTimeout(timout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor displayName="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor displayName="CSS" language="css" value={css} onChange={setCss} />
        <Editor displayName="JS" language="javscript" value={js} onChange={setJs} />
      </div>
      <div className="pane">
        <iframe srcDoc={srcDoc} title="output" sandbox="allow-scripts" frameborder="0" width="100%" height="100%"/>
      </div>
    </>
  );
}

export default App;
