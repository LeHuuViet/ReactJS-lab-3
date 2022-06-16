export const getPhotos = async (page: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?&_start=${page * 10}&_end=${
        page * 10 + 10
      }`
    );
    const objects = await response.json();
    return objects;
  };
  