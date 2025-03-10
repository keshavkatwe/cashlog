import {Box, MainContainer, TabContainerSpacing} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {ScrollView} from 'react-native';
import {HomeProfileWidget} from '../../widgets/HomeProfileWidget';
import {HomeSpentWidget} from '../../widgets/HomeSpentWidget';
import {HomeWalletCardsWidget} from '../../widgets/HomeWalletCardsWidget';
import {HomeTransactionsWidget} from '../../widgets/HomeTransactionsWidget';

const HomeTab = () => (
  <MainContainer>
    <ScrollView>
      <Box ph={DEFAULT_CONTAINER_PADDING}>
        <Box pt={'10px'}>
          <HomeProfileWidget />
        </Box>
        <Box pt={'26px'}>
          <HomeSpentWidget />
        </Box>
      </Box>
      <HomeWalletCardsWidget />
      <Box pt={'30px'}>
        <HomeTransactionsWidget />
      </Box>
      <TabContainerSpacing />
    </ScrollView>
  </MainContainer>
);

export default HomeTab;
