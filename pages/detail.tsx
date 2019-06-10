import { NextConfig } from "next-server/next-config";
import * as React from "react";
import Layout from "../components/Layout";
import ListDetail from "../components/ListDetail";
import { User } from "../interfaces";
import { findData } from "../utils/sample-api";

type Props = {
  item?: User;
  errors?: string;
};

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextConfig) => {
    try {
      const { id } = query;
      const item = await findData(Array.isArray(id) ? id[0] : id);
      return { item };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors } = this.props;

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: "red" }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <Layout
        title={`${item ? item.name : "Detail"} | Next.js + TypeScript Example`}
      >
        {item && <ListDetail item={item} />}
      </Layout>
    );
  }
}

export default InitialPropsDetail;
