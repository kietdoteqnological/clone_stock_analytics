import { todoService } from "@src/src/api/todos";
import { TodoDTO } from "@src/src/interface/todos";
import Link from "next/link";
import React from "react";

const TryIndex: React.FC<{ data: TodoDTO[] }> = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map((x) => {
          return (
            <li key={x.id}>
              <Link href={`/try/${x.id}`}>{x.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const data = await (await todoService.fetch()).todos;
  console.log(data[0]);

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
export default TryIndex;
