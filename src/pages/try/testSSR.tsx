import React from "react";
import { todoService } from "@src/src/api/todos";
import { TodoDTO } from "../../interface/todos";
// import { GetServerSidePropsContext } from "next";

const TestSSR: React.FC<{ data: TodoDTO[] }> = ({ data }) => {
  const tmp = data.filter((d) => +d.id <= 30);
  return (
    <div className="test-ssr">
      {tmp.length > 0 && (
        <ul>
          {tmp.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
        </ul>
      )}
      {data.length === 0 && <div>Null</div>}
    </div>
  );
};

// export async function getServerSideProps() {
//   const data = await (await todoService.fetch()).todos;
//   console.log(data[0]);

//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }

export async function getStaticProps() {
  const data = await (await todoService.fetch()).todos;
  console.log(data[0]);

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default TestSSR;
