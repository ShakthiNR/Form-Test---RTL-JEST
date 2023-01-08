import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "./Helper/fetchTasks";

const DisplayTasks = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    const resp = await getTasks();

    if (resp.error) {
      setError(resp.error);
      setResults([]);
      return;
    }
    setResults(resp.data);
    setError("");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <React.Fragment>
      <center>
        <Link to="/"> Go Home</Link>
      </center>
      <center>
        <h1 aria-label="task-heading">List of Tasks</h1>
      </center>
      {error && <center className="error">{error}</center>}

      {!error &&results?.length === 0 ? (
        <p className="loading"> Loading ....</p>
      ) : (
        <ul className="tasks">
          {results.map((result) => {
            const { userId, id, title, completed } = result;
            return (
              <div key={id} className="task">
                <SingleTask
                  id={id}
                  title={title}
                  completed={completed}
                  userId={userId}
                />
              </div>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default DisplayTasks;

const SingleTask = ({ id, title, completed, userId }) => {
  return (
    <li data-testid="card">
      <p>Id - {id}</p>
      <p>User Id - {userId}</p>
      <p>Title - {title}</p>
      <p>Status - {completed ? "True" : "False"}</p>
    </li>
  );
};
