import SimpleBar from "simplebar-react";
import "./List.css";

export default function UserList({ title, children }) {
  return (
    <div className="UserList">
      <h3>
        {title}
      </h3>
      <SimpleBar style={{ maxHeight: "calc(100vh - 11rem)" }}>
        <ul className="UserList__content">{children}</ul>
      </SimpleBar>
    </div>
  );
}
