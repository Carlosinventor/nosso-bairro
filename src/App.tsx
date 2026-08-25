import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp, ScreenType } from './context/AppContext';
import { BottomNav } from './components/common/BottomNav';
import { SupabaseConfigModal } from './components/common/SupabaseConfigModal';
import { SuccessConfirmationModal } from './components/screens/SuccessConfirmationModal';
import { ContributeModalPrompt } from './components/screens/ContributeModalPrompt';

// Public Screens
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { FiltersModal } from './components/screens/FiltersModal';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { EstablishmentDetailScreen } from './components/screens/EstablishmentDetailScreen';
import { DirectionsScreen } from './components/screens/DirectionsScreen';
import { ShareScreen } from './components/screens/ShareScreen';
import { ContributeScreen } from './components/screens/ContributeScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { NewsScreen } from './components/screens/NewsScreen';
import { EventsScreen } from './components/screens/EventsScreen';
import { CampaignsScreen } from './components/screens/CampaignsScreen';
import { HighlightsScreen } from './components/screens/HighlightsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MyContributionsScreen } from './components/screens/MyContributionsScreen';
import { EditProfileScreen } from './components/screens/EditProfileScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SecurityPrivacyScreen } from './components/screens/SecurityPrivacyScreen';
import { HelpCenterScreen } from './components/screens/HelpCenterScreen';
import { ContactUsScreen } from './components/screens/ContactUsScreen';

// Admin Area Screens
import { AdminDashboardScreen } from './components/admin/AdminDashboardScreen';
import { AdminEstablishmentsScreen } from './components/admin/AdminEstablishmentsScreen';
import { AdminNewEstablishmentScreen } from './components/admin/AdminNewEstablishmentScreen';
import { AdminNewsScreen } from './components/admin/AdminNewsScreen';
import { AdminNewNewsScreen } from './components/admin/AdminNewNewsScreen';
import { AdminEventsScreen } from './components/admin/AdminEventsScreen';
import { AdminNewEventScreen } from './components/admin/AdminNewEventScreen';
import { AdminCampaignsScreen } from './components/admin/AdminCampaignsScreen';
import { AdminNewCampaignScreen } from './components/admin/AdminNewCampaignScreen';
import { AdminHighlightsScreen } from './components/admin/AdminHighlightsScreen';
import { AdminNewHighlightScreen } from './components/admin/AdminNewHighlightScreen';
import { AdminContributionsScreen } from './components/admin/AdminContributionsScreen';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { currentScreen } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#2D5A27] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-2xl bg-white text-[#2D5A27] flex items-center justify-center text-2xl font-extrabold shadow-lg animate-pulse mb-3">
          NB
        </div>
        <p className="text-sm font-semibold tracking-wide text-white/90">Carregando Nosso Bairro...</p>
      </div>
    );
  }

  if (!isAuthenticated && !currentScreen.startsWith('admin_')) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      // Public App Screens
      case 'home':
        return <HomeScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'filters':
        return <FiltersModal />;
      case 'results':
        return <ResultsScreen />;
      case 'establishment_detail':
        return <EstablishmentDetailScreen />;
      case 'directions':
        return <DirectionsScreen />;
      case 'share':
        return <ShareScreen />;
      case 'contribute':
        return <ContributeScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'news':
      case 'news_detail':
        return <NewsScreen />;
      case 'events':
      case 'event_detail':
        return <EventsScreen />;
      case 'campaigns':
      case 'campaign_detail':
        return <CampaignsScreen />;
      case 'highlights':
        return <HighlightsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'my_contributions':
        return <MyContributionsScreen />;
      case 'edit_profile':
        return <EditProfileScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'security_privacy':
      case 'about':
        return <SecurityPrivacyScreen />;
      case 'help_center':
        return <HelpCenterScreen />;
      case 'contact_us':
        return <ContactUsScreen />;

      // Admin Management Screens
      case 'admin_dashboard':
        return <AdminDashboardScreen />;
      case 'admin_establishments':
        return <AdminEstablishmentsScreen />;
      case 'admin_new_establishment':
        return <AdminNewEstablishmentScreen />;
      case 'admin_news':
        return <AdminNewsScreen />;
      case 'admin_new_news':
        return <AdminNewNewsScreen />;
      case 'admin_events':
        return <AdminEventsScreen />;
      case 'admin_new_event':
        return <AdminNewEventScreen />;
      case 'admin_campaigns':
        return <AdminCampaignsScreen />;
      case 'admin_new_campaign':
        return <AdminNewCampaignScreen />;
      case 'admin_highlights':
        return <AdminHighlightsScreen />;
      case 'admin_new_highlight':
        return <AdminNewHighlightScreen />;
      case 'admin_contributions':
        return <AdminContributionsScreen />;

      default:
        return <HomeScreen />;
    }
  };

  // Hide bottom nav on specific fullscreen views or inside admin area
  const isAdminScreen = currentScreen.startsWith('admin_');
  const hideBottomNav = ['filters', 'directions', 'contribute'].includes(currentScreen) || isAdminScreen;

  return (
    <div className="min-h-screen bg-[#F1F3F0] flex justify-center selection:bg-[#2D5A27]/20 selection:text-[#2D5A27]">
      {/* Mobile-first App Container with Natural Tones base */}
      <div className="w-full max-w-md bg-[#F8F9F5] text-[#2D3436] min-h-screen shadow-2xl relative flex flex-col border-x border-[#E5E7EB]/70 overflow-x-hidden">
        {renderScreen()}
        {!hideBottomNav && <BottomNav />}

        {/* Global Modals & Prompts */}
        <SuccessConfirmationModal />
        <ContributeModalPrompt />
        <SupabaseConfigModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
