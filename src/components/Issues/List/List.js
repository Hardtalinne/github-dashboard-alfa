import SimpleBar from "simplebar-react";
import "./List.css";

export default function IssuesList({ title, children }) {
  return (
    <div className="IssuesList">
      <h3>
        {title}
      </h3>
      <SimpleBar style={{ maxHeight: "calc(100vh - 11rem)" }}>
        <div className="IssuesList__content">{children}</div>
      </SimpleBar>
    </div>
  );
}
