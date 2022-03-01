const customFetch = async (url, { body, ...customConfig }) => {
  const headers = {
    "content-type": "application/json; charset=UTF-8",
  };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    // console.log(body);
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    const data = await response.json();
    console.log(data);
    if (response.status === 200 || response.status === 201) {
      return {
        data: data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};
//url
export const API_URLS = " https://jsonplaceholder.typicode.com/albums";

//all functions to fetch Data from api
export const getAlbums = () => {
  return customFetch(API_URLS, {
    method: "GET",
  });
};
export const addAlbums = (title, userId) => {
  console.log(title, userId);

  return customFetch(API_URLS, {
    method: "POST",
    body: {
      title,
      userId,
    },
  });
};

export const deleteAlbum = (userId) => {
  return customFetch(`${API_URLS}/${userId}`, {
    method: "DELETE",
  });
};
export const editAlbums = (Content, userId, Id) => {
  return customFetch(`${API_URLS}/${Id}`, {
    method: "PUT",
    body: {
      Content,
      userId,
    },
  });
};
