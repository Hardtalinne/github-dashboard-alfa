import { useEffect, useState } from "react";
import UserCard from "../../components/User/Card/Card";
import UserList from "../../components/User/List/List";
import RepositoryList from "../../components/Repository/List/List";
import RepositoryCard from "../../components/Repository/Card/Card";
import IssuesCard from "../../components/Issues/Card/Card";
import IssuesList from "../../components/Issues/List/List";
import FollowersQ from "./graphql/FollowersQ";
import FollowingQ from "./graphql/FollowingQ";
import RepositoryQ from "./graphql/RepositoryQ";
import { useQuery } from "@apollo/client";
import "./dashboard.css";

export default function PagesDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedIssuesByRepo, setSelectedIssuesByRepo] = useState(null);

  const [username] = useState(
    () => window.localStorage.getItem("github_username") || ""
  );

  const {
    data: followers,
    error: followerError,
    loading: followerLoading,
  } = useQuery(FollowersQ, {
    variables: {
      username,
    },
  });

  const {
    data: following,
    error: followingError,
    loading: followingLoading,
  } = useQuery(FollowingQ, {
    variables: {
      username,
    },
  });

  const {
    data: repositories,
    error: repositoriesError,
    refetch,
    loading: RepositoriesLoading
  } = useQuery(RepositoryQ, {
    variables: {
      username: selectedUser || username,
    },
  });

  const error = followerError || followingError || repositoriesError;

  useEffect(() => {
    selectedUser && refetch();
  }, [selectedUser]);

  useEffect(() => {
    selectedRepo && refetch();
  }, [selectedRepo]);

  const handleSelectedUser = (user) => {
    setSelectedUser(user.login);
    setSelectedRepo(null);
    setSelectedIssuesByRepo([]);
  };

  const handleSelectedRepo = (repo) => {
    setSelectedRepo(repo.name);
    setSelectedIssuesByRepo(repo?.issues?.nodes);
  };

  return (
    <div>
      <header className="PagesDashboard__topbar">{username}</header>
      {error ? (
        <div>Algo de errado</div>
      ) : (
        <section className="PagesDashboard__content">
          <UserList title="Followers">
            {followerLoading 
              ? "Loading..."
              : followers?.user.followers.nodes.map((follower) => (
                  <UserCard
                    key={follower.id}
                    user={follower}
                    isSelected={selectedUser === follower.login}
                    onClick={() => handleSelectedUser(follower)}
                  />
                ))}
          </UserList>
          <UserList title="Following">
            {followingLoading 
              ? "Loading..."
              : following?.user.following.nodes.map((following) => (
                  <UserCard
                    key={following.id}
                    user={following}
                    isSelected={selectedUser === following.login}
                    onClick={() => handleSelectedUser(following)}
                  />
                ))}
          </UserList>
          <RepositoryList title="Repositories">
            {RepositoriesLoading
              ? "Loading..."
              : repositories?.user.repositories.nodes.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repo={repository}
                isSelected={selectedRepo === repository.name}
                onClick={() => handleSelectedRepo(repository)}
              />
            ))}
          </RepositoryList>
          {selectedIssuesByRepo?.length > 0 && (
            <IssuesList title="Issues">
              {selectedIssuesByRepo?.map((issue) => (
                <IssuesCard key={issue.id} issues={issue} />
              ))}
            </IssuesList>
          )}
        </section>
      )}
    </div>
  );
}
