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
      const res = await fetch("http://localhost:8080/api/v1/translator", options);
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