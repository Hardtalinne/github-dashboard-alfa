import "./Card.css";

export default function IssuesCard({ issues }) {
  return (
    <li className="IssuesCard">
      <div className="IssuesCard__heading">
        <h1>{issues.title}</h1>
        <span
          className={`IssuesCard__badge-${
            issues.state === "CLOSED" ? "closed" : "opened"
          }`}
        >
          {issues.state}
        </span>
      </div>
      <p>by {issues.author.login}</p>
      <p className="IssuesCard__body-text"><strong>{issues.bodyText}</strong></p>
      <div className="IssuesCard__link">
        <a href={issues.url} target="_blank">
          Access here!
        </a>
      </div>
    </li>
  );
}
