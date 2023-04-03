import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { todoService } from "@src/src/api/todos";
import { TodoDTO } from "@src/src/interface/todos";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Test: React.FC<{ data: TodoDTO }> = ({ data }) => {
  const router = useRouter();
  console.log(data);
  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }
  return (
    <div>
      <div>{data.title}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await (await todoService.fetch()).todos;
  const tmp = data.filter((x) => +x.id <= 3);
  return {
    paths: tmp.map((x) => ({ params: { id: x.id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{ data: TodoDTO }> = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params as IParams;
  if (!id) return { notFound: true };

  const data = await todoService.fetchDetail(id);

  return {
    props: {
      data,
    },
    revalidate: 300,
  };
};

export default Test;
