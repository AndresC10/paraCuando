import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { NextPageWithLayout } from '../page';
export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1 className="text-2xl">
        {' '}
        this page is profile
        <span className="text-app-red text-6xl">{id}</span>
      </h1>
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
