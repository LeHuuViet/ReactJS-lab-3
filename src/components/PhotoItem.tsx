import { FC } from "react";
import { IObject } from "../utils/types";

interface IObjectItem {
  object: IObject;
  onChange: any;
  setDisabled: any;
}

const PhotoItem: FC<IObjectItem> = ({ object, onChange, setDisabled }) => {
  const onInputChange = (e: any) => {
    onChange(e.target.value, object.id);
    setDisabled(false);
  };

  return (
    <div className="app-container">
      <img alt="photos" className="img" src={object.thumbnailUrl} />
      <div className="app-content">
        <textarea
          className="input"
          value={object.title}
          onChange={onInputChange}
        ></textarea>
        <label>{object.date}</label>
      </div>
    </div>
  );
};

export default PhotoItem;
