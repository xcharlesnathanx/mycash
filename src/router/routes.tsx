import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { CardsPage } from '../pages/CardsPage'
import { TransactionsPage } from '../pages/TransactionsPage'
import { GoalsPage } from '../pages/GoalsPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ROUTES } from '../constants'

export const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: (
      <MainLayout activeRoute="dashboard">
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.CARDS,
    element: (
      <MainLayout activeRoute="cards">
        <CardsPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.TRANSACTIONS,
    element: (
      <MainLayout activeRoute="transactions">
        <TransactionsPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.GOALS,
    element: (
      <MainLayout activeRoute="goals">
        <GoalsPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <MainLayout activeRoute="profile">
        <ProfilePage />
      </MainLayout>
    ),
  },
])
