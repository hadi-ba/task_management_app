import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import BoardPage from "./pages/BoardPage";
import { BoardProvider } from "./providers/BoardProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardProvider>
        <Layout>
          <BoardPage />
        </Layout>
      </BoardProvider>
    </QueryClientProvider>
  );
}

export default App;
