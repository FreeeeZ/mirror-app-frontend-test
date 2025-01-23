import 'normalize.css';
import '@application/assets/styles/colors.css';
import '@application/assets/styles/main.css';

import PostsList from '@features/posts-list/PostsList';
import MainLayout from '@ui/layouts/main/Main';
import ApplicationProvider from '@application/ApplicationProvider';

function App() {
  return (
    <ApplicationProvider>
      <MainLayout>
        <PostsList />
      </MainLayout>
    </ApplicationProvider>
  );
}

export default App;
