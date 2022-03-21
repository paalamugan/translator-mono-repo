export const getTranslatedData = async (from = "", to = "", text = "") => {
  let body = {
    from,
    to,
    text,
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch("/api/v1/translator", options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    } 

    return {
      ...data,
      loading: false
    };
  } catch (error) {
    return {
      ...body,
      loading: false,
      errorText: error.message,
    };
  }
};

export const onTranslateSpeech = ({ text, lang, onstart = () => {}, onend = () => {}, onerror = () => {} }) => {
  let speechSynthesis = window.speechSynthesis;
  if (!speechSynthesis) {
    console.error("speechSynthesis is not supported");
    return;
  }
  
  let utterance = new SpeechSynthesisUtterance();
  utterance.lang = lang;
  utterance.text = text;
  utterance.volume = 1;

  utterance.onstart = onstart;
  utterance.onend = onend;
  utterance.onerror = onerror;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);

  return {
    cancel: () => {
      speechSynthesis.cancel();
    }
  };
}