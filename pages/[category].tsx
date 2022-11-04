import Head from "next/head";
import { GetServerSideProps } from "next";
import { renderToString } from "react-dom/server";
import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  DynamicWidgets,
  RefinementList,
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { HierarchicalMenu } from "../components/HierarchicalMenu";
import { Breadcrumbs } from "../components/Breadcrumb";
import Link from "next/link";
import { Pills } from "../components/Pills";
import { Panel } from "../components/Panel";

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

export default function HomePage({ serverState, url }: HomePageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <Head>
        <title>React InstantSearch Hooks - Next.js</title>
      </Head>

      <InstantSearch
        searchClient={client}
        indexName="instant_search"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === "undefined") {
                return new URL(url!) as unknown as Location;
              }

              return window.location;
            },
          }),
        }}
      >
        <div className="Container">
          <div>
            <Link href="/">Home</Link>
            <Breadcrumbs />
            <HierarchicalMenu />
            <Pills />
            <div>
              <h3>Dynamic widgets - comment them out to see it disappearing</h3>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
          </div>
          <div>
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps({ req, params }) {
    const protocol = req.headers.referer?.split("://")[0] || "https";
    const url = `${protocol}://${req.headers.host}${req.url}`;
    const serverState = await getServerState(<HomePage url={url} />, {
      renderToString,
    });

    return {
      props: {
        serverState,
        url,
      },
    };
  };
