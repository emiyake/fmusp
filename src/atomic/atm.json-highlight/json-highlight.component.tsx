import { style } from './json-highlight.component.style';

const syntaxHighlight = (json: any) => {
  if (!json) return ''; //no JSON from response

  const newJson = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return newJson.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match: string) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
};

interface JsonHightlightProps {
  json: object;
}

export const JsonHightlight: React.FC<JsonHightlightProps> = props => {
  return (
    <pre
      className={style()}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: syntaxHighlight(JSON.stringify(props.json, undefined, 4)),
      }}
    />
  );
};
