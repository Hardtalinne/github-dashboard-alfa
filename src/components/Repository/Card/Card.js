import { GoStar, GoRepoForked, GoIssueOpened } from "react-icons/go";
import "./Card.css";

export default function RepositoryCard({ repo, isSelected, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`RepositoryCard ${isSelected && "RepositoryCard--selected"}`}
    >
      <div>
        <h3>{repo.name}</h3>
        <div className="RepositoryCard__additional-info">
          <span>
            <GoStar /> {repo.stargazerCount || 0}
          </span>
          <span>
            <GoRepoForked /> {repo.forkCount || 0}
          </span>
          <span>
            <GoIssueOpened /> {repo.issues.nodes.length || 0}
          </span>
        </div>
        <div className="RepositoryCard__languages">
          {repo.languages.nodes.length > 0 &&
            repo.languages.nodes.map((language) => (
              <p>
                {" "}
                {repo.languages.nodes.length > 1
                  ? language.name + " |"
                  : language.name}
              </p>
            ))}
        </div>
      </div>
    </li>
  );
}
