import "./App.css";
import { useEffect, useState } from "react";
import { getPhotos } from "./services/photoService";
import { IData, IObject } from "./utils/types";
import PhotoItem from "./components/PhotoItem";
import Loading from "./components/Loading";

function App() {
  const [disabled, setDisabled] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<IData>({ isLoading: true, objects: [] });
  const [confirmData, setConfirmData] = useState<IObject[]>([]);
  useEffect(() => {
    if (!data.isLoading) return;
    handleGetData();
  }, [data.isLoading]);
  useEffect(() => {
    const handleScroll = () => {
      const rootElement = document.getElementById("root");
      if (!rootElement) return;
      if (
        window.scrollY + window.innerHeight >= rootElement.scrollHeight &&
        window.scrollY >= 10
      ) {
        setData((prev) => ({ ...prev, isLoading: true }));
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onChange = (value: string, id: number) => {
    const newData = data.objects.map((item) => {
      if (item.id === id) {
        return { ...item, title: value, date: Date.now() };
      }
      return item;
    });
    setData((prev) => ({ ...prev, objects: newData }));
  };
  const handleGetData = async () => {
    const objects = await getPhotos(page);
    const photos = objects.map((item: IObject) => ({
      ...item,
      date: Date.now(),
    }));
    setData((prev) => ({
      isLoading: false,
      objects: [...prev.objects, ...photos],
    }));
    setConfirmData((prev) => [...prev, ...photos]);
    setPage((prev) => prev + 1);
  };
  const handleReset = () => {
    setData((prev) => ({ ...prev, objects: confirmData }));
    setDisabled(true);
  };

  const handleConfirm = () => {
    setConfirmData(data.objects);
    setDisabled(true);
  };
  return (
    <div className="App">
      <div>
        <button onClick={handleConfirm} disabled={disabled}>
          Confirm
        </button>
        <button onClick={handleReset} disabled={disabled}>
          Reset
        </button>
      </div>
      <div>
        {data.objects.map((object) => (
          <PhotoItem
            setDisabled={setDisabled}
            onChange={onChange}
            key={object.id}
            object={object}
          />
        ))}
      </div>
      {data.isLoading && <Loading />}
    </div>
  );
}

export default App;
