import type { NextPage } from 'next'
import MainLayout from '@/components/layout/mainLayout';
import TopGroup from '@/components/TopGroup';
import DailyRecentViews from './home/DailyRecentViews';
import LastChapper from './home/LastChapper';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <MainLayout customClass="home-page">
      <TopGroup />
      <DailyRecentViews />
      <LastChapper />
      <Footer />
    </MainLayout>
  )
}

export default Home
