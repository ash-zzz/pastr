import { generate } from "random-words";

function IndexPage() {
  return (
    <div>
      Visit any path.
      <ul>
        {[...Array(5)].map(() => {
          const value = generate({ min: 3, max: 5 }).join("-");
          return (
            <li key={value}>
              <a href={`/${value}`}>{value}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IndexPage;
