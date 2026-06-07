import RecommendStoresHeader from "@pages/recommend-stores/RecommendStoresHeader";
import RecommendStoresList from "@pages/recommend-stores/RecommendStoresList";
import Spacing from "@shared/layout/Spacing";

const RecommendStoresPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <RecommendStoresHeader />
      <main className="px-6 bg-gray-300 grow overflow-auto">
        <Spacing size={20} />
        <RecommendStoresList />
        <Spacing size={20} />
      </main>
    </div>
  );
};

export default RecommendStoresPage;
