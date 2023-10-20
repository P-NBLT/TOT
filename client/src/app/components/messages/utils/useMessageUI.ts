import { useRef, useState } from "react";

export function useConversationUI() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState<number>(40);
  const [bodyHeight, setBodyHeight] = useState<number>(250);

  function adjustHeight() {
    const textArea = textRef.current;
    const body = bodyRef.current;
    if (!textArea || !body) return;

    textArea.style.height = "auto";
    const scrollHeight = textArea.scrollHeight;
    const textareaMaxHeight = 100;

    if (scrollHeight > textareaMaxHeight) {
      setTextareaHeight(textareaMaxHeight);
      setElementHeight(textArea, textareaMaxHeight, "auto");
    } else {
      setTextareaHeight(scrollHeight);
      const newHeight = 250 - (scrollHeight - 40);
      setElementHeight(body, newHeight);
      setElementHeight(textArea, scrollHeight);
      setBodyHeight(newHeight);
    }
  }

  function setElementHeight(
    element: HTMLElement | null,
    newHeight: number,
    overflowY?: string
  ) {
    if (element) {
      element.style.height = `${newHeight}px`;
      if (overflowY) {
        element.style.overflowY = overflowY;
      }
    }
  }

  function scrollToBottomAtLoad() {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTop = body.scrollHeight;
  }

  function scrollToBottom() {
    const body = bodyRef.current;
    if (body) {
      const lastElement = body.lastChild;
      if (lastElement) {
        (lastElement as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return {
    bodyRef,
    textRef,
    messageRef,
    textareaHeight,
    bodyHeight,
    scrollToBottom,
    scrollToBottomAtLoad,
    adjustHeight,
    setElementHeight,
  };
}
