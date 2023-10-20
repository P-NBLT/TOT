//@ts-ignore
import * as DOMPurify from "dompurify";

export const useDomPurify = () => {
  function displayHTMLMessage(text: string, style: any) {
    const safeText = DOMPurify.sanitize(text);
    const newText = safeText.replace(/\n/g, "<br/>");
    return <p style={style} dangerouslySetInnerHTML={{ __html: newText }}></p>;
  }

  function sanatizeText(text: string) {
    return DOMPurify.sanitize(text);
  }

  return { displayHTMLMessage, sanatizeText };
};
