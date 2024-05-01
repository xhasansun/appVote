import VoteList from "@/components/VoteList/page.js"
import logger from "@/helpers/logger";

export default function Home({component, pageProps}) {
  logger.error('Main Page')
  return (
    <main className="container" >
      <VoteList />
    </main>
  );

  
}
Home.getInitialProps = async (ctx) => {

  const areLogsEnabled = ctx?.router?.query?.debug || '';
  global.areLogsEnabled = areLogsEnabled === 'true';
  return {};
}
