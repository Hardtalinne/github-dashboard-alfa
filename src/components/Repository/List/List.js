import SimpleBar from "simplebar-react";
import "./List.css";

export default function RepositoryList({  title, children }) {
  return (
    <div className="RepositoryList">
      <h3>
      {title}
      </h3>
      <SimpleBar style={{ maxHeight: "calc(100vh - 11rem)" }}>
        <div className="RepositoryList__content">
          {children}
        </div>
      </SimpleBar>
    </div>
  );
}